import openai
import os

openai.api_key = os.getenv("OPENAI_API_KEY")

EMBED_MODEL = "text-embedding-ada-002"
CHAT_MODEL = "gpt-3.5-turbo"

def get_embedding(text):
    resp = openai.embeddings.create(input=[text], model=EMBED_MODEL)
    return resp.data[0].embedding

def answer_question(question, context_chunks):
    context = "\n\n".join([c[0] for c in context_chunks])
    prompt = f"You are a helpful assistant. Use the following context to answer the question.\n\nContext:\n{context}\n\nQuestion: {question}\nAnswer:"
    resp = openai.chat.completions.create(
        model=CHAT_MODEL,
        messages=[
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": prompt}
        ],
        max_tokens=512,
        temperature=0.2,
    )
    return resp.choices[0].message.content.strip()

def summarize_document(chunks):
    context = "\n\n".join(chunks[:5])
    prompt = f"Summarize the following document:\n\n{context}\n\nSummary:"
    resp = openai.chat.completions.create(
        model=CHAT_MODEL,
        messages=[
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": prompt}
        ],
        max_tokens=256,
        temperature=0.3,
    )
    return resp.choices[0].message.content.strip()

def extract_tasks(chunks):
    context = "\n\n".join(chunks[:5])
    prompt = f"Extract all actionable tasks from the following document as a checklist.\n\n{context}\n\nChecklist:"
    resp = openai.chat.completions.create(
        model=CHAT_MODEL,
        messages=[
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": prompt}
        ],
        max_tokens=256,
        temperature=0.3,
    )
    return resp.choices[0].message.content.strip() 