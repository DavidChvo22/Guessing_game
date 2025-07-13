import { useEffect, useRef, useState } from "react";
import useGame from "./useGame";

export default function Game() {
  const inputRef = useRef<HTMLInputElement>(null);
  const { handleGuess, handleNewGame, guessResult, gameId } = useGame();
  const [bgGradient, setBgGradient] = useState("from-blue-500 to-indigo-500");

  useEffect(() => {
    if (guessResult?.distance !== undefined) {
      if (
        guessResult.distance <= 5 &&
        bgGradient !== "from-red-500 to-yellow-500"
      ) {
        setBgGradient("from-red-500 to-yellow-500");
      } else if (
        guessResult.distance <= 10 &&
        guessResult.distance > 5 &&
        bgGradient !== "from-yellow-500 to-green-500"
      ) {
        setBgGradient("from-yellow-500 to-green-500");
      } else if (
        guessResult.distance > 10 &&
        bgGradient !== "from-blue-500 to-indigo-500"
      ) {
        setBgGradient("from-blue-500 to-indigo-500");
      }
    }
  }, [guessResult?.distance]);

  const handleNewGameAndClear = () => {
    handleNewGame();
    if (inputRef.current) inputRef.current.value = "";
    setBgGradient("from-blue-500 to-indigo-500");
  };

  return (
    <div
      className={`flex h-screen justify-center items-center bg-gradient-to-r 
        ${bgGradient} transition-colors duration-500 relative`}
    >
      {guessResult?.isOver && guessResult?.isCorrect && (
        <p className="mt-4 text-3xl font-bold text-center font-sans text-indigo-100 drop-shadow">
          You guessed correct please start a new game if you want to keep
          playing
        </p>
      )}

      {!guessResult?.isOver && gameId && (
        <form
          onSubmit={handleGuess}
          className="flex flex-col mx-auto items-center"
        >
          <p className="mt-4 text-3xl font-bold text-center font-sans text-indigo-100 drop-shadow">
            {guessResult?.feedback}
          </p>
          <input
            ref={inputRef}
            placeholder="Your guess 1-100"
            name="guess"
            type="number"
            className="text-center bg-gray-100 text-gray-800 rounded px-4 py-2 
          shadow focus:outline-none focus:ring-2 focus:ring-indigo-400"
          ></input>
          <button
            className="mt-4 px-6 py-2 rounded bg-indigo-600 text-white font-semibold shadow-md transition-all duration-300 
        hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            Submit
          </button>
        </form>
      )}

      <button
        onClick={handleNewGameAndClear}
        className="mt-4 px-6 py-2 rounded bg-indigo-600 text-white font-semibold shadow-md transition-all duration-300 
        hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 absolute top-4 left-4"
      >
        Start new game
      </button>
    </div>
  );
}
