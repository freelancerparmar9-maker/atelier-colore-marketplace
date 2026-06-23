const fs = require('fs');
let c = fs.readFileSync('index.html', 'utf8');

// 1. Add background image and relative positioning to .handicrafts-section CSS
const newCSS = `
    .handicrafts-section {
      background-image: url('https://hcnciegpfsmladslpkxx.supabase.co/storage/v1/object/public/gallery-assets/Background/background.png');
      background-size: cover;
      background-position: center;
      position: relative;
      overflow: hidden;
    }
    .region-bg-video {
      position: absolute; top: 0; left: 0; width: 100%; height: 100%;
      object-fit: cover; opacity: 0; transition: opacity 0.8s ease; z-index: 0;
    }
    .region-bg-video.active { opacity: 1; }
    .video-overlay {
      position: absolute; top: 0; left: 0; width: 100%; height: 100%;
      background: rgba(0,0,0,0.6); z-index: 1;
    }
    .handicrafts-text, .handicrafts-grid { position: relative; z-index: 2; }
`;

if (!c.includes('.region-bg-video')) {
  c = c.replace('.handicrafts-section {', newCSS + '/* REMOVED OLD HANDICRAFTS SECTION CSS */\n    .old-handicrafts-section {');
}

// 2. Add videos and overlay at the start of handicrafts-section
const videosHTML = `
    <video class="region-bg-video" id="video-Kashmir" src="https://hcnciegpfsmladslpkxx.supabase.co/storage/v1/object/public/gallery-assets/Video/Kashmir.mp4" loop muted playsinline></video>
    <video class="region-bg-video" id="video-Himachal" src="https://hcnciegpfsmladslpkxx.supabase.co/storage/v1/object/public/gallery-assets/Video/Himachal%20Pradesh.mp4" loop muted playsinline></video>
    <video class="region-bg-video" id="video-Punjab" src="https://hcnciegpfsmladslpkxx.supabase.co/storage/v1/object/public/gallery-assets/Video/Punjab.mp4" loop muted playsinline></video>
    <video class="region-bg-video" id="video-Rajasthan" src="https://hcnciegpfsmladslpkxx.supabase.co/storage/v1/object/public/gallery-assets/Video/Rajasthan.mp4" loop muted playsinline></video>
    <div class="video-overlay"></div>
    <div class="handicrafts-text">`;

c = c.replace('<div class="handicrafts-text">', videosHTML);

// 3. Add data-region and restore the sub-cat-lists
c = c.replace('<div class="region-item">', '<div class="region-item" data-region="Kashmir">');
c = c.replace('Bring home Kashmir: timeless, authentic, heirloom.</p>', `Bring home Kashmir: timeless, authentic, heirloom.</p>
          <ul class="sub-cat-list" style="margin-top: 20px;">
            <li class="sub-cat-item" onclick="routeToCatalog('Kashmir', 'Silver Jewelry')">Silver Jewelry</li>
            <li class="sub-cat-item" onclick="routeToCatalog('Kashmir', 'Walnut Wood Carving')">Walnut Wood Carving</li>
            <li class="sub-cat-item" onclick="routeToCatalog('Kashmir', 'Kashmir Carpets')">Kashmir Carpets</li>
            <li class="sub-cat-item" onclick="routeToCatalog('Kashmir', 'Felt Wool Rugs')">Felt Wool Rugs</li>
            <li class="sub-cat-item" onclick="routeToCatalog('Kashmir', 'Chain Stitch Traditional Items')">Chain Stitch Items</li>
          </ul>`);

c = c.replace('<div class="region-item">\n        <div class="region-header">Himachal Pradesh</div>', '<div class="region-item" data-region="Himachal">\n        <div class="region-header">Himachal Pradesh</div>');
c = c.replace('Bring home Himachal: refined, storied, eternal.</p>', `Bring home Himachal: refined, storied, eternal.</p>
          <ul class="sub-cat-list" style="margin-top: 20px;">
            <li class="sub-cat-item" onclick="routeToCatalog('Himachal Pradesh', 'Kangra Painting')">Kangra Painting</li>
            <li class="sub-cat-item" onclick="routeToCatalog('Himachal Pradesh', 'Basholi Painting')">Basholi Painting</li>
            <li class="sub-cat-item" onclick="routeToCatalog('Himachal Pradesh', 'Chamba Rumal')">Chamba Rumal</li>
            <li class="sub-cat-item" onclick="routeToCatalog('Himachal Pradesh', 'Himachali Cap')">Himachali Cap</li>
            <li class="sub-cat-item" onclick="routeToCatalog('Himachal Pradesh', 'Kullu Muffler and Stole')">Kullu Muffler & Stole</li>
          </ul>`);

c = c.replace('<div class="region-item">\n        <div class="region-header">Punjab</div>', '<div class="region-item" data-region="Punjab">\n        <div class="region-header">Punjab</div>');
c = c.replace('Bring home Punjab: bold, vibrant, unapologetically rich.</p>', `Bring home Punjab: bold, vibrant, unapologetically rich.</p>
          <ul class="sub-cat-list" style="margin-top: 20px;">
            <li class="sub-cat-item" onclick="routeToCatalog('Punjab', 'Phulkari Embroidery')">Phulkari Embroidery</li>
            <li class="sub-cat-item" onclick="routeToCatalog('Punjab', 'Jutti Footwear')">Jutti Footwear</li>
          </ul>`);

c = c.replace('<div class="region-item">\n        <div class="region-header">Rajasthan</div>', '<div class="region-item" data-region="Rajasthan">\n        <div class="region-header">Rajasthan</div>');
c = c.replace('Bring home Rajasthan: opulent, colorful, timeless</p>', `Bring home Rajasthan: opulent, colorful, timeless</p>
          <ul class="sub-cat-list" style="margin-top: 20px;">
            <li class="sub-cat-item" onclick="routeToCatalog('Rajasthan', 'Blue Pottery')">Blue Pottery</li>
            <li class="sub-cat-item" onclick="routeToCatalog('Rajasthan', 'Meenakari Jewelry')">Meenakari Jewelry</li>
          </ul>`);

// 4. Add Javascript for video hover
const jsCode = `
  <script>
    document.addEventListener('DOMContentLoaded', () => {
      document.querySelectorAll('.region-item').forEach(item => {
        item.addEventListener('mouseenter', () => {
          const region = item.getAttribute('data-region');
          const vid = document.getElementById('video-' + region);
          if (vid) {
            vid.classList.add('active');
            vid.play().catch(e => console.log('Video autoplay prevented:', e));
          }
        });
        item.addEventListener('mouseleave', () => {
          const region = item.getAttribute('data-region');
          const vid = document.getElementById('video-' + region);
          if (vid) {
            vid.classList.remove('active');
            // Pause shortly after transition to save resources
            setTimeout(() => {
              if (!vid.classList.contains('active')) {
                vid.pause();
              }
            }, 800);
          }
        });
      });
    });
  </script>
</body>
`;

c = c.replace('</body>', jsCode);

fs.writeFileSync('index.html', c);
console.log("Updated index.html");
