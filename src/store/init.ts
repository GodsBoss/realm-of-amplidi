import { State as GameState } from './game/state'
import { initialState as initialGameState } from './game/init'
import { Game } from './game/template'

export function create(game: Game): (state: State, action: any) => State {
  return function(state: State, action: any) {
    if (state === undefined) {
      return initialState(game)
    }
    return state
  }
}

function initialState(game: Game): State {
  return {
    game: initialGameState(game)
  }
}

export interface State {
  game: GameState
}
