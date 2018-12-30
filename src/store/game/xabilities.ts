import { fullfilled } from './check_requirements'
import { find } from '../../util'
import { State, BuildingMap } from './state'
import { Game } from './template'

export const withBuildingAvailabilities = (game: Game) => (state: State): State => {
  const buildings: BuildingMap = {}

  Object.keys(state.buildings).forEach(
    (id) => {
      let available = true
      const buildingTemplate = find(game.buildings, (building) => building.id === id)
      if (state.buildings[id].level >= buildingTemplate.levels.length) {
        available = false
      }
      if (available) {
        available = fullfilled(buildingTemplate.levels[state.buildings[id].level].available, state)
      }
      buildings[id] = {
        id: id,
        level: state.buildings[id].level,
        visible: fullfilled(buildingTemplate.levels[Math.min(state.buildings[id].level, buildingTemplate.levels.length - 1)].visible, state),
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
