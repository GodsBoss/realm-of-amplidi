export interface Game {
  buildings: Building[];
  deposits: Deposit[];
  resources: Resource[];
  units: Unit[];
}

interface Deposit {
  id: string
  name: string
  initialAmount: number
}

interface Resource {
  id: string
  name: string
  initialAmount: number
}

interface Building {
  id: string
  name: string
  initialLevel: number
}

interface Unit {
  id: string
  name: string
  initialAmount: number
  initialReservoir: number
}
