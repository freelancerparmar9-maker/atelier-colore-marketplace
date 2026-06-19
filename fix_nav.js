const fs = require('fs');

// ===== ISSUE 1: FIX DUPLICATE "Acrylic On Canvas" in artist.html nav =====
// The problem: artist.html line 420 has it with Unix LF (\n) while 421 has CRLF (\r\n).
// The previous update_all.js regex matched the CRLF version and re-added it,
// creating two entries. We need to normalize it to a single clean block.
let artistContent = fs.readFileSync('artist.html', 'utf8');

// Replace the entire Artwork Type dropdown block in artist.html with a clean version
const artworkTypeDropdown = `        <a href="#" >Artwork Type <span style="font-size:8px; margin-left:4px;">▼</span></a>
        <ul class="dropdown-menu">
          <li><a href="/all-artworks.html">All Artwork</a></li>
          <li><a href="/sculptures.html">Sculpture and Objects</a></li>
          <li><a href="/acrylic-on-canvas.html">Acrylic On Canvas</a></li>
          <li><a href="/oil-paintings.html">Oil Painting</a></li>
          <li><a href="/sketches.html">Sketches</a></li>
        </ul>`;

// Remove any existing Artwork Type dropdown block and replace cleanly
artistContent = artistContent.replace(
  /<a href="#"\s*>Artwork Type[\s\S]*?<\/ul>/,
  artworkTypeDropdown
);

// Fix Buy link in artist.html
artistContent = artistContent.replace(
  /<li><a href="#">Buy<\/a><\/li>/g,
  '<li><a href="/buy.html">Buy</a></li>'
);

fs.writeFileSync('artist.html', artistContent);
console.log('✅ Fixed artist.html');

// ===== ISSUE 1 ALSO: Fix all nav files to fix duplicate and Buy link =====
const allNavFiles = ['index.html', 'all-artworks.html', 'artwork.html', 'catalog.html',
  'sculptures.html', 'sketches.html', 'search.html', 'acrylic-on-canvas.html',
  'oil-paintings.html', 'auction.html'];

for (const file of allNavFiles) {
  let c = fs.readFileSync(file, 'utf8');
  
  // Fix any duplicate Acrylic On Canvas entries - remove the LF-only version that was duplicated
  // The LF-only line (no \r) is the duplicate injected by the script
  c = c.replace(
    /(<li><a href="\/acrylic-on-canvas\.html">Acrylic On Canvas<\/a><\/li>)\n(\s*<li><a href="\/acrylic-on-canvas\.html">Acrylic On Canvas<\/a><\/li>)/g,
    '$1'
  );
  
  // Fix Buy link to point to /buy.html
  c = c.replace(/<li><a href="#">Buy<\/a><\/li>/g, '<li><a href="/buy.html">Buy</a></li>');
  
  fs.writeFileSync(file, c);
  console.log('✅ Cleaned ' + file);
}
console.log('\n✅ All nav fixes applied.');
