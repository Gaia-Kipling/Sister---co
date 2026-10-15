import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';
const base = process.argv[2] || '.';
const types = { '.html':'text/html; charset=utf-8', '.js':'text/javascript; charset=utf-8', '.css':'text/css; charset=utf-8', '.svg':'image/svg+xml', '.xml':'application/xml', '.txt':'text/plain; charset=utf-8', '.jpg':'image/jpeg', '.png':'image/png' };
createServer(async (req,res)=>{
  try {
    const raw = decodeURIComponent(new URL(req.url,'http://localhost').pathname);
    let path = normalize(join(base, raw === '/' ? 'index.html' : raw.slice(1)));
    if (base === '.') {
      const publicPath = normalize(join(base,'public',raw.slice(1)));
      try { if ((await stat(publicPath)).isFile()) path = publicPath; } catch { /* not a public asset */ }
    }
    let file = path;
    try { if (!(await stat(file)).isFile()) throw new Error(); } catch { file = join(base,'index.html'); }
    const body = await readFile(file); res.writeHead(200,{'Content-Type':types[extname(file)]||'application/octet-stream','Cache-Control':'no-cache'}); res.end(body);
  } catch { res.writeHead(400); res.end('Bad request'); }
}).listen(Number(process.env.PORT||4173),'127.0.0.1',()=>console.log(`Sister & Co. site: http://127.0.0.1:${process.env.PORT||4173}`));
