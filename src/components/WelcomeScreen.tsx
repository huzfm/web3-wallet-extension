import { WalletIcon } from "./icons/ChainIcons"

type Props = {
        onCreate: () => void
        isCreating: boolean
}

export function WelcomeScreen({ onCreate, isCreating }: Props) {
        return (
                <div className="flex flex-col items-center justify-center h-full px-6 animate-fade-in">
                        {/* Logo and branding */}
                        <div className="mb-8 text-center">
                                <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-violet-500 via-purple-500 to-pink-500 mb-6 animate-float">
                                        <WalletIcon
                                                size={40}
                                                className="text-white"
                                        />
                                </div>
                                <h1 className="text-3xl font-bold mb-2 gradient-text">
                                        MultiChain
                                </h1>
                                <p className="text-[#94a3b8] text-sm">
                                        Your gateway to multi-chain crypto
                                </p>
                        </div>

                        {/* Features list */}
                        <div className="w-full max-w-xs mb-8">
                                <div className="glass-card p-4 space-y-3">
                                        <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-violet-500/20 to-purple-500/20 flex items-center justify-center"></div>
                                                <div>
                                                        <div className="text-sm font-medium text-white">
                                                                Secure Storage
                                                        </div>
                                                        <div className="text-xs text-[#64748b]">
                                                                Your keys, your
                                                                crypto
                                                        </div>
                                                </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-500/20 to-cyan-500/20 flex items-center justify-center"></div>
                                                <div>
                                                        <div className="text-sm font-medium text-white">
                                                                Multi-Chain
                                                        </div>
                                                        <div className="text-xs text-[#64748b]">
                                                                ETH, SOL, BTC
                                                                supported
                                                        </div>
                                                </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-emerald-500/20 to-green-500/20 flex items-center justify-center"></div>
                                                <div>
                                                        <div className="text-sm font-medium text-white">
                                                                Fast & Simple
                                                        </div>
                                                        <div className="text-xs text-[#64748b]">
                                                                Get started in
                                                                seconds
                                                        </div>
                                                </div>
                                        </div>
                                </div>
                        </div>

                        {/* Action buttons */}
                        <div className="w-full max-w-xs space-y-3">
                                <button
                                        onClick={onCreate}
                                        disabled={isCreating}
                                        className="gradient-btn w-full py-4 text-base font-semibold flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                                >
                                        {isCreating ? (
                                                <>
                                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                        Creating wallet...
                                                </>
                                        ) : (
                                                "Create New Wallet"
                                        )}
                                </button>

                                <button className="w-full py-4 rounded-xl border border-[rgba(148,163,184,0.2)] text-[#94a3b8] font-medium hover:bg-[#1a1a24] hover:text-white hover:border-[rgba(139,92,246,0.5)] transition-all duration-200">
                                        Import Existing Wallet
                                </button>
                        </div>

                        {/* Footer */}
                        <div className="absolute bottom-6 text-center">
                                <p className="text-[11px] text-[#64748b]">
                                        By continuing, you agree to our Terms of
                                        Service
                                </p>
                        </div>
                </div>
        )
}
