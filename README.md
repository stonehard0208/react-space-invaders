# Space invaders
# Control
## Use mouse to control the user
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
