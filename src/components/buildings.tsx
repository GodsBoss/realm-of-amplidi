import { Building as BuildingTemplate, Game } from '../store/game/template'
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
    <BuildingInfo name={building.name} level={value.level} />
    <BuildingUpgrade building={building} value={value} onLevelBuilding={onLevelBuilding} />
  </li>
)

const BuildingInfo = ({name, level}: { name: string, level: number }) => (
  <span className="building-info">{ name } Level { level }</span>
)

const BuildingUpgrade = ({building, value, onLevelBuilding}: {building: BuildingTemplate, value: BuildingValue, onLevelBuilding: OnLevelBuilding }) => {
  if (building.levels.length > value.level) {
    return <span className="building-upgrade">
      <button onClick={ () => { onLevelBuilding(building.id) } } disabled={ !value.available }>{value.level === 0 ? 'Construct' : 'Upgrade'}</button>
      {
        Object.keys(building.levels[value.level].cost).map(
          (id) => <span className="cost-item">{`${building.levels[value.level].cost[id]} ${id}`}</span>
        )
      }
    </span>
  } else {
    return <span className="building-upgrade"></span>
  }
}

interface OnLevelBuilding {
  (id: string): void
}
