import { AccountItem } from "./accountItem"
import type { Account } from "../core/walletManager"

type Props = {
      title: string
      accounts: Account[]
      onAdd: () => void
}
export function Chain({ title, accounts, onAdd }: Props) {
      return (
            <div className="mt-6 p-4 rounded-2xl border">
                  <div className="flex justify-between items-center mb-3">
                        <h2 className="text-lg font-semibold">{title}</h2>
                        <button
                              onClick={onAdd}
                              className="px-3 py-1 rounded-lg bg-green-600 text-white text-sm"
                        >
                              Add account
                        </button>
                  </div>

                  <div className="space-y-1">
                        {accounts.map((el) => (
                              <AccountItem
                                    key={el.index}
                                    index={el.index}
                                    address={el.address}
                              />
                        ))}
                  </div>
            </div>
      )
}
