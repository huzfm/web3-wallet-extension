import * as bitcoin from "bitcoinjs-lib"
import { BIP32Factory } from "bip32"
import * as ecc from "tiny-secp256k1"

const bip32 = BIP32Factory(ecc)

export default function createBitcoinWallet(seed: Buffer, index: number = 0) {
      const root = bip32.fromSeed(seed)
      const child = root.derivePath(`m/44'/0'/0'/0/${index}`)

      const { address } = bitcoin.payments.p2pkh({
            pubkey: Buffer.from(child.publicKey),
      })

      return {
            index: index.toString(),
            address: address!,
            privateKey: child.toWIF(),
      }
}
