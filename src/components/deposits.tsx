import * as React from 'react' // https://github.com/DefinitelyTyped/DefinitelyTyped/issues/5128

export const Deposits = ({list}: {list: DepositProps[]}) => (
  <div>
    <h2>Deposits</h2>
    <ul>
      {
        list.
          filter(
            (deposit) => deposit.amount > 0
          ).
          map(
            (deposit) => <Deposit {...deposit } />
          )
      }
    </ul>
  </div>
)

const Deposit = (deposit: DepositProps) => (
  <li key={deposit.id}>
    { deposit.name } { deposit.amount }
  </li>
)

interface DepositProps {
  id: string
  name: string
  amount: number
}
