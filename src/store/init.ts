export function create(game: Game): (state: State, action: Action) => State {
  return function(state: State, action: Action) {
    if (state === undefined) {
      return initialState
    }
    return state
  }
}

interface Action {}

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
