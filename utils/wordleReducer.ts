import { CHAR_STATES, ACTION_TYPES, initialWordleAppState } from "./constants";
import { AppState } from "./types";

const addChar = (state: AppState, char: string) => {
  const { index, solution } = state;
  const updatedSolution = solution.map((el, idx) => {
    if (index !== idx) return el;
    else {
      const newEl = [...el];
      newEl.push({ value: char, state: CHAR_STATES.READY });
      return newEl;
    }
  });
  return updatedSolution;
};

const removeChar = (state: AppState) => {
  const { index, solution } = state;
  const updatedSolution = solution.map((el, idx) => {
    if (index !== idx) return el;
    else {
      const newEl = [...el];
      newEl.pop();
      return newEl;
    }
  });
  return updatedSolution;
};

const evaluate = (state: AppState, comparison: string) => {
  const normalizedComp = comparison.toUpperCase();

  const solutionRow = state.solution[state.index];
  const evaluatedSolution = solutionRow.map((char, index) => {
    if (char.value === normalizedComp[index]) {
      return { ...char, state: CHAR_STATES.PERFECT };
    } else if (normalizedComp.includes(char.value)) {
      return { ...char, state: CHAR_STATES.MISPLACED };
    } else {
      return { ...char, state: CHAR_STATES.WRONG };
    }
  });
  return state.solution.map((sol, idx) =>
    idx === state.index ? evaluatedSolution : sol,
  );
};

export function gameReducer(state: AppState, action: any): AppState {
  if (state.index > 4 && action.type !== ACTION_TYPES.RESET) {
    return { ...state };
  }
  switch (action.type) {
    case ACTION_TYPES.ADD: {
      if (state.solution[state.index].length > 4) return { ...state };
      else {
        const interState = {
          ...state,
          solution: addChar(state, action.char.toUpperCase()),
        };
        if (interState.solution[state.index].length === 5) {
          return {
            ...state,
            solution: evaluate(interState, action.comparison),
            index: state.index + 1,
          };
        } else return interState;
      }
    }
    case ACTION_TYPES.NEXT: {
      return { ...state, index: state.index + 1 };
    }
    case ACTION_TYPES.REMOVE: {
      if (state.solution[state.index].length === 0) return { ...state };
      else {
        return {
          ...state,
          solution: removeChar(state),
        };
      }
    }
    case ACTION_TYPES.EVAL: {
      if (state.solution[state.index].length < 5) return { ...state };
      else {
        return {
          ...state,
          solution: evaluate(state, action.comparison),
          index: state.index + 1,
        };
      }
    }
    case ACTION_TYPES.RESET: {
      return initialWordleAppState;
    }
  }
  console.error("Unknown Action type");
  return { ...state };
}
