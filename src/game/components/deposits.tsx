import { Deposit as DepositTemplate } from '../store/game/template'
import { DepositMap, Deposit as DepositValue } from '../store/game/state'
import * as React from 'react' // https://github.com/DefinitelyTyped/DefinitelyTyped/issues/5128

export const Deposits = ({ list, values }: { list: DepositTemplate[], values: DepositMap }) => (
  <div>
    <h2>Deposits</h2>
    <ul>
      {
        list.
          filter(
            (deposit) => values[deposit.id].amount > 0
          ).
          map(
            (deposit) => <Deposit deposit={deposit} value={values[deposit.id]}/>
          )
      }
    </ul>
  </div>
)

const Deposit = ({ deposit, value }: { deposit: DepositTemplate, value: DepositValue }) => (
  <li key={deposit.id}>
    { deposit.name } { value.amount }
  </li>
)
