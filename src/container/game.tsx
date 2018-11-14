import { Game as GameComp} from '../components/game'

import { connect } from 'react-redux'

const mapStateToProps = (state: any, ownProps: any) => (state)

const mapDispatchToProps = (dispatch: any, ownProps: any) => ({})

export const Game = connect(mapStateToProps, mapDispatchToProps)(GameComp)
