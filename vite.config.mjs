import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

const repositoryName = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "";
const isUserSite = repositoryName.endsWith(".github.io");
const basePath = process.env.GITHUB_ACTIONS
  ? isUserSite
    ? "/"
    : `/${repositoryName}/`
  : "/";

export default defineConfig({
  base: basePath,
  plugins: [vue()],
  server: {
    port: 5173,
    proxy: { "/api": "http://localhost:3000" },
  },
});
