import { Deposits } from './deposits'
import { Resources } from './resources'
import { State } from '../store/init'

import * as React from 'react' // https://github.com/DefinitelyTyped/DefinitelyTyped/issues/5128

export const Game = (state: State) => (
  <div>
    Turn: { state.game.turn }
    <Resources list={state.game.resources} />
    <Deposits list={state.game.deposits} />
  </div>
)
