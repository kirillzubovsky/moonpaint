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

    const currentClass = `${classes[currentIndex]} transition-color text-7xl font-bold text-black-600 Source-Sherif`;

    return (
        <h1 className={currentClass}>
            {text}
        </h1>
    );
};

export default RainbowText;