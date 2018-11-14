import { create } from './store/init'
import { Game } from './container/game'

import * as React from 'react' // https://github.com/DefinitelyTyped/DefinitelyTyped/issues/5128
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'

window.addEventListener(
  'load',
  (ev) => {
    const store = createStore(create({}))
    render(
      <Provider store={store}>
        <Game />
      </Provider>,
      document.body
    )
  },
  false
)
