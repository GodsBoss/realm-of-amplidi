import { Action } from './action'
import { Cost, Game, Building as GameBuilding } from './template'
import { Building, Resource, State } from './state'

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
        resources: state.resources.map(
          (r: Resource): Resource => {
            if (cost[r.id] === undefined) {
              return r
            }
            return {
              id: r.id,
              name: r.name,
              amount: r.amount - cost[r.id],
              spent: r.spent + cost[r.id],
              visible: true
            }
          }
        )
      }
    }
    return state
  }
}

function enoughResources(resources: Resource[], cost: Cost): boolean {
  return resources.every(
    (resource: Resource): boolean => {
      return cost[resource.id] === undefined || cost[resource.id] <= resource.amount
    }
  )
}

function find<T>(haystack: T[], pred: (item: T) => boolean): T {
  for(let i = 0; i < haystack.length; i++) {
    if (pred(haystack[i])) {
      return haystack[i]
    }
  }
  return undefined
}
