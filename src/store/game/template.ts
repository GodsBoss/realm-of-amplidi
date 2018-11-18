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
}

export interface Unit {
  id: string
  name: string
  initialAmount: number
  initialReservoir: number
}
