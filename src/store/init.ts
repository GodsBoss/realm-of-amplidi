import { State as GameState, freshState } from './game/core'

export function create(game: Game): (state: State, action: any) => State {
  return function(state: State, action: any) {
    if (state === undefined) {
      return initialState(game)
    }
    return state
  }
}

export interface Game {
  deposits: GameDeposit[]
  resources: GameResources[]
}

export interface State {
  game: GameState
}

function initialState(game: Game): State {
  const gameState = freshState()
  gameState.resources = game.resources.map(
    (r) => (
      {
        id: r.id,
        name: r.name,
        amount: r.initialAmount,
        spent: 0,
        visible: true // TODO: Implement visibility
      }
    )
  )
  gameState.deposits = game.deposits.map(
    (d) => (
      {
        id: d.id,
        name: d.name,
        amount: d.initialAmount,
        harvested: 0
      }
    )
  )
  return {
    game: gameState
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
