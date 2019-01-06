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
      id: "mine",
      name: "Mine",
      initialLevel: 0,
      levels: [].concat(
        range(1, 3).map(
          (level: number): BuildingLevel => (
            {
              available: true,
              visible: {
                type: "comparison",
                op: ">=",
                left: {
                  type: "building.level",
                  id: "quarry"
                },
                right: 1
              },
              cost: {
                "oak_wood": square(level) * 20,
                "stone": square(level) * 20
              },
              benefits: [
                {
                  type: "processing",
                  amounts: {
                    "excavate": 2
                  }
                }
              ]
            }
          )
        ),
        range(4, 6).map(
          (level: number): BuildingLevel => (
            {
              available: true,
              visible: false,
              cost: {
                "marble": square(level-3) * 20,
                "pine_wood": square(level-3) * 20
              },
              benefits: [
                {
                  type: "processing",
                  amounts: {
                    "excavate": 1
                  }
                }
              ]
            }
          )
        ),
        range(7, 9).map(
          (level: number): BuildingLevel => (
            {
              available: true,
              visible: false,
              cost: {
                "granite": square(level-6) * 20,
                "hardwood": square(level-6) * 20
              },
              benefits: [
                {
                  type: "processing",
                  amounts: {
                    "excavate": 1
                  }
                }
              ]
            }
          )
        )
      )
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
      levels: [].concat(
        [
          isBuildingLevel(
            {
              available: true,
              visible: {
                "type": "comparison",
                "op": ">=",
                "left": {
                  "type": "building.level",
                  "id": "sawmill"
                },
                "right": 1
              },
              cost: {
                "oak_wood": 100
              },
              benefits: [
                {
                  "type": "processing",
                  "amounts": {
                    "quarry": 2
                  }
                },
                {
                  "type": "deposit",
                  "amounts": {
                    "rock": 1
                  }
                }
              ]
            }
          )
        ],
        range(2, 3).map(
          (n): BuildingLevel => (
            {
              available: true,
              visible: true,
              cost: {
                "oak_wood": 100 + 50 * n,
                "stone": 25 * n
              },
              benefits: [
                {
                  "type": "processing",
                  "amounts": {
                    "quarry": 2
                  }
                },
                {
                  "type": "deposit",
                  "amounts": {
                    "rock": 1
                  }
                }
              ]
            }
          )
        )
      )
    },
    {
      id: "sawmill",
      name: "Sawmill",
      initialLevel: 0,
      levels: [].concat(
        [
          isBuildingLevel(
            {
              available: true,
              visible: {
                "type": "comparison",
                "op": ">",
                "left": {
                  "type": "building.level",
                  "id": "oak_forester"
                },
                "right": 0
              },
              benefits: [
                {
                  "type": "processing",
                  "amounts": {
                    "chopping": 2
                  }
                }
              ],
              cost: {
                "clay": 100
              }
            }
          )
        ],
        range(2, 3).map(
          (n: number): BuildingLevel => (
            {
              available: true,
              visible: true,
              benefits: [
                {
                  "type": "processing",
                  "amounts": {
                    "chopping": 2
                  }
                }
              ],
              cost: {
                "clay": n * 100,
                "oak_wood": n * 10
              }
            }
          )
        )
      )
    }
  ],
  deposits: [
    {
      id: "ebony",
      name: "Ebony",
      initialAmount: 0,
      processedBy: ["chopping"],
      resourceID: "hardwood"
    },
    {
      id: "gold_ore",
      name: "Gold Ore",
      initialAmount: 0,
      processedBy: ["excavate"],
      resourceID: "gold"
    },
    {
      id: "granite",
      name: "Granite",
      initialAmount: 0,
      processedBy: ["quarry"],
      resourceID: "granite"
    },
    {
      id: "iron_ore",
      name: "Iron Ore",
      initialAmount: 0,
      processedBy: ["excavate"],
      resourceID: "iron"
    },
    {
      id: "marble",
      name: "Marble",
      initialAmount: 0,
      processedBy: ["quarry"],
      resourceID: "marble"
    },
    {
      id: "oak_tree",
      name: "Oak Tree",
      initialAmount: 100,
      processedBy: ["chopping"],
      resourceID: "oak_wood"
    },
    {
      id: "pine_tree",
      name: "Pine tree",
      initialAmount: 0,
      processedBy: ["chopping"],
      resourceID: "pine_wood"
    },
    {
      id: "rock",
      name: "Rock",
      initialAmount: 0,
      processedBy: ["quarry"],
      resourceID: "stone"
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
      id: "gold",
      name: "Gold",
      initialAmount: 0,
      visible: false
    },
    {
      id: "granite",
      name: "Granite",
      initialAmount: 0,
      visible: false
    },
    {
      id: "hardwood",
      name: "Hardwood",
      initialAmount: 0,
      visible: false
    },
    {
      id: "iron",
      name: "Iron",
      initialAmount: 0,
      visible: false
    },
    {
      id: "marble",
      name: "Marble",
      initialAmount: 0,
      visible: false
    },
    {
      id: "oak_wood",
      name: "Oak Wood",
      initialAmount: 0,
      visible: true
    },
    {
      id: "pine_wood",
      name: "Pine Wood",
      initialAmount: 0,
      visible: false
    },
    {
      id: "stone",
      name: "Stone",
      initialAmount: 0,
      visible: {
        "type": "comparison",
        "op": ">=",
        "left": {
          "type": "building.level",
          "id": "quarry"
        },
        "right": 1
      }
    }
  ],
  units: []
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

// isBuildingLevel acts as a typeguard for BuildingLevel because of the strange
// TypeScript handling of Array.prototype.concat.
function isBuildingLevel(level: BuildingLevel): BuildingLevel {
  return level
}
