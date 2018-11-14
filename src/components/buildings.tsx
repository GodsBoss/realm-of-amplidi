import * as React from 'react' // https://github.com/DefinitelyTyped/DefinitelyTyped/issues/5128

export const Buildings = ({list}: {list: BuildingsProps[]}) => (
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
              <Building {...building} />
            )
          )
      }
    </ul>
  </div>
)

const Building = (building: BuildingsProps) => (
  <li key={ building.id }>
    { building.name } Level { building.level }
  </li>
)

interface BuildingsProps {
  id: string
  name: string
  level: number
  visible: boolean
}
