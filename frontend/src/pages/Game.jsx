import Cell from "../components/Cell";
import { useState } from "react";
import Header from "../components/Header";

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function App() {
  const [turn, setTurn] = useState("x");
  const [winner, setWinner] = useState();
  const [board, setBoard] = useState(Array(9).fill(null));

  const handleClick = (value) => {
    if (winner) {
      return;
    }

    if (board[value]) {
      return;
    }

    const nextBoard = [...board];
    nextBoard[value] = turn;
    setBoard(nextBoard);
    const whoIsWinner = calculateWinner(nextBoard);

    if (whoIsWinner) {
      setWinner(whoIsWinner);

      return;
    }

    setTurn(turn === "x" ? "o" : "x");
  };

  const calculateWinner = (currentBoardState) => {
    for (let i = 0; i < winningCombinations.length; i++) {
      const [a, b, c] = winningCombinations[i];

      if (
        currentBoardState[a] &&
        currentBoardState[a] === currentBoardState[b] &&
        currentBoardState[a] === currentBoardState[c]
      ) {
        return currentBoardState[a];
      }
    }

    return null;
  };

  return (
    <>
      <div className="app">
        <div className="board">
          {board.map((value, index) => (
            <Cell
              key={index}
              handleClick={() => handleClick(index)}
              value={value}
            />
          ))}
        </div>
        {winner && (
          <div className="message">
            <div>Победитель: {winner}</div>
            <div>
              <button>Играть еще</button>
            </div>
            <div className="nav">
              <a href="/">Выход</a>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
