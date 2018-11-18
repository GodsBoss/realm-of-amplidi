import { Cost } from '../store/game/template'
import { Game } from '../store/game/template'
import { State } from '../store/game/state'

export const RealmOfAmplidi: Game = {
  buildings: [
    {
      id: "clay_pit",
      name: "Clay Pit",
      initialLevel: 1,
      available: (state: State, nextLevel: number): boolean => {
        return nextLevel <= 5
      },
      cost: (state: State, nextLevel: number): Cost => {
        return {
          "clay": nextLevel * nextLevel * 5
        }
      }
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
