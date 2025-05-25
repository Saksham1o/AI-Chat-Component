import { useState } from 'react';

export default function InputBar({ onSend }) {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onSend(input.trim());
      setInput('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="input-bar-form">
      <div className="input-bar-container">
        <input
          className="input-bar-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
        />
        <button className="input-bar-send" type="submit">
          Send
        </button>
      </div>
    </form>
  );
}