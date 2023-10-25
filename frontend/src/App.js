import "./app.css";
import Cell from "./components/Cell";
import { useState } from "react";
import boardModel from "./presets/boardModel.json";
function App() {

  const [turn, setTurn] = useState("x");
  const [winner, setWinner] = useState("x");
  const [board, setBoard] = useState([...boardModel]);

  const handleClick = (row, column, value) => {
    console.log(row, column, value);
    const nextBoard = [...board];

    if (value) {
      return;
    }

    const isWinner= calculateWinner(nextBoard);
    nextBoard[row][column].value = turn;
    setBoard(nextBoard);

    if(isWinner){
      setWinner(turn);
      return;
    }

    setTurn(turn === "x" ? "o" : "x");
  };

  const calculateWinner=()=>{};

  return (
    <>
      <header>
        <h3>крестики-нолики онлайн</h3>
      </header>

      <div className="app">
        <div className="board">
          {board.map((row) => {
            return row.map(({ row, column, value }) => {
              return (
                <Cell
                  handleClick={() => handleClick(row, column, value)}
                  key={`${row}-${column}`}
                >
                  {value}
                </Cell>
              );
            });
          })}
        </div>
      </div>
    </>
  );
}

export default App;
