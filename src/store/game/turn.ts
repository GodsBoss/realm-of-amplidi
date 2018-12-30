import { Action } from './action'
import { Game, DepositAmounts } from './template'
import { State, DepositMap } from './state'

export interface NextTurnAction extends Action<"@game/next_turn">{
  payload: null
}

export function createNextTurnAction(): NextTurnAction {
  return {
    type: "@game/next_turn",
    payload: null
  }
}

export function nextTurn(game: Game) {
  const plusDeposits = withIncreasedDeposits(game)
  return (state: State, action: NextTurnAction): State => {
    return plusDeposits(increaseTurn(state))
  }
}

const increaseTurn = (state: State): State => (
  {
    turn: state.turn + 1,
    buildings: state.buildings,
    deposits: state.deposits,
    resources: state.resources
  }
)

const withIncreasedDeposits = (game: Game) => (state: State): State => {
  return {
    turn: state.turn,
    buildings: state.buildings,
    deposits: addDeposits(
      state.deposits,
      game.buildings.map(
        (building) => building.levels.filter(
          (level, index) => index < state.buildings[building.id].level
        ).map(
          (level) => level.benefits.filter(
            (benefit) => benefit.type === 'deposit'
          ).map(
            (benefit) => <DepositAmounts>benefit.amounts
          )
        ).reduce(flatten, [])
      ).reduce(flatten, [])
    ),
    resources: state.resources
  }
}

const flatten = <T>(acc: T[], curr: T[]) => acc.concat(curr)

export function addDeposits(map: DepositMap, list: DepositAmounts[]): DepositMap {
  const result: DepositMap = {}
  Object.keys(map).forEach(
    (id) => {
      result[id] = {
        id: id,
        amount: map[id].amount,
        harvested: map[id].harvested
      }
    }
  )
  list.forEach(
    (d) => {
      Object.keys(d).forEach(
        (id) => {
          result[id].amount += d[id]
        }
      )
    }
  )
  return result
}
