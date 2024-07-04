'use client';
declare const window: any;
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import microphone from "../public/microphone.svg";
import microphone_listen from "../public/microphone_listen.svg";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import './cursor.css';

const RealTimeSpeechToText: React.FC = () => {
  const [transcript, setTranscript] = useState<string>('');
  const [recognition, setRecognition] = useState<any>(null);

  const startRecognition = () => {
    console.log("start");
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    setRecognition(new SpeechRecognition());
  };

  const stopRecognition = () => {
    if (recognition) {
      console.log("stopped");
      recognition.stop();
      setRecognition(null);
    }
  };

  useEffect(() => {
    if (recognition) {
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onresult = (event: any) => {
        let interimTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          if (event.results[i].isFinal) {
            setTranscript(event.results[i][0].transcript);
          } else {
            interimTranscript += event.results[i][0].transcript;
            setTranscript(interimTranscript);
          }
        }
      };

      recognition.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        recognition.stop();
        setRecognition(null);
      };

      recognition.start();
    }
  }, [recognition]);

  return (
    <div>
      <AlertDialog>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Listening...</AlertDialogTitle>
            <div className='flex w-full' style={{justifyContent:'space-between'}}>
              <AlertDialogDescription className='text-xl w-9/12'>
                {transcript} <span className="blinking-cursor">|</span>
              </AlertDialogDescription>
              <div className='w-3/12 right'>
                <Image src={microphone_listen} alt='send' className='w-full right'/>
              </div>
            </div>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => { stopRecognition() }}>Close</AlertDialogCancel>
            <AlertDialogAction onClick={() => { stopRecognition() }}>Done</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
        <AlertDialogTrigger onClick={() => { startRecognition() }} className="px-3 py-2 bg-[#323557] text-white w-12">
          <Image src={microphone} alt='send' />
        </AlertDialogTrigger>
      </AlertDialog>
    </div>
  );
};

export default RealTimeSpeechToText;
