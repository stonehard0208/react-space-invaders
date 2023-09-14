// User.jsx
import React from "react";

function User({ position }) {
    return (
        <div style={{ position: 'absolute', left: `${position.x}px`, top: `${position.y}px`, width:'20px', height:'20px', backgroundColor:'blue' }}>
           
        </div>
    );
}

export default User;