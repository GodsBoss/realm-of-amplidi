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
  return {
    game: gameState
  }
}

interface GameResources {
  id: string
  name: string
  initialAmount: number
}
