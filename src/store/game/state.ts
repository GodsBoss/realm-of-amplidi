export interface State {
  turn: number
  buildings: Building[]
  deposits: Deposit[]
  resources: ResourceMap
  units: Unit[]
}

export interface Building {
  id: string
  name: string
  level: number
  visible: boolean
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
