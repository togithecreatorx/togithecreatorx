// Kullanım:  cd tools && npm i && node build.mjs   → ../assets/*.svg
import { writeFile, mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { hero } from './cizim/hero.mjs';
import { hatSvg } from './cizim/hat.mjs';
import { projelerSvg } from './cizim/projeler.mjs';
import { istanbulSvg } from './cizim/istanbul.mjs';
import { rozetEposta, rozetKonum, rozetAtolye } from './cizim/rozet.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(here, '..', 'assets');
await mkdir(OUT, { recursive: true });

const isler = { 'hero.svg': hero, 'hat.svg': hatSvg, 'projeler.svg': projelerSvg, 'istanbul.svg': istanbulSvg,
  'rozet-eposta.svg': rozetEposta,
  'rozet-konum.svg': rozetKonum,
  'rozet-atolye.svg': rozetAtolye,
};
const sec = process.argv.slice(2);
for (const [ad, fn] of Object.entries(isler)) {
  if (sec.length && !sec.includes(ad)) continue;
  const t = Date.now();
  const svg = await fn();
  await writeFile(path.join(OUT, ad), svg);
  console.log(`✓ ${ad.padEnd(18)} ${(Buffer.byteLength(svg) / 1024).toFixed(1).padStart(6)} KB  ${Date.now() - t} ms`);
}
