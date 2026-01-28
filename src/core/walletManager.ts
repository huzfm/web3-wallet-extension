import createBitcoinWallet from "../wallets/bitcoin"
import createEthereumWallet from "../wallets/ethereum"
import createSolanaWallet from "../wallets/solana"
import { generateMnemonic, mnemonicToSeed } from "../wallets/mnemonic"
export type Chain = "eth" | "sol" | "btc"

export type Account = {
      index: string
      address: string
      privateKey: string
}

export type WalletState = {
      mnemonic: string
      seed: Buffer
      accounts: {
            eth: Account[]
            sol: Account[]
            btc: Account[]
      }
}

export function createMasterWallet(): WalletState {
      const mnemonic = generateMnemonic(12)
      const seed = mnemonicToSeed(mnemonic)
      return {
            mnemonic,
            seed,
            accounts: {
                  eth: [],
                  sol: [],
                  btc: [],
            },
      }
}

export function deriveAccount(state: WalletState, chain: Chain): Account {
      const index = state.accounts[chain].length
      if (chain == "eth") return createEthereumWallet(state.seed, index)
      if (chain == "sol") return createSolanaWallet(state.seed, index)
      return createBitcoinWallet(state.seed, index)
}
