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
    const [loader, setloader] = useState<boolean>(false)
    const [disabled, setDisabled] = useState<boolean>(false)
    const [opacity, setOpacity] = useState<string>('')

    const sendMessage = async (e: any) => {
        e.preventDefault()
        setDisabled(true)
        if (inputText.trim() !== '') {
            const newMessage: Message = { question: inputText, answer: '' };
            setMessages([...messages, newMessage]);
            setOpacity('opacity-0')
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
                                    data.prompt_response == '' ? 'I am not able to understand what you mean, please try reframing your question.' : data.prompt_response
                            }
                            : msg
                    )
                );
                setloader(false)
                setDisabled(false)
                console.log(disabled)

            } catch (err) {
                console.log(err)
            }

            // Simulate server response (replace with actual server request)


        }
    };
    return (
        <div>
            <div className="absolute inset-0 flex justify-center items-center z-[-10]">
                <div className={`flex ${opacity} items-center`}>
                    <img src="/human_2.png" alt="Medibot Logo" className="w-28 md:w-52" />
                    <div className="text-5xl md:text-8xl text-[#A49B9B]">Huego</div>
                </div>
            </div>
            <div className="container mx-auto px-4">
                <div className="flex flex-col h-[720px]">
                    {messages.length != 0 && <div className='flex justify-center text-xl mb-8 mt-4'><span className='bg-black text-white text-xl p-4 rounded-full font-serif'>Huego.ai</span></div>}
                    <div className="flex-1 overflow-y-auto m-auto w-full md:w-8/12">
                        {messages.map((msg, index) => (
                            <div key={index}>
                                {msg.question && (
                                    <div className="my-10 text-right">
                                        <div className='inline-block bg-[#D9D9D9] p-4 rounded-2xl'>{msg.question}</div>
                                    </div>
                                )}
                                {msg.answer && (
                                    <div className="flex items-start mb-10">
                                        <img
                                            src="/human_2.png" // Replace with the actual path to the profile picture
                                            className="w-8 m-2 rounded-full"
                                            style={{ transform: "scaleX(-1)" }}
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
                            {loader && <img className='mx-20' width="40" src='/loader.gif'>
                            </img>}
                        </div>
                    </div>
                    <form onSubmit={sendMessage}>
                        <div className="flex space-around items-center m-auto w-full md:w-8/12">

                            <input
                                type="text"
                                value={inputText}
                                onChange={(e) => setInputText(e.target.value)}
                                className=" w-11/12 px-4 py-2 rounded-full border"
                                placeholder="Type your message..."
                                disabled={disabled}
                            />
                            <button
                                type="submit"
                                onClick={sendMessage}
                                className="ml-4 px-4 py-2 bg-[#323557] text-white rounded-full"
                                disabled={disabled}
                            >
                                Send
                            </button>



                        </div>

                    </form>

                </div>
            </div>
        </div>

    );
};

export default ChatApp;
