import { generateMnemonic, mnemonicToSeed, validateMnemonic } from "./src/wallets/mnemonic.ts";
import createEthereumWallet from "./src/wallets/ethereum.ts";
import createSolanaWallet from "./src/wallets/solana.ts";
import createBitcoinWallet from "./src/wallets/bitcoin.ts";
import { getEthBalance, getSolBalance, getBitcoinBalance } from "./src/wallets/balance.ts";
import { sendSolana } from './src/wallets/sendSol.ts'
import { airdropSolana } from './src/wallets/airDrop.ts'

/* ---------- WALLET SET 2 (12 words) ---------- */

const mnemonic12 = generateMnemonic(12);
console.log("\n===== 12 WORD MNEMONIC =====");
console.log(mnemonic12);
console.log("Valid:", validateMnemonic(mnemonic12));

const seed12 = mnemonicToSeed(mnemonic12);

const ethWallet12 = createEthereumWallet(seed12);
const solWallet12 = createSolanaWallet(seed12);
const btcWallet12 = createBitcoinWallet(seed12);

console.log("\n--- Derived wallets (12 words) ---");
console.log("ETH:", ethWallet12.address);
console.log("SOL:", solWallet12.address);
console.log("BTC:", btcWallet12.address);

const ethBalance12 = await getEthBalance(ethWallet12.address);
const solBalance12 = await getSolBalance(solWallet12.address);
const btcBalance12 = await getBitcoinBalance(btcWallet12.address);

console.log("\n--- Balances (12 words) ---");
console.log("ETH balance:", ethBalance12);
console.log("SOL balance:", solBalance12);
console.log("BTC balance:", btcBalance12);

console.log("Requesting devnet SOL airdrop...");
const airdropSig = await airdropSolana(solWallet12.address, 1);
console.log("Airdrop TX:", airdropSig);

const solBalanceAfter = await getSolBalance(solWallet12.address);
console.log("SOL balance after airdrop:", solBalanceAfter);

const sig = await sendSolana(
      solWallet12.privateKey,
      "oKBukKp3nN5m4r1fyDz6g5urUg7NBrPntNPDeTDMtkB",
      0.01
)

console.log("TX:", sig);


console.log("SOL balance:", solBalance12);