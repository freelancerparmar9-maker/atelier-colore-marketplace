const fs = require('fs');
let c = fs.readFileSync('index.html', 'utf8');

// 1. Change object-fit: cover to object-fit: contain, so videos are "zoomed out"
c = c.replace('object-fit: cover; opacity: 0;', 'object-fit: contain; opacity: 0;');

// 2. Reduce the size of the handicrafts section
c = c.replace('padding: 80px 40px;', 'padding: 50px 40px;');
c = c.replace('min-height: 600px;', 'min-height: 450px;');

// 3. Remove %20 from Himachal Pradesh URL to see if it fixes the loading issue for the user's specific browser
c = c.replace('Video/Himachal%20Pradesh.mp4', 'Video/Himachal Pradesh.mp4');

fs.writeFileSync('index.html', c);
