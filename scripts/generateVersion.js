const fs = require('fs');
const path = require('path');

const version = new Date().toISOString();
const versionFile = path.join(__dirname, '..', 'public', 'version.json');

fs.writeFileSync(versionFile, JSON.stringify({ version }, null, 2));
console.log('Gerado public/version.json:', version);
