import React, { useState, useRef, useEffect } from 'react';
// import { Send, User, Bot } from 'lucide-react';

const App = () => {
  const [messages, setMessages] = useState([
    { id: 1, sender: 'bot', text: "Hello! I'm here to help you explore your emotional awareness. Would you like to discuss a recent situation that affected you emotionally?" },
  ]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = () => {
    if (newMessage.trim()) {
      const userMessage = { id: messages.length + 1, sender: 'user', text: newMessage.trim() };
      setMessages(prevMessages => [...prevMessages, userMessage]);
      setNewMessage('');
      
      // Simulate bot response (in a real app, this would be more sophisticated)
      setTimeout(() => {
        const botResponse = { id: messages.length + 2, sender: 'bot', text: getBotResponse(userMessage.text) };
        setMessages(prevMessages => [...prevMessages, botResponse]);
      }, 1000);
    }
  };

  const getBotResponse = (userMessage) => {
    // This is a simple example. In a real app, you'd have more sophisticated logic or AI here.
    if (userMessage.toLowerCase().includes('angry') || userMessage.toLowerCase().includes('frustrated')) {
      return "It sounds like you're experiencing some strong emotions. Can you tell me more about what led to these feelings?";
    } else if (userMessage.toLowerCase().includes('happy') || userMessage.toLowerCase().includes('excited')) {
      return "I'm glad to hear you're feeling positive! What contributed to these good feelings?";
    } else {
      return "Thank you for sharing. How did this situation make you feel physically and emotionally?";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50 flex flex-col items-center justify-center p-4 w-screen">
      <div className="bg-white bg-opacity-90 backdrop-blur-sm rounded-3xl shadow-lg p-6 max-w-2xl w-full h-[600px] flex flex-col">
        <h1 className="text-2xl font-semibold text-teal-800 mb-4 flex items-center">
          {/* <Bot className="mr-2" size={24} /> */}
          Emotional Awareness Chat
        </h1>
        <div className="flex-grow overflow-y-auto mb-4 pr-2">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`mb-4 flex ${
                message.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`p-3 rounded-2xl max-w-[80%] ${
                  message.sender === 'user'
                    ? 'bg-teal-100 text-teal-800'
                    : 'bg-blue-100 text-blue-800'
                }`}
              >
                <div className="flex items-center mb-1">
                  {/* {message.sender === 'user' ? (
                    <User className="inline-block mr-2 text-teal-500" size={16} />
                  ) : (
                    <Bot className="inline-block mr-2 text-blue-500" size={16} />
                  )} */}
                  <span className="font-semibold">
                    {message.sender === 'user' ? 'You' : 'EmoBot'}
                  </span>
                </div>
                {message.text}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <div className="flex bg-gray-100 rounded-full p-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-grow px-4 py-2 bg-transparent outline-none"
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          />
          <button
            onClick={handleSend}
            className="bg-teal-500 hover:bg-teal-600 text-white rounded-full p-2 transition duration-300"
          >
            {/* <Send size={20} /> */}
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;