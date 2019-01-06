import { Building as BuildingTemplate, Game, toByID } from '../store/game/template'
import { BuildingMap, Building as BuildingValue } from '../store/game/state'
import * as React from 'react' // https://github.com/DefinitelyTyped/DefinitelyTyped/issues/5128

export const Buildings = ({game, values, onLevelBuilding}: {game: Game, values: BuildingMap, onLevelBuilding: OnLevelBuilding}) => (
  <div>
    <h2>Buildings</h2>
    <ul>
      {
        game.buildings.map(
          (building: BuildingTemplate) => (
            <Building game={game} building={building} value={values[building.id]} onLevelBuilding={onLevelBuilding} />
          )
        )
      }
    </ul>
  </div>
)

const Building = ({game, building, value, onLevelBuilding}: {game: Game, building: BuildingTemplate, value: BuildingValue, onLevelBuilding: OnLevelBuilding }) => (
  <li key={ building.id } className={ value.visible ? 'visible' : 'invisible' }>
    <BuildingInfo name={building.name} level={value.level} />
    <BuildingUpgrade game={game} building={building} value={value} onLevelBuilding={onLevelBuilding} />
  </li>
)

const BuildingInfo = ({name, level}: { name: string, level: number }) => (
  <span className="building-info">{ name } Level { level }</span>
)

const BuildingUpgrade = ({game, building, value, onLevelBuilding}: {game: Game, building: BuildingTemplate, value: BuildingValue, onLevelBuilding: OnLevelBuilding }) => {
  if (building.levels.length > value.level) {
    return <span className="building-upgrade">
      <button onClick={ () => { onLevelBuilding(building.id) } } disabled={ !value.available }>{value.level === 0 ? 'Construct' : 'Upgrade'}</button>
      {
        Object.keys(building.levels[value.level].cost).map(
          (id) => <span className="cost-item">{`${building.levels[value.level].cost[id]} ${toByID(game.resources)[id].name}`}</span>
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
