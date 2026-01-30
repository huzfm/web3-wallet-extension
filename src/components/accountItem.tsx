type Props = {
      index: number
      address: string
      balance?: number
}

export function AccountItem({ index, address, balance }: Props) {
      return (
            <div className="flex justify-between text-sm p-2 rounded-lg border">
                  <div>
                        #{index} — {address.slice(0, 6)}…{address.slice(-4)}
                  </div>
                  <div className="font-mono">
                        {balance !== undefined ? balance.toFixed(4) : "—"}
                  </div>
            </div>
      )
}
