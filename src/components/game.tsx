import { Deposits } from './deposits'
import { Resources } from './resources'
import { State } from '../store/init'

import * as React from 'react' // https://github.com/DefinitelyTyped/DefinitelyTyped/issues/5128

export const Game = (state: State) => (
  <div>
    Turn: { state.game.turn }
    <h2>Resources</h2>
    <Resources list={state.game.resources} />
    <h2>Deposits</h2>
    <Deposits list={state.game.deposits} />
  </div>
)
