import { useState } from "react"
import { WelcomeScreen } from "../components/WelcomeScreen"
import { MainWallet } from "../components/MainWallet"
import {
        createMasterWallet,
        deriveAccount,
        type WalletState,
} from "../core/walletManager"

export default function App() {
        const [wallet, setWallet] = useState<WalletState | null>(null)
        const [activeChain, setActiveChain] = useState<"eth" | "sol" | "btc">(
                "sol"
        )
        const [isCreating, setIsCreating] = useState(false)

        async function create() {
                setIsCreating(true)
                // Small delay for animation
                await new Promise((resolve) => setTimeout(resolve, 500))
                const newWallet = createMasterWallet()
                // Auto-create first account for each chain
                const ethAccount = deriveAccount(newWallet, "eth")
                const solAccount = deriveAccount(newWallet, "sol")
                const btcAccount = deriveAccount(newWallet, "btc")

                setWallet({
                        ...newWallet,
                        accounts: {
                                eth: [ethAccount],
                                sol: [solAccount],
                                btc: [btcAccount],
                        },
                })
                setIsCreating(false)
        }

        function addAccount(chain: "eth" | "sol" | "btc") {
                if (!wallet) return
                const account = deriveAccount(wallet, chain)
                setWallet({
                        ...wallet,
                        accounts: {
                                ...wallet.accounts,
                                [chain]: [...wallet.accounts[chain], account],
                        },
                })
        }

        return (
                <div className="relative w-full h-full bg-[#0a0a0f] overflow-hidden">
                        {/* Background glow effects */}
                        <div className="bg-glow bg-glow-purple absolute -top-20 -right-20 w-40 h-40 opacity-50" />
                        <div className="bg-glow bg-glow-pink absolute bottom-20 -left-20 w-32 h-32 opacity-40" />
                        <div className="bg-glow bg-glow-blue absolute top-1/2 right-10 w-24 h-24 opacity-30" />

                        {!wallet ? (
                                <WelcomeScreen
                                        onCreate={create}
                                        isCreating={isCreating}
                                />
                        ) : (
                                <MainWallet
                                        wallet={wallet}
                                        activeChain={activeChain}
                                        onChainChange={setActiveChain}
                                        onAddAccount={addAccount}
                                />
                        )}
                </div>
        )
}
