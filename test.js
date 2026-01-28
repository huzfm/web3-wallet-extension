import { generateMnemonic, mnemonicToSeed, validateMnemonic } from "./src/wallets/mnemonic.ts";
import createEthereumWallet from "./src/wallets/ethereum.ts";
import createSolanaWallet from "./src/wallets/solana.ts";
import { createBitcoinWallet } from "./src/wallets/bitcoin.ts";
import { getEthBalance, getSolBalance, getBitcoinBalance } from "./src/wallets/balance.ts";

/* ---------- WALLET SET 1 (24 words) ---------- */

const mnemonic24 = generateMnemonic(24);
console.log("\n===== 24 WORD MNEMONIC =====");
console.log(mnemonic24);
console.log("Valid:", validateMnemonic(mnemonic24));

const seed24 = mnemonicToSeed(mnemonic24);

const ethWallet24 = createEthereumWallet(seed24);
const solWallet24 = createSolanaWallet(seed24);
const btcWallet24 = createBitcoinWallet(seed24);

console.log("\n--- Derived wallets (24 words) ---");
console.log("ETH:", ethWallet24.address);
console.log("SOL:", solWallet24.address);
console.log("BTC:", btcWallet24.address);

const ethBalance24 = await getEthBalance(ethWallet24.address);
const solBalance24 = await getSolBalance(solWallet24.address);
const btcBalance24 = await getBitcoinBalance(btcWallet24.address);

console.log("\n--- Balances (24 words) ---");
console.log("ETH balance:", ethBalance24);
console.log("SOL balance:", solBalance24);
console.log("BTC balance:", btcBalance24);


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


/* ---------- RAW OBJECT OUTPUT ---------- */

console.log("\n===== FULL WALLET OBJECTS =====");
console.log("ETH 24:", ethWallet24);
console.log("SOL 24:", solWallet24);
console.log("BTC 24:", btcWallet24);
console.log("ETH 12:", ethWallet12);
console.log("SOL 12:", solWallet12);
console.log("BTC 12:", btcWallet12);
