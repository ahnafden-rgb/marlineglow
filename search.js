/* Marline Glow – search suggestions */
(function(){
const f=document.querySelector('.sform');if(!f||typeof PRODUCTS==='undefined')return;
const inp=f.querySelector('input'),box=document.createElement('div');box.className='sg';f.appendChild(box);inp.setAttribute('autocomplete','off');
const nz=t=>t.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9%+ ]+/g,' ').replace(/\s+/g,' ').trim();
const EM={'Skincare':'✨','Hair Care':'💆‍♀️','Body Care':'🧴','Organic':'🌿','Fragrance':'🌹','Wellness':'🍃'},SL={'Skincare':'skincare','Hair Care':'hair-care','Body Care':'body-care','Organic':'organic','Fragrance':'fragrance','Wellness':'wellness'};
const esc=t=>String(t).replace(/&/g,'&amp;').replace(/</g,'&lt;');
const D=PRODUCTS.map(p=>({p,t:nz(p.b+' '+p.n+' '+p.v.map(v=>v[0]).join(' ')+' '+p.c)}));
const W=[...new Set(D.flatMap(d=>d.t.split(' ')).filter(w=>w.length>2))];
const lev=(a,b)=>{if(Math.abs(a.length-b.length)>2)return 9;let p=[...Array(b.length+1).keys()];for(let i=1;i<=a.length;i++){const c=[i];for(let j=1;j<=b.length;j++)c[j]=Math.min(p[j]+1,c[j-1]+1,p[j-1]+(a[i-1]===b[j-1]?0:1));p=c}return p[b.length]};
let hl=-1;
const pr=p=>{const v=p.v.map(x=>x[1]).filter(Boolean);return v.length?(Math.min(...v)!==Math.max(...v)?'From ':'')+MG.fmt(Math.min(...v)):'Ask'};
function show(){
 const q=nz(inp.value),tk=q.split(' ').filter(Boolean);let h='';
 if(!tk.length){h='<h6>Browse categories</h6>'+Object.keys(SL).map(c=>`<a href="${SL[c]}.html"><span class="th">${EM[c]}</span><span class="tx"><span>${c}</span></span></a>`).join('')}
 else{
  const m=D.filter(d=>tk.every(w=>d.t.includes(w))).sort((a,b)=>(b.t.startsWith(q)-a.t.startsWith(q))).slice(0,6);
  const br=[...new Set(D.map(d=>d.p.b))].filter(b=>nz(b).includes(tk[0])).slice(0,3);
  const cs=Object.keys(SL).filter(c=>nz(c).includes(q)).slice(0,2);
  if(br.length||cs.length)h+='<h6>Brands &amp; categories</h6>'+br.map(b=>`<a href="shop.html?brand=${encodeURIComponent(b)}"><span class="th">🏷️</span><span class="tx"><span>${esc(b)}</span></span></a>`).join('')+cs.map(c=>`<a href="${SL[c]}.html"><span class="th">${EM[c]}</span><span class="tx"><span>${c}</span></span></a>`).join('');
  if(m.length)h+='<h6>Products</h6>'+m.map(({p})=>`<a href="p-${p.s}.html"><span class="th">${(p.v[0][2]||p.i)?`<img src="${p.v[0][2]||p.i}" alt="">`:EM[p.c]}</span><span class="tx"><b>${esc(p.b)}</b><span>${esc(p.n)}</span></span><span class="pr">${pr(p)}</span></a>`).join('');
  if(!m.length&&!br.length&&!cs.length){
   const fx=tk.map(w=>{if(W.some(x=>x.startsWith(w)))return w;let b=w,d=9;W.forEach(x=>{const e=lev(w,x.slice(0,w.length+1)<x?x.slice(0,w.length):x);if(e<d&&e<=(w.length>5?2:1)){d=e;b=x}});return b});
   const s=fx.join(' ');if(s!==q)h+=`<h6>Did you mean</h6><a href="shop.html?q=${encodeURIComponent(s)}"><span class="th">🔎</span><span class="tx"><span>${esc(s)}</span></span></a>`;
   else h+='<h6>No match</h6><div style="padding:6px 16px 14px;font-size:14px;color:var(--mut)">Nothing found. Message us on WhatsApp — we may be able to source it.</div>'}
  h+=`<a class="all" href="shop.html?q=${encodeURIComponent(inp.value.trim())}">See all results for “${esc(inp.value.trim())}”</a>`}
 box.innerHTML=h;box.classList.add('open');hl=-1;
}
const items=()=>[...box.querySelectorAll('a')],mark=()=>items().forEach((a,i)=>a.classList.toggle('hl',i===hl));
inp.addEventListener('input',show);inp.addEventListener('focus',show);
inp.addEventListener('keydown',e=>{const it=items();if(e.key==='ArrowDown'){e.preventDefault();hl=(hl+1)%it.length;mark()}else if(e.key==='ArrowUp'){e.preventDefault();hl=(hl-1+it.length)%it.length;mark()}else if(e.key==='Enter'&&hl>-1){e.preventDefault();it[hl].click()}else if(e.key==='Escape')box.classList.remove('open')});
document.addEventListener('click',e=>{if(!f.contains(e.target))box.classList.remove('open')});
})();
