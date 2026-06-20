const fs = require('fs');
let c = fs.readFileSync('index.html', 'utf8');

// Update CSS for hover
c = c.replace('.region-item:hover .region-content {', '.region-item:hover .region-content {\n      max-height: 1000px; /* Increased for long text */');
c = c.replace('max-height: 300px;', '');

// Add poetic text styling to CSS
const poeticCSS = `
    .poetic-eyebrow {
      font-size: 11px; letter-spacing: 3px; text-transform: uppercase;
      color: var(--gold); margin-bottom: 12px; display: block;
    }
    .poetic-title {
      font-family: 'Playfair Display', serif; font-size: 24px; font-weight: 400;
      color: #fff; margin-bottom: 16px; line-height: 1.2;
    }
    .poetic-desc {
      font-family: 'Inter', sans-serif;
      font-size: 14px; line-height: 1.8; color: rgba(255,255,255,0.75);
      font-weight: 300; text-align: justify;
    }
`;
if (!c.includes('.poetic-eyebrow')) {
  c = c.replace('.sub-cat-list {', poeticCSS + '\n    .sub-cat-list {');
}

// Replace the regional blocks
const kashmirText = `
      <div class="region-item">
        <div class="region-header">Kashmir</div>
        <div class="region-content">
          <span class="poetic-eyebrow">Where every thread tells the story of the valley</span>
          <h3 class="poetic-title">The Poetry of the Valley</h3>
          <p class="poetic-desc">Kashmiri handicrafts are a quiet symphony of elegance, born in the serenity of the valley. Walk on hand-knotted carpets where every motif is a living canvas of heritage, woven with centuries-old precision. Adorn yourself with nature-inspired jewellery, delicate and regal. And discover the magic of chain-stitch embroidery — thousands of looped stitches crafted with a single hooked needle, giving fabric unmatched depth and vibrancy. Bring home Kashmir: timeless, authentic, heirloom.</p>
        </div>
      </div>
`;

const himachalText = `
      <div class="region-item">
        <div class="region-header">Himachal Pradesh</div>
        <div class="region-content">
          <span class="poetic-eyebrow">Artistry born in the lap of the Himalayas</span>
          <h3 class="poetic-title">The Soul of the Himalayas</h3>
          <p class="poetic-desc">Himachali handicrafts are devotion made visible, shaped by mountain air and royal courts. Lose yourself in Kangra miniatures — paintings of exquisite detail, natural dyes, and timeless love stories. Unfold a Chamba Rumal, a silk heirloom embroidered ‘Do-Rukha’ on both sides, a secret skill of generations. Wrap yourself in a Kullu stole, handwoven from pure wool with bold patterns that hold the warmth of Himalayan winters. Bring home Himachal: refined, storied, eternal.</p>
        </div>
      </div>
`;

const punjabText = `
      <div class="region-item">
        <div class="region-header">Punjab</div>
        <div class="region-content">
          <span class="poetic-eyebrow">Heritage you can wear, pride you can own</span>
          <h3 class="poetic-title">PUNJAB – The Spirit of Celebration</h3>
          <p class="poetic-desc">Punjab doesn’t whisper luxury — it wears it with pride. Wrap yourself in a Phulkari shawl, where thousands of silk stitches create fields of floral brilliance, each one a legacy passed down through generations. Step into hand-embroidered Juttis, leather and zari crafted to be noticed. And admire Amritsari brass & woodwork, carved with the same grandeur that built the Golden Temple. Bring home Punjab: bold, vibrant, unapologetically rich.</p>
        </div>
      </div>
`;

const rajasthanText = `
      <div class="region-item">
        <div class="region-header">Rajasthan</div>
        <div class="region-content">
          <span class="poetic-eyebrow">The desert’s color, the Maharaja’s grandeur</span>
          <h3 class="poetic-title">The Grandeur of the Desert</h3>
          <p class="poetic-desc">Rajasthan doesn’t do subtle — it reigns. Drape yourself in a Bandhani saree, each tiny knot dyed by hand into hypnotic royal patterns. Showcase Jaipur blue pottery and Jodhpur jaali-carved wood, where cobalt hues and intricate latticework turn objects into palace heirlooms. Add the sparkle of Banjara mirror-work and the regal detail of Mojari juttis. Bring home Rajasthan: opulent, colorful, timeless</p>
        </div>
      </div>
`;

c = c.replace(/<!-- Kashmir -->[\s\S]*?<!-- Himachal Pradesh -->/, '<!-- Kashmir -->' + kashmirText + '\n      <!-- Himachal Pradesh -->');
c = c.replace(/<!-- Himachal Pradesh -->[\s\S]*?<!-- Punjab -->/, '<!-- Himachal Pradesh -->' + himachalText + '\n      <!-- Punjab -->');
c = c.replace(/<!-- Punjab -->[\s\S]*?<!-- Rajasthan -->/, '<!-- Punjab -->' + punjabText + '\n      <!-- Rajasthan -->');
c = c.replace(/<!-- Rajasthan -->[\s\S]*?<\/div>\s*<\/section>/, '<!-- Rajasthan -->' + rajasthanText + '\n    </div>\n  </section>');

fs.writeFileSync('index.html', c);
