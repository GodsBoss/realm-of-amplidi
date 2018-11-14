import { State as GameState } from './game/core'

export function create(game: Game): (state: State, action: any) => State {
  return function(state: State, action: any) {
    if (state === undefined) {
      return initialState(game)
    }
    return state
  }
}

export interface Game {
  buildings: GameBuilding[]
  deposits: GameDeposit[]
  resources: GameResources[]
  units: GameUnit[]
}

export interface State {
  game: GameState
}

function initialState(game: Game): State {
  return {
    game: {
      turn: 1,
      buildings: game.buildings.map(
        (b) => (
          {
            id: b.id,
            name: b.name,
            level: b.initialLevel,
            visible: true // TODO: Implement visibility
          }
        )
      ),
      deposits: game.deposits.map(
        (d) => (
          {
            id: d.id,
            name: d.name,
            amount: d.initialAmount,
            harvested: 0
          }
        )
      ),
      resources: game.resources.map(
        (r) => (
          {
            id: r.id,
            name: r.name,
            amount: r.initialAmount,
            spent: 0,
            visible: true // TODO: Implement visibility
          }
        )
      ),
      units: game.units.map(
        (u) => (
          {
            id: u.id,
            name: u.name,
            amount: u.initialAmount,
            lost: 0,
            visible: true, // TODO: Implement visibility
            reservoir: {
              current: u.initialReservoir,
              wasted: 0
            }
          }
        )
      )
    }
  }
}

interface GameDeposit {
  id: string
  name: string
  initialAmount: number
}

interface GameResources {
  id: string
  name: string
  initialAmount: number
}

interface GameBuilding {
  id: string
  name: string
  initialLevel: number
}

interface GameUnit {
  id: string
  name: string
  initialAmount: number
  initialReservoir: number
}
