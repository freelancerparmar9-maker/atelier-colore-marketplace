const fs = require('fs');

// Fix Buy links in all nav files
const files = ['auction.html', 'sketches.html', 'sculptures.html', 'index.html',
  'search.html', 'oil-paintings.html', 'artwork.html', 'catalog.html'];

for (const file of files) {
  let c = fs.readFileSync(file, 'utf8');
  const before = c;
  
  // Fix Buy link 
  c = c.replace(/<li><a href="#">Buy<\/a><\/li>/g, '<li><a href="/buy.html">Buy</a></li>');
  // Fix minified version
  c = c.replace(/<li><a href="#">Buy<\/a><\/li><li><a href="\/auction\.html">/g, 
    '<li><a href="/buy.html">Buy</a></li><li><a href="/auction.html">');
  
  if (c !== before) {
    fs.writeFileSync(file, c);
    console.log('✅ Fixed Buy link in ' + file);
  } else {
    console.log('⚠️  No change needed in ' + file);
  }
}

// Fix index.html showcase row card rendering (specifically the onclick issue)
let indexContent = fs.readFileSync('index.html', 'utf8');
// Fix the onclick in the showcase cards that has "; return false;" instead of clean onclick
indexContent = indexContent.replace(
  /onclick="localStorage\.setItem\('selectedArtworkId', '\${art\.id}'\); window\.location\.href='\/artwork\.html\?id=\${art\.id}'; return false;"/g,
  `onclick="localStorage.setItem('selectedArtworkId','\${art.id}');window.location.href='/artwork.html?id=\${art.id}';return false;"`
);
fs.writeFileSync('index.html', indexContent);
console.log('✅ Fixed index.html onclick format');
