const fs = require('fs');
let c = fs.readFileSync('index.html', 'utf8');

// 1. We will use a regex to replace everything from .handicrafts-section { down to the start of .handicrafts-text {
const regex = /\.handicrafts-section \{[\s\S]*?\.handicrafts-text \{/;

const perfectCSS = `.handicrafts-section {
      width: 100%;
      padding: 80px 40px;
      background: url('https://hcnciegpfsmladslpkxx.supabase.co/storage/v1/object/public/gallery-assets/Background/handicraft.webp') center/cover no-repeat;
      display: flex;
      gap: 50px;
      align-items: flex-start;
      border-top: 1px solid #222;
      position: relative;
      overflow: hidden;
      min-height: 600px;
    }
    .region-bg-video {
      position: absolute; top: 0; left: 0; width: 100%; height: 100%;
      object-fit: cover; opacity: 0; transition: opacity 0.8s ease; z-index: 0;
    }
    .region-bg-video.active { opacity: 1; }
    .video-overlay {
      position: absolute; top: 0; left: 0; width: 100%; height: 100%;
      background: rgba(0,0,0,0.65); z-index: 1;
    }
    .handicrafts-text { position: relative; z-index: 2; flex: 1; padding-right: 20px; }
    .handicrafts-grid { 
      position: relative; z-index: 2; flex: 1.4; 
      display: flex; flex-direction: column; gap: 16px;
    }

    /* Make the region content rectangular when expanded */
    .region-content-inner {
      display: flex;
      gap: 30px;
      align-items: flex-start;
    }
    .region-content-text {
      flex: 1;
    }
    .region-content-links {
      flex: 0.8;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .handicrafts-text {`;

c = c.replace(regex, perfectCSS);

// 2. We also need to update the HTML structure of the region-content to use the new flex columns.
// For Kashmir:
c = c.replace(/<span class="poetic-eyebrow">Where every thread[\s\S]*?<\/ul>/, `<div class="region-content-inner">
            <div class="region-content-text">
              <span class="poetic-eyebrow">Where every thread tells the story of the valley</span>
              <h3 class="poetic-title">The Poetry of the Valley</h3>
              <p class="poetic-desc">Kashmiri handicrafts are a quiet symphony of elegance, born in the serenity of the valley. Walk on hand-knotted carpets where every motif is a living canvas of heritage, woven with centuries-old precision. Adorn yourself with nature-inspired jewellery, delicate and regal. And discover the magic of chain-stitch embroidery.</p>
            </div>
            <div class="region-content-links">
              <ul class="sub-cat-list" style="display:flex; flex-direction:column; margin-top:0;">
                <li class="sub-cat-item" onclick="routeToCatalog('Kashmir', 'Silver Jewelry')">Silver Jewelry</li>
                <li class="sub-cat-item" onclick="routeToCatalog('Kashmir', 'Walnut Wood Carving')">Walnut Wood Carving</li>
                <li class="sub-cat-item" onclick="routeToCatalog('Kashmir', 'Kashmir Carpets')">Kashmir Carpets</li>
                <li class="sub-cat-item" onclick="routeToCatalog('Kashmir', 'Felt Wool Rugs')">Felt Wool Rugs</li>
                <li class="sub-cat-item" onclick="routeToCatalog('Kashmir', 'Chain Stitch Traditional Items')">Chain Stitch Items</li>
              </ul>
            </div>
          </div>`);

// For Himachal:
c = c.replace(/<span class="poetic-eyebrow">Artistry born in the lap[\s\S]*?<\/ul>/, `<div class="region-content-inner">
            <div class="region-content-text">
              <span class="poetic-eyebrow">Artistry born in the lap of the Himalayas</span>
              <h3 class="poetic-title">The Soul of the Himalayas</h3>
              <p class="poetic-desc">Himachali handicrafts are devotion made visible, shaped by mountain air and royal courts. Lose yourself in Kangra miniatures — paintings of exquisite detail, natural dyes, and timeless love stories. Unfold a Chamba Rumal, a silk heirloom embroidered ‘Do-Rukha’ on both sides. Wrap yourself in a Kullu stole, handwoven from pure wool.</p>
            </div>
            <div class="region-content-links">
              <ul class="sub-cat-list" style="display:flex; flex-direction:column; margin-top:0;">
                <li class="sub-cat-item" onclick="routeToCatalog('Himachal Pradesh', 'Kangra Painting')">Kangra Painting</li>
                <li class="sub-cat-item" onclick="routeToCatalog('Himachal Pradesh', 'Basholi Painting')">Basholi Painting</li>
                <li class="sub-cat-item" onclick="routeToCatalog('Himachal Pradesh', 'Chamba Rumal')">Chamba Rumal</li>
                <li class="sub-cat-item" onclick="routeToCatalog('Himachal Pradesh', 'Himachali Cap')">Himachali Cap</li>
                <li class="sub-cat-item" onclick="routeToCatalog('Himachal Pradesh', 'Kullu Muffler and Stole')">Kullu Muffler & Stole</li>
              </ul>
            </div>
          </div>`);

// For Punjab:
c = c.replace(/<span class="poetic-eyebrow">Heritage you can wear[\s\S]*?<\/ul>/, `<div class="region-content-inner">
            <div class="region-content-text">
              <span class="poetic-eyebrow">Heritage you can wear, pride you can own</span>
              <h3 class="poetic-title">PUNJAB – The Spirit of Celebration</h3>
              <p class="poetic-desc">Punjab doesn’t whisper luxury — it wears it with pride. Wrap yourself in a Phulkari shawl, where thousands of silk stitches create fields of floral brilliance. Step into hand-embroidered Juttis, leather and zari crafted to be noticed. And admire Amritsari brass & woodwork, carved with the same grandeur that built the Golden Temple.</p>
            </div>
            <div class="region-content-links">
              <ul class="sub-cat-list" style="display:flex; flex-direction:column; margin-top:0;">
                <li class="sub-cat-item" onclick="routeToCatalog('Punjab', 'Phulkari Embroidery')">Phulkari Embroidery</li>
                <li class="sub-cat-item" onclick="routeToCatalog('Punjab', 'Jutti Footwear')">Jutti Footwear</li>
              </ul>
            </div>
          </div>`);

// For Rajasthan:
c = c.replace(/<span class="poetic-eyebrow">The desert’s color[\s\S]*?<\/ul>/, `<div class="region-content-inner">
            <div class="region-content-text">
              <span class="poetic-eyebrow">The desert’s color, the Maharaja’s grandeur</span>
              <h3 class="poetic-title">The Grandeur of the Desert</h3>
              <p class="poetic-desc">Rajasthan doesn’t do subtle — it reigns. Drape yourself in a Bandhani saree, each tiny knot dyed by hand into hypnotic royal patterns. Showcase Jaipur blue pottery and Jodhpur jaali-carved wood, where cobalt hues and intricate latticework turn objects into palace heirlooms. Add the sparkle of Banjara mirror-work and the regal detail of Mojari juttis.</p>
            </div>
            <div class="region-content-links">
              <ul class="sub-cat-list" style="display:flex; flex-direction:column; margin-top:0;">
                <li class="sub-cat-item" onclick="routeToCatalog('Rajasthan', 'Blue Pottery')">Blue Pottery</li>
                <li class="sub-cat-item" onclick="routeToCatalog('Rajasthan', 'Meenakari Jewelry')">Meenakari Jewelry</li>
              </ul>
            </div>
          </div>`);

fs.writeFileSync('index.html', c);
console.log('Fixed index.html layout perfectly.');
