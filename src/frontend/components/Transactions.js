import React, { useContext } from 'react'
import { transactionsContext } from '../contexts/contexts'



const Transactions = () => {

    const [transactions,_] = useContext(transactionsContext)
  return (
      <div>
          {
              transactions.map((t) => {
                  return (
                      <div>
                          <p>{t.from}</p>
                          <p>{t.to}</p>
                          <hr />
                      </div>
                  )
              })
          }
    </div>
  )
}

export default Transactions
