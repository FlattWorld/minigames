import { SolutionChar } from '@/utils/types'
import { CHAR_STATES } from '@/utils/constants'

const GameTiles = ({list, className}:{list: SolutionChar[]; className?:string}) => list.map((char, idx) => (
  <li className={`w-1/5 h-24 flex justify-center items-center`}
      key={JSON.stringify(char) + idx}>
      <span className={`${className} bg-opacity-80 w-full h-24 mx-1 mt-1 flex justify-center items-center text-5xl text-black font-bold dark:text-white rounded
  ${char.state === CHAR_STATES.PERFECT
          ? 'bg-green-500'
          : char.state === CHAR_STATES.MISPLACED
            ? 'bg-yellow-500'
            : char.state === CHAR_STATES.WRONG ? 'bg-gray-400'
              : ''}`} >{char.value}</span>
    </li>)
  )

  export default GameTiles