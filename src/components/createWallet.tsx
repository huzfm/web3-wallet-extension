type Props = {
      onCreate: () => void
}

export function CreateWallet({ onCreate }: Props) {
      return (
            <button
                  onClick={onCreate}
                  className="px-4 py-2 rounded-xl bg-black text-white hover:bg-gray-800 transition"
            >
                  Create Wallet
            </button>
      )
}
