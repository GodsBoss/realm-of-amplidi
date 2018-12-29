export interface State {
  turn: number
  buildings: BuildingMap
  deposits: Deposit[]
  resources: ResourceMap
  units: Unit[]
}

export interface Building {
  id: string
  level: number
  visible: boolean
}

export interface BuildingMap {
  [id: string]: Building
}

export interface Deposit {
  id: string
  name: string
  amount: number
  harvested: number
}

export interface Resource {
  id: string
  amount: number
  spent: number
  visible: boolean
}

export interface ResourceMap {
  [id: string]: Resource
}

export interface Unit {
  id: string
  name: string
  amount: number
  lost: number
  reservoir: UnitReservoir
  visible: boolean
}

export interface UnitReservoir {
  current: number
  wasted: number
}
