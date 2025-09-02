import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { nodePolyfills } from "vite-plugin-node-polyfills";
import tailwindcss from "@tailwindcss/vite";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), nodePolyfills(), tailwindcss()],
    define: {
        __BUILD_DATE__: JSON.stringify(new Date().toISOString()),
    },
});
