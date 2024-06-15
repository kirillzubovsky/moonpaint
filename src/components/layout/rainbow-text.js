"use client";
import React, { useState, useEffect } from 'react';

const RainbowText = ({ text, classes, delay }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((currentIndex) => (currentIndex + 1) % classes.length);
        }, delay);

        return () => clearInterval(timer);
    }, [classes.length, delay]);

    const currentClass = `${classes[currentIndex]} transition-color`;

    return (
        <div className={currentClass}>
            {text}
        </div>
    );
};

export default RainbowText;