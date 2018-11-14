import * as React from 'react' // https://github.com/DefinitelyTyped/DefinitelyTyped/issues/5128

export const Units = ({ list }: { list: UnitProps[]}) => (
  <div>
    <h2>Units</h2>
    <ul>
      {
        list.
          filter(
            (unit) => unit.visible
          ).map(
            (unit) => (
              <li key={unit.id}>
                {unit.amount} {unit.name} ({unit.reservoir.current} available)
              </li>
            )
          )
      }
    </ul>
  </div>
)

interface UnitProps {
  id: string
  name: string
  amount: number
  reservoir: {
    current: number
  }
  visible: boolean
}
