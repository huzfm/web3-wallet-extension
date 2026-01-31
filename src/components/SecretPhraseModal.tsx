import { useState } from "react"
import {
        CloseIcon,
        CopyIcon,
        CheckIcon,
        EyeIcon,
        EyeOffIcon,
} from "./icons/ChainIcons"
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
                <div className="fixed inset-0 z-50 flex items-end justify-center animate-fade-in">
                        {/* Backdrop */}
                        <div
                                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                                onClick={onClose}
                        />

                        {/* Modal */}
                        <div className="relative w-full max-w-[375px] bg-[#12121a] rounded-t-3xl animate-slide-up max-h-[90vh] overflow-y-auto">
                                {/* Header */}
                                <div className="flex items-center justify-between p-4 border-b border-[rgba(148,163,184,0.1)]">
                                        <h2 className="text-lg font-semibold">
                                                Secret Recovery Phrase
                                        </h2>
                                        <button
                                                onClick={onClose}
                                                className="p-2 rounded-lg hover:bg-[#1a1a24] transition-colors text-[#64748b] hover:text-white"
                                        >
                                                <CloseIcon size={20} />
                                        </button>
                                </div>

                                {/* Content */}
                                <div className="p-4">
                                        {/* Warning Banner */}
                                        <div className="mb-4 p-4 rounded-xl bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20">
                                                <div className="flex gap-3">
                                                        <span className="text-2xl">
                                                                ⚠️
                                                        </span>
                                                        <div>
                                                                <h4 className="font-semibold text-amber-400 text-sm mb-1">
                                                                        Keep it
                                                                        secret,
                                                                        keep it
                                                                        safe!
                                                                </h4>
                                                                <p className="text-xs text-[#94a3b8]">
                                                                        Anyone
                                                                        with
                                                                        this
                                                                        phrase
                                                                        can
                                                                        access
                                                                        your
                                                                        wallet
                                                                        and
                                                                        steal
                                                                        your
                                                                        funds.
                                                                        Never
                                                                        share it
                                                                        with
                                                                        anyone.
                                                                </p>
                                                        </div>
                                                </div>
                                        </div>

                                        {/* Reveal Button */}
                                        {!revealed ? (
                                                <button
                                                        onClick={() =>
                                                                setRevealed(
                                                                        true
                                                                )
                                                        }
                                                        className="w-full p-6 rounded-xl glass-card-sm flex flex-col items-center justify-center gap-3 hover:bg-[#1a1a24] transition-all mb-4"
                                                >
                                                        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-violet-500/20 to-purple-500/20 flex items-center justify-center">
                                                                <EyeIcon
                                                                        size={
                                                                                24
                                                                        }
                                                                        className="text-violet-400"
                                                                />
                                                        </div>
                                                        <span className="text-sm font-medium text-violet-400">
                                                                Tap to reveal
                                                                secret phrase
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
                                                                className="w-full flex items-center justify-center gap-2 text-sm text-[#64748b] hover:text-white transition-colors mb-4"
                                                        >
                                                                <EyeOffIcon
                                                                        size={
                                                                                16
                                                                        }
                                                                />
                                                                Hide phrase
                                                        </button>

                                                        {/* Word Grid */}
                                                        <div className="glass-card p-4 mb-4">
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
                                                                                                className="flex items-center gap-2 p-2.5 rounded-lg bg-[#0a0a0f] border border-[rgba(148,163,184,0.1)]"
                                                                                        >
                                                                                                <span className="text-xs text-[#64748b] w-4">
                                                                                                        {index +
                                                                                                                1}
                                                                                                </span>
                                                                                                <span className="text-sm font-medium">
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
                                                                className="w-full py-3 rounded-xl border border-[rgba(148,163,184,0.2)] text-[#94a3b8] font-medium hover:bg-[#1a1a24] hover:text-white hover:border-violet-500/50 transition-all flex items-center justify-center gap-2"
                                                        >
                                                                {copied ? (
                                                                        <>
                                                                                <CheckIcon
                                                                                        size={
                                                                                                16
                                                                                        }
                                                                                        className="text-green-400"
                                                                                />
                                                                                <span className="text-green-400">
                                                                                        Copied
                                                                                        to
                                                                                        clipboard
                                                                                </span>
                                                                        </>
                                                                ) : (
                                                                        <>
                                                                                <CopyIcon
                                                                                        size={
                                                                                                16
                                                                                        }
                                                                                />
                                                                                Copy
                                                                                to
                                                                                clipboard
                                                                        </>
                                                                )}
                                                        </button>
                                                </>
                                        )}

                                        {/* Security Tips */}
                                        <div className="mt-4 p-4 rounded-xl bg-[#0a0a0f]">
                                                <h4 className="text-sm font-semibold mb-3 text-[#94a3b8]">
                                                        Security Tips
                                                </h4>
                                                <ul className="space-y-2 text-xs text-[#64748b]">
                                                        <li className="flex items-start gap-2">
                                                                <span className="text-violet-400 mt-0.5">
                                                                        •
                                                                </span>
                                                                Write it down on
                                                                paper and store
                                                                it in a safe
                                                                place
                                                        </li>
                                                        <li className="flex items-start gap-2">
                                                                <span className="text-violet-400 mt-0.5">
                                                                        •
                                                                </span>
                                                                Never share your
                                                                recovery phrase
                                                                with anyone
                                                        </li>
                                                        <li className="flex items-start gap-2">
                                                                <span className="text-violet-400 mt-0.5">
                                                                        •
                                                                </span>
                                                                Never enter it
                                                                on any website
                                                                other than this
                                                                extension
                                                        </li>
                                                </ul>
                                        </div>
                                </div>

                                {/* Safe area padding for mobile */}
                                <div className="h-6" />
                        </div>
                </div>
        )
}
