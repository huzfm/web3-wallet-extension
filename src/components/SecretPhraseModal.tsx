import { useState } from "react"
import { useCopy } from "../hooks/useCopy"

type Props = {
        mnemonic: string
        onClose: () => void
}

export function SecretPhraseModal({ mnemonic, onClose }: Props) {
        const [revealed, setRevealed] = useState(false)
        const { copied, copy } = useCopy()

        const words = mnemonic.split(" ")

        return (
                <div className="fixed inset-0 z-50 flex items-end justify-center">
                        {/* Backdrop */}
                        <div
                                className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                                onClick={onClose}
                        />

                        {/* Modal */}
                        <div className="relative w-full max-w-[375px] bg-zinc-950 border-t border-zinc-800 rounded-t-2xl animate-slide-up max-h-[90vh] overflow-y-auto">
                                {/* Handle */}
                                <div className="flex justify-center pt-3 pb-2">
                                        <div className="w-10 h-1 rounded-full bg-zinc-700" />
                                </div>

                                {/* Header */}
                                <div className="px-5 pb-4 flex items-center justify-between">
                                        <div>
                                                <h2 className="text-lg font-semibold text-white">
                                                        Secret phrase
                                                </h2>
                                                <p className="text-sm text-zinc-500">
                                                        Your 12-word recovery
                                                        phrase
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
                                        {/* Warning Banner */}
                                        <div className="mb-4 p-4 rounded-xl bg-amber-500/5 border border-amber-500/20">
                                                <div className="flex gap-3">
                                                        <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center flex-shrink-0">
                                                                <svg
                                                                        width="16"
                                                                        height="16"
                                                                        viewBox="0 0 24 24"
                                                                        fill="none"
                                                                        stroke="#f59e0b"
                                                                        strokeWidth="2"
                                                                >
                                                                        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                                                                        <line
                                                                                x1="12"
                                                                                y1="9"
                                                                                x2="12"
                                                                                y2="13"
                                                                        />
                                                                        <line
                                                                                x1="12"
                                                                                y1="17"
                                                                                x2="12.01"
                                                                                y2="17"
                                                                        />
                                                                </svg>
                                                        </div>
                                                        <div>
                                                                <h4 className="font-medium text-amber-400 text-sm mb-0.5">
                                                                        Keep it
                                                                        safe
                                                                </h4>
                                                                <p className="text-xs text-zinc-500 leading-relaxed">
                                                                        Never
                                                                        share
                                                                        this
                                                                        phrase
                                                                        with
                                                                        anyone.
                                                                        Anyone
                                                                        with
                                                                        this
                                                                        phrase
                                                                        can
                                                                        access
                                                                        your
                                                                        wallet.
                                                                </p>
                                                        </div>
                                                </div>
                                        </div>

                                        {/* Reveal Button or Word Grid */}
                                        {!revealed ? (
                                                <button
                                                        onClick={() =>
                                                                setRevealed(
                                                                        true
                                                                )
                                                        }
                                                        className="w-full p-8 rounded-xl bg-zinc-900 border border-zinc-800 flex flex-col items-center justify-center gap-3 hover:bg-zinc-800/50 transition-all mb-4"
                                                >
                                                        <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center">
                                                                <svg
                                                                        width="20"
                                                                        height="20"
                                                                        viewBox="0 0 24 24"
                                                                        fill="none"
                                                                        stroke="#a1a1aa"
                                                                        strokeWidth="2"
                                                                >
                                                                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                                                        <circle
                                                                                cx="12"
                                                                                cy="12"
                                                                                r="3"
                                                                        />
                                                                </svg>
                                                        </div>
                                                        <span className="text-sm font-medium text-zinc-400">
                                                                Tap to reveal
                                                        </span>
                                                </button>
                                        ) : (
                                                <>
                                                        {/* Hide Button */}
                                                        <button
                                                                onClick={() =>
                                                                        setRevealed(
                                                                                false
                                                                        )
                                                                }
                                                                className="w-full flex items-center justify-center gap-2 text-xs text-zinc-500 hover:text-zinc-300 transition-colors mb-4"
                                                        >
                                                                <svg
                                                                        width="14"
                                                                        height="14"
                                                                        viewBox="0 0 24 24"
                                                                        fill="none"
                                                                        stroke="currentColor"
                                                                        strokeWidth="2"
                                                                >
                                                                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                                                                        <line
                                                                                x1="1"
                                                                                y1="1"
                                                                                x2="23"
                                                                                y2="23"
                                                                        />
                                                                </svg>
                                                                Hide phrase
                                                        </button>

                                                        {/* Word Grid */}
                                                        <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 mb-4">
                                                                <div className="grid grid-cols-3 gap-2">
                                                                        {words.map(
                                                                                (
                                                                                        word,
                                                                                        index
                                                                                ) => (
                                                                                        <div
                                                                                                key={
                                                                                                        index
                                                                                                }
                                                                                                className="flex items-center gap-2 px-3 py-2.5 rounded-lg bg-zinc-950 border border-zinc-800"
                                                                                        >
                                                                                                <span className="text-[10px] text-zinc-600 w-4">
                                                                                                        {index +
                                                                                                                1}
                                                                                                </span>
                                                                                                <span className="text-sm font-medium text-white">
                                                                                                        {
                                                                                                                word
                                                                                                        }
                                                                                                </span>
                                                                                        </div>
                                                                                )
                                                                        )}
                                                                </div>
                                                        </div>

                                                        {/* Copy Button */}
                                                        <button
                                                                onClick={() =>
                                                                        copy(
                                                                                mnemonic
                                                                        )
                                                                }
                                                                className="w-full h-11 rounded-xl border border-zinc-800 text-zinc-400 font-medium text-sm transition-all hover:bg-zinc-900 hover:text-white flex items-center justify-center gap-2"
                                                        >
                                                                {copied ? (
                                                                        <>
                                                                                <svg
                                                                                        width="14"
                                                                                        height="14"
                                                                                        viewBox="0 0 24 24"
                                                                                        fill="none"
                                                                                        stroke="#10b981"
                                                                                        strokeWidth="2.5"
                                                                                >
                                                                                        <polyline points="20 6 9 17 4 12" />
                                                                                </svg>
                                                                                <span className="text-emerald-400">
                                                                                        Copied!
                                                                                </span>
                                                                        </>
                                                                ) : (
                                                                        <>
                                                                                <svg
                                                                                        width="14"
                                                                                        height="14"
                                                                                        viewBox="0 0 24 24"
                                                                                        fill="none"
                                                                                        stroke="currentColor"
                                                                                        strokeWidth="2"
                                                                                >
                                                                                        <rect
                                                                                                x="9"
                                                                                                y="9"
                                                                                                width="13"
                                                                                                height="13"
                                                                                                rx="2"
                                                                                        />
                                                                                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                                                                                </svg>
                                                                                Copy
                                                                                to
                                                                                clipboard
                                                                        </>
                                                                )}
                                                        </button>
                                                </>
                                        )}

                                        {/* Security Tips */}
                                        <div className="mt-4 p-4 rounded-xl bg-zinc-900/50 border border-zinc-800/50">
                                                <h4 className="text-xs font-medium text-zinc-500 mb-3">
                                                        Tips
                                                </h4>
                                                <ul className="space-y-2">
                                                        {[
                                                                "Write it down and store in a safe place",
                                                                "Never share with anyone",
                                                                "Never enter on unknown websites",
                                                        ].map((tip, i) => (
                                                                <li
                                                                        key={i}
                                                                        className="flex items-start gap-2 text-xs text-zinc-600"
                                                                >
                                                                        <span className="text-violet-400/70 mt-0.5">
                                                                                •
                                                                        </span>
                                                                        {tip}
                                                                </li>
                                                        ))}
                                                </ul>
                                        </div>
                                </div>
                        </div>
                </div>
        )
}
