import { Action } from './action'
import { find } from '../../util'
import { Cost, Game, Building as GameBuilding, ResourceAmounts, toByID } from './template'
import { Building, BuildingMap, mapBuildings, sameBuilding, withLevelUps, State, withCostsSubtracted, enoughResources } from './state'

export interface LevelBuildingAction extends Action<"@game/level_building">{
  id: string
}

export function createLevelBuildingAction(id: string): LevelBuildingAction {
  return {
    type: "@game/level_building",
    id: id
  }
}

export function levelBuilding(game: Game) {
  const buildingsByID = toByID(game.buildings)
  return function(state: State, action: LevelBuildingAction): State {
    const cost = buildingsByID[action.id].levels[state.buildings[action.id].level].cost
    if (enoughResources(state.resources, cost)) {
      return {
        turn: state.turn,
        deposits: state.deposits,
        buildings: withLeveledBuilding(state.buildings, action.id),
        resources: withCostsSubtracted(state.resources, cost)
      }
    }
    return state
  }
}

function withLeveledBuilding(buildings: BuildingMap, id: string): BuildingMap {
  return mapBuildings(
    buildings,
    (building) => building.id === id ? withLevelUps(1)(building) : sameBuilding(building)
  )
}
