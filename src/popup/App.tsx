import { useState } from "react"
import {
      generateMnemonic,
      mnemonicToSeed,
      validateMnemonic,
} from "../wallets/mnemonic"
import { createBitcoinWallet } from "../wallets/bitcoin"
import createEthereumWallet from "../wallets/ethereum"
import createSolanaWallet from "../wallets/solana"

export default function App() {
      const [mnemonic, setmnemonic] = useState<string>("")
      const [wallets, setwallets] = useState<any>(null)
      function create() {
            const m = generateMnemonic(12)
            setmnemonic(m)

            const seed = mnemonicToSeed(m)
            setwallets({
                  eth: createEthereumWallet(seed),
                  sol: createSolanaWallet(seed),
                  btc: createBitcoinWallet(seed),
            })
      }
      return (
            <>
                  <button onClick={create}>create wallet</button>
                  {/* <div>{mnemonic}</div> */}

                  {mnemonic && (
                        <div>
                              <div>{mnemonic}</div>
                              <div>
                                    {validateMnemonic(mnemonic) ? "yes" : "no"}
                              </div>
                        </div>
                  )}
                  {wallets && (
                        <div className="space-y-2 border-t border-slate-700 pt-3">
                              <div> ETH: {wallets.eth.address}</div>
                              <div> SOL: {wallets.sol.address}</div>
                              <div> BTC: {wallets.btc.address}</div>
                        </div>
                  )}
            </>
      )
}
