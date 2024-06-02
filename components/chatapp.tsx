'use client'
import React, { useState } from 'react';
import axios from 'axios';
import Typewriter from './typewriter';

interface Message {
    question: string;
    answer: string;
}

const ChatApp: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputText, setInputText] = useState<string>('');
    const [loader , setloader] = useState<boolean>(false)

    const sendMessage = async (e:any) => {
        e.preventDefault()
        if (inputText.trim() !== '') {
            const newMessage: Message = { question: inputText, answer: '' };
            setMessages([...messages, newMessage]);
            try {
                setloader(true)
                const { data } = await axios.get(`https://api.huego.ai/query_data?question=${inputText}`)
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
                setloader(false)

            } catch (err) {
                console.log(err)
            }

            // Simulate server response (replace with actual server request)


        }
    };
    return (
        <div className="container mx-auto px-4">
            <div className="flex flex-col h-[720px]">
                <div className="flex-1 overflow-y-auto w-11/12 m-auto">
                    {messages.map((msg, index) => (
                        <div key={index}>
                            {msg.question && (
                                <div className="my-2 text-right">
                                    <div className='inline-block bg-[#D9D9D9] p-4 rounded-2xl'>{msg.question}</div>
                                </div>
                            )}
                            {msg.answer && (
                                <div className="flex items-start mb-10">
                                    <img
                                        src="/human_1.png" // Replace with the actual path to the profile picture
                                        className="w-14 h-16 rounded-full"
                                        alt="Profile"
                                    />
                                    <div className="text-left rounded-2xl">
                                        <div id='answer' className='inline-block bg-[#D9D9D9] p-4 rounded-2xl'>{msg.answer}</div>
                            
                                    </div>

                                </div>
                            )}
                        </div>
                    
                    ))}

                <div>
                    {loader&&<img className='mx-20' width = "40" src = '/loader.gif'>
                    </img>}
                </div>
                </div>
                <form onSubmit={sendMessage}>
                <div className="flex space-around items-center m-auto w-full md:w-11/12">
                    
                    <input
                        type="text"
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        className=" w-11/12 px-4 py-2 rounded-full border"
                        placeholder="Type your message..."
                    />
                    <button
                        type = "submit"
                        onClick={sendMessage}
                        className="ml-4 px-4 py-2 bg-[#56B21D] text-white rounded-full"
                    >
                        Send
                    </button>

                    
                    
                </div>

                </form>
                
            </div>
        </div>
    );
};

export default ChatApp;
