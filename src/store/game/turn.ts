import { Action } from './action'
import { Game, DepositAmounts, ResourceAmounts } from './template'
import { State, DepositMap, ResourceMap } from './state'

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
  const plusResources = withIncreasedResources(game)
  return (state: State, action: NextTurnAction): State => {
    return plusResources(plusDeposits(increaseTurn(state)))
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

const withIncreasedResources = (game: Game) => (state: State): State => {
  return {
    turn: state.turn,
    buildings: state.buildings,
    deposits: state.deposits,
    resources: addResources(
      state.resources,
      game.buildings.map(
        (building) => building.levels.filter(
          (level, index) => index < state.buildings[building.id].level
        ).map(
          (level) => level.benefits.filter(
            (benefit) => benefit.type === 'resource'
          ).map(
            (benefit) => <ResourceAmounts>benefit.amounts
          )
        ).reduce(flatten, [])
      ).reduce(flatten, [])
    )
  }
}

function addResources(map: ResourceMap, list: ResourceAmounts[]): ResourceMap {
  const result: ResourceMap = {}
  Object.keys(map).forEach(
    (id) => {
      result[id] = {
        id: id,
        amount: map[id].amount,
        spent: map[id].spent,
        visible: map[id].visible
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
