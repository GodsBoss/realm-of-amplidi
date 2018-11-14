import * as React from 'react' // https://github.com/DefinitelyTyped/DefinitelyTyped/issues/5128

export const Resources = ({ list }: { list: ResourceProps[]}) => (
  <div>
    <h2>Resources</h2>
    <ul>
      {
        list.filter(
          (r) => r.visible
        ).map(
          (r) => <Resource { ...r } />
        )
      }
    </ul>
  </div>
)

const Resource = (r: ResourceProps) => (
  <li key={r.id}>
    {r.amount} {r.name}
  </li>
)

interface ResourceProps {
  id: string
  name: string
  amount: number
  visible: boolean
}
