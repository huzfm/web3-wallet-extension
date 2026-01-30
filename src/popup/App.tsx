import { useState } from "react"
import { CreateWallet } from "../components/createWallet"
import { Mnemonic } from "../components/mnemonic"
import { Chain } from "../components/chain"
import {
      createMasterWallet,
      deriveAccount,
      type WalletState,
} from "../core/walletManager"

export default function App() {
      const [wallet, setWallet] = useState<WalletState | null>(null)
      function create() {
            setWallet(createMasterWallet)
      }

      function addAccount(chain: "eth" | "sol" | "btc") {
            if (!wallet) return
            const account = deriveAccount(wallet, chain)
            setWallet({
                  ...wallet,
                  accounts: {
                        ...wallet.accounts,
                        [chain]: [...wallet.accounts[chain], account],
                  },
            })
      }
      return (
            <>
                  <h1>Multi Chain Wallet</h1>

                  {!wallet && <CreateWallet onCreate={create} />}

                  {wallet && <Mnemonic mnemonic={wallet.mnemonic} />}

                  <Chain
                        title="Ethereum"
                        accounts={wallet?.accounts.eth ?? []}
                        onAdd={() => addAccount("eth")}
                        chainType="eth"
                  />

                  <Chain
                        title="Solana"
                        accounts={wallet?.accounts.sol ?? []}
                        onAdd={() => addAccount("sol")}
                        chainType="sol"
                  />

                  <Chain
                        title="Bitcoin"
                        accounts={wallet?.accounts.btc ?? []}
                        onAdd={() => addAccount("btc")}
                        chainType="btc"
                  />
            </>
      )
}
