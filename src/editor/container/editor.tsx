import { Editor as EditorComponent } from '../components/editor'

import { connect } from 'react-redux'

const mapStateToProps = (state: any) => state

const mapDispatchToProps = {}

export const Editor = connect(mapStateToProps, mapDispatchToProps)(EditorComponent)
