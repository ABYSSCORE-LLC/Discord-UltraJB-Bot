import { build } from 'esbuild';
import { writeFileSync, mkdirSync } from 'fs';

await mkdirSync('dist', { recursive: true });
await build({
  entryPoints: ['src/index.ts'],
  bundle: true,
  platform: 'node',
  target: 'node22',
  format: 'esm',
  outfile: 'dist/index.js',
});

writeFileSync('dist/package.json', '{"type":"module"}');
console.log('Build complete.');