import React, { useState, useEffect, useRef } from 'react';
import User from './User';
import Invadors from './Invadors';
import '../Styles/Board.css';

const Board = () => {
    const [position, setPosition] = useState({ x: 500, y: 450 });
    const [invadors, setInvadors] = useState([]);
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const positionRef = useRef(position);

    const step = 20;

    const isColliding = (r1, r2) => {
        return (
            r1.left < r2.left + r2.width &&
            r1.left + r1.width > r2.left &&
            r1.top < r2.top + r2.height &&
            r1.top + r1.height > r2.top
        );
    };

    useEffect(() => {
        positionRef.current = position;
    }, [position]);
    
    

    useEffect(() => {
        const handleKeyPress = (e) => {
            switch(e.key) {
                case 'ArrowLeft':
                    setPosition(prev => ({ x: prev.x - step, y: prev.y }));
                    break;
                case 'ArrowRight':
                    setPosition(prev => ({ x: prev.x + step, y: prev.y }));
                    break;
                case 'ArrowUp':
                    setPosition(prev => ({ x: prev.x, y: prev.y - step }));
                    break;
                case 'ArrowDown':
                    setPosition(prev => ({ x: prev.x, y: prev.y + step }));
                    break;
                default:
                    return;
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        
        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        }
    }, []);

    useEffect(() => {
        const generateInvadors = () => {
            const position = Math.random() * 1000;
            const newInvador = { id: Date.now(), left: position, top: 0 };
            setInvadors(prev => [...prev, newInvador]);
        };

        const generateInvadorsInterval = setInterval(generateInvadors, 500);
        return () => { clearInterval(generateInvadorsInterval); }
    }, []);

    useEffect(() => {

        const moveInvadors = () => {
            if(gameOver){
                return;
            }
            setInvadors(prev => {
                const invadorInScreen = prev.map(invador => ({ ...invador, top: invador.top + 10 }));
                const invadorOutScreen = invadorInScreen.filter(invador => invador.top > window.innerHeight);
                setScore(prev => prev + invadorOutScreen.length);

                const userBox = {
                    left: positionRef.current.x,
                    top: positionRef.current.y,
                    width: 20,  
                    height: 20  
                };
        
                for (let invader of invadorInScreen) {
                    const invaderBox = {
                        left: invader.left,
                        top: invader.top,
                        width: 30,  
                        height: 30 
                    };

                    console.log(userBox, invaderBox);
        
                    if (isColliding(userBox, invaderBox)) {
                        setGameOver(true);
                        return [];  
                    }
                }

                return invadorInScreen.filter(invador => invador.top <= window.innerHeight);
            });
        }

        const moveInterval = setInterval(moveInvadors, 500);
        return () => { clearInterval(moveInterval); }
    }, []);

    return (
        <div className="board">
            <div>Score:{score}</div>
            {!gameOver ? (
            <>
            <User position={position} />
            {invadors.map(invador => <Invadors key={invador.id} left={invador.left} top={invador.top} />)}
            </> )
        
            : (<div>Game Over</div>)}
            
        </div>
    );
};

export default Board;