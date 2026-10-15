import { cp, mkdir, rm } from 'node:fs/promises';
await rm('dist',{recursive:true,force:true}); await mkdir('dist',{recursive:true});
for (const file of ['index.html','app.js','business.js','styles.css']) await cp(file,`dist/${file}`);
// Public files are served from the site root.
await cp('public','dist',{recursive:true,force:true});
console.log('Production site built in dist/.');
