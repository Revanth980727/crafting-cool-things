import chromadb
from chromadb.config import Settings
from chromadb.utils import embedding_functions
import os

CHROMA_PATH = os.getenv("CHROMA_DB_PATH", "chroma_db")
chroma_client = chromadb.Client(Settings(persist_directory=CHROMA_PATH))
openai_ef = embedding_functions.OpenAIEmbeddingFunction(api_key=os.getenv("OPENAI_API_KEY"))

COLLECTION_PREFIX = "file_"

def get_collection(file_id):
    name = f"{COLLECTION_PREFIX}{file_id}"
    if name not in [c.name for c in chroma_client.list_collections()]:
        return chroma_client.create_collection(name, embedding_function=openai_ef)
    return chroma_client.get_collection(name)

def add_embeddings(file_id, chunks, metadatas):
    col = get_collection(file_id)
    ids = [f"chunk_{i}" for i in range(len(chunks))]
    col.add(documents=chunks, metadatas=metadatas, ids=ids)

def query_chunks(file_id, query, top_k=5):
    col = get_collection(file_id)
    results = col.query(query_texts=[query], n_results=top_k)
    # Return list of (chunk, metadata)
    return list(zip(results['documents'][0], results['metadatas'][0])) 