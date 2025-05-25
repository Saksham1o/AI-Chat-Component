export default function MessageBubble({ role, text }) {
  const isUser = role === 'user';
  return (
    <div className={`p-2 my-1 rounded max-w-[75%] ${isUser ? 'bg-blue-500 text-white self-end' : 'bg-gray-200 text-black self-start'}`}>
      {text}
    </div>
  );
}
