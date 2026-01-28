type Props = {
      onCreate: () => void
}

export function CreateWallet({ onCreate }: Props) {
      return <button onClick={onCreate}>Create Wallet</button>
}
