
 export const CHAR_STATES: {[key: string]: SolutionChar["state"]} = {
  PERFECT: 'perfect',
  MISPLACED: 'misplaced',
  WRONG: 'wrong',
  READY: 'ready'
}


 export const ACTION_TYPES = {
  ADD: 'ADD_CHARACTER',
  REMOVE: 'REMOVE_CHARACTER',
  EVAL: 'EVALUATE_RESPONSE',
  NEXT: 'NEXT_INDEX',
  RESET: 'RESET'
}


 export const initialWordleAppState: AppState = {index: 0, solution: [[],[],[],[],[]]}
