const fs = require('fs');

const files = [
  'artist.html', 'auction.html', 'acrylic-on-canvas.html', 'sketches.html', 
  'sculptures.html', 'index.html'
];

for (const file of files) {
  let c = fs.readFileSync(file, 'utf8');
  const firstClose = c.indexOf('</html>');
  if (firstClose !== -1) {
    const truncated = c.substring(0, firstClose + '</html>'.length);
    if (truncated.length < c.length) {
      console.log(`✅ Truncating ${file}: removed ${c.length - truncated.length} orphaned chars after </html>`);
      fs.writeFileSync(file, truncated);
    } else {
      console.log(`✓ ${file} is clean`);
    }
  }
}
