'use client'
import React, { useState } from 'react';
import axios from 'axios';
import Typewriter from './typewriter';
import Footer from './footer';

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
            setOpacity('hidden');
            try {
                setloader(true)
                const { data } = await axios.get(`https://api.huego.ai/query_data?question=${inputText}`)
                console.log(data.prompt_response)
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
                console.log(disabled)

            } catch (err) {
                console.log(err);
                setMessages(prevMessages =>
                    prevMessages.map((msg, index) =>
                        index === prevMessages.length - 1
                            ? {
                                ...msg,
                                answer:
                                    'Something wrong with the server, maybe the API tokens have expired or any other internal problem!!'
                            }
                            : msg
                    )
                );
            } finally {
                setloader(false)
                setDisabled(false);
                setInputText('');
            }

            // Simulate server response (replace with actual server request)


        }
    };
    return (
        <div>
            <div className={`${opacity} z-[10]`} style={{ position: 'fixed', transform: 'translate(-50%,-50%)', left: '50%', top: '50%' }}>
                <div className='flex items-center justify-start ml-[-10%]'>
                    <img src="/human_2.png" alt="Medibot Logo" className="w-28 md:w-52" />
                    <span><div className="text-5xl md:text-8xl text-[#323557] font-serif">Huego</div></span>
                </div>
            </div>
            <div className="mx-0 px-0">
                <div className="w-full h-full" style={{ width: '100vw', display: 'flex', flex: 'none', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ backgroundColor: '#ffffff' }} className='w-full'>
                        {messages.length != 0 &&
                            <div
                                className='flex-1 text-center py-1 w-full m-auto'
                                style={{ position: 'fixed', backgroundColor: '#ffffff', zIndex: 10 }}>
                                <p className='bg-black text-white text-center m-auto text-xl py-2 px-4 rounded-full font-serif'
                                    style={{ width: 'max-content' }}>
                                    Huego.ai
                                </p>
                            </div>}
                        <div className="flex-1 overflow-y-auto m-auto mt-20 mb-20 lg:w-8/12 w-11/12">
                            {messages.map((msg, index) => (
                                <div key={index} className='mt-3'>
                                    {msg.question && (
                                        <div className="mb-2 text-right">
                                            <div className='inline-block bg-[#D9D9D9] p-4 rounded-2xl'>{msg.question}</div>
                                        </div>
                                    )}
                                    {msg.answer && (
                                        <div className="flex items-start mb-6">
                                            <img
                                                src="/human_2.png" // Replace with the actual path to the profile picture
                                                className="w-8 m-2 ml-0 rounded-full"
                                                style={{ transform: "scaleX(-1)" }}
                                                alt="Profile"
                                            />
                                            <div className="text-left rounded-2xl">
                                                <div id='answer' className='inline-block bg-[#D9D9D9] justify-content p-4 rounded-2xl'>{msg.answer}</div>
                                            </div>

                                        </div>
                                    )}
                                </div>
                            ))}

                            <div>
                                {loader && <img className='mx-20' width="80" src='/search.gif'>
                                </img>}
                            </div>
                        </div>
                    </div>
                    <div className="footer w-full" style={{ position: 'fixed', bottom: 50, backgroundColor: '#ffffff' }}>
                        <form onSubmit={sendMessage} style={{ width: '100vw', display: 'flex', flex: 'none', alignItems: 'center', justifyContent: 'center' }}>
                            <div className='lg:w-8/12 w-11/12 flex'>
                                <input
                                    type="text"
                                    value={inputText}
                                    onChange={(e) => setInputText(e.target.value)}
                                    className="w-11/12 px-4 py-2 rounded-full border"
                                    placeholder="Type your message..."
                                    disabled={disabled}
                                />
                                <button
                                    type="submit"
                                    onClick={sendMessage}
                                    className="px-4 py-2 ml-2 md:ml-6 bg-[#323557] text-white rounded-full"
                                    style={{ float: 'right' }}
                                    disabled={disabled}
                                >
                                    Send
                                </button>
                            </div>
                            <div className='footer h-0 w-full' style={{ position: 'fixed', bottom: 50, backgroundColor: '#ffffff' }}>
                               <Footer/>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default ChatApp;
