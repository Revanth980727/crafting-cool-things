# Explain-Anything PDF Assistant

A full-stack, containerized AI assistant for uploading, searching, and chatting with your documents (PDF, DOCX, PPTX) using OpenAI, ChromaDB, FastAPI, and React.

---

## 🚀 Features
- Upload and process PDF, DOCX, PPTX files
- Extract and chunk document text
- Generate embeddings with OpenAI
- Store and retrieve vectors with ChromaDB
- Ask questions and get context-aware answers (RAG)
- Full-text semantic search
- Summarize documents or extract tasks
- View Q&A session history
- Modern React frontend

---

## 🧩 Architecture

- **Frontend:** ReactJS (PWA, Dockerized)
- **Backend:** FastAPI (Python, Dockerized)
- **LLM/Embeddings:** OpenAI API
- **Vector Store:** ChromaDB (local, Dockerized)
- **Database:** SQLite3 (for file/session metadata)
- **Containerized:** Docker Compose

---

## 🗄️ Project Structure

```
question/
├── backend/
│   ├── app/
│   ├── requirements.txt
│   └── Dockerfile
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── Dockerfile
├── docker-compose.yml
└── .env
```

---

## ⚡ Quickstart (Recommended: Docker Compose)

1. **Clone the repo and enter the folder:**
   ```sh
   git clone <repo-url>
   cd question
   ```

2. **Add your OpenAI API key to `.env`:**
   ```env
   OPENAI_API_KEY=sk-...
   CHROMA_DB_PATH=/app/chromadb
   SQLITE_DB_PATH=/app/sqlite/db.sqlite3
   ```

3. **Start all services:**
   ```sh
   docker-compose up --build
   ```

4. **Visit the app:**
   - Frontend: [http://localhost:3000](http://localhost:3000)
   - Backend API: [http://localhost:8000/docs](http://localhost:8000/docs)

---

## 🛠️ Manual Setup (Dev Mode)

### 1. **Backend**
```sh
cd backend
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows
pip install -r requirements.txt
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### 2. **Frontend**
```sh
cd frontend
npm install
npm start
```

### 3. **ChromaDB**
- By default, ChromaDB runs as a local process via Docker Compose. For advanced use, see [ChromaDB docs](https://docs.trychroma.com/).

---

## 📝 Usage

1. **Upload a document** via the web UI
2. **Embed** the document (auto or via API)
3. **Ask questions** in the chat interface
4. **Search, summarize, or extract tasks**
5. **View session history**

---

## 🧑‍💻 API Endpoints

- `POST /upload` — Upload a document
- `POST /embed` — Generate embeddings for a file
- `POST /chat` — Ask a question about a file
- `GET /search` — Semantic search
- `GET /summary` — Summarize document
- `GET /tasks` — Extract tasks
- `GET /history` — Q&A log
- `GET /file/{id}` — Download/view file

See [http://localhost:8000/docs](http://localhost:8000/docs) for full API docs.

---

## 🧩 Tech Stack
- ReactJS, FastAPI, OpenAI, ChromaDB, SQLite3, Docker

---

## 📄 License
MIT 