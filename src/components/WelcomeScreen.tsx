import { useState } from "react"
import { WalletIcon } from "./icons/ChainIcons"

type Props = {
        onCreate: () => void
        isCreating: boolean
}

export function WelcomeScreen({ onCreate, isCreating }: Props) {
        const [importMode, setImportMode] = useState(false)

        return (
                <div className="flex flex-col h-full bg-[#0a0a0f]">
                        {/* Gradient orbs for ambiance */}
                        <div className="absolute inset-0 overflow-hidden pointer-events-none">
                                <div className="absolute -top-24 -right-24 w-64 h-64 bg-violet-600/20 rounded-full blur-[100px]" />
                                <div className="absolute -bottom-32 -left-32 w-72 h-72 bg-purple-600/15 rounded-full blur-[120px]" />
                        </div>

                        {/* Main content */}
                        <div className="relative z-10 flex flex-col items-center justify-center flex-1 px-6">
                                {/* Logo */}
                                <div className="mb-8">
                                        <div className="relative">
                                                <div className="absolute inset-0 bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl blur-xl opacity-50 animate-pulse" />
                                                <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 via-purple-500 to-fuchsia-500 flex items-center justify-center shadow-2xl shadow-violet-500/25">
                                                        <WalletIcon
                                                                size={32}
                                                                className="text-white"
                                                        />
                                                </div>
                                        </div>
                                </div>

                                {/* Title */}
                                <h1 className="text-2xl font-semibold tracking-tight text-white mb-2">
                                        MultiChain Wallet
                                </h1>
                                <p className="text-sm text-zinc-400 mb-10 text-center max-w-[240px]">
                                        A secure, self-custodial wallet for
                                        Ethereum, Solana & Bitcoin
                                </p>

                                {/* Feature pills */}
                                <div className="flex flex-wrap justify-center gap-2 mb-10">
                                        <FeaturePill
                                                icon="shield"
                                                label="Self-Custody"
                                        />
                                        <FeaturePill
                                                icon="chain"
                                                label="Multi-Chain"
                                        />
                                        <FeaturePill
                                                icon="lock"
                                                label="Encrypted"
                                        />
                                </div>

                                {/* Action buttons */}
                                <div className="w-full max-w-[280px] space-y-3">
                                        <button
                                                onClick={onCreate}
                                                disabled={isCreating}
                                                className="group relative w-full h-12 rounded-xl bg-white text-zinc-900 font-medium text-sm transition-all duration-200 hover:bg-zinc-100 disabled:opacity-60 disabled:cursor-not-allowed overflow-hidden"
                                        >
                                                {isCreating ? (
                                                        <span className="flex items-center justify-center gap-2">
                                                                <Spinner />
                                                                Creating...
                                                        </span>
                                                ) : (
                                                        <span className="flex items-center justify-center gap-2">
                                                                Create new
                                                                wallet
                                                                <svg
                                                                        width="16"
                                                                        height="16"
                                                                        viewBox="0 0 24 24"
                                                                        fill="none"
                                                                        stroke="currentColor"
                                                                        strokeWidth="2"
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        className="group-hover:translate-x-0.5 transition-transform"
                                                                >
                                                                        <path d="M5 12h14M12 5l7 7-7 7" />
                                                                </svg>
                                                        </span>
                                                )}
                                        </button>

                                        <button
                                                onClick={() =>
                                                        setImportMode(true)
                                                }
                                                className="w-full h-12 rounded-xl border border-zinc-800 text-zinc-300 font-medium text-sm transition-all duration-200 hover:bg-zinc-900/50 hover:border-zinc-700 hover:text-white"
                                        >
                                                Import existing wallet
                                        </button>
                                </div>
                        </div>

                        {/* Footer */}
                        <div className="relative z-10 pb-6 pt-4 text-center">
                                <p className="text-[11px] text-zinc-600">
                                        By continuing, you agree to our{" "}
                                        <span className="text-zinc-400 hover:text-white cursor-pointer transition-colors">
                                                Terms
                                        </span>
                                </p>
                        </div>

                        {/* Import Modal */}
                        {importMode && (
                                <ImportModal
                                        onClose={() => setImportMode(false)}
                                />
                        )}
                </div>
        )
}

// Feature pill component
function FeaturePill({
        icon,
        label,
}: {
        icon: "shield" | "chain" | "lock"
        label: string
}) {
        const icons = {
                shield: (
                        <svg
                                width="12"
                                height="12"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                        >
                                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                        </svg>
                ),
                chain: (
                        <svg
                                width="12"
                                height="12"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                        >
                                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                        </svg>
                ),
                lock: (
                        <svg
                                width="12"
                                height="12"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                        >
                                <rect
                                        x="3"
                                        y="11"
                                        width="18"
                                        height="11"
                                        rx="2"
                                        ry="2"
                                />
                                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                        </svg>
                ),
        }

        return (
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-900/80 border border-zinc-800 text-zinc-400">
                        {icons[icon]}
                        <span className="text-xs font-medium">{label}</span>
                </div>
        )
}

// Loading spinner
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

// Import wallet modal
function ImportModal({ onClose }: { onClose: () => void }) {
        const [phrase, setPhrase] = useState("")
        const wordCount = phrase.trim().split(/\s+/).filter(Boolean).length

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
                                <div className="px-5 pb-4">
                                        <h2 className="text-lg font-semibold text-white">
                                                Import wallet
                                        </h2>
                                        <p className="text-sm text-zinc-500 mt-1">
                                                Enter your 12 or 24 word
                                                recovery phrase
                                        </p>
                                </div>

                                {/* Content */}
                                <div className="px-5 pb-6">
                                        <div className="relative">
                                                <textarea
                                                        value={phrase}
                                                        onChange={(e) =>
                                                                setPhrase(
                                                                        e.target
                                                                                .value
                                                                )
                                                        }
                                                        placeholder="Enter your secret recovery phrase..."
                                                        rows={4}
                                                        className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-sm placeholder:text-zinc-600 focus:outline-none focus:border-zinc-700 focus:ring-1 focus:ring-zinc-700 resize-none transition-all"
                                                />
                                                <div className="absolute bottom-3 right-3 text-xs text-zinc-600">
                                                        {wordCount}/12
                                                </div>
                                        </div>

                                        <button
                                                disabled={
                                                        wordCount !== 12 &&
                                                        wordCount !== 24
                                                }
                                                className="w-full mt-4 h-12 rounded-xl bg-white text-zinc-900 font-medium text-sm transition-all duration-200 hover:bg-zinc-100 disabled:opacity-40 disabled:cursor-not-allowed"
                                        >
                                                Import
                                        </button>

                                        <button
                                                onClick={onClose}
                                                className="w-full mt-2 h-10 rounded-xl text-zinc-500 font-medium text-sm transition-colors hover:text-zinc-300"
                                        >
                                                Cancel
                                        </button>
                                </div>
                        </div>
                </div>
        )
}
