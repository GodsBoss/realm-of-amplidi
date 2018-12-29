import { State, BuildingMap, DepositMap, Resource as ResourceValue, ResourceMap } from './state'
import { Game, Building as BuildingTemplate, Deposit as DepositTemplate, Resource as ResourceTemplate } from './template'

export function initialState(game: Game): State {
  return {
    turn: 1,
    buildings: initializeBuildings(game.buildings),
    deposits: initializeDeposits(game.deposits),
    resources: initializeResources(game.resources),
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

function initializeBuildings(templates: BuildingTemplate[]): BuildingMap {
  const buildings: BuildingMap = {}
  templates.forEach(
    (template) => {
      buildings[template.id] = {
        id: template.id,
        level: template.initialLevel,
        visible: true // TODO: Implement visibility
      }
    }
  )
  return buildings
}

function initializeResources(templates: ResourceTemplate[]): ResourceMap {
  const resources: ResourceMap = {}
  templates.forEach(
    (template: ResourceTemplate) => {
      resources[template.id] = {
        id: template.id,
        amount: template.initialAmount,
        spent: 0,
        visible: true // TODO: Implement visibility
      }
    }
  )
  return resources
}

function initializeDeposits(templates: DepositTemplate[]): DepositMap {
  const deposits: DepositMap = {}
  templates.forEach(
    (template) => {
      deposits[template.id] = {
        id: template.id,
        amount: template.initialAmount,
        harvested: 0
      }
    }
  )
  return deposits
}
