import { useState, useEffect } from "react"
import type { WalletState } from "../core/walletManager"
import {
        EthereumIcon,
        SolanaIcon,
        BitcoinIcon,
        CopyIcon,
        CheckIcon,
        PlusIcon,
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
                color: "#627eea",
        },
        sol: {
                name: "Solana",
                symbol: "SOL",
                icon: SolanaIcon,
                gradient: "from-[#9945ff] to-[#14f195]",
                color: "#9945ff",
        },
        btc: {
                name: "Bitcoin",
                symbol: "BTC",
                icon: BitcoinIcon,
                gradient: "from-[#f7931a] to-[#ffd93d]",
                color: "#f7931a",
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

        async function refreshBalance() {
                if (!currentAccount) return
                setLoading(true)
                try {
                        const fetchFn =
                                activeChain === "eth"
                                        ? getEthBalance
                                        : activeChain === "sol"
                                          ? getSolBalance
                                          : getBitcoinBalance
                        const bal = await fetchFn(currentAccount.address)
                        setBalances((prev) => ({
                                ...prev,
                                [currentAccount.address]: bal,
                        }))
                } catch (err) {
                        console.error("Failed to refresh:", err)
                }
                setLoading(false)
        }

        const formatAddress = (addr: string) =>
                `${addr.slice(0, 6)}...${addr.slice(-4)}`

        return (
                <div className="flex flex-col h-full bg-[#09090b]">
                        {/* Header */}
                        <header className="flex items-center justify-between px-4 py-3 border-b border-zinc-800/50">
                                {/* Chain Selector */}
                                <div className="relative">
                                        <button
                                                onClick={() =>
                                                        setShowChainSelector(
                                                                !showChainSelector
                                                        )
                                                }
                                                className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-all"
                                        >
                                                <ChainIcon size={22} />
                                                <span className="font-medium text-sm text-white">
                                                        {config.name}
                                                </span>
                                                <ChevronDown className="text-zinc-500" />
                                        </button>

                                        {showChainSelector && (
                                                <div className="absolute top-full left-0 mt-2 w-48 bg-zinc-900 border border-zinc-800 rounded-xl p-1.5 z-50 animate-slide-up shadow-xl shadow-black/20">
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
                                                                                                ? "bg-zinc-800"
                                                                                                : "hover:bg-zinc-800/50"
                                                                                }`}
                                                                        >
                                                                                <Icon
                                                                                        size={
                                                                                                22
                                                                                        }
                                                                                />
                                                                                <span className="font-medium text-sm text-white">
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
                                        className="w-9 h-9 rounded-lg flex items-center justify-center text-zinc-500 hover:text-white hover:bg-zinc-800 transition-all"
                                        title="View Secret Phrase"
                                >
                                        <KeyIcon />
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
                                                className="w-full flex items-center justify-between p-3 rounded-xl bg-zinc-900/50 border border-zinc-800/50 hover:border-zinc-700 transition-all"
                                        >
                                                <div className="flex items-center gap-3">
                                                        <div
                                                                className={`w-10 h-10 rounded-full bg-gradient-to-br ${config.gradient} flex items-center justify-center text-white font-semibold text-sm`}
                                                        >
                                                                {selectedAccountIndex +
                                                                        1}
                                                        </div>
                                                        <div className="text-left">
                                                                <div className="text-sm font-medium text-white">
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
                                                                        className="flex items-center gap-1.5 text-xs text-zinc-500 hover:text-violet-400 transition-colors"
                                                                >
                                                                        <span className="font-mono">
                                                                                {formatAddress(
                                                                                        currentAccount?.address ||
                                                                                                ""
                                                                                )}
                                                                        </span>
                                                                        {copied ? (
                                                                                <CheckIcon
                                                                                        size={
                                                                                                12
                                                                                        }
                                                                                        className="text-emerald-400"
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
                                                <ChevronDown className="text-zinc-500" />
                                        </button>

                                        {showAccountSelector && (
                                                <div className="absolute top-full left-0 right-0 mt-2 bg-zinc-900 border border-zinc-800 rounded-xl p-1.5 z-40 animate-slide-up max-h-52 overflow-y-auto shadow-xl shadow-black/20">
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
                                                                                                ? "bg-zinc-800"
                                                                                                : "hover:bg-zinc-800/50"
                                                                                }`}
                                                                        >
                                                                                <div
                                                                                        className={`w-8 h-8 rounded-full bg-gradient-to-br ${config.gradient} flex items-center justify-center text-white font-semibold text-xs`}
                                                                                >
                                                                                        {idx +
                                                                                                1}
                                                                                </div>
                                                                                <div className="text-left flex-1">
                                                                                        <div className="text-sm font-medium text-white">
                                                                                                Account{" "}
                                                                                                {idx +
                                                                                                        1}
                                                                                        </div>
                                                                                        <div className="text-xs text-zinc-500 font-mono">
                                                                                                {formatAddress(
                                                                                                        acc.address
                                                                                                )}
                                                                                        </div>
                                                                                </div>
                                                                                <div className="text-right">
                                                                                        <div className="text-sm font-mono text-white">
                                                                                                {loading ? (
                                                                                                        <div className="w-12 h-4 rounded bg-zinc-800 animate-pulse" />
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
                                                                                        <div className="text-xs text-zinc-500">
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
                                                                className="w-full flex items-center gap-3 px-3 py-2.5 mt-1 rounded-lg border border-dashed border-zinc-700 hover:border-violet-500/50 hover:bg-zinc-800/30 transition-all text-zinc-500 hover:text-white"
                                                        >
                                                                <div className="w-8 h-8 rounded-full border border-dashed border-zinc-600 flex items-center justify-center">
                                                                        <PlusIcon
                                                                                size={
                                                                                        14
                                                                                }
                                                                        />
                                                                </div>
                                                                <span className="text-sm font-medium">
                                                                        Add
                                                                        account
                                                                </span>
                                                        </button>
                                                </div>
                                        )}
                                </div>
                        </div>

                        {/* Balance Card */}
                        <div className="px-4 mb-4">
                                <div className="relative p-5 rounded-2xl bg-zinc-900/80 border border-zinc-800/50 overflow-hidden">
                                        {/* Subtle gradient accent */}
                                        <div
                                                className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-10 blur-2xl -translate-y-1/2 translate-x-1/2"
                                                style={{
                                                        background: config.color,
                                                }}
                                        />

                                        <div className="relative z-10">
                                                <div className="flex items-center gap-2 mb-3">
                                                        <span className="text-zinc-500 text-sm">
                                                                Balance
                                                        </span>
                                                        <button
                                                                onClick={
                                                                        refreshBalance
                                                                }
                                                                className="text-zinc-600 hover:text-white transition-colors"
                                                        >
                                                                <RefreshIcon
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
                                                                <div className="w-32 h-10 rounded bg-zinc-800 animate-pulse" />
                                                        ) : (
                                                                <>
                                                                        <span className="text-4xl font-semibold text-white tracking-tight">
                                                                                {currentBalance.toFixed(
                                                                                        4
                                                                                )}
                                                                        </span>
                                                                        <span className="text-lg text-zinc-500">
                                                                                {
                                                                                        config.symbol
                                                                                }
                                                                        </span>
                                                                </>
                                                        )}
                                                </div>
                                                <div className="text-sm text-zinc-600">
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
                        <div className="px-4 mb-5">
                                <div className="flex gap-2">
                                        <ActionButton
                                                icon={<SendIcon />}
                                                label="Send"
                                                onClick={() =>
                                                        setShowSendModal(true)
                                                }
                                                gradient="from-violet-500 to-purple-600"
                                        />
                                        <ActionButton
                                                icon={<ReceiveIcon />}
                                                label="Receive"
                                                onClick={() =>
                                                        setShowReceiveModal(
                                                                true
                                                        )
                                                }
                                                gradient="from-blue-500 to-cyan-500"
                                        />
                                        {activeChain === "sol" && (
                                                <ActionButton
                                                        icon={
                                                                isAirdropping ? (
                                                                        <Spinner />
                                                                ) : (
                                                                        <AirdropIcon />
                                                                )
                                                        }
                                                        label="Airdrop"
                                                        onClick={handleAirdrop}
                                                        disabled={isAirdropping}
                                                        gradient="from-emerald-500 to-green-500"
                                                />
                                        )}
                                </div>
                        </div>

                        {/* Activity Section */}
                        <div className="flex-1 px-4 overflow-y-auto">
                                <div className="flex items-center justify-between mb-3">
                                        <h3 className="text-xs font-medium text-zinc-500 uppercase tracking-wider">
                                                Activity
                                        </h3>
                                </div>
                                <div className="p-8 rounded-xl bg-zinc-900/30 border border-zinc-800/30 flex flex-col items-center justify-center text-center">
                                        <div className="w-12 h-12 rounded-full bg-zinc-800/50 flex items-center justify-center mb-3">
                                                <InboxIcon />
                                        </div>
                                        <p className="text-zinc-400 text-sm mb-0.5">
                                                No activity yet
                                        </p>
                                        <p className="text-zinc-600 text-xs">
                                                Transactions will appear here
                                        </p>
                                </div>
                        </div>

                        {/* Bottom Navigation */}
                        <nav className="flex items-center justify-around py-3 border-t border-zinc-800/50 bg-[#09090b]">
                                <NavItem
                                        icon={<HomeIcon />}
                                        label="Home"
                                        active
                                />
                                <NavItem icon={<GlobeIcon />} label="Explore" />
                                <NavItem
                                        icon={<SettingsIcon />}
                                        label="Settings"
                                />
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

// Sub-components
function ActionButton({
        icon,
        label,
        onClick,
        gradient,
        disabled,
}: {
        icon: React.ReactNode
        label: string
        onClick: () => void
        gradient: string
        disabled?: boolean
}) {
        return (
                <button
                        onClick={onClick}
                        disabled={disabled}
                        className="flex-1 flex flex-col items-center gap-2 py-4 rounded-xl bg-zinc-900/50 border border-zinc-800/50 hover:bg-zinc-800/50 hover:border-zinc-700 transition-all group disabled:opacity-50"
                >
                        <div
                                className={`w-10 h-10 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center group-hover:scale-105 transition-transform`}
                        >
                                {icon}
                        </div>
                        <span className="text-xs font-medium text-zinc-300">
                                {label}
                        </span>
                </button>
        )
}

function NavItem({
        icon,
        label,
        active,
}: {
        icon: React.ReactNode
        label: string
        active?: boolean
}) {
        return (
                <button
                        className={`flex flex-col items-center gap-1 ${
                                active
                                        ? "text-white"
                                        : "text-zinc-600 hover:text-zinc-400"
                        } transition-colors`}
                >
                        {icon}
                        <span className="text-[10px] font-medium">{label}</span>
                </button>
        )
}

// Inline SVG Icons
function ChevronDown({ className = "" }: { className?: string }) {
        return (
                <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        className={className}
                >
                        <path d="M6 9l6 6 6-6" />
                </svg>
        )
}

function KeyIcon() {
        return (
                <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                >
                        <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
                </svg>
        )
}

function RefreshIcon({ className = "" }: { className?: string }) {
        return (
                <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        className={className}
                >
                        <path d="M1 4v6h6M23 20v-6h-6" />
                        <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15" />
                </svg>
        )
}

function SendIcon() {
        return (
                <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                >
                        <path d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
        )
}

function ReceiveIcon() {
        return (
                <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                >
                        <path d="M17 7L7 17M7 17H17M7 17V7" />
                </svg>
        )
}

function AirdropIcon() {
        return (
                <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                >
                        <path d="M12 2v13m0 0l-4-4m4 4l4-4M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />
                </svg>
        )
}

function Spinner() {
        return (
                <svg
                        className="animate-spin h-[18px] w-[18px]"
                        viewBox="0 0 24 24"
                        fill="none"
                >
                        <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="white"
                                strokeWidth="3"
                        />
                        <path
                                className="opacity-75"
                                fill="white"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                        />
                </svg>
        )
}

function InboxIcon() {
        return (
                <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#52525b"
                        strokeWidth="1.5"
                >
                        <path d="M22 12h-6l-2 3h-4l-2-3H2" />
                        <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
                </svg>
        )
}

function HomeIcon() {
        return (
                <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                >
                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                        <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
        )
}

function GlobeIcon() {
        return (
                <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                >
                        <circle cx="12" cy="12" r="10" />
                        <line x1="2" y1="12" x2="22" y2="12" />
                        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
        )
}

function SettingsIcon() {
        return (
                <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                >
                        <circle cx="12" cy="12" r="3" />
                        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                </svg>
        )
}
