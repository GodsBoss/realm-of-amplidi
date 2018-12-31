import * as React from 'react' // https://github.com/DefinitelyTyped/DefinitelyTyped/issues/5128
import { Resource as ResourceTemplate } from '../store/game/template'
import { Resource as ResourceValue } from '../store/game/state'

export const Resources = ({ list, values }: { list: ResourceTemplate[], values: { [id: string]: ResourceValue }}) => (
  <div>
    <h2>Resources</h2>
    <ul>
      {
        list.map(
          (r) => <Resource r={ r } v={ values[r.id] }/>
        )
      }
    </ul>
  </div>
)

const Resource = ({r, v}: { r: ResourceTemplate, v: ResourceValue }) => (
  <li key={r.id} className={ v.visible ? "visible" : "invisible" }>
    {v.amount} {r.name}
  </li>
)
