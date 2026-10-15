import { access, cp, mkdir, readdir, rm } from 'node:fs/promises';
import { join } from 'node:path';
import { B, P, G } from './business.js';

const expectedAssets=[B.logo,...P.map(([,file])=>`public/images/${file}`),...G.map(([file])=>`public/images/${file}`),'public/image-unavailable.svg','public/favicon.svg'];

async function checkExactPath(path){
  let folder='.';
  for(const part of path.split('/')){
    const entries=await readdir(folder);
    if(!entries.includes(part))throw new Error(`Missing or incorrectly capitalized asset: ${join(folder,part)}`);
    folder=join(folder,part);
  }
  await access(path);
}

for(const asset of expectedAssets)await checkExactPath(asset);

await rm('dist',{recursive:true,force:true});
await mkdir('dist',{recursive:true});
for(const file of ['index.html','app.js','business.js','styles.css'])await cp(file,`dist/${file}`);
// Preserve public/ so Live Server, Node preview, and deployed pages share the same asset URLs.
await cp('public','dist/public',{recursive:true,force:true});
for(const asset of expectedAssets)await access(`dist/${asset}`);
// These two files are conventionally requested from the deployed site root.
for(const file of ['robots.txt','sitemap.xml'])await cp(`public/${file}`,`dist/${file}`);
console.log('Production site built in dist/.');
