import { AccountItem } from "./accountItem"
import type { Account } from "../core/walletManager"

type Props = {
      title: string
      accounts: Account[]
      onAdd: () => void
}

export function Chain({ title, accounts, onAdd }: Props) {
      return (
            <>
                  <h1>{title}</h1>
                  <button onClick={onAdd}>Add account</button>

                  {accounts.map((el) => (
                        <AccountItem
                              key={el.index}
                              index={el.index}
                              address={el.address}
                        />
                  ))}
            </>
      )
}
