import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');

if (!fs.existsSync(distDir)) {
  console.error('dist directory does not exist');
  process.exit(1);
}

// 1. Copy dist/index.html -> root index.html
const distIndex = path.join(distDir, 'index.html');
const rootIndex = path.join(rootDir, 'index.html');
if (fs.existsSync(distIndex)) {
  fs.copyFileSync(distIndex, rootIndex);
  console.log('✓ Copied dist/index.html -> root index.html');
}

// 2. Copy dist/assets/* -> root assets/
const distAssets = path.join(distDir, 'assets');
const rootAssets = path.join(rootDir, 'assets');
if (fs.existsSync(distAssets)) {
  if (!fs.existsSync(rootAssets)) {
    fs.mkdirSync(rootAssets, { recursive: true });
  }
  const files = fs.readdirSync(distAssets);
  for (const file of files) {
    fs.copyFileSync(path.join(distAssets, file), path.join(rootAssets, file));
  }
  console.log(`✓ Copied ${files.length} build asset(s) -> root assets/`);
}

// 3. Copy dist/404.html -> root 404.html
const dist404 = path.join(distDir, '404.html');
const root404 = path.join(rootDir, '404.html');
if (fs.existsSync(dist404)) {
  fs.copyFileSync(dist404, root404);
  console.log('✓ Verified root 404.html matches dist/404.html');
}
