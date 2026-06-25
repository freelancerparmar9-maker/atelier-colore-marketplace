const fs = require('fs');
const files = [
  'acrylic-on-canvas.html','all-artworks.html','artist.html',
  'artwork.html','auction.html','buy.html','oil-paintings.html',
  'sculptures.html','sketches.html','catalog.html'
];
files.forEach(f => {
  try {
    let c = fs.readFileSync(f, 'utf8');
    const before = c;
    // Replace any href to /buy.html or buy.html that precedes the text Evaluation
    c = c.replace(/href="\/buy\.html"([^>]*)>Evaluation/g, 'href="/evaluation.html"$1>Evaluation');
    c = c.replace(/href="buy\.html"([^>]*)>Evaluation/g, 'href="evaluation.html"$1>Evaluation');
    if (c !== before) { fs.writeFileSync(f, c); console.log('Updated: ' + f); }
    else { console.log('No change: ' + f); }
  } catch(e) { console.log('Skip (not found): ' + f); }
});
