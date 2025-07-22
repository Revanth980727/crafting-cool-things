from fastapi import APIRouter, UploadFile, File as FastAPIFile, Form, Request, HTTPException
from fastapi.responses import FileResponse, JSONResponse
from . import db, utils, chroma, llm
import os

router = APIRouter()
UPLOAD_DIR = "uploads"

@router.post("/upload")
async def upload_file(file: UploadFile = FastAPIFile(...)):
    file_path = utils.save_upload_file(file, UPLOAD_DIR)
    text = utils.extract_text(file_path)
    file_obj = db.add_file(file.filename, len(text), file_path)
    return {"file_id": file_obj.id}

@router.post("/embed")
async def embed_file(file_id: int = Form(...)):
    file_obj = db.get_file(file_id)
    if not file_obj:
        raise HTTPException(404, "File not found")
    text = utils.extract_text(file_obj.path)
    chunks = utils.chunk_text(text)
    metadatas = [{"chunk_id": i, "file_id": file_id} for i in range(len(chunks))]
    chroma.add_embeddings(file_id, chunks, metadatas)
    return {"status": "embedding complete", "chunks": len(chunks)}

@router.post("/chat")
async def chat(file_id: int = Form(...), question: str = Form(...)):
    file_obj = db.get_file(file_id)
    if not file_obj:
        raise HTTPException(404, "File not found")
    # Retrieve top chunks
    top_chunks = chroma.query_chunks(file_id, question, top_k=5)
    answer = llm.answer_question(question, top_chunks)
    db.add_session(file_id, question, answer)
    return {"answer": answer, "sources": [c[1] for c in top_chunks]}

@router.get("/search")
async def search(q: str, file_id: int):
    file_obj = db.get_file(file_id)
    if not file_obj:
        raise HTTPException(404, "File not found")
    # Use ChromaDB for semantic search
    results = chroma.query_chunks(file_id, q, top_k=5)
    return {"results": [{"text": c[0], "meta": c[1]} for c in results]}

@router.get("/summary")
async def summary(file_id: int):
    file_obj = db.get_file(file_id)
    if not file_obj:
        raise HTTPException(404, "File not found")
    text = utils.extract_text(file_obj.path)
    chunks = utils.chunk_text(text)
    summary = llm.summarize_document(chunks)
    return {"summary": summary}

@router.get("/tasks")
async def tasks(file_id: int):
    file_obj = db.get_file(file_id)
    if not file_obj:
        raise HTTPException(404, "File not found")
    text = utils.extract_text(file_obj.path)
    chunks = utils.chunk_text(text)
    tasks = llm.extract_tasks(chunks)
    return {"tasks": tasks}

@router.get("/history")
async def history(file_id: int):
    sessions = db.get_sessions(file_id)
    return {"history": [{"question": s.question, "answer": s.answer, "timestamp": s.timestamp.isoformat()} for s in sessions]}

@router.get("/file/{file_id}")
async def get_file(file_id: int):
    file_obj = db.get_file(file_id)
    if not file_obj:
        raise HTTPException(404, "File not found")
    return FileResponse(file_obj.path, filename=file_obj.filename) 