import { Building as BuildingTemplate, Deposit as DepositTemplate, Resource as ResourceTemplate } from '../../common/template'
import { ImportExport } from './import_export'

import * as React from 'react' // https://github.com/DefinitelyTyped/DefinitelyTyped/issues/5128

export const Editor = () => (
  <div>
    <Buildings items={[]}/>
    <Deposits items={[]}/>
    <Resources items={[]}/>
    <ImportExport />
  </div>
)

const Buildings = List<BuildingTemplate>(Building)

const Deposits = List<DepositTemplate>(Deposit)

const Resources = List<ResourceTemplate>(Resource)

function List<T>(ItemElement: (item: T) => JSX.Element) {
  return ({ items }: { items: T[]}) => (
    <ul>
      {
        items.map(
          (item: T) => <ItemElement />
        )
      }
    </ul>
  )
}

function Building(building: BuildingTemplate) {
  return <li>
  </li>
}

function Deposit(deposit: DepositTemplate) {
  return <li>
  </li>
}

function Resource(resource: ResourceTemplate) {
  return <li>
  </li>
}
