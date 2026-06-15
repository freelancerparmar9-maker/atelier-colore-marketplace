const fs = require('fs');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');

  // 1. Navigation Updates
  content = content.replace(/<li><a href="(\/)?oil-paintings\.html">Oil Painting<\/a><\/li>/g, 
    () => `<li><a href="/acrylic-on-canvas.html">Acrylic On Canvas</a></li>\n          <li><a href="/oil-paintings.html">Oil Painting</a></li>`);

  content = content.replace(/<li><a href="#">Bid<\/a><\/li>/g, 
    () => `<li><a href="/auction.html">Auction</a></li>`);

  // 2. index.html Row 2 Update
  if (file === 'index.html') {
    content = content.replace(/Row 2: Oil Paintings/g, 'Row 2: Acrylic On Canvas');
    content = content.replace(/<h3 class="row-title">Oil Paintings<\/h3>/g, '<h3 class="row-title">Acrylic On Canvas</h3>');
    content = content.replace(/<a href="(\/)?oil-paintings\.html" class="row-see-more">/g, '<a href="/acrylic-on-canvas.html" class="row-see-more">');
    content = content.replace(/\.eq\('Type', 'Oil Painting'\)/g, () => `.eq('Type', 'Acrylic On Canvas')`);
  }

  // 3. Card Rendering Updates - renderShowcaseRow (index.html)
  const renderShowcaseRowRegex = /trackEl\.innerHTML\s*=\s*validData\.map\(art\s*=>\s*`[\s\S]*?`\)\.join\(''\);/g;
  content = content.replace(renderShowcaseRowRegex, () => `trackEl.innerHTML = validData.map(art => {
        const isAuction = art.Service && art.Service.toLowerCase().includes('auction');
        const priceDisplay = isAuction ? 'Auction' : '$' + Number(art.Price).toLocaleString();
        const targetUrl = isAuction ? '/auction.html' : \`/artwork.html?id=\${art.id}\`;
        return \`
        <a href="\${targetUrl}" onclick="if(!\${isAuction}){localStorage.setItem('selectedArtworkId', '\${art.id}');}; window.location.href='\${targetUrl}'; return false;" class="art-card">
          <div class="art-frame">
            <img src="\${art.Image_url}" class="art-image" alt="\${art.Title || 'Artwork'}" loading="lazy" />
          </div>
          <div class="art-info">
            <h4 class="art-card-title">\${art.Title || 'Untitled'}</h4>
            <span class="art-card-price">\${priceDisplay}</span>
          </div>
          <div class="art-details" style="font-size: 11px; color: var(--gold); margin-top: 4px; text-transform: uppercase; letter-spacing: 1px;">
            \${art.Medium || ''} \${art.Medium && art.Dimension ? ' | ' : ''} \${art.Dimension || ''}
          </div>
        </a>
      \`}).join('');`);

  // 4. Card Rendering Updates - renderCards (collection pages)
  const renderCardsRegex = /return works\.filter\(w\s*=>\s*w\.Image_url\)\.map\(art\s*=>\s*`[\s\S]*?`\)\.join\(''\);/g;
  content = content.replace(renderCardsRegex, () => `return works.filter(w => w.Image_url).map(art => {
        const isAuction = art.Service && art.Service.toLowerCase().includes('auction');
        const priceDisplay = isAuction ? 'Auction' : '$' + Number(art.Price).toLocaleString();
        const targetUrl = isAuction ? '/auction.html' : \`/artwork.html?id=\${art.id}\`;
        return \`
        <a href="\${targetUrl}" onclick="if(!\${isAuction}){localStorage.setItem('selectedArtworkId', '\${art.id}');}; window.location.href='\${targetUrl}'; return false;" class="portfolio-card">
          <div class="portfolio-card-frame">
            <img src="\${art.Image_url}" alt="\${art.Title}" class="portfolio-card-img" loading="lazy" />
          </div>
          <div class="portfolio-card-info">
            <div class="portfolio-card-title">\${art.Title || 'Untitled'}</div>
            <div class="portfolio-card-price">\${priceDisplay}</div>
          </div>
          <div class="portfolio-card-type" style="display: flex; flex-direction: column; gap: 4px;">
            <span style="font-weight: 600; color: var(--gold);">\${art.Type || ''}</span>
            <span style="font-size: 10px; text-transform: uppercase; letter-spacing: 1px; color: var(--gold); opacity: 0.8;">
              \${art.Medium || ''} \${art.Medium && art.Dimension ? ' | ' : ''} \${art.Dimension || ''}
            </span>
          </div>
        </a>
      \`}).join('');`);

  fs.writeFileSync(file, content);
  console.log('Updated ' + file);
}
