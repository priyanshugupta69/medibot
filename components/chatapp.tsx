'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Footer from './footer';
import { Roboto } from 'next/font/google';
import { getCookieCustom, setCookieCustom } from '@/lib/cookie';
import Carousel from './Carousel';
import Image from 'next/image';
import Huego from "../public/Huego.png"
import sendSvg from  "../public/send.svg";
import searchGif from "../public/search.gif";

const roboto = Roboto({
    weight: '500',
    subsets: ['latin'],
    display: 'swap',
})
interface Message {
    question: string;
    answer: string;
}

const ChatApp = () => {
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
        const pullSuggestions = async () => {
            const data = await axios.get('https://api.huego.ai/suggestions?count=5')
            setCookieCustom("suggestions", data.data);
            setSuggestions(data.data);
        }
        if (!getCookieCustom("suggestions")) {
            console.log(1);

            pullSuggestions();
        } else {
            console.log(2);

            const suggestion = JSON.parse(getCookieCustom('suggestions') as string);
            setSuggestions(suggestion);
        }
        const timer = setTimeout(() => {
            setRevealed(true);
        }, 0);

        return () => clearTimeout(timer);
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
            <div className={`${opacity} w-full mt-20 lg:mt-40`} style={{}}>
                <div className='flex items-center justify-around' style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <Image src={Huego} alt="Medibot Logo" className="w-[110px]" />
                    <div className="flex flex-col space-y-2">
                        <div className={`text-4xl text-[#323557] font-semibold ${roboto.className}`}>Hi! I&apos;m Huego</div>
                        <div className='flex justify-center text-2xl md:4xl font-serif'>your personal AI-powered health assistant.</div>
                    </div>
                </div>
                <div className='absolute mt-0 text-center w-full'>
                    <div className='w-11/12 lg:w-6/12 m-auto border rounded-2xl' style={{ border: '1px solid #B1D4E0' }}>
                        <Carousel>
                            {suggestions && suggestions.map((suggestion: any, index: number) => {
                                return <div key={index} onClick={() => { runSuggestion(suggestion) }}>
                                    <div>
                                        <div className="text-[#323557] text-[18px]" style={{ cursor: 'pointer', lineHeight:'normal' }}>
                                            {suggestion}
                                        </div>
                                    </div>
                                </div>
                            })}
                        </Carousel>
                    </div>
                    <form onSubmit={sendMessage} className="mt-4 w-full flex items-center justify-center pb-10">
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
                    <div className={`w-full ${messages.length == 0 ? 'hidden' : ''}`}>
                        <div className="flex-1 overflow-y-auto m-auto mt-20 mb-20 lg:w-8/12 w-11/12">
                            {messages.map((msg, index) => (
                                <div key={index} className='mt-3'>
                                    {msg.question && (
                                        <div className="mb-1 text-right">
                                            <div className='inline-block py-2 px-4 border border-[#02839170] rounded-2xl'><p className='text-justify'>{msg.question}</p></div>
                                        </div>
                                    )}
                                    {msg.answer && (
                                        <div className="flex items-start mb-3">
                                            <Image
                                                src={Huego} // Replace with the actual path to the profile picture
                                                className="w-8 m-2 ml-0 rounded-full"
                                                style={{ transform: "scaleX(-1)" }}
                                                alt="Profile"
                                            />
                                            <div className="text-left rounded-2xl">
                                                <div id='answer' className='inline-block justify-content pt-4 p-0 rounded-2xl'><p className='text-justify'>Huego: {msg.answer}</p></div>
                                            </div>

                                        </div>
                                    )}
                                </div>
                            ))}

                            <div>
                                {loader && <Image className='mx-20 w-[80px]' src={searchGif} alt='search'/>
                                }
                            </div>
                        </div>
                    </div>
                    <div className="w-full fixed bottom-0 bg-white">
                        <div className={`w-full bg-white mb-10 ${messages.length === 0 ? 'hidden' : ''}`}>
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
                                        <Image src={sendSvg} alt='send'/>
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


