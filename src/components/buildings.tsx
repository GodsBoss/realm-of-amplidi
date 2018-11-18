import * as React from 'react' // https://github.com/DefinitelyTyped/DefinitelyTyped/issues/5128

export const Buildings = ({list, onLevelBuilding}: {list: BuildingsProps[], onLevelBuilding: (id: string) => void}) => (
  <div>
    <h2>Buildings</h2>
    <ul>
      {
        list.
          filter(
            (building: BuildingsProps) => building.visible
          ).
          map(
            (building: BuildingsProps) => (
              <Building {...building} onLevelBuilding={onLevelBuilding} />
            )
          )
      }
    </ul>
  </div>
)

const Building = (building: BuildingsProps & OnLevelBuilding) => (
  <li key={ building.id }>
    { building.name } Level { building.level } <button onClick={() => building.onLevelBuilding(building.id)}>{building.level === 0 ? 'Construct' : 'Upgrade'}</button>
  </li>
)

interface BuildingsProps {
  id: string
  name: string
  level: number
  visible: boolean
}

interface OnLevelBuilding {
  onLevelBuilding: (id: string) => void
}
