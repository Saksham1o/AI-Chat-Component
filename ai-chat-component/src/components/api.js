import axios from 'axios';

export async function sendMessageToAI(messages) {
  // Just simulate a backend here for now
  const lastMessage = messages[messages.length - 1].text;

  const response = await axios.post('http://localhost:5000/api/chat', {
  message: lastMessage,
  history: messages,
});


  return response.data.reply;
}
