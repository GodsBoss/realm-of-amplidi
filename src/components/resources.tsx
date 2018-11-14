import * as React from 'react' // https://github.com/DefinitelyTyped/DefinitelyTyped/issues/5128

export const Resources = ({ list }: { list: ResourceProps[]}) => (
  <ul>
    {
      list.filter(
        (r) => r.visible
      ).map(
        (r) => <Resource { ...r } />
      )
    }
  </ul>
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
