import { Cost } from '../store/game/template'
import { Game, BuildingLevel } from '../store/game/template'
import { State } from '../store/game/state'

export const RealmOfAmplidi: Game = {
  buildings: [
    {
      id: "clay_pit",
      name: "Clay Pit",
      initialLevel: 1,
      levels: [].concat(
        range(1, 5).map(
          (level: number): BuildingLevel => (
            {
              available: true,
              visible: true,
              cost: {
                "clay": square(level-1) *5
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
          )
        )
      ),
    },
    {
      id: "oak_forester",
      name: "Oak Forester",
      initialLevel: 0,
      levels: [].concat(
        range(1, 3).map(
          (level: number): BuildingLevel => (
            {
              available: true,
              visible: {
                "type": "comparison",
                "op": ">=",
                "left": {
                  "type": "building.level",
                  "id": "clay_pit"
                },
                "right": 3
              },
              cost: {
                "clay": square(level) * 15
              },
              benefits: [
                {
                  type: "deposit",
                  amounts: {
                    "oak_tree": 1
                  }
                }
              ]
            }
          )
        )
      )
    },
    {
      id: "quarry",
      name: "Quarry",
      initialLevel: 0,
      levels: [
        {
          available: false,
          visible: false,
          cost: {},
          benefits: []
        }
      ]
    }
  ],
  deposits: [
    {
      id: "oak_tree",
      name: "Oak Tree",
      initialAmount: 100
    },
    {
      id: "rock",
      name: "Rock",
      initialAmount: 0
    }
  ],
  resources: [
    {
      id: "clay",
      name: "Clay",
      initialAmount: 50,
      visible: true
    },
    {
      id: "stone",
      name: "Stone",
      initialAmount: 0,
      visible: {
        "type": "comparison",
        "op": ">",
        "left": {
          "type": "resource.amount",
          "id": "clay"
        },
        "right": 100
      }
    }
  ]
}

// range creates an array containing the numbers start to end (both inclusive).
function range(start: number, end: number): number[] {
  const result: number[] = []
  for(let i = 0; i < end - start + 1; i++) {
    result[i] = i + start
  }
  return result
}

function square(n: number): number {
  return n * n
}
