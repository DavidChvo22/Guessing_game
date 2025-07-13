import { useEffect, useState } from "react";

type StartGame = { id: string, distance: number};
type GuessResponse = { 
  feedback: string;
  isCorrect: boolean;
  isOver: boolean;
  distance?: number;
}

export default function useGame() {
  const [guess, setGuess] = useState<number | "">("");
  const [gameId, setGameId] = useState("");
  const [guessResult, setGuessResult] = useState<GuessResponse | null>(null);

  useEffect(() => {
    const savedGameId = localStorage.getItem('gameId');
    if (savedGameId) {
        setGameId(savedGameId)
    }
  }, []);

  async function handleNewGame() {
    try {
      const response = await fetch("http://localhost:3000/game/start");
      if (!response) throw new Error("Failed to start a new game");
      const data: StartGame =  await response.json();
      setGameId(data.id);
      setGuess("");
      localStorage.setItem('gameId', data.id);
    } catch (error) {
      console.error(error);
    }
    setGuessResult(null);
  }

 async function handleGuess(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const guessValue = (form.elements.namedItem("guess") as HTMLInputElement)
      .value;
    const parsed = parseInt(guessValue, 10);
    if (!isNaN(parsed) && parsed >= 0 && parsed <= 100) {
      setGuess(parsed);
    }else{
      alert('The entered number is not valid')
    }
    if(!gameId) return(alert('There is no game started'))
    try {
      const response = await fetch ('http://localhost:3000/game/guess', { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ gameId, guess: parsed}),
      });
      if(!response) throw new Error('Failed to make guess');
      const data: GuessResponse = await response.json();
      setGuessResult(data);
      if (data.isOver) {
        localStorage.removeItem('gameId');
        setGameId('');
      }
    } catch(error) {
      console.error(error);
    }
  }

  return { handleGuess, handleNewGame, guessResult, guess, gameId};
}
