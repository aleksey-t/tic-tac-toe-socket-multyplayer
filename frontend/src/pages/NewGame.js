import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import user from "../images/user.png";
import pc from "../images/pc.png";

function NewGame() {
  const navigate = useNavigate();
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

  useEffect(() => {
    if (gameId) {
      navigate(`/game/${gameId}`);
    }
  }, [gameId, navigate]);

  return (
    <>
      <Header />
      <div className="app">
        <h2>Создать новую игру</h2>
        <div className="line-wrapper">
          <button onClick={startNewGame}>
            <img src={user} alt="user" height="24px"  />
            Играть с другом
          </button>
        </div>
        <div>
          <button onClick={startNewGame}>
            <img src={pc} alt="user" height="24px" />
            Играть с компьютером
          </button>
        </div>
      </div>
    </>
  );
}

export default NewGame;
