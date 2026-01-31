import { useState, useEffect } from "react"
import type { WalletState } from "../core/walletManager"
import {
        EthereumIcon,
        SolanaIcon,
        BitcoinIcon,
        SendIcon,
        ReceiveIcon,
        AirdropIcon,
        PlusIcon,
        CopyIcon,
        CheckIcon,
        RefreshIcon,
        ChevronDownIcon,
        KeyIcon,
} from "./icons/ChainIcons"
import { useCopy } from "../hooks/useCopy"
import {
        getEthBalance,
        getSolBalance,
        getBitcoinBalance,
} from "../wallets/balance"
import { airdropSolana } from "../wallets/airDrop"
import { SendModal } from "./SendModal"
import { ReceiveModal } from "./ReceiveModal"
import { SecretPhraseModal } from "./SecretPhraseModal"

type Props = {
        wallet: WalletState
        activeChain: "eth" | "sol" | "btc"
        onChainChange: (chain: "eth" | "sol" | "btc") => void
        onAddAccount: (chain: "eth" | "sol" | "btc") => void
}

const chainConfig = {
        eth: {
                name: "Ethereum",
                symbol: "ETH",
                icon: EthereumIcon,
                gradient: "from-[#627eea] to-[#3c5cdd]",
                bgGradient: "from-[#627eea]/20 to-[#3c5cdd]/10",
        },
        sol: {
                name: "Solana",
                symbol: "SOL",
                icon: SolanaIcon,
                gradient: "from-[#9945ff] to-[#14f195]",
                bgGradient: "from-[#9945ff]/20 to-[#14f195]/10",
        },
        btc: {
                name: "Bitcoin",
                symbol: "BTC",
                icon: BitcoinIcon,
                gradient: "from-[#f7931a] to-[#ffd93d]",
                bgGradient: "from-[#f7931a]/20 to-[#ffd93d]/10",
        },
}

export function MainWallet({
        wallet,
        activeChain,
        onChainChange,
        onAddAccount,
}: Props) {
        const [selectedAccountIndex, setSelectedAccountIndex] = useState(0)
        const [balances, setBalances] = useState<Record<string, number>>({})
        const [loading, setLoading] = useState(false)
        const [showChainSelector, setShowChainSelector] = useState(false)
        const [showAccountSelector, setShowAccountSelector] = useState(false)
        const [isAirdropping, setIsAirdropping] = useState(false)
        const [showSendModal, setShowSendModal] = useState(false)
        const [showReceiveModal, setShowReceiveModal] = useState(false)
        const [showSecretPhrase, setShowSecretPhrase] = useState(false)
        const { copied, copy } = useCopy()

        const accounts = wallet.accounts[activeChain]
        const currentAccount = accounts[selectedAccountIndex] || accounts[0]
        const config = chainConfig[activeChain]
        const ChainIcon = config.icon

        // Fetch balances
        useEffect(() => {
                async function fetchBalances() {
                        if (!accounts.length) return
                        setLoading(true)

                        const entries = await Promise.all(
                                accounts.map(async (acc) => {
                                        try {
                                                let balance: number
                                                if (activeChain === "eth") {
                                                        balance =
                                                                await getEthBalance(
                                                                        acc.address
                                                                )
                                                } else if (
                                                        activeChain === "sol"
                                                ) {
                                                        balance =
                                                                await getSolBalance(
                                                                        acc.address
                                                                )
                                                } else {
                                                        balance =
                                                                await getBitcoinBalance(
                                                                        acc.address
                                                                )
                                                }
                                                return [
                                                        acc.address,
                                                        balance,
                                                ] as const
                                        } catch {
                                                return [acc.address, 0] as const
                                        }
                                })
                        )

                        setBalances(Object.fromEntries(entries))
                        setLoading(false)
                }

                fetchBalances()
        }, [accounts, activeChain])

        // Reset selected account when chain changes
        useEffect(() => {
                setSelectedAccountIndex(0)
        }, [activeChain])

        const currentBalance = balances[currentAccount?.address] ?? 0

        async function handleAirdrop() {
                if (activeChain !== "sol" || !currentAccount) return
                setIsAirdropping(true)
                try {
                        await airdropSolana(currentAccount.address, 1)
                        // Refresh balance
                        const newBalance = await getSolBalance(
                                currentAccount.address
                        )
                        setBalances((prev) => ({
                                ...prev,
                                [currentAccount.address]: newBalance,
                        }))
                } catch (err) {
                        console.error("Airdrop failed:", err)
                }
                setIsAirdropping(false)
        }

        const formatAddress = (addr: string) =>
                `${addr.slice(0, 6)}...${addr.slice(-4)}`

        return (
                <div className="flex flex-col h-full animate-fade-in">
                        {/* Header */}
                        <header className="flex items-center justify-between px-4 py-3 border-b border-[rgba(148,163,184,0.1)]">
                                {/* Chain Selector */}
                                <div className="relative">
                                        <button
                                                onClick={() =>
                                                        setShowChainSelector(
                                                                !showChainSelector
                                                        )
                                                }
                                                className="flex items-center gap-2 px-3 py-2 rounded-xl glass-card-sm hover:bg-[#1a1a24] transition-all"
                                        >
                                                <ChainIcon size={24} />
                                                <span className="font-semibold text-sm">
                                                        {config.name}
                                                </span>
                                                <ChevronDownIcon
                                                        size={14}
                                                        className="text-[#64748b]"
                                                />
                                        </button>

                                        {showChainSelector && (
                                                <div className="absolute top-full left-0 mt-2 w-48 glass-card p-2 z-50 animate-slide-up">
                                                        {(
                                                                [
                                                                        "sol",
                                                                        "eth",
                                                                        "btc",
                                                                ] as const
                                                        ).map((chain) => {
                                                                const c =
                                                                        chainConfig[
                                                                                chain
                                                                        ]
                                                                const Icon =
                                                                        c.icon
                                                                return (
                                                                        <button
                                                                                key={
                                                                                        chain
                                                                                }
                                                                                onClick={() => {
                                                                                        onChainChange(
                                                                                                chain
                                                                                        )
                                                                                        setShowChainSelector(
                                                                                                false
                                                                                        )
                                                                                }}
                                                                                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                                                                                        activeChain ===
                                                                                        chain
                                                                                                ? "bg-[#1a1a24]"
                                                                                                : "hover:bg-[#12121a]"
                                                                                }`}
                                                                        >
                                                                                <Icon
                                                                                        size={
                                                                                                24
                                                                                        }
                                                                                />
                                                                                <span className="font-medium text-sm">
                                                                                        {
                                                                                                c.name
                                                                                        }
                                                                                </span>
                                                                                {activeChain ===
                                                                                        chain && (
                                                                                        <CheckIcon
                                                                                                size={
                                                                                                        14
                                                                                                }
                                                                                                className="ml-auto text-violet-400"
                                                                                        />
                                                                                )}
                                                                        </button>
                                                                )
                                                        })}
                                                </div>
                                        )}
                                </div>

                                {/* Secret Phrase Button */}
                                <button
                                        onClick={() =>
                                                setShowSecretPhrase(true)
                                        }
                                        className="p-2 rounded-lg hover:bg-[#1a1a24] transition-colors text-[#64748b] hover:text-white"
                                        title="View Secret Phrase"
                                >
                                        <KeyIcon size={18} />
                                </button>
                        </header>

                        {/* Account Selector */}
                        <div className="px-4 py-3">
                                <div className="relative">
                                        <button
                                                onClick={() =>
                                                        setShowAccountSelector(
                                                                !showAccountSelector
                                                        )
                                                }
                                                className="w-full flex items-center justify-between p-3 rounded-xl glass-card-sm hover:border-[rgba(139,92,246,0.3)] transition-all"
                                        >
                                                <div className="flex items-center gap-3">
                                                        <div
                                                                className={`w-10 h-10 rounded-full bg-gradient-to-br ${config.gradient} flex items-center justify-center text-white font-bold text-sm`}
                                                        >
                                                                {selectedAccountIndex +
                                                                        1}
                                                        </div>
                                                        <div className="text-left">
                                                                <div className="text-sm font-semibold">
                                                                        Account{" "}
                                                                        {selectedAccountIndex +
                                                                                1}
                                                                </div>
                                                                <button
                                                                        onClick={(
                                                                                e
                                                                        ) => {
                                                                                e.stopPropagation()
                                                                                copy(
                                                                                        currentAccount?.address ||
                                                                                                ""
                                                                                )
                                                                        }}
                                                                        className="flex items-center gap-1 text-xs text-[#64748b] hover:text-violet-400 transition-colors"
                                                                >
                                                                        {formatAddress(
                                                                                currentAccount?.address ||
                                                                                        ""
                                                                        )}
                                                                        {copied ? (
                                                                                <CheckIcon
                                                                                        size={
                                                                                                12
                                                                                        }
                                                                                        className="text-green-400"
                                                                                />
                                                                        ) : (
                                                                                <CopyIcon
                                                                                        size={
                                                                                                12
                                                                                        }
                                                                                />
                                                                        )}
                                                                </button>
                                                        </div>
                                                </div>
                                                <ChevronDownIcon
                                                        size={16}
                                                        className="text-[#64748b]"
                                                />
                                        </button>

                                        {showAccountSelector && (
                                                <div className="absolute top-full left-0 right-0 mt-2 glass-card p-2 z-40 animate-slide-up max-h-48 overflow-y-auto">
                                                        {accounts.map(
                                                                (acc, idx) => (
                                                                        <button
                                                                                key={
                                                                                        acc.index
                                                                                }
                                                                                onClick={() => {
                                                                                        setSelectedAccountIndex(
                                                                                                idx
                                                                                        )
                                                                                        setShowAccountSelector(
                                                                                                false
                                                                                        )
                                                                                }}
                                                                                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                                                                                        selectedAccountIndex ===
                                                                                        idx
                                                                                                ? "bg-[#1a1a24]"
                                                                                                : "hover:bg-[#12121a]"
                                                                                }`}
                                                                        >
                                                                                <div
                                                                                        className={`w-8 h-8 rounded-full bg-gradient-to-br ${config.gradient} flex items-center justify-center text-white font-bold text-xs`}
                                                                                >
                                                                                        {idx +
                                                                                                1}
                                                                                </div>
                                                                                <div className="text-left flex-1">
                                                                                        <div className="text-sm font-medium">
                                                                                                Account{" "}
                                                                                                {idx +
                                                                                                        1}
                                                                                        </div>
                                                                                        <div className="text-xs text-[#64748b]">
                                                                                                {formatAddress(
                                                                                                        acc.address
                                                                                                )}
                                                                                        </div>
                                                                                </div>
                                                                                <div className="text-right">
                                                                                        <div className="text-sm font-mono">
                                                                                                {loading ? (
                                                                                                        <div className="w-12 h-4 skeleton" />
                                                                                                ) : (
                                                                                                        (
                                                                                                                balances[
                                                                                                                        acc
                                                                                                                                .address
                                                                                                                ] ??
                                                                                                                0
                                                                                                        ).toFixed(
                                                                                                                4
                                                                                                        )
                                                                                                )}
                                                                                        </div>
                                                                                        <div className="text-xs text-[#64748b]">
                                                                                                {
                                                                                                        config.symbol
                                                                                                }
                                                                                        </div>
                                                                                </div>
                                                                        </button>
                                                                )
                                                        )}

                                                        {/* Add Account Button */}
                                                        <button
                                                                onClick={() => {
                                                                        onAddAccount(
                                                                                activeChain
                                                                        )
                                                                        setShowAccountSelector(
                                                                                false
                                                                        )
                                                                }}
                                                                className="w-full flex items-center gap-3 px-3 py-2.5 mt-1 rounded-lg border border-dashed border-[rgba(148,163,184,0.2)] hover:border-violet-500/50 hover:bg-[#12121a] transition-all text-[#64748b] hover:text-white"
                                                        >
                                                                <div className="w-8 h-8 rounded-full border border-dashed border-[rgba(148,163,184,0.3)] flex items-center justify-center">
                                                                        <PlusIcon
                                                                                size={
                                                                                        14
                                                                                }
                                                                        />
                                                                </div>
                                                                <span className="text-sm font-medium">
                                                                        Add New
                                                                        Account
                                                                </span>
                                                        </button>
                                                </div>
                                        )}
                                </div>
                        </div>

                        {/* Balance Card */}
                        <div className="px-4 mb-4">
                                <div
                                        className={`glass-card p-6 bg-gradient-to-br ${config.bgGradient} relative overflow-hidden`}
                                >
                                        {/* Decorative elements */}
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
                                        <div className="absolute bottom-0 left-0 w-20 h-20 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

                                        <div className="relative z-10">
                                                <div className="flex items-center gap-2 mb-2">
                                                        <span className="text-[#94a3b8] text-sm">
                                                                Total Balance
                                                        </span>
                                                        <button
                                                                onClick={() => {
                                                                        if (
                                                                                currentAccount
                                                                        ) {
                                                                                setLoading(
                                                                                        true
                                                                                )
                                                                                const fetchFn =
                                                                                        activeChain ===
                                                                                        "eth"
                                                                                                ? getEthBalance
                                                                                                : activeChain ===
                                                                                                    "sol"
                                                                                                  ? getSolBalance
                                                                                                  : getBitcoinBalance
                                                                                fetchFn(
                                                                                        currentAccount.address
                                                                                ).then(
                                                                                        (
                                                                                                bal
                                                                                        ) => {
                                                                                                setBalances(
                                                                                                        (
                                                                                                                prev
                                                                                                        ) => ({
                                                                                                                ...prev,
                                                                                                                [currentAccount.address]:
                                                                                                                        bal,
                                                                                                        })
                                                                                                )
                                                                                                setLoading(
                                                                                                        false
                                                                                                )
                                                                                        }
                                                                                )
                                                                        }
                                                                }}
                                                                className="text-[#64748b] hover:text-white transition-colors"
                                                        >
                                                                <RefreshIcon
                                                                        size={
                                                                                14
                                                                        }
                                                                        className={
                                                                                loading
                                                                                        ? "animate-spin"
                                                                                        : ""
                                                                        }
                                                                />
                                                        </button>
                                                </div>
                                                <div className="flex items-baseline gap-2 mb-1">
                                                        {loading ? (
                                                                <div className="w-32 h-10 skeleton" />
                                                        ) : (
                                                                <>
                                                                        <span className="text-4xl font-bold">
                                                                                {currentBalance.toFixed(
                                                                                        4
                                                                                )}
                                                                        </span>
                                                                        <span className="text-lg text-[#94a3b8]">
                                                                                {
                                                                                        config.symbol
                                                                                }
                                                                        </span>
                                                                </>
                                                        )}
                                                </div>
                                                <div className="text-sm text-[#64748b]">
                                                        ≈ $
                                                        {(
                                                                currentBalance *
                                                                (activeChain ===
                                                                "eth"
                                                                        ? 2500
                                                                        : activeChain ===
                                                                            "sol"
                                                                          ? 150
                                                                          : 45000)
                                                        ).toFixed(2)}{" "}
                                                        USD
                                                </div>
                                        </div>
                                </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="px-4 mb-6">
                                <div className="flex gap-3">
                                        <button
                                                onClick={() =>
                                                        setShowSendModal(true)
                                                }
                                                className="flex-1 flex flex-col items-center gap-2 p-4 glass-card-sm hover:bg-[#1a1a24] transition-all group"
                                        >
                                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                                                        <SendIcon
                                                                size={20}
                                                                className="text-white"
                                                        />
                                                </div>
                                                <span className="text-sm font-medium">
                                                        Send
                                                </span>
                                        </button>

                                        <button
                                                onClick={() =>
                                                        setShowReceiveModal(
                                                                true
                                                        )
                                                }
                                                className="flex-1 flex flex-col items-center gap-2 p-4 glass-card-sm hover:bg-[#1a1a24] transition-all group"
                                        >
                                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                                                        <ReceiveIcon
                                                                size={20}
                                                                className="text-white"
                                                        />
                                                </div>
                                                <span className="text-sm font-medium">
                                                        Receive
                                                </span>
                                        </button>

                                        {activeChain === "sol" && (
                                                <button
                                                        onClick={handleAirdrop}
                                                        disabled={isAirdropping}
                                                        className="flex-1 flex flex-col items-center gap-2 p-4 glass-card-sm hover:bg-[#1a1a24] transition-all group disabled:opacity-50"
                                                >
                                                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-green-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                                                                {isAirdropping ? (
                                                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                                ) : (
                                                                        <AirdropIcon
                                                                                size={
                                                                                        20
                                                                                }
                                                                                className="text-white"
                                                                        />
                                                                )}
                                                        </div>
                                                        <span className="text-sm font-medium">
                                                                Airdrop
                                                        </span>
                                                </button>
                                        )}
                                </div>
                        </div>

                        {/* Transactions / Activity placeholder */}
                        <div className="flex-1 px-4 overflow-y-auto">
                                <div className="flex items-center justify-between mb-3">
                                        <h3 className="text-sm font-semibold text-[#94a3b8]">
                                                Recent Activity
                                        </h3>
                                </div>
                                <div className="glass-card-sm p-8 flex flex-col items-center justify-center text-center">
                                        <div className="w-16 h-16 rounded-full bg-[#1a1a24] flex items-center justify-center mb-4">
                                                <span className="text-3xl">
                                                        📭
                                                </span>
                                        </div>
                                        <p className="text-[#94a3b8] text-sm mb-1">
                                                No transactions yet
                                        </p>
                                        <p className="text-[#64748b] text-xs">
                                                Your transaction history will
                                                appear here
                                        </p>
                                </div>
                        </div>

                        {/* Bottom Navigation */}
                        <nav className="flex items-center justify-around py-3 border-t border-[rgba(148,163,184,0.1)] bg-[#0a0a0f]/80 backdrop-blur-lg">
                                <button className="flex flex-col items-center gap-1 text-violet-400">
                                        <svg
                                                width="20"
                                                height="20"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                        >
                                                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                                                <polyline points="9 22 9 12 15 12 15 22" />
                                        </svg>
                                        <span className="text-xs font-medium">
                                                Home
                                        </span>
                                </button>
                                <button className="flex flex-col items-center gap-1 text-[#64748b] hover:text-white transition-colors">
                                        <svg
                                                width="20"
                                                height="20"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                        >
                                                <circle
                                                        cx="12"
                                                        cy="12"
                                                        r="10"
                                                />
                                                <line
                                                        x1="2"
                                                        y1="12"
                                                        x2="22"
                                                        y2="12"
                                                />
                                                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                                        </svg>
                                        <span className="text-xs">Explore</span>
                                </button>
                                <button className="flex flex-col items-center gap-1 text-[#64748b] hover:text-white transition-colors">
                                        <svg
                                                width="20"
                                                height="20"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                        >
                                                <circle cx="12" cy="12" r="3" />
                                                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                                        </svg>
                                        <span className="text-xs">
                                                Settings
                                        </span>
                                </button>
                        </nav>

                        {/* Modals */}
                        {showSendModal && currentAccount && (
                                <SendModal
                                        chain={activeChain}
                                        account={currentAccount}
                                        onClose={() => setShowSendModal(false)}
                                />
                        )}

                        {showReceiveModal && currentAccount && (
                                <ReceiveModal
                                        address={currentAccount.address}
                                        chain={activeChain}
                                        onClose={() =>
                                                setShowReceiveModal(false)
                                        }
                                />
                        )}

                        {showSecretPhrase && (
                                <SecretPhraseModal
                                        mnemonic={wallet.mnemonic}
                                        onClose={() =>
                                                setShowSecretPhrase(false)
                                        }
                                />
                        )}

                        {/* Click outside to close dropdowns */}
                        {(showChainSelector || showAccountSelector) && (
                                <div
                                        className="fixed inset-0 z-30"
                                        onClick={() => {
                                                setShowChainSelector(false)
                                                setShowAccountSelector(false)
                                        }}
                                />
                        )}
                </div>
        )
}
