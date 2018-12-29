import { Buildings } from './buildings'
import { Deposits } from './deposits'
import { Resources } from './resources'
import { State } from '../store/init'
import { Game as GameTemplate } from '../store/game/template'
import { Units } from './units'

import * as React from 'react' // https://github.com/DefinitelyTyped/DefinitelyTyped/issues/5128

export const Game = (template: GameTemplate) => (props: Properties) => (
  <div>
    Turn: { props.game.turn } <button onClick={props.onNextTurn} >Next</button>
    <Resources list={template.resources} values={props.game.resources} />
    <Deposits list={template.deposits} values={props.game.deposits} />
    <Buildings list={template.buildings} values={props.game.buildings} onLevelBuilding={props.onLevelBuilding} />
    <Units list={props.game.units} />
  </div>
)

interface Properties extends State {
  onNextTurn: () => void
  onLevelBuilding: (id: string) => void
}
