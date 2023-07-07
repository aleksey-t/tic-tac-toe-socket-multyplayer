import React from "react";

const Cell = ({children, handleClick}) => {
    return <div onClick={handleClick} className="cell">{children}</div>
}
export default Cell;
