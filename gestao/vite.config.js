import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { quasar, transformAssetUrls } from '@quasar/vite-plugin'
import { fileURLToPath } from 'node:url'

const workspaceRoot = fileURLToPath(new URL('..', import.meta.url))

export default defineConfig({
  plugins: [
    vue({ template: { transformAssetUrls } }),
    quasar({ autoImportComponentCase: 'kebab' }),
  ],
  server: {
    host: '127.0.0.1',
    port: 4175,
    fs: { allow: [workspaceRoot] },
  },
})
