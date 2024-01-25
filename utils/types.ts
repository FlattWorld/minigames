
export type SolutionChar = {
  value: string;
  state: 'perfect' | 'misplaced' | 'wrong' | 'ready';
}

export type AppState = {
  index: number;
  solution: SolutionChar[][]
}