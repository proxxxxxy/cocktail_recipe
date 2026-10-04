const http = require('node:http'), fs = require('node:fs'), path = require('node:path');
const root = path.resolve(__dirname, '..');
const files = new Set(['index.html', 'app.js', 'style.css', 'tools/selfcheck.js', 'assets/cocktail-studio-bg.png']);
http.createServer((req, res) => {
  const url = new URL(req.url, 'http://localhost');
  const file = url.pathname === '/' ? 'index.html' : url.pathname.slice(1);
  if (!files.has(file)) { res.writeHead(404); return res.end(); }
  res.setHeader('Content-Type', file.endsWith('.html') ? 'text/html; charset=utf-8' : file.endsWith('.js') ? 'text/javascript; charset=utf-8' : file.endsWith('.css') ? 'text/css; charset=utf-8' : 'image/png');
  res.setHeader('Cache-Control', 'no-store');
  let data = fs.readFileSync(path.join(root,file));
  if(file==='index.html'&&url.searchParams.has('selfcheck')){
    data=data.toString().replace('</body>','<script src="tools/selfcheck.js"></script><script>window.addEventListener("load",async()=>{try{const r=await window.__selfcheck();const p=document.createElement("pre");p.textContent=JSON.stringify(r,null,2);document.body.replaceChildren(p)}catch(e){document.body.textContent=e.stack}});</script></body>');
  }
  res.end(data);
}).listen(4173,'127.0.0.1',()=>console.log('Preview ready'));
