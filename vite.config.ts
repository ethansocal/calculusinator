import { sentryVitePlugin } from "@sentry/vite-plugin";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path, { join } from "path";
import { copyFile, mkdir } from "fs/promises";

const ASSET_URL = process.env.ASSET_URL || "";
// https://vitejs.dev/config/
export default defineConfig({
    optimizeDeps: { exclude: ["pyodide"] },
    plugins: [
        react(),
        sentryVitePlugin({
            org: "ethanhenry",
            project: "calculusinator",
        }),
        {
            name: "vite-plugin-pyodide",
            generateBundle: async () => {
                const assetsDir = "dist/assets";
                await mkdir(assetsDir, { recursive: true });
                const files = [
                    "pyodide-lock.json",
                    "pyodide.asm.js",
                    "pyodide.asm.wasm",
                    "python_stdlib.zip",
                ];
                for (const file of files) {
                    await copyFile(
                        join("node_modules/pyodide", file),
                        join(assetsDir, file),
                    );
                }
            },
        },
    ],

    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },

    base: `${ASSET_URL}/`,

    build: {
        sourcemap: true,
    },
});
