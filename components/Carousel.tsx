import React, { useState, useEffect } from "react";
import "./carousel.css";

const Carousel = ({ children }: any) => {
    const [counter, setCounter] = useState(1);
    const [pause, setPause] = useState(false);
    const content = children;

    const handleNext = () => {
        // setCounter(counter == 1 ? 2 : 1);
        if (counter !== content.length) {
            setCounter(counter + 1);
        } else {
            setCounter(1);
        }
    };

    const handlePre = () => {
        if (counter !== 1) {
            setCounter(counter - 1);
        } else {
            setCounter(content.length);
        }
    };

    const handlePage = (page: any) => {
        setCounter(page);
    };

    const handleMouse = () => {
        setPause(!pause);
    };

    useEffect(() => {
        let interval = setInterval(() => {
            if (!pause) {
                handleNext();
            } else {
                clearInterval(interval);
            }
        }, 15000);
        return () => clearInterval(interval);
    });

    return (
        <div className="App">
            <div
                className="slide"
                onMouseEnter={handleMouse}
                onMouseLeave={handleMouse}
            >
                {content.map((item: any, index: number) => (
                    <div
                        className={counter - 1 === index ? "show" : "not-show"}
                        key={index}
                    >
                        {item}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Carousel;
