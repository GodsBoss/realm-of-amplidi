import { State } from './game/state'
import { initialState } from './game/init'
import { Game } from './game/template'
import { levelBuilding, LevelBuildingAction } from './game/level_building'
import { nextTurn, NextTurnAction } from './game/turn'
import { wrap } from './game/wrap'
import { withXabilities } from './game/xabilities'

export function create(game: Game): (state: State, action: Action) => State {
  const nextTurnFunc = nextTurn(game)
  const levelBuildingFunc = levelBuilding(game)
  const aftermath = wrap(withXabilities(game))
  return function(state: State, action: Action) {
    if (state === undefined) {
      return aftermath(initialState(game))
    }
    switch (action.type) {
      case "@game/next_turn":
        return aftermath(nextTurnFunc(state, action))
      case "@game/level_building":
        return aftermath(levelBuildingFunc(state, action))
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
