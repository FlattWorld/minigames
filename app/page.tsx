'use client'
import { useReducer, useEffect, useState, useCallback } from "react";
import { gameReducer } from "@/utils/wordleReducer";
import { initialWordleAppState, CHAR_STATES, ACTION_TYPES } from "@/utils/constants";
import VirtualKeyboard from '@/components/VirtualKeyboard'
import words from '@/utils/words.json'
import Modal from "@/components/Modal";
import GameTiles from "@/components/GameTiles";
import { AppState, SolutionChar } from "@/utils/types";
import TopBar from "@/components/TopBar";
import { calculateTimeRemaining } from "@/utils/helper";

export default function Home() {
  const [gameState, dispatch] = useReducer<React.Reducer<AppState, any>>(gameReducer, initialWordleAppState)
  const [targetTime, setTargetTime] = useState<any>(null)
  const [usedWords, setUsedWords] = useState<string[]>([])
  const [currentWord, setCurrentWord] = useState('')
  const [didPlayerWon, setDidPlayerWon] = useState(false)
  const [didPlayerLose, setDidPlayerLose] = useState(false)
  const [isInfo, setIsInfo] = useState(false)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining(targetTime));



  const keyManager = useCallback((e: KeyboardEvent) => {
    if (didPlayerWon) return
    if (e.key.match(/^[a-zA-ZñÑ]$/g) !== null) dispatch({ type: ACTION_TYPES.ADD, char: e.key })
    else if (e.key === 'Enter') dispatch({ type: ACTION_TYPES.EVAL, comparison: currentWord })
    else if (e.key === 'Backspace') dispatch({ type: ACTION_TYPES.REMOVE })
  }, [currentWord, didPlayerWon])

  const startGame = () => {
    const usedWordsLocal = JSON.parse(localStorage?.getItem('usedWords') || "[]")
    const idx = Math.floor(Math.random() * words.length)
    const usedWordList = [...usedWordsLocal, words[idx]]
    setUsedWords(usedWordList)
    setCurrentWord(words[idx])
    localStorage.setItem('usedWords', JSON.stringify(usedWordList))
  }

  useEffect(() => {
    if(!localStorage.getItem('visited')) {
      setIsInfo(true)
      setIsModalVisible(true)
    }
    if (!currentWord && !didPlayerLose && !didPlayerWon) startGame()
    window.document.onkeyup = keyManager;

    return () => {
      window.document.onkeyup = null;
    }
  }, [keyManager]);

  useEffect(() => {
    if ((timeRemaining.minutes === 0 && timeRemaining.seconds === 0) && (didPlayerLose || didPlayerWon)) {
      dispatch({ type: ACTION_TYPES.RESET })
      setIsModalVisible(false)
      setDidPlayerLose(false)
      setDidPlayerWon(false)
      setTargetTime(null)
      startGame()
    }
  }, [timeRemaining])


  useEffect(() => {
    if (gameState.index > 0) {
      const didPlayerWon = gameState.solution[gameState.index - 1].every((char) => char.state === CHAR_STATES.PERFECT)
      if (didPlayerWon) {
        const pastVictories = Number(localStorage.getItem('victories') || 0)
        localStorage.setItem('victories', JSON.stringify(pastVictories + 1))
        setTargetTime(new Date(new Date().getTime() + 5 * 60000))
        setDidPlayerWon(true)
        setIsModalVisible(true)
      } else if (gameState.index > 4) {
        setTargetTime(new Date(new Date().getTime() + 5 * 60000))
        setDidPlayerLose(true)
        setIsModalVisible(true)
      }
    }
  }, [gameState.index])

  useEffect(() => {
    if (targetTime) {
      const intervalId = setInterval(() => {
        setTimeRemaining(calculateTimeRemaining(targetTime));
      }, 1000);
      return () => clearInterval(intervalId);
    }

  }, [targetTime])



  return (
    <main className=" flex flex-col items-center relative w-full bg-stone-100 dark:bg-[#262B3C] dark:text-white">
      <TopBar setIsInfo={setIsInfo} setIsModalVisible={setIsModalVisible} />
      <section className="max-w-lg w-full relative">
        <ul className="w-full flex flex-wrap">
          {Array.from({ length: 25 }, (_, index) => (
            <div key={'filler' + index} className=" w-1/5 p-1"> <div className=" bg-[#939B9F] bg-opacity-25 h-24 rounded"></div></div>
          ))}
          <div className="absolute top-0 left-0 w-full flex flex-col h-full gap-2">
            {gameState.solution.map((list:SolutionChar[], index) => (
              <li className="w-full h-24" key={JSON.stringify(list) + index}>
                <ul className="w-full flex flex-wrap">
                  <GameTiles list={list} />
                </ul>
              </li>
            ))}
          </div>
        </ul>
      </section>
      <VirtualKeyboard onClickChar={keyManager} />
      {isModalVisible && <Modal
        info={isInfo}
        timeRemaining={timeRemaining}
        onClose={() => {
          localStorage.setItem('visited', 'true')
          setIsModalVisible(false)
          setIsInfo(false);
        }}
        title={didPlayerWon ? 'Felicidades!' : 'Estadísticas'}
        played={usedWords.length}
        word={didPlayerLose ? currentWord : undefined} />}
    </main>
  );
}
