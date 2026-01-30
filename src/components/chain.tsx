import { useEffect, useState } from "react"
import { AccountItem } from "./accountItem"
import type { Account } from "../core/walletManager"

import {
      getEthBalance,
      getSolBalance,
      getBitcoinBalance,
} from "../wallets/balance"

type Props = {
      title: string
      accounts: Account[]
      onAdd: () => void
      chainType: "eth" | "sol" | "btc"
}

export function Chain({ title, accounts, onAdd, chainType }: Props) {
      const [balances, setBalances] = useState<Record<string, number>>({})
      const [loading, setLoading] = useState(false)

      useEffect(() => {
            async function fetchBalances() {
                  setLoading(true)

                  const entries = await Promise.all(
                        accounts.map(async (acc) => {
                              try {
                                    let balance: number

                                    if (chainType === "eth") {
                                          balance = await getEthBalance(
                                                acc.address
                                          )
                                    } else if (chainType === "sol") {
                                          balance = await getSolBalance(
                                                acc.address
                                          )
                                    } else {
                                          balance = await getBitcoinBalance(
                                                acc.address
                                          )
                                    }

                                    return [acc.address, balance] as const
                              } catch {
                                    return [acc.address, 0] as const
                              }
                        })
                  )

                  setBalances(Object.fromEntries(entries))
                  setLoading(false)
            }

            if (accounts.length) {
                  fetchBalances()
            }
      }, [accounts, chainType])

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

                  {loading && (
                        <div className="text-sm text-gray-500 mb-2">
                              Fetching balances…
                        </div>
                  )}

                  <div className="space-y-1">
                        {accounts.map((el) => (
                              <AccountItem
                                    key={el.index}
                                    index={Number(el.index)}
                                    address={el.address}
                                    balance={balances[el.address]}
                              />
                        ))}
                  </div>
            </div>
      )
}
