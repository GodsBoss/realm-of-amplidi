export function create(game: Game): (state: State, action: any) => State {
  return function(state: State, action: any) {
    if (state === undefined) {
      return initialState
    }
    return state
  }
}

interface Game {}

export interface State {
  game: GameState
}

interface GameState {
  turn: number
}

const initialState = {
  game: {
    turn: 1
  }
}
