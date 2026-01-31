import { useState } from "react"
import type { Account } from "../core/walletManager"
import { sendSolana } from "../wallets/sendSol"

type Props = {
        chain: "eth" | "sol" | "btc"
        account: Account
        onClose: () => void
}

const chainConfig = {
        eth: { name: "Ethereum", symbol: "ETH" },
        sol: { name: "Solana", symbol: "SOL" },
        btc: { name: "Bitcoin", symbol: "BTC" },
}

export function SendModal({ chain, account, onClose }: Props) {
        const [recipient, setRecipient] = useState("")
        const [amount, setAmount] = useState("")
        const [sending, setSending] = useState(false)
        const [error, setError] = useState("")
        const [success, setSuccess] = useState(false)
        const [txHash, setTxHash] = useState("")

        const config = chainConfig[chain]

        async function handleSend() {
                if (!recipient || !amount) {
                        setError("Please fill in all fields")
                        return
                }

                const amountNum = parseFloat(amount)
                if (isNaN(amountNum) || amountNum <= 0) {
                        setError("Please enter a valid amount")
                        return
                }

                setSending(true)
                setError("")

                try {
                        if (chain === "sol") {
                                const signature = await sendSolana(
                                        account.privateKey,
                                        recipient,
                                        amountNum
                                )
                                setTxHash(signature)
                                setSuccess(true)
                        } else {
                                setError(
                                        `${config.name} sending is not yet implemented`
                                )
                        }
                } catch (err: any) {
                        setError(err.message || "Transaction failed")
                }

                setSending(false)
        }

        return (
                <div className="fixed inset-0 z-50 flex items-end justify-center">
                        {/* Backdrop */}
                        <div
                                className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                                onClick={onClose}
                        />

                        {/* Modal */}
                        <div className="relative w-full max-w-[375px] bg-zinc-950 border-t border-zinc-800 rounded-t-2xl animate-slide-up">
                                {/* Handle */}
                                <div className="flex justify-center pt-3 pb-2">
                                        <div className="w-10 h-1 rounded-full bg-zinc-700" />
                                </div>

                                {/* Header */}
                                <div className="px-5 pb-4 flex items-center justify-between">
                                        <div>
                                                <h2 className="text-lg font-semibold text-white">
                                                        Send {config.symbol}
                                                </h2>
                                                <p className="text-sm text-zinc-500">
                                                        Transfer to any address
                                                </p>
                                        </div>
                                        <button
                                                onClick={onClose}
                                                className="w-8 h-8 rounded-lg flex items-center justify-center text-zinc-500 hover:text-white hover:bg-zinc-800 transition-all"
                                        >
                                                <svg
                                                        width="18"
                                                        height="18"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        strokeWidth="2"
                                                        strokeLinecap="round"
                                                >
                                                        <path d="M18 6L6 18M6 6l12 12" />
                                                </svg>
                                        </button>
                                </div>

                                {/* Content */}
                                <div className="px-5 pb-6">
                                        {success ? (
                                                <div className="text-center py-8">
                                                        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-emerald-500/10 flex items-center justify-center">
                                                                <svg
                                                                        width="32"
                                                                        height="32"
                                                                        viewBox="0 0 24 24"
                                                                        fill="none"
                                                                        stroke="#10b981"
                                                                        strokeWidth="2.5"
                                                                >
                                                                        <polyline points="20 6 9 17 4 12" />
                                                                </svg>
                                                        </div>
                                                        <h3 className="text-xl font-semibold text-white mb-2">
                                                                Sent
                                                                successfully
                                                        </h3>
                                                        <p className="text-sm text-zinc-500 mb-5">
                                                                {amount}{" "}
                                                                {config.symbol}{" "}
                                                                has been sent
                                                        </p>
                                                        {txHash && (
                                                                <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 mb-5">
                                                                        <p className="text-xs text-zinc-500 mb-1">
                                                                                Transaction
                                                                                ID
                                                                        </p>
                                                                        <p className="text-xs font-mono text-zinc-400 break-all">
                                                                                {txHash.slice(
                                                                                        0,
                                                                                        24
                                                                                )}
                                                                                ...
                                                                                {txHash.slice(
                                                                                        -24
                                                                                )}
                                                                        </p>
                                                                </div>
                                                        )}
                                                        <button
                                                                onClick={
                                                                        onClose
                                                                }
                                                                className="w-full h-12 rounded-xl bg-white text-zinc-900 font-medium text-sm transition-all hover:bg-zinc-100"
                                                        >
                                                                Done
                                                        </button>
                                                </div>
                                        ) : (
                                                <>
                                                        {/* From */}
                                                        <div className="mb-4">
                                                                <label className="block text-xs font-medium text-zinc-500 mb-2">
                                                                        From
                                                                </label>
                                                                <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center gap-3">
                                                                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white font-semibold text-sm">
                                                                                {parseInt(
                                                                                        account.index
                                                                                ) +
                                                                                        1}
                                                                        </div>
                                                                        <div>
                                                                                <div className="text-sm font-medium text-white">
                                                                                        Account{" "}
                                                                                        {parseInt(
                                                                                                account.index
                                                                                        ) +
                                                                                                1}
                                                                                </div>
                                                                                <div className="text-xs text-zinc-500 font-mono">
                                                                                        {account.address.slice(
                                                                                                0,
                                                                                                8
                                                                                        )}
                                                                                        ...
                                                                                        {account.address.slice(
                                                                                                -6
                                                                                        )}
                                                                                </div>
                                                                        </div>
                                                                </div>
                                                        </div>

                                                        {/* To */}
                                                        <div className="mb-4">
                                                                <label className="block text-xs font-medium text-zinc-500 mb-2">
                                                                        To
                                                                </label>
                                                                <input
                                                                        type="text"
                                                                        value={
                                                                                recipient
                                                                        }
                                                                        onChange={(
                                                                                e
                                                                        ) =>
                                                                                setRecipient(
                                                                                        e
                                                                                                .target
                                                                                                .value
                                                                                )
                                                                        }
                                                                        placeholder={`Recipient ${config.name} address`}
                                                                        className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-sm placeholder:text-zinc-600 focus:outline-none focus:border-zinc-700 focus:ring-1 focus:ring-zinc-700 transition-all"
                                                                />
                                                        </div>

                                                        {/* Amount */}
                                                        <div className="mb-4">
                                                                <label className="block text-xs font-medium text-zinc-500 mb-2">
                                                                        Amount
                                                                </label>
                                                                <div className="relative">
                                                                        <input
                                                                                type="text"
                                                                                value={
                                                                                        amount
                                                                                }
                                                                                onChange={(
                                                                                        e
                                                                                ) =>
                                                                                        setAmount(
                                                                                                e
                                                                                                        .target
                                                                                                        .value
                                                                                        )
                                                                                }
                                                                                placeholder="0.00"
                                                                                className="w-full px-4 py-3 pr-16 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-sm placeholder:text-zinc-600 focus:outline-none focus:border-zinc-700 focus:ring-1 focus:ring-zinc-700 transition-all"
                                                                        />
                                                                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-medium text-zinc-500">
                                                                                {
                                                                                        config.symbol
                                                                                }
                                                                        </span>
                                                                </div>
                                                        </div>

                                                        {/* Error */}
                                                        {error && (
                                                                <div className="p-3 mb-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                                                                        {error}
                                                                </div>
                                                        )}

                                                        {/* Submit */}
                                                        <button
                                                                onClick={
                                                                        handleSend
                                                                }
                                                                disabled={
                                                                        sending ||
                                                                        !recipient ||
                                                                        !amount
                                                                }
                                                                className="w-full h-12 rounded-xl bg-white text-zinc-900 font-medium text-sm transition-all hover:bg-zinc-100 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                                        >
                                                                {sending ? (
                                                                        <>
                                                                                <Spinner />
                                                                                Sending...
                                                                        </>
                                                                ) : (
                                                                        <>
                                                                                <svg
                                                                                        width="16"
                                                                                        height="16"
                                                                                        viewBox="0 0 24 24"
                                                                                        fill="none"
                                                                                        stroke="currentColor"
                                                                                        strokeWidth="2"
                                                                                        strokeLinecap="round"
                                                                                >
                                                                                        <path d="M7 17L17 7M17 7H7M17 7V17" />
                                                                                </svg>
                                                                                Send{" "}
                                                                                {
                                                                                        config.symbol
                                                                                }
                                                                        </>
                                                                )}
                                                        </button>
                                                </>
                                        )}
                                </div>
                        </div>
                </div>
        )
}

function Spinner() {
        return (
                <svg
                        className="animate-spin h-4 w-4"
                        viewBox="0 0 24 24"
                        fill="none"
                >
                        <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="3"
                        />
                        <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                </svg>
        )
}
