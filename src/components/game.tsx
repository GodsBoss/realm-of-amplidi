import { Buildings } from './buildings'
import { Deposits } from './deposits'
import { Resources } from './resources'
import { State } from '../store/init'
import { Units } from './units'

import * as React from 'react' // https://github.com/DefinitelyTyped/DefinitelyTyped/issues/5128

export const Game = (props: Properties) => (
  <div>
    Turn: { props.game.turn } <button onClick={props.onNextTurn} >Next</button>
    <Resources list={props.game.resources} />
    <Deposits list={props.game.deposits} />
    <Buildings list={props.game.buildings} onLevelBuilding={props.onLevelBuilding} />
    <Units list={props.game.units} />
  </div>
)

interface Properties extends State {
  onNextTurn: () => void
  onLevelBuilding: (id: string) => void
}
