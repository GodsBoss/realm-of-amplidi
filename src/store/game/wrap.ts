import { State } from './state'

export const wrap = (...conversions: StateFunc[]) => (state: State): State => {
  return conversions.reduce(
    (state: State, convert: StateFunc) => convert(state),
    state
  )
}

interface StateFunc {
  (state: State): State
}
