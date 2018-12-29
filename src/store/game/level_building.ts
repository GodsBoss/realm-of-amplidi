import { Action } from './action'
import { Cost, Game, Building as GameBuilding } from './template'
import { Building, Resource, ResourceMap, State } from './state'

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
    const currBuilding = find(
      state.buildings,
      (b: Building) => b.id === action.id
    )
    if (currBuilding === undefined) {
      return state
    }
    const gameBuilding = find(
      game.buildings,
      (b: GameBuilding) => b.id === action.id
    )
    const cost = gameBuilding.cost(state, currBuilding.level + 1)
    if (enoughResources(state.resources, cost)) {
      return {
        turn: state.turn,
        deposits: state.deposits,
        units: state.units,
        buildings: state.buildings.map(
          (b: Building): Building => {
            if (b.id == action.id) {
              return {
                id: b.id,
                name: b.name,
                level: b.level + 1,
                visible: true,
              }
            }
          }
        ),
        resources: subtractCosts(state.resources, cost)
      }
    }
    return state
  }
}

function enoughResources(resources: ResourceMap, cost: Cost): boolean {
  return Object.keys(cost).every(
    (id: string): boolean => cost[id] <= resources[id].amount
  )
}

function subtractCosts(resources: ResourceMap, cost: Cost): ResourceMap {
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

function find<T>(haystack: T[], pred: (item: T) => boolean): T {
  for(let i = 0; i < haystack.length; i++) {
    if (pred(haystack[i])) {
      return haystack[i]
    }
  }
  return undefined
}
