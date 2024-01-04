import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

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
        <div>
          <button onClick={startNewGame}>Новая игра</button>
        </div>
      </div>
    </>
  );
}

export default NewGame;
