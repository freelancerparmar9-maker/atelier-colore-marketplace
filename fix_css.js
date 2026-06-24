const fs = require('fs');
let c = fs.readFileSync('index.html', 'utf8');

c = c.replace(/\.handicrafts-section \{[\s\S]*?\.old-handicrafts-section \{/, `.handicrafts-section {
      width: 100%;
      padding: 100px 60px;
      background: url('https://hcnciegpfsmladslpkxx.supabase.co/storage/v1/object/public/gallery-assets/Background/background.png') center/cover no-repeat;
      display: flex;
      gap: 60px;
      align-items: center;
      border-top: 1px solid #222;
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
    .handicrafts-text, .handicrafts-grid { position: relative; z-index: 2; }`);

fs.writeFileSync('index.html', c);
