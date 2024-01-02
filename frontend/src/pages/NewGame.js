import { useState } from "react";
import {Link} from "react-router-dom";

function NewGame() {
  const [gameId, setGameId] = useState();
  const startNewGame = async () => {
    try {
      const response = await fetch("http://localhost:8080/new");
      const game = await response.json();
      const { id } = game;

      if (id) {
        setGameId(id);
      }
    } catch (err) {
      if (err) {
        console.log("err", err);
      }
    }
  };

  return (
    <>
      <div>
        <button onClick={startNewGame}>Новая игра</button>

        {gameId && (
          <div>
            Создана новая игра по ссылке {<Link to={`/game/${gameId}`}>{window.location.host + `/game/${gameId}`}</Link>}
          </div>
        )}
      </div>
    </>
  );
}

export default NewGame;
