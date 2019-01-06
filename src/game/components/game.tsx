import { Buildings } from './buildings'
import { Deposits } from './deposits'
import { Resources } from './resources'
import { State } from '../store/game/state'
import { Game as GameTemplate } from '../../common/template'

import * as React from 'react' // https://github.com/DefinitelyTyped/DefinitelyTyped/issues/5128

export const Game = (template: GameTemplate) => (props: Properties) => (
  <div>
    Turn: { props.turn } <button onClick={props.onNextTurn} >Next</button>
    <Resources list={template.resources} values={props.resources} />
    <Deposits list={template.deposits} values={props.deposits} />
    <Buildings game={template} values={props.buildings} onLevelBuilding={props.onLevelBuilding} />
  </div>
)

interface Properties extends State {
  onNextTurn: () => void
  onLevelBuilding: (id: string) => void
}
