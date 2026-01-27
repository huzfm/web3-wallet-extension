import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import { crx } from "@crxjs/vite-plugin"
import wasm from "vite-plugin-wasm"
import topLevelAwait from "vite-plugin-top-level-await"
import { nodePolyfills } from "vite-plugin-node-polyfills"
import manifest from "./manifest.json"

export default defineConfig({
      plugins: [
            nodePolyfills({
                  include: [
                        "buffer",
                        "crypto",
                        "stream",
                        "util",
                        "events",
                        "process",
                  ],
                  globals: {
                        Buffer: true,
                        global: true,
                        process: true,
                  },
            }),
            wasm(),
            topLevelAwait(),
            react(),
            crx({ manifest }),
      ],
      optimizeDeps: {
            exclude: ["tiny-secp256k1"],
      },
})
