import { Game } from './template'
import { State } from './state'

export interface NextTurnAction {
  type: "@game/next_turn"
  payload: null
}

export function createNextTurnAction(): NextTurnAction {
  return {
    type: "@game/next_turn",
    payload: null
  }
}

export function nextTurn(game: Game) {
  return (state: State, action: NextTurnAction): State => {
    return {
      turn: state.turn + 1,
      buildings: state.buildings,
      deposits: state.deposits,
      resources: state.resources,
      units: state.units
    }
  }
}
