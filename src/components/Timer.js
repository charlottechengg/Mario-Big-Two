/**
 * @file Timer.js
 * @description This file generates a timer for the game.
 * @author Manyi Cheng
 * @version Latest edition on April 10, 2021
 */
import React, { useState, useEffect } from 'react';


/**
 * @function Timer
 * @param {*} props 
 * @returns A timmer that counts down from 10 minutes on the upper right corner of the web page during the game
 */
const Timer = (props) => {
	const { initialMinutes = 0, initialSeconds = 0 } = props;
	const [minutes, setMinutes] = useState(initialMinutes);
	const [seconds, setSeconds] = useState(initialSeconds);

	useEffect(() => {
		let myInterval = setInterval(() => {
			if (seconds > 0) {
				setSeconds(seconds - 1);
			}
			if (seconds === 0) {
				if (minutes === 0) {
					clearInterval(myInterval);
				} else {
					setMinutes(minutes - 1);
					setSeconds(59);
				}
			}
		}, 1000);
		return () => {
			clearInterval(myInterval);
		};
	}, [minutes, seconds]);

    useEffect(() =>{
        if(minutes === 0 && seconds === 0){
            console.log("times up")
            props.onTimer()
        }
    }, [minutes, seconds]);

	return (
		<div className = "timer-container" >
			{minutes === 0 && seconds === 0 ? null: (
				<div>
					{' '}
					{minutes}:{seconds < 10 ? `0${seconds}` : seconds}
				</div>
			)}
		</div>
	);
};

/**
 * @exports Timer
 */
export default Timer;
