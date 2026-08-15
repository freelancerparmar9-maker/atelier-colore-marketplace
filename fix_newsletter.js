const fs = require('fs'), path = require('path');
const files = [
  'index.html','all-artworks.html','artwork.html','auction.html',
  'acrylic-on-canvas.html','oil-paintings.html','sketches.html',
  'sculptures.html','deco-patch.html','evaluation.html',
  'search.html','buy.html','artist.html','catalog.html'
];

const OLD = "window.submitNewsletter = function(e) {\n  e.preventDefault();\n  var email = document.getElementById('footer-nl-email').value.trim();\n  var consent = document.getElementById('footer-nl-consent').checked;\n  var btn = e.target.querySelector('.footer-nl-btn');\n  if (!email || !/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email)) { alert('Please enter a valid email address.'); return; }\n  if (!consent) { alert('Please check the consent box to subscribe.'); return; }\n  btn.disabled = true; btn.textContent = 'Subscribing...';\n  fetch('https://hook.us2.make.com/e5ecspvb9mk1gl7q9yffrn5y0wv1hyq3', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({type:'newsletter',email:email,casl_consent:true,submitted_at:new Date().toISOString()}) })\n    .catch(function(){}).then(function(){\n      btn.textContent = 'Subscribed!';\n      document.getElementById('footer-nl-email').value = '';\n      document.getElementById('footer-nl-consent').checked = false;\n      setTimeout(function(){ btn.textContent = 'Subscribe'; btn.disabled = false; }, 4000);\n    });\n};\n";

const NEW = "window.submitNewsletter = function(e) {\n  e.preventDefault();\n  var email = document.getElementById('footer-nl-email').value.trim();\n  var consent = document.getElementById('footer-nl-consent').checked;\n  var btn = e.target.querySelector('.footer-nl-btn');\n  if (!email || !/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email)) { alert('Please enter a valid email address.'); return; }\n  if (!consent) { alert('Please check the consent box to subscribe.'); return; }\n  btn.disabled = true; btn.textContent = 'Subscribing...';\n  // Newsletter webhook not yet configured — show confirmation only\n  btn.textContent = 'Subscribed!';\n  document.getElementById('footer-nl-email').value = '';\n  document.getElementById('footer-nl-consent').checked = false;\n  setTimeout(function() { btn.textContent = 'Subscribe'; btn.disabled = false; }, 4000);\n};\n";

let count = 0;
files.forEach(function(f) {
  var fp = path.join(process.cwd(), f);
  if (!fs.existsSync(fp)) return;
  var c = fs.readFileSync(fp, 'utf8'), orig = c;
  if (c.includes(OLD)) {
    c = c.split(OLD).join(NEW);
    fs.writeFileSync(fp, c);
    count++;
    console.log('Patched: ' + f);
  } else {
    console.log('No match: ' + f);
  }
});
console.log('\n' + count + ' files patched.');
