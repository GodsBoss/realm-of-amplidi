import { State } from './state'
import {
  Requirement,
  isConstantRequirement,
  isComparisonRequirement,
  comparison,
  ComparisonValue,
  isConstantComparisonValue,
  isBuildingLevelStateValue,
  isDepositAmountStateValue,
  isDepositHarvestedStateValue,
  isResourceAmountStateValue,
  isResourceSpentStateValue,
  isMultiRequirement
} from './template'

export function fullfilled(requirement: Requirement, state: State): boolean {
  if (isConstantRequirement(requirement)) {
    return requirement
  }
  if (isComparisonRequirement(requirement)) {
    return comparison(requirement.op)(calculateComparisonValue(requirement.left, state), calculateComparisonValue(requirement.right, state))
  }
  if (isMultiRequirement(requirement)) {
    switch(requirement.type) {
      case "and":
        return handleMultiRequirement(requirement.items, state, false, true)
      case "or":
        return handleMultiRequirement(requirement.items, state, true, false)
      default:
        const unreachable: never = requirement.type
        return false // Without this, TypeScript cannot detect that all MultiRequirements are handled.
    }
  }
  const unreachable: never = requirement
}

function calculateComparisonValue(compValue: ComparisonValue, state: State): number {
  if (isConstantComparisonValue(compValue)) {
    return compValue
  }
  if (isBuildingLevelStateValue(compValue)) {
    return state.buildings[compValue.id].level
  }
  if (isDepositAmountStateValue(compValue)) {
    return state.deposits[compValue.id].amount
  }
  if (isDepositHarvestedStateValue(compValue)) {
    return state.deposits[compValue.id].harvested
  }
  if (isResourceAmountStateValue(compValue)) {
    return state.resources[compValue.id].amount
  }
  if (isResourceSpentStateValue(compValue)) {
    return state.resources[compValue.id].spent
  }
  const unreachable: never = compValue
}

function handleMultiRequirement(requirements: Requirement[], state: State, shortcutValue: boolean, defaultValue: boolean): boolean {
  for(let i=0; i<requirements.length; i++) {
    if (fullfilled(requirements[i], state) === shortcutValue) {
      return shortcutValue
    }
  }
  return defaultValue
}
