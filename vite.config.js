import { defineConfig } from "vite"
import react from "@vitejs/plugin-react-swc"
import path from "path"

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@components/tanstack-datatable": path.resolve(__dirname, "./src/tanstack-datatable"),
      "@tanstack-datatable": path.resolve(__dirname, "./src/tanstack-datatable"),
    },
  },
})
