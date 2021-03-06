export interface Game {
  buildings: Building[];
  deposits: Deposit[];
  resources: Resource[];
  units: Unit[];
}

interface Identifyable<IDType extends string> {
  id: IDType
}

interface byIDMap<IDType extends string, T extends Identifyable<IDType>> {
  [id: string]: T
}

// toByID takes a list of identifyable objects and creates a map with the objects' IDs as keys.
export function toByID<IDType extends string, T extends Identifyable<IDType>>(list: T[]): byIDMap<IDType, T> {
  const m: byIDMap<IDType, T> = {}
  list.forEach(
    (obj) => {
      m[obj.id] = obj
    }
  )
  return m
}

export type DepositID = string

export type ProcessingID = string

export interface Deposit extends Identifyable<DepositID>{
  name: string
  initialAmount: number
  processedBy: ProcessingID[]

  // resourceID is the ID of the resource the deposit is processed to.
  resourceID: ResourceID
}

export interface DepositAmounts {
  [depositID: string]: number
}

export type ResourceID = string

export interface Resource extends Identifyable<ResourceID>{
  name: string
  initialAmount: number
  visible: Requirement
}

export interface ResourceAmounts {
  [resourceID: string]: number
}

export type BuildingID = string

export interface Building extends Identifyable<BuildingID>{
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

// buildingBenefits returns the benefits a building provides at the given level
// as a flat list.
export function buildingBenefits(building: Building, level: number): Benefits[] {
  return flattenBenefits(
    building.levels.filter(
      (_, index: number) => index < level
    ).map(
      (bl) => bl.benefits
    )
  )
}

// flattenBenefits takes a list of lists of benefits and flattens them into a
// list of benefits.
export function flattenBenefits(benefitLists: Benefits[][]): Benefits[] {
  return benefitLists.reduce(
    (acc, curr) => acc.concat(curr),
    []
  )
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

export function isMultiRequirement(req: Requirement): req is MultiRequirement {
  return (<MultiRequirement>req).type === 'and' || (<MultiRequirement>req).type === 'and'
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

export function comparison(op: ComparisonOperator): (left: number, right: number) => boolean {
  switch(op) {
    case "<":
      return (left, right) => left < right
    case "<=":
      return (left, right) => left <= right
    case "==":
      return (left, right) => left == right
    case ">=":
      return (left, right) => left >= right
    case ">":
      return (left, right) => left > right
    default:
      const unreachable: never = op
  }
}

export type ComparisonValue =
  number |
  BuildingLevelStateValue |
  DepositAmountStateValue |
  DepositHarvestedStateValue |
  ResourceAmountStateValue |
  ResourceSpentStateValue

export function isConstantComparisonValue(value: ComparisonValue): value is number {
  return typeof value === 'number'
}

export interface StateValue<T extends string, IDType> {
  type: T
  id: IDType
}

// TODO: Find a way to generically check for StateValue<X, Y> instead of having
// several functions which structurally identical code.

export interface BuildingLevelStateValue extends StateValue<"building.level", BuildingID>{}

export function isBuildingLevelStateValue(value: ComparisonValue): value is BuildingLevelStateValue {
  return (<StateValue<string, any>>value).type === 'building.level'
}

export interface DepositAmountStateValue extends StateValue<"deposit.amount", DepositID>{}

export function isDepositAmountStateValue(value: ComparisonValue): value is DepositAmountStateValue {
  return (<StateValue<string, any>>value).type === 'deposit.amount'
}

export interface DepositHarvestedStateValue extends StateValue<"deposit.harvested", DepositID>{}

export function isDepositHarvestedStateValue(value: ComparisonValue): value is DepositHarvestedStateValue {
  return (<StateValue<string, any>>value).type === 'deposit.harvested'
}

export interface ResourceAmountStateValue extends StateValue<"resource.amount", ResourceID>{}

export function isResourceAmountStateValue(value: ComparisonValue): value is ResourceAmountStateValue {
  return (<StateValue<string, any>>value).type === 'resource.amount'
}

export interface ResourceSpentStateValue extends StateValue<"resource.spent", ResourceID>{}

export function isResourceSpentStateValue(value: ComparisonValue): value is ResourceSpentStateValue {
  return (<StateValue<string, any>>value).type === 'resource.spent'
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

export interface ProcessingAmounts {
  [id: string]: number
}

export interface ProcessingBenefit extends Benefit<"processing"> {
  amounts: ProcessingAmounts
}

export type Benefits = DepositBenefit|ResourceBenefit|ProcessingBenefit

export interface Cost {
  [resourceID: string]: number
}

export type UnitID = string

export type UnitTag = string

export type UnitTags = UnitTag[]

export interface Unit extends Identifyable<UnitID>{
  name: string
  strength: number
  tags: UnitTags
  visible: Requirement
  available: Requirement
  cost: ResourceAmounts
}
