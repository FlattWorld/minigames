import { useEffect, useState } from "react";
import GameTiles from "./GameTiles";
import { SolutionChar } from "@/utils/types";

const examples: SolutionChar[][] = [
  [
    { value: "G", state: "perfect" },
    { value: "A", state: "ready" },
    { value: "T", state: "ready" },
    { value: "O", state: "ready" },
    { value: "S", state: "ready" },
  ],
  [
    { value: "V", state: "ready" },
    { value: "O", state: "ready" },
    { value: "C", state: "misplaced" },
    { value: "A", state: "ready" },
    { value: "L", state: "ready" },
  ],
  [
    { value: "C", state: "ready" },
    { value: "A", state: "ready" },
    { value: "N", state: "ready" },
    { value: "T", state: "ready" },
    { value: "O", state: "wrong" },
  ],
];
const Modal = ({
  onClose,
  title,
  word,
  played,
  timeRemaining,
  info,
}: {
  info: boolean;
  onClose: any;
  title: string;
  word?: string;
  played: number;
  timeRemaining: { minutes: number; seconds: number };
}) => {
  const [won, setWon] = useState(0);

  useEffect(() => {
    const localWon = Number(localStorage.getItem("victories") || 0);
    setWon(localWon);
  }, []);

  const InfoModal = () => (
    <>
      <h2 className="text-2xl font-bold">Cómo jugar</h2>
      <p>
        Adivina la palabra oculta en cinco intentos. Cada intento debe ser una
        palabra válida de 5 letras. Después de cada intento el color de las
        letras cambia para mostrar qué tan cerca estás de acertar la palabra.
      </p>
      <span>Ejemplos</span>

      <div className="w-full flex h-24">
        <GameTiles
          className=" border border-black dark:border-white"
          list={examples[0]}
        />
      </div>
      <span>
        La letra <b className="font-bold">G</b> está en la palabra y en la
        posición correcta.
      </span>

      <div className="w-full flex h-24">
        <GameTiles
          className=" border border-black dark:border-white"
          list={examples[1]}
        />
      </div>
      <span>
        La letra <b className="font-bold">C</b> está en la palabra pero en la
        posición incorrecta.
      </span>
      <div className="w-full flex h-24">
        <GameTiles
          className=" border border-black dark:border-white"
          list={examples[2]}
        />
      </div>
      <span>
        La letra <b className="font-bold">O</b> no está en la palabra.
      </span>
      <p>
        Puede haber letras repetidas. Las pistas son independientes para cada
        letra.
      </p>
      <span>¡Una palabra nueva cada 5 minutos!</span>
      <button
        className="px-16 py-2 text-white text-lg font-bold bg-green-500 rounded"
        onClick={onClose}
      >
        ¡Jugar!
      </button>
    </>
  );

  const GameModal = () => (
    <>
      <h2 className="text-2xl font-bold">{title}</h2>
      <div className="flex w-full justify-between">
        <div className="flex flex-col items-center">
          <span className="text-lg font-bold">{played}</span>
          <span>Jugadas</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-lg font-bold">{won}</span>
          <span>Victorias</span>
        </div>
      </div>
      {word && (
        <span>
          La palabra era: <b className="font-bold">{word.toUpperCase()}</b>
        </span>
      )}
      <div className="flex flex-col items-center">
        <span>SIGUIENTE PALABRA</span>
        <span className="font-bold">
          0{timeRemaining.minutes}:
          {timeRemaining.seconds > 9
            ? timeRemaining.seconds
            : "0" + timeRemaining.seconds}
        </span>
      </div>
      <button
        className="px-16 py-2 text-white text-lg font-bold bg-green-500 rounded"
        onClick={onClose}
      >
        Aceptar
      </button>
    </>
  );

  return (
    <div className="fixed top-0 left-0 bottom-0 right-0 flex justify-center items-center bg-white bg-opacity-50 dark:bg-[#262B3C] dark:bg-opacity-50 ">
      <div
        className={`${info ? "text-sm gap-2" : "gap-8"} max-w-md w-full flex flex-col items-center border border-black bg-gray-100 dark:bg-[#262B3C] dark:border dark:border-white rounded-xl p-8`}
      >
        {info ? <InfoModal></InfoModal> : <GameModal></GameModal>}
      </div>
    </div>
  );
};
export default Modal;
