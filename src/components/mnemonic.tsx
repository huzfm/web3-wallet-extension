import { useCopy } from "../hooks/useCopy"

type Props = {
      mnemonic: string
}

export function Mnemonic({ mnemonic }: Props) {
      const { copied, copy } = useCopy()
      return (
            <>
                  <div>Mnemonic</div>
                  {mnemonic}{" "}
                  <button onClick={() => copy(mnemonic)}>
                        {copied ? "copied" : "copy"}
                  </button>{" "}
            </>
      )
}
