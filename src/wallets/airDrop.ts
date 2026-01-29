import { Connection, clusterApiUrl, PublicKey } from "@solana/web3.js"

const connection = new Connection(clusterApiUrl("devnet"), "confirmed")

export async function airdropSolana(address: string, amount = 1) {
      const pubkey = new PublicKey(address)

      const sig = await connection.requestAirdrop(
            pubkey,
            amount * 1e9 // SOL → lamports
      )

      await connection.confirmTransaction(sig, "confirmed")

      return sig
}
