import { Action } from './action'
import { find } from '../../util'
import { Cost, Game, Building as GameBuilding, ResourceAmounts } from './template'
import { Building, BuildingMap, Resource, ResourceMap, State } from './state'

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
  return function(state: State, action: LevelBuildingAction): State {
    const currBuilding = state.buildings[action.id]
    const gameBuilding = find(
      game.buildings,
      (b: GameBuilding) => b.id === action.id
    )
    const cost = gameBuilding.levels[currBuilding.level].cost
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
  const result: ResourceMap = {}
  Object.keys(resources).forEach(
    (id) => {
      if (typeof cost[id] === "undefined") {
        result[id] = resources[id]
      } else {
        result[id] = {
          id: id,
          amount: resources[id].amount - cost[id],
          spent: resources[id].spent + cost[id],
          visible: resources[id].visible
        }
      }
    }
  )
  return result
}

function withLeveledBuilding(buildings: BuildingMap, id: string): BuildingMap {
  const result: BuildingMap = {}
  Object.keys(buildings).forEach(
    (currentID) => {
      if (currentID === id) {
        result[currentID] = {
          id: id,
          level: buildings[id].level + 1,
          visible: buildings[id].visible,
          available: buildings[id].available
        }
      } else {
        result[currentID] = buildings[currentID]
      }
    }
  )
  return result
}
