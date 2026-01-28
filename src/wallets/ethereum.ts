import { HDNodeWallet } from "ethers"
import { Wallet } from "ethers"

export default function createEthereumWallet(seed: Buffer, index: number = 0) {
      const hdNode = HDNodeWallet.fromSeed(seed)
      const child = hdNode.derivePath(`m/44'/60'/0'/0/${index}`)
      const wallet = new Wallet(child.privateKey)

      return {
            index: index.toString(),
            address: wallet.address,
            privateKey: wallet.privateKey,
      }
}
