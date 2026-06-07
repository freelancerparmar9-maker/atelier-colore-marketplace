const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;

  // Replace dynamic artist links (with or without .html) with /artist.html
  content = content.replace(/href=["']\/?artist(\.html)?\?id=/g, 'href="/artist.html?id=');
  content = content.replace(/window\.location\.href=['"]\/?artist(\.html)?\?id=/g, "window.location.href='/artist.html?id=");
  
  // Replace dynamic artwork links with /artwork.html
  content = content.replace(/href=["']\/?artwork(\.html)?\?id=/g, 'href="/artwork.html?id=');
  content = content.replace(/window\.location\.href=['"]\/?artwork(\.html)?\?id=/g, "window.location.href='/artwork.html?id=");

  if (content !== original) {
    fs.writeFileSync(file, content);
    console.log('Updated ' + file);
  }
}
