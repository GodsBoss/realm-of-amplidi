import { find } from '../../util'
import { State, BuildingMap } from './state'
import { Game } from './template'

export const withBuildingAvailabilities = (game: Game) => (state: State): State => {
  const buildings: BuildingMap = {}

  Object.keys(state.buildings).forEach(
    (id) => {
      let available = true
      if (state.buildings[id].level >= find(game.buildings, (building) => building.id === id).levels.length) {
        available = false
      }
      buildings[id] = {
        id: id,
        level: state.buildings[id].level,
        visible: state.buildings[id].visible,
        available: available
      }
    }
  )

  return {
    turn: state.turn,
    deposits: state.deposits,
    resources: state.resources,
    buildings: buildings
  }
}
