export function freshState(): State {
  return {
    turn: 1,
    buildings: [],
    deposits: [],
    resources: [],
    units: [],
  }
}

export interface State {
  turn: number
  buildings: Building[]
  deposits: Deposit[]
  resources: Resource[]
  units: Unit[]
}

interface Building {
  id: string
  name: string
  level: number
  visible: boolean
}

interface Deposit {
  id: string
  name: string
  amount: number
  harvested: number
}

interface Resource {
  id: string
  name: string
  amount: number
  spent: number
  visible: boolean
}

interface Unit {
  id: string
  name: string
  amount: number
  lost: number
  reservoir: UnitReservoir
}

interface UnitReservoir {
  current: number
  wasted: number
}
