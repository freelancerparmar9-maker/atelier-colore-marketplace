const fs = require('fs');
const files = [
  'index.html', 'all-artworks.html', 'artist.html', 'artwork.html',
  'auction.html', 'acrylic-on-canvas.html', 'sketches.html', 
  'sculptures.html', 'search.html', 'oil-paintings.html', 'catalog.html', 'buy.html'
];

files.forEach(f => {
  if (fs.existsSync(f)) {
    let c = fs.readFileSync(f, 'utf8');
    // We want to change the text "Buy" to "Evaluation" in the nav dropdown.
    // The previous link was <a href="/buy.html">Buy</a>
    let newContent = c.replace(/>Buy<\/a><\/li>/g, '>Evaluation</a></li>');
    if (c !== newContent) {
      fs.writeFileSync(f, newContent);
      console.log('Updated ' + f);
    }
  }
});
