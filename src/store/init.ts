import { State as GameState } from './game/state'
import { initialState as initialGameState } from './game/init'
import { Game } from './game/template'
import { nextTurn, NextTurnAction } from './game/turn'

export function create(game: Game): (state: State, action: Action) => State {
  return function(state: State, action: Action) {
    if (state === undefined) {
      return initialState(game)
    }
    switch (action.type) {
      case "@game/next_turn":
        return {
          game: nextTurn(game)(state.game, action)
        }
      default:
        raiseInvalidAction(action.type)
    }
    return state
  }
}

function raiseInvalidAction(type: never): never {
  throw new Error(`Invalid action type ${type}`)
}

type Action = NextTurnAction

function initialState(game: Game): State {
  return {
    game: initialGameState(game)
  }
}

export interface State {
  game: GameState
}
