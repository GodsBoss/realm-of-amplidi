import { Editor } from './container/editor'

import * as React from 'react' // https://github.com/DefinitelyTyped/DefinitelyTyped/issues/5128
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'

window.addEventListener(
  'load',
  (ev) => {
    render(
      <Provider store={createStore((state: any, action: any) => state)}>
        <Editor />
      </Provider>,
      document.body
    )
  },
  false
)
