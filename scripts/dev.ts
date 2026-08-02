import { spawn } from 'child_process';

const proc = spawn('tsx', ['watch', 'src/index.ts'], { stdio: 'inherit' });

proc.on('close', (code) => {
  process.exit(code ?? 0);
});