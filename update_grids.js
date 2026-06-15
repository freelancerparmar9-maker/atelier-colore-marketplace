const fs = require('fs');

const collectionFiles = [
  'acrylic-on-canvas.html',
  'all-artworks.html',
  'auction.html',
  'catalog.html',
  'oil-paintings.html',
  'sculptures.html',
  'sketches.html'
];

for (const file of collectionFiles) {
  let content = fs.readFileSync(file, 'utf8');
  
  // Find grid.innerHTML = sorted.map(art => `...`).join('');
  // Or grid.innerHTML = items.map(art => `...`).join('');
  const regex = /grid\.innerHTML\s*=\s*(sorted|items)\.map\(art\s*=>\s*`[\s\S]*?`\)\.join\(''\);/g;
  
  content = content.replace(regex, (match, arrayName) => {
    return `grid.innerHTML = ${arrayName}.map(art => {
        const isAuction = art.Service && art.Service.toLowerCase().includes('auction');
        const priceDisplay = isAuction ? 'Auction' : '$' + Number(art.Price).toLocaleString();
        const targetUrl = isAuction ? '/auction.html' : \`/artwork.html?id=\${art.id}\`;
        return \`
        <a href="\${targetUrl}" class="artwork-grid-card" onclick="if(!\${isAuction}){localStorage.setItem('selectedArtworkId', '\${art.id}');}; window.location.href='\${targetUrl}'; return false;">
          <div class="card-frame"><img src="\${art.Image_url}" class="card-img" loading="lazy" /></div>
          <div class="card-meta">
            <div>
              <div class="card-title">\${art.Title||'Untitled'}</div>
              <div class="card-medium">\${art.Type||''}</div>
            </div>
            <div class="card-price" style="\${isAuction ? 'color: var(--gold); font-weight: 600;' : ''}">\${priceDisplay}</div>
          </div>
          <div class="card-meta" style="margin-top: 4px; padding-top: 0; border-top: none;">
            <div class="card-medium" style="opacity: 0.8; font-size: 11px;">
              \${art.Medium || ''} \${art.Medium && art.Dimension ? ' | ' : ''} \${art.Dimension || ''}
            </div>
          </div>
        </a>\`}).join('');`;
  });
  
  fs.writeFileSync(file, content);
  console.log('Updated ' + file);
}

// Handle artist.html
let artistContent = fs.readFileSync('artist.html', 'utf8');
const artistRegex = /portfolioGrid\.innerHTML\s*=\s*works\.filter\(w\s*=>\s*w\.Image_url\)\.map\(art\s*=>\s*`[\s\S]*?`\)\.join\(''\);/g;
artistContent = artistContent.replace(artistRegex, () => {
    return `portfolioGrid.innerHTML = works.filter(w => w.Image_url).map(art => {
        const isAuction = art.Service && art.Service.toLowerCase().includes('auction');
        const priceDisplay = isAuction ? 'Auction' : '$' + Number(art.Price).toLocaleString();
        const targetUrl = isAuction ? '/auction.html' : \`/artwork.html?id=\${art.id}\`;
        return \`
        <a href="\${targetUrl}" class="portfolio-card" onclick="if(!\${isAuction}){localStorage.setItem('selectedArtworkId', '\${art.id}');}; window.location.href='\${targetUrl}'; return false;">
          <div class="portfolio-card-frame">
            <img src="\${art.Image_url}" alt="\${art.Title}" class="portfolio-card-img" loading="lazy" />
          </div>
          <div class="portfolio-card-info">
            <div class="portfolio-card-title">\${art.Title || 'Untitled'}</div>
            <div class="portfolio-card-price" style="\${isAuction ? 'color: var(--gold); font-weight: 600;' : ''}">\${priceDisplay}</div>
          </div>
          <div class="portfolio-card-type" style="display: flex; flex-direction: column; gap: 4px;">
            <span style="font-weight: 600; color: var(--gold);">\${art.Type || ''}</span>
            <span style="font-size: 10px; text-transform: uppercase; letter-spacing: 1px; color: var(--gold); opacity: 0.8;">
              \${art.Medium || ''} \${art.Medium && art.Dimension ? ' | ' : ''} \${art.Dimension || ''}
            </span>
          </div>
        </a>\`}).join('');`;
});
fs.writeFileSync('artist.html', artistContent);
console.log('Updated artist.html');

// Handle search.html (grid.innerHTML = items.map...)
let searchContent = fs.readFileSync('search.html', 'utf8');
const searchRegex = /grid\.innerHTML\s*=\s*items\.map\(art\s*=>\s*`[\s\S]*?`\)\.join\(''\);/g;
searchContent = searchContent.replace(searchRegex, () => {
    return `grid.innerHTML = items.map(art => {
        const isAuction = art.Service && art.Service.toLowerCase().includes('auction');
        const priceDisplay = isAuction ? 'Auction' : '$' + Number(art.Price).toLocaleString();
        const targetUrl = isAuction ? '/auction.html' : \`/artwork.html?id=\${art.id}\`;
        return \`
        <a href="\${targetUrl}" class="artwork-grid-card" onclick="if(!\${isAuction}){localStorage.setItem('selectedArtworkId', '\${art.id}');}; window.location.href='\${targetUrl}'; return false;">
          <div class="card-frame"><img src="\${art.Image_url}" class="card-img" loading="lazy" /></div>
          <div class="card-meta">
            <div>
              <div class="card-title">\${art.Title||'Untitled'}</div>
              <div class="card-medium">\${art.Type||''}</div>
            </div>
            <div class="card-price" style="\${isAuction ? 'color: var(--gold); font-weight: 600;' : ''}">\${priceDisplay}</div>
          </div>
          <div class="card-meta" style="margin-top: 4px; padding-top: 0; border-top: none;">
            <div class="card-medium" style="opacity: 0.8; font-size: 11px;">
              \${art.Medium || ''} \${art.Medium && art.Dimension ? ' | ' : ''} \${art.Dimension || ''}
            </div>
          </div>
        </a>\`}).join('');`;
});
fs.writeFileSync('search.html', searchContent);
console.log('Updated search.html');
