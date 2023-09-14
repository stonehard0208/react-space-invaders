import React from "react";
const Invadors = ({ left, top }) => {
    return(
        <div style = {{left:left, top:top, position:"absolute", width:'30px', height:'30px', backgroundColor:'red'}}></div>
    );
};
export default Invadors;