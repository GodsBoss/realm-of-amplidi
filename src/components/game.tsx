import { Buildings } from './buildings'
import { Deposits } from './deposits'
import { Resources } from './resources'
import { State } from '../store/init'
import { Game as GameTemplate } from '../store/game/template'

import * as React from 'react' // https://github.com/DefinitelyTyped/DefinitelyTyped/issues/5128

export const Game = (template: GameTemplate) => (props: Properties) => (
  <div>
    Turn: { props.game.turn } <button onClick={props.onNextTurn} >Next</button>
    <Resources list={template.resources} values={props.game.resources} />
    <Deposits list={template.deposits} values={props.game.deposits} />
    <Buildings game={template} values={props.game.buildings} onLevelBuilding={props.onLevelBuilding} />
  </div>
)

interface Properties extends State {
  onNextTurn: () => void
  onLevelBuilding: (id: string) => void
}
