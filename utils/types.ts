
type SolutionChar = {
  value: string;
  state: 'perfect' | 'misplaced' | 'wrong' | 'ready';
}

type AppState = {
  index: number;
  solution: SolutionChar[][]
}