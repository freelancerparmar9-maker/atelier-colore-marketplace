/**
 * update_site.js
 * Removes Sell nav link and injects site-wide footer (CASL newsletter + FR toggle)
 * into all existing HTML pages.
 */
const fs   = require('fs');
const path = require('path');

const WEBHOOK = 'https://hook.us2.make.com/e5ecspvb9mk1gl7q9yffrn5y0wv1hyq3';

const FILES = [
  'index.html','all-artworks.html','artwork.html','auction.html',
  'acrylic-on-canvas.html','oil-paintings.html','sketches.html',
  'sculptures.html','deco-patch.html','evaluation.html',
  'search.html','buy.html','artist.html','catalog.html'
];

const FOOTER_CSS = `
/* SITE FOOTER */
.site-footer{background:#111111;color:rgba(255,255,255,.82);padding:64px 80px 32px;margin-top:80px;--footer-gold:#d4a843;}
.footer-inner{max-width:1400px;margin:0 auto;display:grid;grid-template-columns:1.6fr 1fr 1fr 1.6fr;gap:48px;padding-bottom:48px;border-bottom:1px solid rgba(255,255,255,.1);}
.footer-logo{font-family:'Playfair Display',serif;font-size:20px;font-weight:800;letter-spacing:2px;text-transform:uppercase;color:#fff;text-decoration:none;display:block;margin-bottom:14px;}
.footer-tagline{font-size:12.5px;letter-spacing:.5px;color:rgba(255,255,255,.45);margin-bottom:22px;line-height:1.7;}
.footer-contact-info{font-size:13px;line-height:1.9;color:rgba(255,255,255,.6);margin-bottom:22px;}
.footer-contact-info strong{color:rgba(255,255,255,.85);}
.footer-contact-info a{color:var(--footer-gold);text-decoration:none;transition:opacity .2s;}
.footer-contact-info a:hover{opacity:.75;}
.footer-social{display:flex;gap:10px;margin-top:4px;}
.social-icon{color:rgba(255,255,255,.45);transition:color .3s,border-color .3s;display:flex;align-items:center;justify-content:center;width:36px;height:36px;border:1px solid rgba(255,255,255,.12);border-radius:50%;text-decoration:none;}
.social-icon:hover{color:var(--footer-gold);border-color:rgba(212,168,67,.4);}
.footer-heading{font-family:'Playfair Display',serif;font-size:12px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:var(--footer-gold);margin-bottom:18px;}
.footer-links{list-style:none;display:flex;flex-direction:column;gap:11px;}
.footer-links a{font-size:13px;color:rgba(255,255,255,.62);text-decoration:none;letter-spacing:.3px;transition:color .3s;}
.footer-links a:hover{color:var(--footer-gold);}
.footer-newsletter-desc{font-size:12.5px;color:rgba(255,255,255,.5);line-height:1.7;margin-bottom:16px;}
.footer-newsletter-form{display:flex;flex-direction:column;gap:10px;}
.footer-newsletter-form input[type=email]{background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.14);color:#fff;font-family:'Inter',sans-serif;font-size:13px;padding:11px 14px;outline:none;transition:border-color .3s;width:100%;}
.footer-newsletter-form input[type=email]::placeholder{color:rgba(255,255,255,.28);}
.footer-newsletter-form input[type=email]:focus{border-color:var(--footer-gold);}
.casl-consent-label{display:flex;gap:10px;align-items:flex-start;cursor:pointer;}
.casl-consent-label input[type=checkbox]{margin-top:3px;flex-shrink:0;width:14px;height:14px;accent-color:var(--footer-gold);}
.casl-consent-label span{font-size:11px;color:rgba(255,255,255,.4);line-height:1.65;}
.casl-consent-label a{color:var(--footer-gold) !important;text-decoration:none;}
.footer-nl-btn{background:var(--footer-gold);color:#111;border:none;padding:12px 20px;font-family:'Inter',sans-serif;font-size:11px;letter-spacing:2px;text-transform:uppercase;font-weight:600;cursor:pointer;transition:background .3s;width:100%;margin-top:2px;}
.footer-nl-btn:hover{background:#e8c050;}
.footer-nl-btn:disabled{background:#444;color:#888;cursor:not-allowed;}
.footer-bottom{max-width:1400px;margin:28px auto 0;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;}
.footer-copyright{font-size:12px;color:rgba(255,255,255,.3);letter-spacing:.4px;}
.footer-lang-toggle{display:flex;align-items:center;gap:8px;}
.lang-btn{background:none;border:1px solid transparent;color:rgba(255,255,255,.4);font-size:11px;letter-spacing:2px;text-transform:uppercase;cursor:pointer;padding:5px 10px;transition:all .25s;font-family:'Inter',sans-serif;border-radius:2px;}
.lang-btn.active{color:var(--footer-gold);border-color:rgba(212,168,67,.3);}
.lang-btn:hover{color:var(--footer-gold);}
.lang-sep{color:rgba(255,255,255,.2);font-size:10px;}
.fr-text{display:none !important;}
html.lang-fr .fr-text{display:inherit !important;}
html.lang-fr .en-text{display:none !important;}
@media(max-width:1100px){.footer-inner{grid-template-columns:1fr 1fr;gap:40px;}.site-footer{padding:48px 40px 28px;}}
@media(max-width:600px){.footer-inner{grid-template-columns:1fr;gap:32px;}.site-footer{padding:40px 24px 24px;}.footer-bottom{flex-direction:column;align-items:flex-start;}}
`;

const FOOTER_HTML = `
  <footer class="site-footer" role="contentinfo">
    <div class="footer-inner">
      <div class="footer-col">
        <a href="/index.html" class="footer-logo">Atelier Coloré</a>
        <p class="footer-tagline">Contemporary art from the Himalayas to the world.</p>
        <div class="footer-contact-info">
          <div><strong>Atelier Coloré Canada</strong></div>
          <div><a href="mailto:salonig2cando@gmail.com">salonig2cando@gmail.com</a></div>
          <div>[PHONE NUMBER TO BE ADDED]</div>
          <div>[BUSINESS ADDRESS TO BE ADDED]</div>
        </div>
        <div class="footer-social">
          <a href="#" class="social-icon" aria-label="Instagram">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
          </a>
          <a href="#" class="social-icon" aria-label="Facebook">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
          </a>
        </div>
      </div>
      <div class="footer-col">
        <h4 class="footer-heading">Legal</h4>
        <ul class="footer-links">
          <li><a href="/privacy-policy.html">Privacy Policy</a></li>
          <li><a href="/terms-of-sale.html">Terms of Sale</a></li>
          <li><a href="/returns.html">Return &amp; Refund Policy</a></li>
          <li><a href="/shipping.html">Shipping Policy</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4 class="footer-heading">Explore</h4>
        <ul class="footer-links">
          <li><a href="/about.html">About Us</a></li>
          <li><a href="/contact.html">Contact</a></li>
          <li><a href="/all-artworks.html">All Artworks</a></li>
          <li><a href="/deco-patch.html">Deco Patch</a></li>
          <li><a href="/auction.html">Auctions</a></li>
          <li><a href="/evaluation.html">Art Evaluation</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4 class="footer-heading">Stay in the Loop</h4>
        <p class="footer-newsletter-desc">New artworks, curations, and stories from the studio — directly to your inbox.</p>
        <form class="footer-newsletter-form" id="footerNewsletterForm" onsubmit="submitNewsletter(event)" novalidate autocomplete="off">
          <input type="email" id="footer-nl-email" placeholder="your@email.com" autocomplete="off" required aria-label="Email for newsletter" />
          <label class="casl-consent-label">
            <input type="checkbox" id="footer-nl-consent" />
            <span>I agree to receive marketing emails from Atelier Coloré Canada. Unsubscribe any time. <a href="/privacy-policy.html">Privacy Policy</a>.</span>
          </label>
          <button type="submit" class="footer-nl-btn"><span class="en-text">Subscribe</span><span class="fr-text">S'abonner</span></button>
        </form>
      </div>
    </div>
    <div class="footer-bottom">
      <p class="footer-copyright">© 2025 Atelier Coloré Canada. All rights reserved.</p>
      <div class="footer-lang-toggle" role="group" aria-label="Language selection">
        <button onclick="setLang('en')" class="lang-btn active" id="lang-btn-en">EN</button>
        <span class="lang-sep">|</span>
        <button onclick="setLang('fr')" class="lang-btn" id="lang-btn-fr">FR</button>
      </div>
    </div>
  </footer>
`;

const FOOTER_JS = `
window.submitNewsletter = function(e) {
  e.preventDefault();
  var email = document.getElementById('footer-nl-email').value.trim();
  var consent = document.getElementById('footer-nl-consent').checked;
  var btn = e.target.querySelector('.footer-nl-btn');
  if (!email || !/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email)) { alert('Please enter a valid email address.'); return; }
  if (!consent) { alert('Please check the consent box to subscribe.'); return; }
  btn.disabled = true; btn.textContent = 'Subscribing...';
  fetch('${WEBHOOK}', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({type:'newsletter',email:email,casl_consent:true,submitted_at:new Date().toISOString()}) })
    .catch(function(){}).then(function(){
      btn.textContent = 'Subscribed!';
      document.getElementById('footer-nl-email').value = '';
      document.getElementById('footer-nl-consent').checked = false;
      setTimeout(function(){ btn.textContent = 'Subscribe'; btn.disabled = false; }, 4000);
    });
};
window.setLang = function(lang) {
  document.documentElement.classList.toggle('lang-fr', lang === 'fr');
  var en = document.getElementById('lang-btn-en'), fr = document.getElementById('lang-btn-fr');
  if (en) en.classList.toggle('active', lang === 'en');
  if (fr) fr.classList.toggle('active', lang === 'fr');
  try { localStorage.setItem('ac-lang', lang); } catch(x) {}
};
(function(){ try { var s = localStorage.getItem('ac-lang'); if (s==='fr') window.setLang('fr'); } catch(x){} })();
`;

var updated = 0;
FILES.forEach(function(file) {
  var fp = path.join(__dirname, file);
  if (!fs.existsSync(fp)) { console.log('  [SKIP not found] ' + file); return; }
  var c = fs.readFileSync(fp, 'utf8'), orig = c;

  // Remove Sell nav item
  c = c.replace(/<li>[ \t]*<a href="#"[ \t]*>Sell<\/a>[ \t]*<\/li>[ \t]*(\r?\n)?/g, '');

  // Inject footer CSS
  if (!c.includes('site-footer') && c.includes('</head>'))
    c = c.replace('</head>', '<style>\n' + FOOTER_CSS + '\n</style>\n</head>');

  // Inject footer HTML + JS
  if (!c.includes('class="site-footer"') && c.includes('</body>'))
    c = c.replace('</body>', FOOTER_HTML + '\n<script>\n' + FOOTER_JS + '\n</script>\n</body>');

  if (c !== orig) { fs.writeFileSync(fp, c); updated++; console.log('  [UPDATED] ' + file); }
  else { console.log('  [NO CHANGE] ' + file); }
});
console.log('\nDone. ' + updated + ' file(s) updated.');
