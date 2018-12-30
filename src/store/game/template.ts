import { State } from './state'

export interface Game {
  buildings: Building[];
  deposits: Deposit[];
  resources: Resource[];
}

export interface Deposit {
  id: string
  name: string
  initialAmount: number
}

export interface DepositAmounts {
  [depositID: string]: number
}

export interface Resource {
  id: string
  name: string
  initialAmount: number
  visible: Requirement
}

export interface ResourceAmounts {
  [resourceID: string]: number
}

export interface Building {
  id: string
  name: string
  initialLevel: number

  // levels contains all the building's levels. By default, every building the
  // player has is level 0 implicitly, so this array is indexed such as that
  // levels[0] is level 1 in the game, levels[1] is level 2, and so on.
  // This applies even if a building has a level greater than 0 from the start.
  levels: BuildingLevel[]
}

export interface BuildingLevel {
  available: Requirement
  visible: Requirement
  cost: ResourceAmounts

  // benefits are what a building provides per turn. Benefits are cumulative,
  // i.e. the benefits of all building levels are added together.
  benefits: Benefits[]
}

export type Requirement = boolean | ComparisonRequirement | MultiRequirement

export function isConstantRequirement(value: Requirement): value is boolean {
  return typeof value === 'boolean'
}

export interface ComplexRequirement<T extends string> {
  type: T
}

export type MultiRequirementOperators = "and" | "or"

export interface MultiRequirement extends ComplexRequirement<MultiRequirementOperators> {
  items: Requirement[]
}

export interface ComparisonRequirement extends ComplexRequirement<"comparison">{
  op: ComparisonOperator
  left: ComparisonValue
  right: ComparisonValue
}

export function isComparisonRequirement(value: Requirement): value is ComparisonRequirement {
  return (<ComplexRequirement<string>>value).type === 'comparison'
}

export type ComparisonOperator = "<" | "<=" | "==" | ">=" | ">"

export type ComparisonValue = number | ComparisonStateValue

export function isConstantComparisonValue(value: ComparisonValue): value is number {
  return typeof value === 'number'
}

export interface ComparisonStateValue {
  type: string
  id: string
}

interface Benefit<T extends string> {
  type: T
}

export interface DepositBenefit extends Benefit<"deposit"> {
  amounts: DepositAmounts
}

export interface ResourceBenefit extends Benefit<"resource"> {
  amounts: ResourceAmounts
}

export type Benefits = DepositBenefit|ResourceBenefit

export interface Cost {
  [resourceID: string]: number
}
