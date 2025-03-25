import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

const ReactCompilerConfig = {
  babel: {
    plugins: ['babel-plugin-react-compiler'],
  },
};

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(ReactCompilerConfig)],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  base: '/react-anime/',
});
