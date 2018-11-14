export function create(game: Game): (state: State, action: any) => State {
  return function(state: State, action: any) {
    if (state === undefined) {
      return initialState(game)
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

function initialState(game: Game): State {
  const state = {
    game: {
      turn: 1
    }
  }
  return state
}
