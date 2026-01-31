import { CloseIcon, CopyIcon, CheckIcon } from "./icons/ChainIcons"
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

        // Generate a simple pattern for the QR code simulation
        const generateQRPattern = () => {
                const rows = []
                for (let i = 0; i < 21; i++) {
                        const cols = []
                        for (let j = 0; j < 21; j++) {
                                // Create positioning patterns in corners
                                const isPositionPattern =
                                        (i < 7 && j < 7) ||
                                        (i < 7 && j >= 14) ||
                                        (i >= 14 && j < 7)

                                // Create border for position patterns
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

                                // Create inner square for position patterns
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

                                // Random-ish data pattern based on address
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
                                                className={`w-2 h-2 ${shouldFill ? "bg-white" : "bg-transparent"}`}
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
                                                Receive {config.symbol}
                                        </h2>
                                        <button
                                                onClick={onClose}
                                                className="p-2 rounded-lg hover:bg-[#1a1a24] transition-colors text-[#64748b] hover:text-white"
                                        >
                                                <CloseIcon size={20} />
                                        </button>
                                </div>

                                {/* Content */}
                                <div className="p-6 flex flex-col items-center">
                                        {/* QR Code */}
                                        <div className="mb-6">
                                                <div
                                                        className="p-4 rounded-2xl"
                                                        style={{
                                                                background: config.color,
                                                        }}
                                                >
                                                        <div className="p-3 bg-[#0a0a0f] rounded-xl">
                                                                <div className="flex flex-col">
                                                                        {generateQRPattern()}
                                                                </div>
                                                        </div>
                                                </div>
                                        </div>

                                        {/* Network Badge */}
                                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1a1a24] mb-4">
                                                <div
                                                        className="w-2 h-2 rounded-full"
                                                        style={{
                                                                background: config.color,
                                                        }}
                                                />
                                                <span className="text-sm text-[#94a3b8]">
                                                        {config.name} Network
                                                </span>
                                        </div>

                                        {/* Address */}
                                        <div className="w-full glass-card-sm p-4 mb-4">
                                                <p className="text-xs text-[#64748b] mb-2 text-center">
                                                        Your {config.symbol}{" "}
                                                        Address
                                                </p>
                                                <p className="text-sm font-mono text-center break-all leading-relaxed">
                                                        {address}
                                                </p>
                                        </div>

                                        {/* Copy Button */}
                                        <button
                                                onClick={() => copy(address)}
                                                className="gradient-btn w-full py-3 flex items-center justify-center gap-2"
                                        >
                                                {copied ? (
                                                        <>
                                                                <CheckIcon
                                                                        size={
                                                                                18
                                                                        }
                                                                        className="text-white"
                                                                />
                                                                Copied!
                                                        </>
                                                ) : (
                                                        <>
                                                                <CopyIcon
                                                                        size={
                                                                                18
                                                                        }
                                                                />
                                                                Copy Address
                                                        </>
                                                )}
                                        </button>

                                        {/* Warning */}
                                        <p className="text-xs text-[#64748b] text-center mt-4">
                                                Only send {config.symbol} to
                                                this address. Sending other
                                                assets may result in permanent
                                                loss.
                                        </p>
                                </div>

                                {/* Safe area padding for mobile */}
                                <div className="h-6" />
                        </div>
                </div>
        )
}
