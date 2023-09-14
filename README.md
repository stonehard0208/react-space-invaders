# Space invaders
# Control
## Use mouse to control the player block
 ```js
   useEffect(() => {
        const handleMouseMove = (e) => {
            
            const mouseX = e.clientX;
            const mouseY = e.clientY;
            
            setPosition({ x: mouseX, y: mouseY });
        };
    
        window.addEventListener('mousemove', handleMouseMove);
        
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        }
    }, []);
```
## User can also switch to use keyboard to control
```js
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
```
# Invader Generation
```js
 useEffect(() => {
        const generateInvadors = () => {
            const position = Math.random() * 1000;
            const newInvador = { id: Date.now(), left: position, top: 0 };
            setInvadors(prev => [...prev, newInvador]);
        };

        const generateInvadorsInterval = setInterval(generateInvadors, 500);
        return () => { clearInterval(generateInvadorsInterval); }
    }, []);
```
# Invader Movement
```js
 useEffect(() => {

        const moveInvadors = () => {
            if(gameOver){
                return;
            }
            setInvadors(prev => {
                const invadorInScreen = prev.map(invador => ({ ...invador, top: invador.top + stepRef.current }));
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

                    // console.log(userBox, invaderBox);
        
                    if (isColliding(userBox, invaderBox)) {
                        setGameOver(true);
                        return [];  
                    }
                }

                return invadorInScreen.filter(invador => invador.top <= window.innerHeight);
            });
        }

        const moveInterval = setInterval(moveInvadors, generateSpeedRef.current);
        return () => { clearInterval(moveInterval); }
    }, []);
```

# Level Setting
## User select different levels, which will change the generation speed of the invaders
```js
    useEffect(() => {
        switch(level){
            case "easy":
                setStep(20);
                setGenerateSpeed(500);
                break;
            case "medium":
                setStep(50);
                setGenerateSpeed(300);
                break;
            case "hard":   
                setStep(100);
                setGenerateSpeed(100);
                break;
            default:
                setStep(20);
                setGenerateSpeed(500);
                break;
        }
        return () => {};
    }, [level]);
const handleLevelSelect = (level) => {
        setLevel(level);
        setIsLevelVisible(false);
    }

    const LevelSelection = ({ onSelect }) => {
        return (
            <div>
                <button onClick={() => onSelect("easy")}>Easy</button>
                <button onClick={() => onSelect("medium")}>Medium</button>
                <button onClick={() => onSelect("hard")}>Hard</button>
            </div>
        );
    }
```
