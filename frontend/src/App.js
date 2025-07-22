import React, { useState } from 'react';
import FileUploader from './components/FileUploader';
import ChatBox from './components/ChatBox';

function App() {
  const [fileId, setFileId] = useState(null);

  return (
    <div style={{ maxWidth: 600, margin: '40px auto', padding: 20 }}>
      <h1>Explain Anything PDF Assistant</h1>
      <FileUploader onFileId={setFileId} />
      {fileId && <ChatBox fileId={fileId} />}
    </div>
  );
}

export default App;
