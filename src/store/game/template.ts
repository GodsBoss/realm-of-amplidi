import { State } from './state'

export interface Game {
  buildings: Building[];
  deposits: Deposit[];
  resources: Resource[];
  units: Unit[];
}

export interface Deposit {
  id: string
  name: string
  initialAmount: number
}

export interface Resource {
  id: string
  name: string
  initialAmount: number
}

export interface Building {
  id: string
  name: string
  initialLevel: number
  available: (state: State, nextLevel: number) => boolean
  cost: (state: State, nextLevel: number) => Cost
}

export interface Unit {
  id: string
  name: string
  initialAmount: number
  initialReservoir: number
}

export interface Cost {
  [resourceID: string]: number
}
