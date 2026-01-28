import { useState } from "react"

type Props = {
      mnemonic: string
}

export function Mnemonic({ mnemonic }: Props) {
      const [copied, setCopied] = useState("")

      function handleCopy() {}
      return (
            <>
                  <div>Mnemonic</div>
                  {mnemonic}
                  <p>sdkjfnsk</p>
            </>
      )
}
