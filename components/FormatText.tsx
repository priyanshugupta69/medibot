import React, { useEffect, useState } from 'react';
import styles from './FormattedData.module.css';

interface FormattedDataProps {
    data: string;
}


const FormattedData: React.FC<FormattedDataProps> = ({ data }) => {

    const formatLine = (line: string): JSX.Element => {
        const words = line.split(' ');
        const boldIndexes: number[] = [];

        // Iterate over the words to find those ending with ':'
        words.forEach((word, index) => {
            if (word.endsWith(':')) {
                let i = index;
                while (i >= 0 && !words[i].endsWith('.') && i !== 0) {
                    boldIndexes.push(i);
                    i--;
                }
                // Include the word ending with ':'
                boldIndexes.push(index);
            }
        });

        return (
            <>
                {words.map((word, index) => (
                    <span key={index} style={{ fontWeight: boldIndexes.includes(index) ? 'bold' : 'normal' }}>
                        {word}{index < words.length - 1 ? ' ' : ''}
                    </span>
                ))}
            </>
        );
    };

    const formatData = (data: string): JSX.Element[] => {
        return data.split('\n').map((line, index) => (
            <li key={index} className='line'>
                {formatLine(line)}
            </li>
        ));
    };

    return (
        <ul className='element'>
            {formatData(data)}
        </ul>
    );
};

export default FormattedData;
