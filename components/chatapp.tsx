'use client'
import React, { useState } from 'react';
import axios from 'axios';

interface Message {
  question: string;
  answer: string;
}

const ChatApp: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState<string>('');

  const sendMessage = async() => {
    if (inputText.trim() !== '') {
      const newMessage: Message = { question: inputText, answer: '' };
      setMessages([...messages, newMessage]);
      try{
         const {data} = await axios.get(`https://api.huego.ai/query_data?question=${inputText}`)
         console.log(data.prompt_response)
         setInputText('');
         setMessages(prevMessages =>
            prevMessages.map((msg, index) =>
              index === prevMessages.length - 1
                ? {
                    ...msg,
                    answer:
                      data.prompt_response
                  }
                : msg
            )
          );

      }catch(err){
        console.log(err)
      }

      // Simulate server response (replace with actual server request)
      
        
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col h-[720px]">
        <div className="flex-1 overflow-y-auto">
          {messages.map((msg, index) => (
            <div key={index}>
              {msg.question && (
                <div className="mb-4 bg-[#D9D9D9] p-4 rounded-2xl text-right">
                  {msg.question}
                </div>
              )}
              {msg.answer && (
                <div className="flex items-start mb-4">
                  <img
                    src="/Human1.jpg" // Replace with the actual path to the profile picture
                    className="w-20 h-20 rounded-full mr-4"
                    alt="Profile"
                  />
                  <div className="text-left bg-[#D9D9D9] p-4 rounded-2xl">
                    {msg.answer}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between items-center mt-4">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="w-full px-4 py-2 rounded-full border"
            placeholder="Type your message..."
          />
          <button
            onClick={sendMessage}
            className="ml-4 px-4 py-2 bg-[#56B21D] text-white rounded-full"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatApp;
