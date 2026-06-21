// Flood-fill background removal for mascot.png
// Starts from all border pixels, expands to connected bright+unsaturated pixels → transparent
import sharp from 'sharp';
import { writeFileSync } from 'fs';

const src = 'public/mascot.png';
const dst = 'public/mascot.png';

const { data, info } = await sharp(src)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

const { width, height, channels } = info;
const buf = Buffer.from(data);

const isBackground = (r, g, b) => {
  const brightness = (r + g + b) / 3;
  const maxC = Math.max(r, g, b);
  const minC = Math.min(r, g, b);
  const sat = maxC === 0 ? 0 : (maxC - minC) / maxC;
  return brightness > 130 && sat < 0.25;
};

// BFS flood fill from all border pixels
const bgMask = new Uint8Array(width * height);
const visited = new Uint8Array(width * height);
const queue = [];

for (let x = 0; x < width; x++) {
  queue.push(x, 0);
  queue.push(x, height - 1);
}
for (let y = 1; y < height - 1; y++) {
  queue.push(0, y);
  queue.push(width - 1, y);
}

let qi = 0;
while (qi < queue.length) {
  const x = queue[qi++];
  const y = queue[qi++];
  const idx = y * width + x;
  if (visited[idx]) continue;
  visited[idx] = 1;

  const off = idx * channels;
  if (isBackground(buf[off], buf[off + 1], buf[off + 2])) {
    bgMask[idx] = 1;
    if (x > 0)          queue.push(x - 1, y);
    if (x < width - 1)  queue.push(x + 1, y);
    if (y > 0)          queue.push(x, y - 1);
    if (y < height - 1) queue.push(x, y + 1);
  }
}

let removed = 0;
for (let i = 0; i < width * height; i++) {
  if (bgMask[i]) {
    buf[i * channels + 3] = 0;
    removed++;
  }
}

const outBuffer = await sharp(buf, { raw: { width, height, channels } }).png().toBuffer();
writeFileSync(dst, outBuffer);
console.log(`Done: ${width}x${height}, removed ${removed} bg pixels, saved to ${dst}`);
