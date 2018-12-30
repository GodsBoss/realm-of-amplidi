import { fullfilled } from './check_requirements'
import { find } from '../../util'
import { State, BuildingMap, ResourceMap } from './state'
import { Game } from './template'

export const withXabilities = (game: Game) => (state: State): State => {
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

  const resources: ResourceMap = {}

  Object.keys(state.resources).forEach(
    (id) => {
      const resourceTemplate = find(game.resources, (resource) => resource.id === id)
      resources[id] = {
        id: id,
        amount: state.resources[id].amount,
        spent: state.resources[id].spent,
        visible: fullfilled(resourceTemplate.visible, state)
      }
    }
  )

  return {
    turn: state.turn,
    deposits: state.deposits,
    resources: resources,
    buildings: buildings
  }
}
