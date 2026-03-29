const sharp = require('sharp');
const fs = require('fs');

async function go() {
  const img16 = await sharp('public/logo.png').resize(16, 16).png().toBuffer();
  const img32 = await sharp('public/logo.png').resize(32, 32).png().toBuffer();
  const img48 = await sharp('public/logo.png').resize(48, 48).png().toBuffer();

  const images = [img16, img32, img48];
  const sizes = [16, 32, 48];
  const headerSize = 6 + images.length * 16;
  let offset = headerSize;
  const entries = [];
  for (let i = 0; i < images.length; i++) {
    entries.push({ size: sizes[i], dataSize: images[i].length, offset });
    offset += images[i].length;
  }

  const buf = Buffer.alloc(offset);
  buf.writeUInt16LE(0, 0);
  buf.writeUInt16LE(1, 2);
  buf.writeUInt16LE(images.length, 4);

  let pos = 6;
  for (const e of entries) {
    buf.writeUInt8(e.size < 256 ? e.size : 0, pos);
    buf.writeUInt8(e.size < 256 ? e.size : 0, pos + 1);
    buf.writeUInt8(0, pos + 2);
    buf.writeUInt8(0, pos + 3);
    buf.writeUInt16LE(1, pos + 4);
    buf.writeUInt16LE(32, pos + 6);
    buf.writeUInt32LE(e.dataSize, pos + 8);
    buf.writeUInt32LE(e.offset, pos + 12);
    pos += 16;
  }

  for (let i = 0; i < images.length; i++) {
    images[i].copy(buf, entries[i].offset);
  }

  fs.writeFileSync('src/app/favicon.ico', buf);
  console.log('favicon.ico created:', buf.length, 'bytes');
}

go().catch(console.error);
