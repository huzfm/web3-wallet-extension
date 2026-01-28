import { useEffect, useState } from "react"
import {
      generateMnemonic,
      mnemonicToSeed,
      validateMnemonic,
} from "../wallets/mnemonic"
import { createBitcoinWallet } from "../wallets/bitcoin"
import createEthereumWallet from "../wallets/ethereum"
import createSolanaWallet from "../wallets/solana"
import {
      getEthBalance,
      getSolBalance,
      getBitcoinBalance,
} from "../wallets/balance"

type Wallets = {
      eth: any
      sol: any
      btc: any
}

export default function App() {
      const [mnemonic, setMnemonic] = useState("")
      const [wallets, setWallets] = useState<Wallets | null>(null)
      const [copied, setCopied] = useState(false)

      const [balances, setBalances] = useState({
            eth: null as string | null,
            sol: null as number | null,
            btc: null as number | null,
      })

      const [loading, setLoading] = useState(false)

      function createWallet() {
            const m = generateMnemonic(12)
            setMnemonic(m)

            const seed = mnemonicToSeed(m)
            setWallets({
                  eth: createEthereumWallet(seed),
                  sol: createSolanaWallet(seed),
                  btc: createBitcoinWallet(seed),
            })

            setBalances({ eth: null, sol: null, btc: null })
      }

      async function fetchAllBalances() {
            if (!wallets) return

            try {
                  setLoading(true)

                  const [eth, sol, btc] = await Promise.all([
                        getEthBalance(wallets.eth.address),
                        getSolBalance(wallets.sol.address),
                        getBitcoinBalance(wallets.btc.address),
                  ])

                  setBalances({ eth, sol, btc })
            } catch (err) {
                  console.error("Balance error:", err)
                  alert("Failed to fetch balances. Check console.")
            } finally {
                  setLoading(false)
            }
      }

      useEffect(() => {
            if (wallets) {
                  // Fetch balances when wallets are created
                  const fetchBalances = async () => {
                        try {
                              setLoading(true)
                              const [eth, sol, btc] = await Promise.all([
                                    getEthBalance(wallets.eth.address),
                                    getSolBalance(wallets.sol.address),
                                    getBitcoinBalance(wallets.btc.address),
                              ])
                              setBalances({ eth, sol, btc })
                        } catch (err) {
                              console.error("Balance error:", err)
                        } finally {
                              setLoading(false)
                        }
                  }
                  fetchBalances()
            }
            // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [wallets])

      async function copyMnemonic() {
            await navigator.clipboard.writeText(mnemonic)
            setCopied(true)
            setTimeout(() => setCopied(false), 1000)
      }

      return (
            <div style={{ padding: 20, fontFamily: "sans-serif" }}>
                  <h2>Multi-Chain Wallet (ETH • SOL • BTC)</h2>

                  <button onClick={createWallet}>Create wallet</button>

                  {mnemonic && (
                        <div style={{ marginTop: 15 }}>
                              <strong>Mnemonic</strong>
                              <div>{mnemonic}</div>
                              <button onClick={copyMnemonic}>
                                    {copied ? "Copied" : "Copy"}
                              </button>
                              <div>
                                    Valid:{" "}
                                    {validateMnemonic(mnemonic) ? "Yes" : "No"}
                              </div>
                        </div>
                  )}

                  {wallets && (
                        <div style={{ marginTop: 25 }}>
                              <button onClick={fetchAllBalances}>
                                    {loading
                                          ? "Refreshing..."
                                          : "Refresh balances"}
                              </button>

                              <hr />

                              <h3>Ethereum</h3>
                              <div>Address: {wallets.eth.address}</div>
                              <div>Private key: {wallets.eth.privateKey}</div>
                              <div>Balance: {balances.eth ?? "—"} ETH</div>

                              <h3>Solana</h3>
                              <div>Address: {wallets.sol.address}</div>
                              <div>Private key: {wallets.sol.privateKey}</div>
                              <div>Balance: {balances.sol ?? "—"} SOL</div>

                              <h3>Bitcoin</h3>
                              <div>Address: {wallets.btc.address}</div>
                              <div>Private key: {wallets.btc.privateKey}</div>
                              <div>Balance: {balances.btc ?? "—"} BTC</div>
                        </div>
                  )}
            </div>
      )
}
