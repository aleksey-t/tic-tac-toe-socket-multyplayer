import React from "react";

const Cell = ({ handleClick, value}) => {
    return <div onClick={handleClick} className="cell">{value}</div>
}
export default Cell;
