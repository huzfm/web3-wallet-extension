import { HDNodeWallet } from "ethers"
import { Wallet } from "ethers"

export default function createEthereumWallet(seed: Buffer) {
      const hdNode = HDNodeWallet.fromSeed(seed)
      const child = hdNode.derivePath("m/44'/60'/0'/0/0")
      const wallet = new Wallet(child.privateKey)

      return {
            chain: "ethereum",
            address: wallet.address,
            privateKey: wallet.privateKey,
      }
}
