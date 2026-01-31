// Chain Icons Component - Beautiful SVG icons for each blockchain

export function EthereumIcon({
        size = 24,
        className = "",
}: {
        size?: number
        className?: string
}) {
        return (
                <svg
                        width={size}
                        height={size}
                        viewBox="0 0 32 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className={className}
                >
                        <circle
                                cx="16"
                                cy="16"
                                r="16"
                                fill="url(#eth-gradient)"
                        />
                        <path
                                d="M16 6L15.85 6.51V19.17L16 19.32L21.67 16.06L16 6Z"
                                fill="white"
                                fillOpacity="0.6"
                        />
                        <path d="M16 6L10.33 16.06L16 19.32V6Z" fill="white" />
                        <path
                                d="M16 20.54L15.92 20.64V24.95L16 25.18L21.67 17.28L16 20.54Z"
                                fill="white"
                                fillOpacity="0.6"
                        />
                        <path
                                d="M16 25.18V20.54L10.33 17.28L16 25.18Z"
                                fill="white"
                        />
                        <path
                                d="M16 19.32L21.67 16.06L16 13.17V19.32Z"
                                fill="white"
                                fillOpacity="0.2"
                        />
                        <path
                                d="M10.33 16.06L16 19.32V13.17L10.33 16.06Z"
                                fill="white"
                                fillOpacity="0.5"
                        />
                        <defs>
                                <linearGradient
                                        id="eth-gradient"
                                        x1="0"
                                        y1="0"
                                        x2="32"
                                        y2="32"
                                        gradientUnits="userSpaceOnUse"
                                >
                                        <stop stopColor="#627eea" />
                                        <stop offset="1" stopColor="#3c5cdd" />
                                </linearGradient>
                        </defs>
                </svg>
        )
}

export function SolanaIcon({
        size = 24,
        className = "",
}: {
        size?: number
        className?: string
}) {
        return (
                <svg
                        width={size}
                        height={size}
                        viewBox="0 0 32 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className={className}
                >
                        <circle
                                cx="16"
                                cy="16"
                                r="16"
                                fill="url(#sol-gradient)"
                        />
                        <path
                                d="M10.5 19.64C10.6 19.54 10.74 19.48 10.89 19.48H23.12C23.38 19.48 23.51 19.79 23.32 19.98L20.5 22.8C20.4 22.9 20.26 22.96 20.11 22.96H7.88C7.62 22.96 7.49 22.65 7.68 22.46L10.5 19.64Z"
                                fill="white"
                        />
                        <path
                                d="M10.5 9.2C10.6 9.1 10.74 9.04 10.89 9.04H23.12C23.38 9.04 23.51 9.35 23.32 9.54L20.5 12.36C20.4 12.46 20.26 12.52 20.11 12.52H7.88C7.62 12.52 7.49 12.21 7.68 12.02L10.5 9.2Z"
                                fill="white"
                        />
                        <path
                                d="M20.5 14.37C20.4 14.27 20.26 14.21 20.11 14.21H7.88C7.62 14.21 7.49 14.52 7.68 14.71L10.5 17.53C10.6 17.63 10.74 17.69 10.89 17.69H23.12C23.38 17.69 23.51 17.38 23.32 17.19L20.5 14.37Z"
                                fill="white"
                        />
                        <defs>
                                <linearGradient
                                        id="sol-gradient"
                                        x1="0"
                                        y1="32"
                                        x2="32"
                                        y2="0"
                                        gradientUnits="userSpaceOnUse"
                                >
                                        <stop stopColor="#9945ff" />
                                        <stop offset="1" stopColor="#14f195" />
                                </linearGradient>
                        </defs>
                </svg>
        )
}

export function BitcoinIcon({
        size = 24,
        className = "",
}: {
        size?: number
        className?: string
}) {
        return (
                <svg
                        width={size}
                        height={size}
                        viewBox="0 0 32 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className={className}
                >
                        <circle
                                cx="16"
                                cy="16"
                                r="16"
                                fill="url(#btc-gradient)"
                        />
                        <path
                                d="M21.77 14.35C22.05 12.35 20.49 11.27 18.36 10.55L19.05 7.78L17.37 7.37L16.7 10.06C16.26 9.95 15.81 9.85 15.37 9.75L16.04 7.04L14.36 6.63L13.67 9.4C13.32 9.32 12.97 9.24 12.64 9.15V9.14L10.32 8.56L9.87 10.35C9.87 10.35 11.12 10.63 11.1 10.65C11.79 10.82 11.91 11.27 11.89 11.62L11.1 14.81C11.15 14.82 11.21 14.84 11.28 14.87L11.1 14.83L9.99 19.27C9.91 19.47 9.7 19.77 9.24 19.66C9.25 19.68 8.01 19.37 8.01 19.37L7.2 21.3L9.39 21.85C9.8 21.95 10.2 22.06 10.59 22.16L9.89 24.97L11.57 25.38L12.26 22.61C12.72 22.73 13.16 22.84 13.59 22.95L12.9 25.7L14.58 26.11L15.28 23.31C18.16 23.86 20.31 23.64 21.22 21.04C21.96 18.95 21.19 17.75 19.67 16.97C20.79 16.71 21.63 15.99 21.77 14.35ZM17.99 19.86C17.47 21.95 14.02 20.84 12.89 20.56L13.82 16.83C14.95 17.11 18.53 17.68 17.99 19.86ZM18.52 14.32C18.04 16.24 15.16 15.28 14.22 15.05L15.06 11.69C16 11.92 19.01 12.32 18.52 14.32Z"
                                fill="white"
                        />
                        <defs>
                                <linearGradient
                                        id="btc-gradient"
                                        x1="0"
                                        y1="0"
                                        x2="32"
                                        y2="32"
                                        gradientUnits="userSpaceOnUse"
                                >
                                        <stop stopColor="#f7931a" />
                                        <stop offset="1" stopColor="#ffd93d" />
                                </linearGradient>
                        </defs>
                </svg>
        )
}

// Action Icons
export function SendIcon({
        size = 20,
        className = "",
}: {
        size?: number
        className?: string
}) {
        return (
                <svg
                        width={size}
                        height={size}
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className={className}
                >
                        <path
                                d="M7 17L17 7M17 7H7M17 7V17"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                        />
                </svg>
        )
}

export function ReceiveIcon({
        size = 20,
        className = "",
}: {
        size?: number
        className?: string
}) {
        return (
                <svg
                        width={size}
                        height={size}
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className={className}
                >
                        <path
                                d="M17 7L7 17M7 17H17M7 17V7"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                        />
                </svg>
        )
}

export function AirdropIcon({
        size = 20,
        className = "",
}: {
        size?: number
        className?: string
}) {
        return (
                <svg
                        width={size}
                        height={size}
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className={className}
                >
                        <path
                                d="M12 2L12 15M12 15L8 11M12 15L16 11"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                        />
                        <path
                                d="M4 17V19C4 20.1046 4.89543 21 6 21H18C19.1046 21 20 20.1046 20 19V17"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                        />
                </svg>
        )
}

export function CopyIcon({
        size = 16,
        className = "",
}: {
        size?: number
        className?: string
}) {
        return (
                <svg
                        width={size}
                        height={size}
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className={className}
                >
                        <rect
                                x="9"
                                y="9"
                                width="13"
                                height="13"
                                rx="2"
                                stroke="currentColor"
                                strokeWidth="2"
                        />
                        <path
                                d="M5 15H4C2.89543 15 2 14.1046 2 13V4C2 2.89543 2.89543 2 4 2H13C14.1046 2 15 2.89543 15 4V5"
                                stroke="currentColor"
                                strokeWidth="2"
                        />
                </svg>
        )
}

export function CheckIcon({
        size = 16,
        className = "",
}: {
        size?: number
        className?: string
}) {
        return (
                <svg
                        width={size}
                        height={size}
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className={className}
                >
                        <path
                                d="M20 6L9 17L4 12"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                        />
                </svg>
        )
}

export function PlusIcon({
        size = 20,
        className = "",
}: {
        size?: number
        className?: string
}) {
        return (
                <svg
                        width={size}
                        height={size}
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className={className}
                >
                        <path
                                d="M12 5V19M5 12H19"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                        />
                </svg>
        )
}

export function WalletIcon({
        size = 24,
        className = "",
}: {
        size?: number
        className?: string
}) {
        return (
                <svg
                        width={size}
                        height={size}
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className={className}
                >
                        <path
                                d="M19 7H5C3.89543 7 3 7.89543 3 9V18C3 19.1046 3.89543 20 5 20H19C20.1046 20 21 19.1046 21 18V9C21 7.89543 20.1046 7 19 7Z"
                                stroke="currentColor"
                                strokeWidth="2"
                        />
                        <path
                                d="M16 14C16 14.5523 15.5523 15 15 15C14.4477 15 14 14.5523 14 14C14 13.4477 14.4477 13 15 13C15.5523 13 16 13.4477 16 14Z"
                                fill="currentColor"
                        />
                        <path
                                d="M3 9L12 4L21 9"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                        />
                </svg>
        )
}

export function KeyIcon({
        size = 20,
        className = "",
}: {
        size?: number
        className?: string
}) {
        return (
                <svg
                        width={size}
                        height={size}
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className={className}
                >
                        <path
                                d="M21 2L19 4M11.3891 11.6109C12.3844 12.6062 13 13.9812 13 15.5C13 18.5376 10.5376 21 7.5 21C4.46243 21 2 18.5376 2 15.5C2 12.4624 4.46243 10 7.5 10C9.01878 10 10.3938 10.6156 11.3891 11.6109ZM11.3891 11.6109L15.5 7.5M15.5 7.5L18.5 10.5L22 7L19 4M15.5 7.5L19 4"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                        />
                </svg>
        )
}

export function RefreshIcon({
        size = 20,
        className = "",
}: {
        size?: number
        className?: string
}) {
        return (
                <svg
                        width={size}
                        height={size}
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className={className}
                >
                        <path
                                d="M1 4V10H7"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                        />
                        <path
                                d="M23 20V14H17"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                        />
                        <path
                                d="M20.49 9C19.9828 7.56678 19.1209 6.28535 17.9845 5.27542C16.8482 4.26549 15.4745 3.56065 13.9917 3.22882C12.5089 2.89699 10.9652 2.94899 9.50481 3.37992C8.04437 3.81086 6.71475 4.60631 5.64 5.69L1 10M23 14L18.36 18.31C17.2853 19.3937 15.9556 20.1891 14.4952 20.6201C13.0348 21.051 11.4911 21.103 10.0083 20.7712C8.52547 20.4393 7.1518 19.7345 6.01547 18.7246C4.87913 17.7147 4.01717 16.4332 3.51 15"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                        />
                </svg>
        )
}

export function ChevronDownIcon({
        size = 16,
        className = "",
}: {
        size?: number
        className?: string
}) {
        return (
                <svg
                        width={size}
                        height={size}
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className={className}
                >
                        <path
                                d="M6 9L12 15L18 9"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                        />
                </svg>
        )
}

export function CloseIcon({
        size = 20,
        className = "",
}: {
        size?: number
        className?: string
}) {
        return (
                <svg
                        width={size}
                        height={size}
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className={className}
                >
                        <path
                                d="M18 6L6 18M6 6L18 18"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                        />
                </svg>
        )
}

export function EyeIcon({
        size = 16,
        className = "",
}: {
        size?: number
        className?: string
}) {
        return (
                <svg
                        width={size}
                        height={size}
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className={className}
                >
                        <path
                                d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                        />
                        <circle
                                cx="12"
                                cy="12"
                                r="3"
                                stroke="currentColor"
                                strokeWidth="2"
                        />
                </svg>
        )
}

export function EyeOffIcon({
        size = 16,
        className = "",
}: {
        size?: number
        className?: string
}) {
        return (
                <svg
                        width={size}
                        height={size}
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className={className}
                >
                        <path
                                d="M17.94 17.94C16.2306 19.243 14.1491 19.9649 12 20C5 20 1 12 1 12C2.24389 9.68192 3.96914 7.65663 6.06 6.06M9.9 4.24C10.5883 4.0789 11.2931 3.99836 12 4C19 4 23 12 23 12C22.393 13.1356 21.6691 14.2048 20.84 15.19M14.12 14.12C13.8454 14.4148 13.5141 14.6512 13.1462 14.8151C12.7782 14.9791 12.3809 15.0673 11.9781 15.0744C11.5753 15.0815 11.1752 15.0074 10.8016 14.8565C10.4281 14.7056 10.0887 14.481 9.80385 14.1962C9.51897 13.9113 9.29439 13.5719 9.14351 13.1984C8.99262 12.8248 8.91853 12.4247 8.92563 12.0219C8.93274 11.6191 9.02091 11.2218 9.18488 10.8538C9.34884 10.4859 9.58525 10.1546 9.88 9.88"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                        />
                        <path
                                d="M1 1L23 23"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                        />
                </svg>
        )
}
