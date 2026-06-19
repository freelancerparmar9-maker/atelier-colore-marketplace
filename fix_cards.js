const fs = require('fs');

// ============================================================
// ISSUE 2: Fix all-artworks.html - ensure grid shows content
// The onclick in template literals prevents navigation.
// Simplify the card rendering for all collection pages.
// ============================================================

function buildGridCard(artVarName = 'art') {
  return `
        <a href="\${targetUrl}" class="artwork-grid-card" onclick="return navigateToArt(event, '\${targetUrl}', '\${art.id}', \${isAuction})">
          <div class="card-frame"><img src="\${art.Image_url}" class="card-img" loading="lazy" /></div>
          <div class="card-meta">
            <div>
              <div class="card-title">\${art.Title||'Untitled'}</div>
              <div class="card-medium">\${art.Type||''}</div>
            </div>
            <div class="card-price \${isAuction ? 'auction-price' : ''}">\${priceDisplay}</div>
          </div>
          <div class="card-meta" style="margin-top:4px;padding-top:0;border-top:none;">
            <div class="card-medium" style="opacity:0.75;font-size:11px;">
              \${art.Medium ? art.Medium : ''}\${art.Medium && art.Dimension ? ' | ' : ''}\${art.Dimension || ''}
            </div>
          </div>
        </a>`;
}

// Helper script tag to inject into pages (before closing body or after supabase import)
const navHelper = `
    window.navigateToArt = function(e, url, id, isAuction) {
      if (!isAuction && id) localStorage.setItem('selectedArtworkId', id);
      window.location.href = url;
      return false;
    };`;

// Fix all-artworks.html
let aaContent = fs.readFileSync('all-artworks.html', 'utf8');
aaContent = aaContent.replace(
  /grid\.innerHTML\s*=\s*sorted\.map\(art\s*=>\s*\{[\s\S]*?\}\)\.join\(''\);/,
  `grid.innerHTML = sorted.map(art => {
        const isAuction = art.Service && art.Service.toLowerCase().includes('auction');
        const priceDisplay = isAuction ? 'Auction' : (art.Price ? '$' + Number(art.Price).toLocaleString() : 'Price on Request');
        const targetUrl = isAuction ? '/auction.html' : '/artwork.html?id=' + art.id;
        return \`${buildGridCard()}\`;
      }).join('');`
);

// Inject navHelper if not already present
if (!aaContent.includes('window.navigateToArt')) {
  aaContent = aaContent.replace('window.applySort = renderGrid;', navHelper + '\n    window.applySort = renderGrid;');
}
// Add CSS for auction-price
if (!aaContent.includes('auction-price')) {
  aaContent = aaContent.replace('.card-price {', '.card-price.auction-price { color: var(--gold) !important; font-weight: 700; }\n    .card-price {');
}
fs.writeFileSync('all-artworks.html', aaContent);
console.log('✅ Fixed all-artworks.html');

// Fix catalog.html
let catContent = fs.readFileSync('catalog.html', 'utf8');
catContent = catContent.replace(
  /grid\.innerHTML\s*=\s*sorted\.map\(art\s*=>\s*\{[\s\S]*?\}\)\.join\(''\);/,
  `grid.innerHTML = sorted.map(art => {
        const isAuction = art.Service && art.Service.toLowerCase().includes('auction');
        const priceDisplay = isAuction ? 'Auction' : (art.Price ? '$' + Number(art.Price).toLocaleString() : 'Price on Request');
        const targetUrl = isAuction ? '/auction.html' : '/artwork.html?id=' + art.id;
        return \`${buildGridCard()}\`;
      }).join('');`
);
if (!catContent.includes('window.navigateToArt')) {
  catContent = catContent.replace(/<\/script>/, navHelper + '\n  </script>');
}
fs.writeFileSync('catalog.html', catContent);
console.log('✅ Fixed catalog.html');

// Fix sculptures.html
let sculContent = fs.readFileSync('sculptures.html', 'utf8');
sculContent = sculContent.replace(
  /grid\.innerHTML\s*=\s*sorted\.map\(art\s*=>\s*\{[\s\S]*?\}\)\.join\(''\);/,
  `grid.innerHTML = sorted.map(art => {
        const isAuction = art.Service && art.Service.toLowerCase().includes('auction');
        const priceDisplay = isAuction ? 'Auction' : (art.Price ? '$' + Number(art.Price).toLocaleString() : 'Price on Request');
        const targetUrl = isAuction ? '/auction.html' : '/artwork.html?id=' + art.id;
        return \`${buildGridCard()}\`;
      }).join('');`
);
if (!sculContent.includes('window.navigateToArt')) {
  sculContent = sculContent.replace(/window\.applySort\s*=\s*renderGrid;/, navHelper + '\n    window.applySort = renderGrid;');
}
fs.writeFileSync('sculptures.html', sculContent);
console.log('✅ Fixed sculptures.html');

// Fix sketches.html
let sketchContent = fs.readFileSync('sketches.html', 'utf8');
sketchContent = sketchContent.replace(
  /grid\.innerHTML\s*=\s*sorted\.map\(art\s*=>\s*\{[\s\S]*?\}\)\.join\(''\);/,
  `grid.innerHTML = sorted.map(art => {
        const isAuction = art.Service && art.Service.toLowerCase().includes('auction');
        const priceDisplay = isAuction ? 'Auction' : (art.Price ? '$' + Number(art.Price).toLocaleString() : 'Price on Request');
        const targetUrl = isAuction ? '/auction.html' : '/artwork.html?id=' + art.id;
        return \`${buildGridCard()}\`;
      }).join('');`
);
if (!sketchContent.includes('window.navigateToArt')) {
  sketchContent = sketchContent.replace(/window\.applySort\s*=\s*renderGrid;/, navHelper + '\n    window.applySort = renderGrid;');
}
fs.writeFileSync('sketches.html', sketchContent);
console.log('✅ Fixed sketches.html');

// Fix acrylic-on-canvas.html
let aocContent = fs.readFileSync('acrylic-on-canvas.html', 'utf8');
aocContent = aocContent.replace(
  /grid\.innerHTML\s*=\s*sorted\.map\(art\s*=>\s*\{[\s\S]*?\}\)\.join\(''\);/,
  `grid.innerHTML = sorted.map(art => {
        const isAuction = art.Service && art.Service.toLowerCase().includes('auction');
        const priceDisplay = isAuction ? 'Auction' : (art.Price ? '$' + Number(art.Price).toLocaleString() : 'Price on Request');
        const targetUrl = isAuction ? '/auction.html' : '/artwork.html?id=' + art.id;
        return \`${buildGridCard()}\`;
      }).join('');`
);
if (!aocContent.includes('window.navigateToArt')) {
  aocContent = aocContent.replace(/window\.applySort\s*=\s*renderGrid;/, navHelper + '\n    window.applySort = renderGrid;');
}
fs.writeFileSync('acrylic-on-canvas.html', aocContent);
console.log('✅ Fixed acrylic-on-canvas.html');

// Fix auction.html
let aucContent = fs.readFileSync('auction.html', 'utf8');
aucContent = aucContent.replace(
  /grid\.innerHTML\s*=\s*sorted\.map\(art\s*=>\s*\{[\s\S]*?\}\)\.join\(''\);/,
  `grid.innerHTML = sorted.map(art => {
        const isAuction = true;
        const priceDisplay = 'Auction';
        const targetUrl = '/artwork.html?id=' + art.id;
        return \`${buildGridCard()}\`;
      }).join('');`
);
if (!aucContent.includes('window.navigateToArt')) {
  aucContent = aucContent.replace(/window\.applySort\s*=\s*renderGrid;/, navHelper + '\n    window.applySort = renderGrid;');
}
fs.writeFileSync('auction.html', aucContent);
console.log('✅ Fixed auction.html');

// Fix artist.html cards
let artistContent = fs.readFileSync('artist.html', 'utf8');
artistContent = artistContent.replace(
  /return works\.filter\(w\s*=>\s*w\.Image_url\)\.map\(art\s*=>\s*\{[\s\S]*?\}\)\.join\(''\);/,
  `return works.filter(w => w.Image_url).map(art => {
        const isAuction = art.Service && art.Service.toLowerCase().includes('auction');
        const priceDisplay = isAuction ? 'Auction' : (art.Price ? '$' + Number(art.Price).toLocaleString() : 'Price on Request');
        const targetUrl = isAuction ? '/auction.html' : '/artwork.html?id=' + art.id;
        return \`
        <a href="\${targetUrl}" class="portfolio-card" onclick="return navigateToArt(event, '\${targetUrl}', '\${art.id}', \${isAuction})">
          <div class="portfolio-card-frame">
            <img src="\${art.Image_url}" alt="\${art.Title}" class="portfolio-card-img" loading="lazy" />
          </div>
          <div class="portfolio-card-info">
            <div class="portfolio-card-title">\${art.Title || 'Untitled'}</div>
            <div class="portfolio-card-price \${isAuction ? 'auction-price' : ''}">\${priceDisplay}</div>
          </div>
          <div class="portfolio-card-type" style="display:flex;flex-direction:column;gap:4px;">
            <span style="font-weight:600;color:var(--gold);">\${art.Type || ''}</span>
            <span style="font-size:10px;text-transform:uppercase;letter-spacing:1px;color:var(--gold);opacity:0.8;">
              \${art.Medium ? art.Medium : ''}\${art.Medium && art.Dimension ? ' | ' : ''}\${art.Dimension || ''}
            </span>
          </div>
        </a>\`;
      }).join('');`
);
if (!artistContent.includes('window.navigateToArt')) {
  artistContent = artistContent.replace('window.applyFilter', navHelper + '\n    window.applyFilter');
}
fs.writeFileSync('artist.html', artistContent);
console.log('✅ Fixed artist.html cards');

// Fix index.html showcase row
let indexContent = fs.readFileSync('index.html', 'utf8');
indexContent = indexContent.replace(
  /trackEl\.innerHTML\s*=\s*validData\.map\(art\s*=>\s*\{[\s\S]*?\}\)\.join\(''\);/,
  `trackEl.innerHTML = validData.map(art => {
        const isAuction = art.Service && art.Service.toLowerCase().includes('auction');
        const priceDisplay = isAuction ? 'Auction' : (art.Price ? '$' + Number(art.Price).toLocaleString() : 'Price on Request');
        const targetUrl = isAuction ? '/auction.html' : '/artwork.html?id=' + art.id;
        return \`
        <a href="\${targetUrl}" class="art-card" onclick="return navigateToArt(event, '\${targetUrl}', '\${art.id}', \${isAuction})">
          <div class="art-frame">
            <img src="\${art.Image_url}" class="art-image" alt="\${art.Title || 'Artwork'}" loading="lazy" />
          </div>
          <div class="art-info">
            <h4 class="art-card-title">\${art.Title || 'Untitled'}</h4>
            <span class="art-card-price \${isAuction ? 'auction-price' : ''}">\${priceDisplay}</span>
          </div>
          <div class="art-details" style="font-size:11px;color:var(--gold);margin-top:4px;text-transform:uppercase;letter-spacing:1px;">
            \${art.Medium ? art.Medium : ''}\${art.Medium && art.Dimension ? ' | ' : ''}\${art.Dimension || ''}
          </div>
        </a>
      \`}).join('');`
);
if (!indexContent.includes('window.navigateToArt')) {
  indexContent = indexContent.replace('init();', navHelper + '\n    init();');
}
fs.writeFileSync('index.html', indexContent);
console.log('✅ Fixed index.html showcase cards');

console.log('\n✅ All card rendering fixes applied.');
