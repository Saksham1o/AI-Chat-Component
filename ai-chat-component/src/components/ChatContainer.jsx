import React, { useState, useRef, useEffect } from 'react';
import MessageBubble from './MessageBubble';
import InputBar from './InputBar';
import TypingIndicator from './TypingIndicator';
import { sendMessageToAI } from './api';

export default function ChatContainer() {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const handleSend = async (text) => {
    const userMessage = { role: 'user', text };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setIsTyping(true);

    try {
      const aiReply = await sendMessageToAI(updatedMessages);
      setMessages([...updatedMessages, { role: 'ai', text: aiReply }]);
    } catch (err) {
      setMessages([...updatedMessages, { role: 'ai', text: 'Something went wrong.' }]);
    } finally {
      setIsTyping(false);
    }
  };

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  return (
    <div className="max-w-xl mx-auto p-4 bg-white rounded shadow h-[80vh] flex flex-col">
      <h2 className="chat-heading">💬 AI Chat Assistant</h2>
      <div className="flex flex-col flex-1 overflow-hidden">
        <div className="flex-1 overflow-y-auto mb-2 pr-2" style={{ minHeight: 0 }}>
          {messages.map((msg, idx) => (
            <MessageBubble key={idx} role={msg.role} text={msg.text} />
          ))}
          {isTyping && <TypingIndicator />}
          <div ref={messagesEndRef} />
        </div>
        <InputBar onSend={handleSend} />
      </div>
    </div>
  );
}