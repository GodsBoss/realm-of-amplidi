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

export interface BuildingMap {
  [id: string]: Building
}

export interface Deposit {
  id: string
  amount: number
  harvested: number
  processing: number
}

export interface DepositMap {
  [id: string]: Deposit
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
