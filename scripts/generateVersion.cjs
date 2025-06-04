const fs = require('fs');
const path = require('path');

const version = process.env.VERCEL_GIT_COMMIT_SHA || Date.now().toString();
const versionFile = path.join(__dirname, '../public/version.txt');

fs.writeFileSync(versionFile, version);
console.log('Versão gerada:', version);
