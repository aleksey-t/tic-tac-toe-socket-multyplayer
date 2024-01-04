import Cell from "../components/Cell";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import { Link, useParams } from "react-router-dom";

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
  const [gameLink, setGameLink] = useState();
  const [winner, setWinner] = useState();
  const [board, setBoard] = useState(Array(9).fill(null));
  const { gameId } = useParams();
  const [messageStyles, setMessageStyles] = useState("message hide");

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

  const copyLink = ()=> {
    console.log('gameLink',gameLink)
    navigator.clipboard.writeText(gameLink).then((clipText) => {
      console.log("clipText", clipText);
    });
  }

  useEffect(() => {
    setMessageStyles(winner ? "message" : "message hide");
  }, [winner]);

  useEffect(() => {
    setGameLink(window.location.host + `/game/${gameId}`);
  }, [gameId]);

  return (
    <>
      <Header />
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
          <div className={messageStyles}>
            <div>Победитель: {winner}</div>
            <div>
              <button>Играть еще</button>
            </div>
            <div className="nav">
              <a href="/">На главную страницу</a>
            </div>
          </div>
        )}

        {gameId && (
          <div className="game-link-wrapper">
            <div>Ссылка на игру:</div>
            <div className="link-wrapper">
              {
                <>
                  <div className="link">{gameLink}</div>
                  <div>
                    <button onClick={copyLink}>Копировать</button>
                  </div>
                </>
              }
            </div>
            <div>Скопируйте ее и отправьте тому, с кем хотите поиграть.</div>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
