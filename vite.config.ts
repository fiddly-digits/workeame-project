import { defineConfig, loadEnv, UserConfigExport } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  envDir: './buildConfig/environments',
  plugins: [react()],
  define: {
    'process.env': loadEnv('', process.cwd())
  }
} as UserConfigExport);
