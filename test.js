import { generateMnemonic, mnemonicToSeed, validateMnemonic } from "./src/wallets/mnemonic.ts"
import createEthereumWallet from "./src/wallets/ethereum.ts"
import createSolanaWallet from './src/wallets/solana.ts'
import { createBitcoinWallet } from './src/wallets/bitcoin.ts'

const mnemonic = generateMnemonic(24);
console.log(mnemonic);
console.log(validateMnemonic(mnemonic))
const seed = mnemonicToSeed(mnemonic)

const wallet = createEthereumWallet(seed)

const wallet2 = createSolanaWallet(seed)
const wallet3 = createBitcoinWallet(seed)


console.log(wallet)
console.log(wallet2)
console.log(wallet3)

