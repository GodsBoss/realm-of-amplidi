import { Game as GameComp} from '../components/game'
import { createNextTurnAction } from '../store/game/turn'

import { connect } from 'react-redux'

const mapStateToProps = (state: any, ownProps: any) => (state)

const mapDispatchToProps = (dispatch: any, ownProps: any) => ({
  onNextTurn: () => dispatch(createNextTurnAction())
})

export const Game = connect(mapStateToProps, mapDispatchToProps)(GameComp)
