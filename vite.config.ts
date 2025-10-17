import vue from '@vitejs/plugin-vue';
import { fileURLToPath, URL } from 'url';
import { defineConfig } from 'vite';
import VueDevTools from 'vite-plugin-vue-devtools';
import vuetify from 'vite-plugin-vuetify';
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        tailwindcss(),
        vuetify({
            autoImport: true
            //styles: "expose",
        }),
        VueDevTools(),
        
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
    css: {
        preprocessorOptions: {
            scss: {}
        }
    },
    optimizeDeps: {
        exclude: ['vuetify'],
        entries: ['./src/**/*.vue']
    }
});
