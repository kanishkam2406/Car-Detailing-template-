const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const assetsDir = path.join(__dirname, '..', 'src/assets');

const files = fs.readdirSync(assetsDir);

async function convert() {
  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    // Convert jpg/jpeg and png (except logo which is also used as favicon)
    if (!['.jpg', '.jpeg', '.png'].includes(ext)) continue;
    // Skip logo — it's used as favicon.png, keep original
    // We'll still convert it but keep the original too
    
    const inputPath = path.join(assetsDir, file);
    const baseName = path.basename(file, ext);
    const outputPath = path.join(assetsDir, baseName + '.webp');

    // Skip if webp already exists and is newer
    if (fs.existsSync(outputPath)) {
      const inStat = fs.statSync(inputPath);
      const outStat = fs.statSync(outputPath);
      if (outStat.mtimeMs > inStat.mtimeMs) {
        console.log(`  skip ${file} (webp newer)`);
        continue;
      }
    }

    try {
      const originalSize = fs.statSync(inputPath).size;
      
      // PNG → lossless webp, JPG → quality 92 webp
      let pipeline = sharp(inputPath);
      if (ext === '.png') {
        pipeline = pipeline.webp({ lossless: true, effort: 6 });
      } else {
        pipeline = pipeline.webp({ quality: 92, effort: 6 });
      }
      
      await pipeline.toFile(outputPath);
      
      const newSize = fs.statSync(outputPath).size;
      const pct = (((originalSize - newSize) / originalSize) * 100).toFixed(1);
      console.log(`  ✓ ${file} → ${baseName}.webp  [${(originalSize/1024).toFixed(0)}KB → ${(newSize/1024).toFixed(0)}KB, -${pct}%]`);
    } catch (err) {
      console.error(`  ✗ ${file}: ${err.message}`);
    }
  }
  console.log('\nDone.');
}

convert();
