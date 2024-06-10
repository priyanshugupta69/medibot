'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Typewriter from './typewriter';
import Footer from './footer';
import { getRandomElements } from './elements/random';

interface Message {
    question: string;
    answer: string;
}

const ChatApp: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputText, setInputText] = useState<string>('');
    const [loader, setloader] = useState<boolean>(false)
    const [disabled, setDisabled] = useState<boolean>(false)
    const [opacity, setOpacity] = useState<string>('');
    const [suggestions, setSuggestions] = useState<any>([]);
    const [revealed, setRevealed] = useState(false);
    const [suggestUse, setSuggestionUse] = useState(true);
    useEffect(() => {
        // Simulate reveal on page load after a delay
        const timer = setTimeout(() => {
            setRevealed(true);
        }, 0);

        return () => clearTimeout(timer);
    }, []);


    useEffect(() => {
        const screenWidth = window.screen.width;
        var numberOfSuggestions = 3;
        if (screenWidth < 467) {
            numberOfSuggestions = 2;
        }
        setSuggestions(getRandomElements(numberOfSuggestions));
    }, []);

    useEffect(() => {
        if (!suggestUse) {
            sendMessage();
            setSuggestionUse(true);
        }
    }, [inputText]);
    const runSuggestion = async (suggestion: any) => {
        setInputText(suggestion);
        setSuggestionUse(false);
        // sendMessage();
    }
    const sendMessage = async () => {
        // e.preventDefault();
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
        }
        setloader(false)
        setDisabled(false);
        setInputText('');
    };
    return (
        <div>
            <div className={`${opacity} w-full`} style={{ position: 'fixed', transform: 'translate(-50%,-50%)', left: '50%', top: '40%' }}>
                <div className='flex items-center justify-start ml-[-10%]' style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <img src="/human_2.png" alt="Medibot Logo" className="w-28 md:w-52" />
                <div className="flex flex-col space-y-6"><div className='text-5xl md:text-8xl text-[#323557] font-serif'>Huego</div>
                    <div className='flex justify-center bg-[#a1e4ec] text-xs p-1 font-semibold rounded-lg font-serif md:text-sm'>Optimistic Humanism in Health </div>
                </div>
                </div>
                <div className='absolute text-center w-full'>
                    {/* <p className={`text-[#323557] reveal-text ${revealed ? 'revealed' : ''}`}>
                        I am a knowledge agent made to help you with medical questions you have !
                    </p> */}
                    <div className={`flex w-full mt-2 reveal-text ${revealed ? 'revealed' : ''}`} style={{ cursor: 'pointer', alignItems: 'center', justifyContent: 'center' }}>
                        {suggestions.map((suggestion: any, index: number) => {
                            return (<div key={index} className='text-[#323557] text-left text-sm my-2 mx-4 p-4 rounded-2xl w-3/12 lg:w-1/12' style={{ border: '1px solid #B1D4E0' }} onClick={() => { runSuggestion(suggestion) }}>
                                {suggestion}
                            </div>)
                        })}
                    </div>
                    <form onSubmit={sendMessage} className="mt-4 w-full flex items-center justify-center">
                                <div className="lg:w-8/12 w-11/12 flex border border-[#028391] rounded-full overflow-hidden">
                                    <input
                                        type="text"
                                        value={inputText}
                                        onChange={(e) => setInputText(e.target.value)}
                                        className="w-full px-4 py-2 outline-none"
                                        placeholder="Ask Huego..."
                                        disabled={disabled}
                                    />
                                    <button
                                        type="submit"
                                        onClick={sendMessage}
                                        className="px-4 py-2 bg-[#323557] text-white w-12"
                                        disabled={disabled}
                                    >
                                        <img src='/send.svg'></img>
                                    </button>
                                </div>
                            </form>
                    
                </div>
            </div>
            <div className="mx-0 px-0">
                <div className="w-full h-full" style={{ width: '100vw', display: 'flex', flex: 'none', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ backgroundColor: '#ffffff' }} className='w-full'>
                        <div className="flex-1 overflow-y-auto m-auto mt-20 mb-20 lg:w-8/12 w-11/12">
                            {messages.map((msg, index) => (
                                <div key={index} className='mt-3'>
                                    {msg.question && (
                                        <div className="mb-2 text-right">
                                            <div className='inline-block bg-[#D9D9D9] p-4 rounded-2xl'>{msg.question}</div>
                                        </div>
                                    )}
                                    {msg.answer && (
                                        <div className="flex items-start mb-10">
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

                    <div className="w-full fixed bottom-0 bg-white">
                        <div className={`w-full bg-white mb-10 ${messages.length === 0 ?'hidden': ''}`}>
                            <form onSubmit={sendMessage} className="mt-4 w-full flex items-center justify-center">
                                <div className="lg:w-8/12 w-11/12 flex border border-[#028391] rounded-full overflow-hidden">
                                    <input
                                        type="text"
                                        value={inputText}
                                        onChange={(e) => setInputText(e.target.value)}
                                        className="w-full px-4 py-2 outline-none"
                                        placeholder="Ask Huego..."
                                        disabled={disabled}
                                    />
                                    <button
                                        type="submit"
                                        onClick={sendMessage}
                                        className="px-4 py-2 bg-[#323557] text-white w-12"
                                        disabled={disabled}
                                    >
                                        <img src='/send.svg'></img>
                                    </button>
                                </div>
                            </form>
                        </div>
                        <div className="w-full bg-white">
                            <Footer />
                        </div>
                    </div>


                </div>
            </div>
        </div>

    );
};

export default ChatApp;
