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
