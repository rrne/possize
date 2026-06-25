// Dependency-free PNG icon generator for the PosSize PWA.
// Draws an ascending 3-bar chart mark. Run: node scripts/gen-icons.mjs
import { deflateSync } from "node:zlib";
import { writeFileSync, mkdirSync } from "node:fs";

const OUT = new URL("../public/", import.meta.url);

// CRC32 table
const crcTable = (() => {
  const t = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    t[n] = c >>> 0;
  }
  return t;
})();
function crc32(buf) {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) c = crcTable[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}
function chunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  const typeBuf = Buffer.from(type, "ascii");
  const body = Buffer.concat([typeBuf, data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(body), 0);
  return Buffer.concat([len, body, crc]);
}
function encodePNG(width, height, rgba) {
  const sig = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 6; // color type RGBA
  // rest zero (compression, filter, interlace)
  // raw scanlines with filter byte 0
  const stride = width * 4;
  const raw = Buffer.alloc((stride + 1) * height);
  for (let y = 0; y < height; y++) {
    raw[y * (stride + 1)] = 0;
    rgba.copy(raw, y * (stride + 1) + 1, y * stride, y * stride + stride);
  }
  const idat = deflateSync(raw, { level: 9 });
  return Buffer.concat([
    sig,
    chunk("IHDR", ihdr),
    chunk("IDAT", idat),
    chunk("IEND", Buffer.alloc(0)),
  ]);
}

function hex(h) {
  return [
    parseInt(h.slice(1, 3), 16),
    parseInt(h.slice(3, 5), 16),
    parseInt(h.slice(5, 7), 16),
  ];
}

function makeIcon(size, { bg, bar }) {
  const rgba = Buffer.alloc(size * size * 4);
  const [br, bgc, bb] = hex(bg);
  const [r2, g2, b2] = hex(bar);
  // fill background
  for (let i = 0; i < size * size; i++) {
    rgba[i * 4] = br;
    rgba[i * 4 + 1] = bgc;
    rgba[i * 4 + 2] = bb;
    rgba[i * 4 + 3] = 255;
  }
  // three ascending bars, centered, within the safe zone (~62% width)
  const zone = size * 0.62;
  const left = (size - zone) / 2;
  const barW = zone * 0.24;
  const gap = (zone - barW * 3) / 2;
  const baseY = size - left; // bottom aligned with left margin
  const heights = [zone * 0.45, zone * 0.7, zone * 1.0];
  const radius = Math.max(2, Math.round(barW * 0.18));
  for (let b = 0; b < 3; b++) {
    const x0 = Math.round(left + b * (barW + gap));
    const x1 = Math.round(x0 + barW);
    const y1 = Math.round(baseY);
    const y0 = Math.round(baseY - heights[b]);
    for (let y = y0; y < y1; y++) {
      for (let x = x0; x < x1; x++) {
        if (x < 0 || y < 0 || x >= size || y >= size) continue;
        // simple rounded top corners
        const topDist = y - y0;
        if (topDist < radius) {
          const dxL = x - (x0 + radius);
          const dxR = x - (x1 - 1 - radius);
          const dy = topDist - radius;
          if (x < x0 + radius && dxL * dxL + dy * dy > radius * radius) continue;
          if (x > x1 - 1 - radius && dxR * dxR + dy * dy > radius * radius) continue;
        }
        const i = (y * size + x) * 4;
        rgba[i] = r2;
        rgba[i + 1] = g2;
        rgba[i + 2] = b2;
        rgba[i + 3] = 255;
      }
    }
  }
  return encodePNG(size, size, rgba);
}

mkdirSync(OUT, { recursive: true });
const dark = { bg: "#0f1923", bar: "#00d4aa" };
const maskable = { bg: "#00d4aa", bar: "#0f1923" };

writeFileSync(new URL("icon-192.png", OUT), makeIcon(192, dark));
writeFileSync(new URL("icon-512.png", OUT), makeIcon(512, dark));
writeFileSync(new URL("icon-maskable-512.png", OUT), makeIcon(512, maskable));
console.log("Generated icon-192.png, icon-512.png, icon-maskable-512.png");
