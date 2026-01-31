import { useCopy } from "../hooks/useCopy"

type Props = {
        address: string
        chain: "eth" | "sol" | "btc"
        onClose: () => void
}

const chainConfig = {
        eth: { name: "Ethereum", symbol: "ETH", color: "#627eea" },
        sol: { name: "Solana", symbol: "SOL", color: "#9945ff" },
        btc: { name: "Bitcoin", symbol: "BTC", color: "#f7931a" },
}

export function ReceiveModal({ address, chain, onClose }: Props) {
        const { copied, copy } = useCopy()
        const config = chainConfig[chain]

        // Generate a deterministic pattern for QR code simulation
        const generateQRPattern = () => {
                const rows = []
                for (let i = 0; i < 21; i++) {
                        const cols = []
                        for (let j = 0; j < 21; j++) {
                                const isPositionPattern =
                                        (i < 7 && j < 7) ||
                                        (i < 7 && j >= 14) ||
                                        (i >= 14 && j < 7)

                                const isPositionBorder =
                                        isPositionPattern &&
                                        (i === 0 ||
                                                i === 6 ||
                                                j === 0 ||
                                                j === 6 ||
                                                (i >= 14 &&
                                                        (i === 14 ||
                                                                i === 20)) ||
                                                (j >= 14 &&
                                                        (j === 14 || j === 20)))

                                const isPositionInner =
                                        isPositionPattern &&
                                        ((i >= 2 &&
                                                i <= 4 &&
                                                j >= 2 &&
                                                j <= 4) ||
                                                (i >= 2 &&
                                                        i <= 4 &&
                                                        j >= 16 &&
                                                        j <= 18) ||
                                                (i >= 16 &&
                                                        i <= 18 &&
                                                        j >= 2 &&
                                                        j <= 4))

                                const charCode = address.charCodeAt(
                                        (i * 21 + j) % address.length
                                )
                                const isData =
                                        !isPositionPattern && charCode % 2 === 0

                                const shouldFill =
                                        isPositionBorder ||
                                        isPositionInner ||
                                        isData

                                cols.push(
                                        <div
                                                key={j}
                                                className={`w-[6px] h-[6px] rounded-[1px] ${shouldFill ? "bg-zinc-900" : "bg-transparent"}`}
                                        />
                                )
                        }
                        rows.push(
                                <div key={i} className="flex">
                                        {cols}
                                </div>
                        )
                }
                return rows
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
                                                        Receive {config.symbol}
                                                </h2>
                                                <p className="text-sm text-zinc-500">
                                                        Scan or copy address
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
                                <div className="px-5 pb-6 flex flex-col items-center">
                                        {/* QR Code */}
                                        <div className="mb-5 p-4 bg-white rounded-2xl">
                                                <div className="flex flex-col">
                                                        {generateQRPattern()}
                                                </div>
                                        </div>

                                        {/* Network Badge */}
                                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 mb-4">
                                                <div
                                                        className="w-2 h-2 rounded-full"
                                                        style={{
                                                                background: config.color,
                                                        }}
                                                />
                                                <span className="text-xs font-medium text-zinc-400">
                                                        {config.name}
                                                </span>
                                        </div>

                                        {/* Address */}
                                        <div className="w-full p-4 rounded-xl bg-zinc-900 border border-zinc-800 mb-4">
                                                <p className="text-xs text-zinc-500 mb-2 text-center">
                                                        Your address
                                                </p>
                                                <p className="text-xs font-mono text-zinc-300 text-center break-all leading-relaxed">
                                                        {address}
                                                </p>
                                        </div>

                                        {/* Copy Button */}
                                        <button
                                                onClick={() => copy(address)}
                                                className="w-full h-12 rounded-xl bg-white text-zinc-900 font-medium text-sm transition-all hover:bg-zinc-100 flex items-center justify-center gap-2"
                                        >
                                                {copied ? (
                                                        <>
                                                                <svg
                                                                        width="16"
                                                                        height="16"
                                                                        viewBox="0 0 24 24"
                                                                        fill="none"
                                                                        stroke="currentColor"
                                                                        strokeWidth="2.5"
                                                                >
                                                                        <polyline points="20 6 9 17 4 12" />
                                                                </svg>
                                                                Copied!
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
                                                                Copy address
                                                        </>
                                                )}
                                        </button>

                                        {/* Warning */}
                                        <p className="text-[11px] text-zinc-600 text-center mt-4 max-w-[260px]">
                                                Only send {config.symbol} to
                                                this address. Sending other
                                                assets may result in permanent
                                                loss.
                                        </p>
                                </div>
                        </div>
                </div>
        )
}
