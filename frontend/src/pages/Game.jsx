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

const initialState = Array(9).fill(null);

let socket = new WebSocket("ws://localhost:8081");

function App() {
  const [turn, setTurn] = useState("x");
  const [gameLink, setGameLink] = useState("");
  const [winner, setWinner] = useState();
  const [board, setBoard] = useState([...initialState]);
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

  const copyLink = () => {
    const elem = document.querySelector("#game-link");
    elem.select();
    document.execCommand("copy");
  };

  useEffect(() => {
    setMessageStyles(winner ? "message" : "message hide");
  }, [winner]);

  useEffect(() => {
    if (!gameId) {
      return;
    }

    setGameLink(window.location.host + `/game/${gameId}`);
  }, [gameId]);

  useEffect(() => {
    if (!socket) {
      return;
    }

    socket.onopen = function () {
      console.log("Соединение установлено");
    };

    socket.onclose = function (event) {
      if (event.wasClean) {
        console.log("Соединение закрыто чисто");
      } else {
        console.log("Обрыв соединения");
      }
      console.log("Код: " + event.code + " причина: " + event.reason);
    };

    socket.onmessage = function (event) {
      console.log("Получены данные " + event.data);
      const { type, data } = JSON.parse(event.data);

      if (type === "board") {
        if (JSON.stringify(data.board) !== JSON.stringify(board)) {
          setBoard(data.board);
          setTurn(data.turn);
          setWinner(data.winner);
        }
      }
    };

    socket.onerror = function (error) {
      console.log("Ошибка " + error.message);
    };
  }, [board]);

  useEffect(() => {
    if(socket.readyState === 1){
      socket.send(
          JSON.stringify({
            type: "board",
            data: {
              board,
              turn,
              winner,
            },
          })
      );
    }
  }, [board]);

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
            <h2>Победитель: {winner}</h2>
            <div>
              <button
                onClick={() => {
                  setBoard([...initialState]);
                  setWinner(null);
                  setMessageStyles("message hide");
                }}
              >
                Играть еще
              </button>
            </div>
            или
            <div>
              <Link to="/" className="link">
                Создать новую игру
              </Link>
            </div>
          </div>
        )}

        {gameId && (
          <div className="game-link-wrapper">
            <div className="link-wrapper">
              {
                <>
                  <div>Ссылка на игру:</div>
                  <input type="text" id="game-link" readOnly value={gameLink} />
                  <div>
                    <button onClick={copyLink}>Копировать</button>
                  </div>
                </>
              }
              <div>Скопируйте ее и отправьте тому, с кем хотите поиграть.</div>
            </div>
          </div>
        )}

        {!winner && (
          <div className="link-wrapper">
            <Link to="/" className="link">
              Создать новую игру
            </Link>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
