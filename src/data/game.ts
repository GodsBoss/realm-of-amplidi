import { Cost } from '../store/game/template'
import { Game } from '../store/game/template'
import { State } from '../store/game/state'

export const RealmOfAmplidi: Game = {
  buildings: [
    {
      id: "clay_pit",
      name: "Clay Pit",
      initialLevel: 1,
      levels: [
        {
          available: true,
          cost: {},
          benefits: [
            {
              type: "resource",
              amounts: {
                "clay": 1
              }
            }
          ]
        },
        {
          available: true,
          cost: {
            "clay": 5
          },
          benefits: [
            {
              type: "resource",
              amounts: {
                "clay": 1
              }
            }
          ]
        },
        {
          available: true,
          cost: {
            "clay": 20
          },
          benefits: [
            {
              type: "resource",
              amounts: {
                "clay": 1
              }
            }
          ]
        }
      ]
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
  ]
}
