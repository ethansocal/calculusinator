import { sentryVitePlugin } from "@sentry/vite-plugin";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

const ASSET_URL = process.env.ASSET_URL || "";
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        sentryVitePlugin({
            org: "ethanhenry",
            project: "calculusinator",
        }),
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
