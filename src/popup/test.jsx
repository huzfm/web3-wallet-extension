import { useState } from "react"
import {
      generateMnemonic,
      validateMnemonic,
      mnemonicToSeed,
} from "../wallets/mnemonic"
import createEthereumWallet from "../wallets/ethereum"
import createSolanaWallet from "../wallets/solana"
import { createBitcoinWallet } from "../wallets/bitcoin"

export default function App() {
      const [mnemonic, setMnemonic] = useState("")
      const [wallets, setWallets] = useState < any > (null)

      function create() {
            const m = generateMnemonic(12)
            setMnemonic(m)

            const seed = mnemonicToSeed(m)

            setWallets({
                  eth: createEthereumWallet(seed),
                  sol: createSolanaWallet(seed),
                  btc: createBitcoinWallet(seed),
            })
      }

      return (
            <div className="w-[360px] bg-slate-900 text-white p-4 text-xs space-y-3">
                  <h1 className="text-lg font-bold">Mini Multi-Chain Wallet</h1>

                  <button
                        onClick={create}
                        className="w-full bg-blue-600 py-2 rounded"
                  >
                        Create wallet
                  </button>

                  {mnemonic && (
                        <div>
                              <div className="text-slate-400">Seed phrase</div>
                              <div className="text-yellow-400 break-all">
                                    {mnemonic}
                              </div>
                              <div className="text-green-400 mt-1">
                                    Valid:{" "}
                                    {validateMnemonic(mnemonic) ? "yes" : "no"}
                              </div>
                        </div>
                  )}

                  {wallets && (
                        <div className="space-y-2 border-t border-slate-700 pt-3">
                              <div>🟣 ETH: {wallets.eth.address}</div>
                              <div>🟢 SOL: {wallets.sol.address}</div>
                              <div>🟠 BTC: {wallets.btc.address}</div>
                        </div>
                  )}
            </div>
      )
}
