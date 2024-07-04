// components/FormattedData.tsx
import React, { useEffect, useState } from 'react';
// import { formatData } from '../utils/formatData';
import styles from './FormattedData.module.css';

interface FormattedDataProps {
  data: string;
}

const FormattedData: React.FC<FormattedDataProps> = ({ data }) => {
  const [lines, setLines] = useState<string[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState<number>(0);
  const [currentText, setCurrentText] = useState<string>('');

  useEffect(() => {
    const formattedLines = data.split('\n');
    setLines(formattedLines);
  }, [data]);

  useEffect(() => {
    if (currentLineIndex < lines.length) {
      const text = lines[currentLineIndex];
      let index = 0;
      const interval = setInterval(() => {
        setCurrentText((prevText) => prevText + text[index]);
        index++;
        if (index > text.length) {
          clearInterval(interval);
          setTimeout(() => {
            setCurrentText('');
            setCurrentLineIndex((prevIndex) => prevIndex + 1);
          }, 1000);
        }
      }, 100);
      return () => clearInterval(interval);
    }
  }, [currentLineIndex, lines]);

  return (
    <ul className={`${styles.container} element`}>
      {lines.map((line, index) => (
        <li key={index} className='line'>
          {index < currentLineIndex ? (
            <span>{line}</span>
          ) : (
            <span className={styles.typewriterText}>{currentText}</span>
          )}
        </li>
      ))}
    </ul>
  );
};

export default FormattedData;
