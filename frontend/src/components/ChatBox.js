import React, { useState } from 'react';

function ChatBox({ fileId }) {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!question || !fileId) return;
    setLoading(true);
    const formData = new FormData();
    formData.append('file_id', fileId);
    formData.append('question', question);
    const res = await fetch('http://localhost:8000/chat', {
      method: 'POST',
      body: formData,
    });
    const data = await res.json();
    setAnswer(data.answer);
    setLoading(false);
  };

  return (
    <div>
      <textarea
        value={question}
        onChange={e => setQuestion(e.target.value)}
        placeholder="Ask a question about your document..."
      />
      <button onClick={handleSend} disabled={loading || !question || !fileId}>
        {loading ? 'Asking...' : 'Ask'}
      </button>
      {answer && (
        <div style={{ marginTop: 10 }}>
          <strong>Answer:</strong>
          <div>{answer}</div>
        </div>
      )}
    </div>
  );
}

export default ChatBox; 