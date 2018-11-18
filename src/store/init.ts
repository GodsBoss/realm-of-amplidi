import { State as GameState } from './game/state'
import { initialState as initialGameState } from './game/init'
import { Game } from './game/template'
import { levelBuilding, LevelBuildingAction } from './game/level_building'
import { nextTurn, NextTurnAction } from './game/turn'

export function create(game: Game): (state: State, action: Action) => State {
  const nextTurnFunc = nextTurn(game)
  const levelBuildingFunc = levelBuilding(game)
  return function(state: State, action: Action) {
    if (state === undefined) {
      return initialState(game)
    }
    switch (action.type) {
      case "@game/next_turn":
        return {
          game: nextTurnFunc(state.game, action)
        }
      case "@game/level_building":
        return {
          game: levelBuildingFunc(state.game, action)
        }
      default:
        raiseInvalidAction(action)
    }
    return state
  }
}

function raiseInvalidAction(value: never) {
  throw new Error(`Invalid action type ${value}`)
}

type Action = NextTurnAction | LevelBuildingAction

function initialState(game: Game): State {
  return {
    game: initialGameState(game)
  }
}

export interface State {
  game: GameState
}
