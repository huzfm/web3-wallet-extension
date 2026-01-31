import { useState } from "react"
import { CloseIcon, SendIcon } from "./icons/ChainIcons"
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
                                // For ETH and BTC, show not implemented yet
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
                <div className="fixed inset-0 z-50 flex items-end justify-center animate-fade-in">
                        {/* Backdrop */}
                        <div
                                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                                onClick={onClose}
                        />

                        {/* Modal */}
                        <div className="relative w-full max-w-[375px] bg-[#12121a] rounded-t-3xl animate-slide-up">
                                {/* Header */}
                                <div className="flex items-center justify-between p-4 border-b border-[rgba(148,163,184,0.1)]">
                                        <h2 className="text-lg font-semibold">
                                                Send {config.symbol}
                                        </h2>
                                        <button
                                                onClick={onClose}
                                                className="p-2 rounded-lg hover:bg-[#1a1a24] transition-colors text-[#64748b] hover:text-white"
                                        >
                                                <CloseIcon size={20} />
                                        </button>
                                </div>

                                {/* Content */}
                                <div className="p-4 space-y-4">
                                        {success ? (
                                                <div className="text-center py-6">
                                                        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-emerald-500 to-green-500 flex items-center justify-center">
                                                                <svg
                                                                        width="32"
                                                                        height="32"
                                                                        viewBox="0 0 24 24"
                                                                        fill="none"
                                                                        stroke="white"
                                                                        strokeWidth="3"
                                                                >
                                                                        <polyline points="20 6 9 17 4 12" />
                                                                </svg>
                                                        </div>
                                                        <h3 className="text-xl font-bold mb-2">
                                                                Transaction
                                                                Sent!
                                                        </h3>
                                                        <p className="text-[#94a3b8] text-sm mb-4">
                                                                Successfully
                                                                sent {amount}{" "}
                                                                {config.symbol}
                                                        </p>
                                                        {txHash && (
                                                                <div className="glass-card-sm p-3">
                                                                        <p className="text-xs text-[#64748b] mb-1">
                                                                                Transaction
                                                                                ID
                                                                        </p>
                                                                        <p className="text-xs font-mono text-violet-400 break-all">
                                                                                {txHash.slice(
                                                                                        0,
                                                                                        20
                                                                                )}
                                                                                ...
                                                                                {txHash.slice(
                                                                                        -20
                                                                                )}
                                                                        </p>
                                                                </div>
                                                        )}
                                                        <button
                                                                onClick={
                                                                        onClose
                                                                }
                                                                className="gradient-btn w-full mt-4 py-3"
                                                        >
                                                                Done
                                                        </button>
                                                </div>
                                        ) : (
                                                <>
                                                        {/* From */}
                                                        <div>
                                                                <label className="block text-sm text-[#94a3b8] mb-2">
                                                                        From
                                                                </label>
                                                                <div className="glass-card-sm p-3 flex items-center gap-3">
                                                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white font-bold">
                                                                                {parseInt(
                                                                                        account.index
                                                                                ) +
                                                                                        1}
                                                                        </div>
                                                                        <div>
                                                                                <div className="text-sm font-medium">
                                                                                        Account{" "}
                                                                                        {parseInt(
                                                                                                account.index
                                                                                        ) +
                                                                                                1}
                                                                                </div>
                                                                                <div className="text-xs text-[#64748b]">
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
                                                        <div>
                                                                <label className="block text-sm text-[#94a3b8] mb-2">
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
                                                                        className="input-premium"
                                                                />
                                                        </div>

                                                        {/* Amount */}
                                                        <div>
                                                                <label className="block text-sm text-[#94a3b8] mb-2">
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
                                                                                className="input-premium pr-16"
                                                                        />
                                                                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#64748b] font-medium">
                                                                                {
                                                                                        config.symbol
                                                                                }
                                                                        </span>
                                                                </div>
                                                        </div>

                                                        {/* Error */}
                                                        {error && (
                                                                <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
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
                                                                className="gradient-btn w-full py-4 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                                        >
                                                                {sending ? (
                                                                        <>
                                                                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                                                Sending...
                                                                        </>
                                                                ) : (
                                                                        <>
                                                                                <SendIcon
                                                                                        size={
                                                                                                18
                                                                                        }
                                                                                />
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

                                {/* Safe area padding for mobile */}
                                <div className="h-6" />
                        </div>
                </div>
        )
}
