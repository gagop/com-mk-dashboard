import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';

export default defineConfig({
  base: '/bttr-agents/', // only for project pages
  plugins: [svelte()],
  server: {
    port: 5173,
    open: true
  }
});


