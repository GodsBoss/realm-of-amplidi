import { State } from './state'
import { Game } from './template'

export function initialState(game: Game): State {
  return {
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
