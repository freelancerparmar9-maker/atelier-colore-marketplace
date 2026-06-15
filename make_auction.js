const fs = require('fs');
let c = fs.readFileSync('auction.html', 'utf8');

c = c.replace(/<title>.*?<\/title>/, '<title>Auctions — Atelier Coloré Canada</title>');
c = c.replace(/<meta name="description" content=".*?" \/>/, '<meta name="description" content="Exclusive art auctions by Atelier Coloré Canada." />');
c = c.replace(/<h1 class="catalog-heading">.*?<\/h1>/, '<h1 class="catalog-heading">Auctions</h1>');
c = c.replace(/<p class="catalog-subtitle">.*?<\/p>/, '<p class="catalog-subtitle">Rare and exclusive artworks currently available for auction.</p>');
c = c.replace(/\.eq\('Type', 'Acrylic On Canvas'\)/g, '.ilike(\'Service\', \'%auction%\')');
c = c.replace(/<div class="breadcrumb" id="breadcrumb">[\s\S]*?<\/div>/, `<div class="breadcrumb" id="breadcrumb">\n    <a href="/index.html">Home</a>\n    <span class="breadcrumb-sep">—</span>\n    <span>Auctions</span>\n  </div>`);

fs.writeFileSync('auction.html', c);
