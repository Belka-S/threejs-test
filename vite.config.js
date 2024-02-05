import fs from 'fs';

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const arrDirent = fs.readdirSync('./src', { withFileTypes: true });
const dirNames = arrDirent.filter(el => el.isDirectory()).map(el => el.name);
const dirPaths = dirNames.reduce(
  (acc, dir) => ({
    ...acc,
    [dir]: `/${dir === 'src' ? dir : 'src/' + dir}`,
  }),
  '',
);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { ...dirPaths }, // src: '/src', components: '/src/components',
  },
  server: { open: '/', port: 3000 },
  base: '/threejs-test',
});
