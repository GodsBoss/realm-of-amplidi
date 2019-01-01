import { Action } from './action'
import { Game, DepositAmounts, ResourceAmounts, ProcessingAmounts, DepositID } from './template'
import { State, DepositMap, ResourceMap, mapDeposits, mapResources } from './state'
import { find } from '../../util'

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
  const harvest = withProcessedDeposits(game)
  return (state: State, action: NextTurnAction): State => {
    return harvest(plusResources(plusDeposits(increaseTurn(state))))
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
        harvested: map[id].harvested,
        processing: map[id].processing
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

const withProcessedDeposits = (game: Game) => (state: State): State => {
  // TODO: This massive function should be broken!

  // deposits is a copy of state.deposits.
  const deposits = mapDeposits(state.deposits)

  // resources is a copy of state.resources.
  const resources = mapResources(state.resources)

  // processing are the combined processing amounts of all benefits the player
  // gets via buildings.
  // TODO: Gathering and flattening benefits seems to reoccur, move elsewhere.
  const processing = game.buildings.map(
    (building) => building.levels.filter(
      (level, index) => index < state.buildings[building.id].level
    ).map(
      (level) => level.benefits.filter(
        (benefit) => benefit.type === 'processing'
      ).map(
        (benefit) => <ProcessingAmounts>benefit.amounts
      )
    ).reduce(flatten, [])
  ).reduce(flatten, []).reduce(
    (previous: ProcessingAmounts, current: ProcessingAmounts) => {
      Object.keys(current).forEach(
        (id) => {
          if (typeof previous[id] !== 'number') {
            previous[id] = 0
          }
          previous[id] += current[id]
        }
      )
      return previous
    },
    {}
  )

  // depositIDsByProcessing contains a mapping from process IDs to deposit IDs.
  // It contains only:
  // - Deposit IDs for deposits with an amount > 0
  // - Processing IDs for which there is processing.
  // - Processing IDs for which there is at least one deposit to process.
  const depositIDsByProcessing: {
    [id: string]: DepositID[]
  } = {}

  game.deposits.filter(
    (deposit) => state.deposits[deposit.id].amount > 0
  ).forEach(
    (deposit) => {
      deposit.processedBy.forEach(
        (processID) => {
          if (typeof processing[processID] !== 'number' ) {
            return
          }
          if (depositIDsByProcessing[processID] === undefined) {
            depositIDsByProcessing[processID] = []
          }
          depositIDsByProcessing[processID].push(deposit.id)
        }
      )
    }
  )

  // Add the processing amount to every deposit.
  Object.keys(depositIDsByProcessing).forEach(
    (processingID) => {
      const processingPerDeposit = processing[processingID] / depositIDsByProcessing[processingID].length
      depositIDsByProcessing[processingID].forEach(
        (depositID) => {
          deposits[depositID].processing += processingPerDeposit
        }
      )
    }
  )

  // Now take the deposits and apply processing to them.
  Object.keys(deposits).forEach(
    (depositID) => {
      const harvest = Math.floor(Math.min(deposits[depositID].amount, deposits[depositID].processing))
      deposits[depositID].processing -= harvest
      deposits[depositID].amount -= harvest
      deposits[depositID].harvested += harvest
      resources[find(game.deposits, (deposit) => deposit.id === depositID).resourceID].amount += harvest
    }
  )

  return {
    turn: state.turn,
    buildings: state.buildings,
    deposits: deposits,
    resources: resources
  }
}
