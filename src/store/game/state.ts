export interface State {
  turn: number
  buildings: BuildingMap
  deposits: DepositMap
  resources: ResourceMap
}

export interface Building {
  id: string
  level: number
  visible: boolean
  available: boolean
}

// sameBuilding returns a clone of a building.
export function sameBuilding(building: Building): Building {
  return {
    id: building.id,
    level: building.level,
    visible: building.visible,
    available: building.available
  }
}

// withLevelUp returns a function which upgrades the level of a building by n.
export function withLevelUps(n: number): (building: Building) => Building {
  return (building: Building) => {
    return {
      id: building.id,
      level: building.level + n,
      visible: building.visible,
      available: building.available
    }
  }
}

export interface BuildingMap {
  [id: string]: Building
}

export function mapBuildings(buildings: BuildingMap, f?: (building: Building) => Building): BuildingMap {
  return map<Building>(buildings, sameBuilding, f)
}

export interface Deposit {
  id: string
  amount: number
  harvested: number
  processing: number
}

// sameDeposit returns a clone of a deposit.
export function sameDeposit(deposit: Deposit): Deposit {
  return {
    id: deposit.id,
    amount: deposit.amount,
    harvested: deposit.harvested,
    processing: deposit.processing
  }
}

export interface DepositMap {
  [id: string]: Deposit
}

export function mapDeposits(deposits: DepositMap, f?: (deposit: Deposit) => Deposit): DepositMap {
  return map<Deposit>(deposits, sameDeposit, f)
}

export interface Resource {
  id: string
  amount: number
  spent: number
  visible: boolean
}

// sameResource returns a clone of a resource.
export function sameResource(resource: Resource): Resource {
  return {
    id: resource.id,
    amount: resource.amount,
    spent: resource.spent,
    visible: resource.visible
  }
}

// withSpent creates a function which creates a new resource from an existing
// resource, but with the amount decreased and the spent property increased by
// the given amount.
export function withSpent(amount: number): (resource: Resource) => Resource {
  return (resource: Resource): Resource => {
    return {
      id: resource.id,
      amount: resource.amount - amount,
      spent: resource.spent + amount,
      visible: resource.visible
    }
  }
}

export interface ResourceMap {
  [id: string]: Resource
}

export function mapResources(resources: ResourceMap, f?: (resource: Resource) => Resource): ResourceMap {
  return map<Resource>(resources, sameResource, f)
}

function map<T>(input: MyMap<T>, defaultF: (t: T) => T, f?: (t: T) => T): MyMap<T> {
  if (f === undefined) {
    f = defaultF
  }
  const output: MyMap<T> = {}
  Object.keys(input).forEach(
      (id) => {
          output[id] = f(input[id])
      }
  )
  return output
}

interface MyMap<T> {
    [id: string]: T
}
