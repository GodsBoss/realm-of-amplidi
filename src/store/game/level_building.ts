import { Action } from './action'
import { find } from '../../util'
import { Cost, Game, Building as GameBuilding, ResourceAmounts, toByID } from './template'
import { Building, BuildingMap, mapBuildings, sameBuilding, withLevelUps, Resource, ResourceMap, State, withSpent, sameResource, mapResources } from './state'

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
        resources: subtractCosts(state.resources, cost)
      }
    }
    return state
  }
}

function enoughResources(resources: ResourceMap, cost: ResourceAmounts): boolean {
  return Object.keys(cost).every(
    (id: string): boolean => cost[id] <= resources[id].amount
  )
}

function subtractCosts(resources: ResourceMap, cost: ResourceAmounts): ResourceMap {
  return mapResources(
    resources,
    (resource: Resource): Resource => cost[resource.id] === undefined ? sameResource(resource) : withSpent(cost[resource.id])(resource)
  )
}

function withLeveledBuilding(buildings: BuildingMap, id: string): BuildingMap {
  return mapBuildings(
    buildings,
    (building) => building.id === id ? withLevelUps(1)(building) : sameBuilding(building)
  )
}
