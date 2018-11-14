import { Game } from '../store/init'

export const RealmOfAmplidi: Game = {
  buildings: [
    {
      id: "clay_pit",
      name: "Clay Pit",
      initialLevel: 1
    }
  ],
  deposits: [
    {
      id: "oak_tree",
      name: "Oak Tree",
      initialAmount: 100
    }
  ],
  resources: [
    {
      id: "clay",
      name: "Clay",
      initialAmount: 50
    }
  ],
  units: [
    {
      id: "peasant",
      name: "Peasant",
      initialAmount: 0,
      initialReservoir: 0
    }
  ]
}
