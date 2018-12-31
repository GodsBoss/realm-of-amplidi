import { Building as BuildingTemplate } from '../store/game/template'
import { BuildingMap, Building as BuildingValue } from '../store/game/state'
import * as React from 'react' // https://github.com/DefinitelyTyped/DefinitelyTyped/issues/5128

export const Buildings = ({list, values, onLevelBuilding}: {list: BuildingTemplate[], values: BuildingMap, onLevelBuilding: OnLevelBuilding}) => (
  <div>
    <h2>Buildings</h2>
    <ul>
      {
        list.map(
          (building: BuildingTemplate) => (
            <Building building={building} value={values[building.id]} onLevelBuilding={onLevelBuilding} />
          )
        )
      }
    </ul>
  </div>
)

const Building = ({building, value, onLevelBuilding}: {building: BuildingTemplate, value: BuildingValue, onLevelBuilding: OnLevelBuilding }) => (
  <li key={ building.id } className={ value.visible ? 'visible' : 'invisible' }>
    { building.name } Level { value.level } <button onClick={ () => { onLevelBuilding(building.id) } } disabled={ !value.available }>{value.level === 0 ? 'Construct' : 'Upgrade'}</button>
  </li>
)

interface OnLevelBuilding {
  (id: string): void
}
