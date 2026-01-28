import { Keypair } from "@solana/web3.js"
import { derivePath } from "ed25519-hd-key"
export default function createSolanaWallet(seed: Buffer, index: number = 0) {
      const path = `m/44'/501'/${index}'/0'`

      const deriveSeed = derivePath(path, seed.toString("hex")).key
      const keyPair = Keypair.fromSeed(Uint8Array.from(deriveSeed))

      return {
            index: index.toString(),
            address: keyPair.publicKey.toBase58(),
            privateKey: Buffer.from(keyPair.secretKey).toString("hex"),
      }
}
