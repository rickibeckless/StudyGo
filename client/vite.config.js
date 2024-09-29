import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
    build: {
        outDir: resolve(__dirname, '../server/public'),
        emptyOutDir: true,
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                subjects: resolve(__dirname, 'subjects.html'),
                classes: resolve(__dirname, 'classes.html'),
                class: resolve(__dirname, 'classDetails.html'),
                units: resolve(__dirname, 'units.html'),
                '404': resolve(__dirname, '404.html'),
            },
        },
    },
    server: {
        proxy: {
            '/api': {
                target: 'http://localhost:8080',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, '/api'),
            },
        },
    },
});
