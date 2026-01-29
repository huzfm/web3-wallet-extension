import { useCopy } from "../hooks/useCopy"

type Props = {
      mnemonic: string
}
export function Mnemonic({ mnemonic }: Props) {
      const { copied, copy } = useCopy()

      return (
            <div className="mt-4 p-3 rounded-xl bg-gray-100 text-sm">
                  <div className="font-semibold mb-1">Mnemonic</div>

                  <div className="break-words mb-2">{mnemonic}</div>

                  <button
                        onClick={() => copy(mnemonic)}
                        className="px-3 py-1 rounded-lg bg-blue-600 text-white text-xs"
                  >
                        {copied ? "Copied" : "Copy"}
                  </button>
            </div>
      )
}
