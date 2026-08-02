import { rmSync } from 'fs';

try {
  rmSync('dist', { recursive: true, force: true });
  rmSync('logs', { recursive: true, force: true });
  console.log('Cleaned dist and logs.');
} catch (err) {
  console.error('Clean failed:', err);
}