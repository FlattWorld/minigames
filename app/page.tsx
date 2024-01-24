'use client'
import { useReducer, useEffect } from "react";
import { gameReducer } from "@/utils/wordleReducer";
import { initialWordleAppState, CHAR_STATES, ACTION_TYPES } from "@/utils/constants";

export default function Home() {
  const [gameState, dispatch] = useReducer<React.Reducer<AppState, any>>(gameReducer, initialWordleAppState)
  
  const keyManager = (e: KeyboardEvent) => {
    e.preventDefault();
    e.stopPropagation();
     if(e.key.match(/^[a-zA-Z]$/g) !== null) dispatch({type: ACTION_TYPES.ADD, char: e.key})
     if(e.key === 'Enter') dispatch({type: ACTION_TYPES.EVAL, comparison: 'perro'})
     if(e.key === 'Backspace') dispatch({type: ACTION_TYPES.REMOVE})
  }

  useEffect(() => {
    window.document.onkeydown = keyManager;
    return () => {
      window.document.onkeydown = null;
    }
  }, []);
  
  return (
    <main className=" flex flex-col items-center relative">
      <div className="max-w-lg w-full">WORDLE</div>
      <section className="max-w-lg w-full relative">
        <ul className="w-full flex flex-wrap">
          {Array.from({ length: 25 }, (_, index) => (
              <div key={'filler'+index} className=" w-1/5 p-1"> <div className="bg-gray-300 h-24"></div></div>
           ))}
          <div className="absolute top-0 left-0 w-full flex flex-col h-full gap-2">
          {gameState.solution.map((list, index) => (
            <li className="w-full h-24" key={JSON.stringify(list)+ index}>
              <ul className="w-full flex flex-wrap">
                {list.map((char,idx) => {
                  return <li className={`w-1/5 h-24 flex justify-center items-center`} 
                    key={JSON.stringify(char) +idx}>
                    <span className={`w-full h-24 mx-1 flex justify-center items-center text-5xl font-bold text-white
                  ${char.state === CHAR_STATES.PERFECT
                    ? 'bg-green-400'
                    : char.state === CHAR_STATES.MISPLACED
                    ? 'bg-yellow-500'
                    : char.state === CHAR_STATES.WRONG ?'bg-gray-300'
                    : 'text-black' }`} >{char.value}</span>
                  </li>
                })}
              </ul>
            </li>
          ))}
          </div>
        </ul>
      </section>
      <div></div>
    </main>
  );
}
