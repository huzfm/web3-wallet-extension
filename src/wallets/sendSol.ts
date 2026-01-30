import {
      Connection,
      clusterApiUrl,
      PublicKey,
      Transaction,
      SystemProgram,
      Keypair,
      sendAndConfirmTransaction,
} from "@solana/web3.js"

export async function sendSolana(
      fromPrivateKeyHex: string,
      toAddress: string,
      amountSol: number
) {
      const connection = new Connection(clusterApiUrl("devnet"), "confirmed")

      const secretKey = Uint8Array.from(Buffer.from(fromPrivateKeyHex, "hex"))

      if (secretKey.length !== 64) {
            throw new Error("Invalid Solana secret key length")
      }

      const fromKeypair = Keypair.fromSecretKey(secretKey)

      const transaction = new Transaction().add(
            SystemProgram.transfer({
                  fromPubkey: fromKeypair.publicKey,
                  toPubkey: new PublicKey(toAddress),
                  lamports: amountSol * 1e9,
            })
      )

      const signature = await sendAndConfirmTransaction(
            connection,
            transaction,
            [fromKeypair]
      )

      return signature
}
