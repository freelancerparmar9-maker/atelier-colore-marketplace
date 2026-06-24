const fs = require('fs');
const path = require('path');

const OLD_ID = 'hcnciegpfsmladslpkxx';
const NEW_ID = 'zbfdkuckvyrlebdvlghp';

const OLD_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhjbmNpZWdwZnNtbGFkc2xwa3h4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk5NjMzMTcsImV4cCI6MjA5NTUzOTMxN30.XndWiaPVh8qzaHOA_5OQkaHx3y4N5UA0DHaFcWpOmXg';
const NEW_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpiZmRrdWNrdnlybGViZHZsZ2hwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIwNTI1MTEsImV4cCI6MjA5NzYyODUxMX0.rHcc5-VEkQoM7GqkLuKCB7ueC-7iwDvOVSPUl32OeoY';

const dir = 'c:\\Users\\admin\\Desktop\\K Website\\website';

const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

let replacedCount = 0;

for (const file of files) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  let changed = false;
  
  if (content.includes(OLD_ID) || content.includes(OLD_KEY)) {
    // We use split and join to replace all instances globally
    content = content.split(OLD_ID).join(NEW_ID);
    content = content.split(OLD_KEY).join(NEW_KEY);
    
    fs.writeFileSync(filePath, content);
    console.log(`Updated ${file}`);
    replacedCount++;
  }
}

console.log(`Successfully migrated Supabase credentials in ${replacedCount} files.`);
