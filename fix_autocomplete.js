const fs = require('fs');
let c = fs.readFileSync('evaluation.html', 'utf8');

// Add autocomplete=off to both form tags
c = c.replace('id="form-collector" novalidate>', 'id="form-collector" novalidate autocomplete="off">');
c = c.replace('id="form-artist" novalidate>', 'id="form-artist" novalidate autocomplete="off">');

// Add autocomplete=off to all text/email/number/date inputs
c = c.replace(/(<input type="text")(?![^>]*autocomplete)/g, '$1 autocomplete="off"');
c = c.replace(/(<input type="email")(?![^>]*autocomplete)/g, '$1 autocomplete="off"');
c = c.replace(/(<input type="number")(?![^>]*autocomplete)/g, '$1 autocomplete="off"');
c = c.replace(/(<input type="date")(?![^>]*autocomplete)/g, '$1 autocomplete="off"');

// Also add on score inputs inside style attributes (inline number inputs)
c = c.replace(/(<input type="number" min="1" max="5")(?![^>]*autocomplete)/g, '$1 autocomplete="off"');

fs.writeFileSync('evaluation.html', c);

// Verify
const result = fs.readFileSync('evaluation.html', 'utf8');
const count = (result.match(/autocomplete="off"/g) || []).length;
console.log('autocomplete="off" count:', count);
