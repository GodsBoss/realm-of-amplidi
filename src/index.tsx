import { create } from './store/init'
import { Game } from './container/game'
import { RealmOfAmplidi } from './data/game'

import * as React from 'react' // https://github.com/DefinitelyTyped/DefinitelyTyped/issues/5128
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'

import './style/game.css'

window.addEventListener(
  'load',
  (ev) => {
    const G = Game(RealmOfAmplidi)
    const store = createStore(create(RealmOfAmplidi))
    render(
      <Provider store={store}>
        <G />
      </Provider>,
      document.body
    )
  },
  false
)
