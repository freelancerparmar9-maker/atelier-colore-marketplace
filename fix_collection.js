const fs = require('fs');

// ============================================================
// COMPREHENSIVE FIX SCRIPT
// Fixes: nav duplicates, card onclick bug, Buy page, artwork.html
// ============================================================

const CARD_RENDER_NEW = `
        const isAuction = art.Service && art.Service.toLowerCase().includes('auction');
        const priceDisplay = isAuction ? 'Auction' : (art.Price ? '$' + Number(art.Price).toLocaleString() : 'Price on Request');
        const targetUrl = isAuction ? '/auction.html' : '/artwork.html?id=' + art.id;
        return \`
        <a href="\${targetUrl}" class="artwork-grid-card" onclick="if(!'\${isAuction}'){localStorage.setItem('selectedArtworkId','\${art.id}');}window.location.href='\${targetUrl}';return false;">
          <div class="card-frame"><img src="\${art.Image_url}" class="card-img" loading="lazy" /></div>
          <div class="card-meta">
            <div>
              <div class="card-title">\${art.Title||'Untitled'}</div>
              <div class="card-medium">\${art.Type||''}</div>
            </div>
            <div class="card-price" style="\${isAuction ? 'color:var(--gold);font-weight:700;' : ''}">\${priceDisplay}</div>
          </div>
          <div class="card-meta" style="margin-top:4px;padding-top:0;border-top:none;">
            <div class="card-medium" style="opacity:0.75;font-size:11px;">
              \${art.Medium ? art.Medium : ''}\${art.Medium && art.Dimension ? ' | ' : ''}\${art.Dimension || ''}
            </div>
          </div>
        </a>\`;`;

// Files that use sorted.map grid pattern
const gridFiles = [
  'acrylic-on-canvas.html',
  'auction.html',
  'sketches.html',
  'sculptures.html'
];

for (const file of gridFiles) {
  let c = fs.readFileSync(file, 'utf8');
  
  // Replace the old card rendering logic inside the map
  const oldPattern = `const isAuction = art.Service && art.Service.toLowerCase().includes('auction');\r\n        const priceDisplay = isAuction ? 'Auction' : '$' + Number(art.Price).toLocaleString();\r\n        const targetUrl = isAuction ? '/auction.html' : \`/artwork.html?id=\${art.id}\`;\r\n        return \`\r\n        <a href="\${targetUrl}" class="artwork-grid-card" onclick="if(!\${isAuction}){localStorage.setItem('selectedArtworkId', '\${art.id}');}; window.location.href='\${targetUrl}'; return false;">\r\n          <div class="card-frame"><img src="\${art.Image_url}" class="card-img" loading="lazy" /></div>\r\n          <div class="card-meta">\r\n            <div>\r\n              <div class="card-title">\${art.Title||'Untitled'}</div>\r\n              <div class="card-medium">\${art.Type||''}</div>\r\n            </div>\r\n            <div class="card-price" style="\${isAuction ? 'color: var(--gold); font-weight: 600;' : ''}">\${priceDisplay}</div>\r\n          </div>\r\n          <div class="card-meta" style="margin-top: 4px; padding-top: 0; border-top: none;">\r\n            <div class="card-medium" style="opacity: 0.8; font-size: 11px;">\r\n              \${art.Medium || ''} \${art.Medium && art.Dimension ? ' | ' : ''} \${art.Dimension || ''}\r\n            </div>\r\n          </div>\r\n        </a>\`}).join('');`;
    
  const newPattern = CARD_RENDER_NEW + `\r\n      }).join('');`;
  
  if (c.includes(oldPattern)) {
    c = c.replace(oldPattern, newPattern);
    console.log('✅ Fixed grid card in ' + file);
  } else {
    // Try alternate detection
    if (c.includes("window.location.href='${targetUrl}'; return false;")) {
      console.log('⚠️  ' + file + ' already has updated onclick or different format — skipping card fix');
    } else {
      console.log('❌ Could not find pattern in ' + file);
    }
  }
  
  // Also fix Buy link in nav for all files
  c = c.replace(/<li><a href="#">Buy<\/a><\/li>/g, '<li><a href="/buy.html">Buy</a></li>');
  
  fs.writeFileSync(file, c);
}

console.log('Done.');
