import { Game as GameComp} from '../components/game'
import { createLevelBuildingAction } from '../store/game/level_building'
import { createNextTurnAction } from '../store/game/turn'

import { connect } from 'react-redux'

const mapStateToProps = (state: any, ownProps: any) => (state)

const mapDispatchToProps = {
  onNextTurn: createNextTurnAction,
  onLevelBuilding: createLevelBuildingAction,
}

export const Game = connect(mapStateToProps, mapDispatchToProps)(GameComp)
