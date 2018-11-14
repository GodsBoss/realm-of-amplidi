import { Buildings } from './buildings'
import { Deposits } from './deposits'
import { Resources } from './resources'
import { State } from '../store/init'
import { Units } from './units'

import * as React from 'react' // https://github.com/DefinitelyTyped/DefinitelyTyped/issues/5128

export const Game = (state: State) => (
  <div>
    Turn: { state.game.turn }
    <Resources list={state.game.resources} />
    <Deposits list={state.game.deposits} />
    <Buildings list={state.game.buildings} />
    <Units list={state.game.units} />
  </div>
)
