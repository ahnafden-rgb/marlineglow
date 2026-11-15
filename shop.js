(function(){
const P=window.PAGE||{},EM={'Skincare':'✨','Hair Care':'💆‍♀️','Body Care':'🧴','Organic':'🌿','Fragrance':'🌹','Wellness':'🍃'};
const U=new URLSearchParams(location.search),g=document.getElementById('grid'),$=id=>document.getElementById(id),esc=t=>t.replace(/&/g,'&amp;').replace(/</g,'&lt;');
const nz=t=>t.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9%+ ]+/g,' ').replace(/\s+/g,' ').trim();
const money=n=>n?MG.fmt(n):'Ask for price',L=PRODUCTS.map((p,k)=>({...p,img:p.i,i:k,t:nz(p.b+' '+p.n+' '+p.v.map(v=>v[0]).join(' '))}));
let cat=P.cat||U.get('cat')||'All',brand=U.get('brand')||'',q=nz(U.get('q')||''),sort='',sh=24;
const minp=p=>Math.min(...p.v.map(v=>v[1]||1e9));
const HEART='<svg viewBox="0 0 24 24"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1.1L12 21.2l7.8-7.7 1-1.1a5.5 5.5 0 0 0 0-7.8z"/></svg>';
function card(p){const m=p.v.length>1,one=p.v[0][0],im=p.v[0][2]||p.img,nm=p.b+' '+p.n;
 return `<article class="pc" data-i="${p.i}"><button class="wh${MG.wish.has(p.s)?' on':''}" data-s="${p.s}" aria-label="Save to wishlist">${HEART}</button><a class="pi" href="p-${p.s}.html" aria-label="${esc(nm)}">${im?`<img src="${im}" alt="${esc(nm)}" loading="lazy">`:(EM[p.c]||'✨')}${p.bs?'<span class="bd">Best Seller</span>':''}</a><div class="pb"><div class="pbr">${esc(p.b)}</div><h3><a href="p-${p.s}.html">${esc(p.n)}</a></h3>${m?`<select class="sz" aria-label="Choose option">${p.v.map((v,k)=>`<option value="${k}">${esc(v[0])}</option>`).join('')}</select>`:(one&&p.n.indexOf(one)<0?`<div class="sz1">${esc(one)}</div>`:'')}<div class="pf"><span class="pp${p.v[0][1]?'':' ask'}">${money(p.v[0][1])}</span><button class="add">Add to cart</button></div></div></article>`}
function list(){const tk=q.split(' ').filter(Boolean);let r=L.filter(p=>(cat==='All'||p.c===cat)&&(!brand||p.b===brand)&&tk.every(w=>p.t.includes(w)));
 if(sort)r.sort((a,b)=>sort==='lo'?minp(a)-minp(b):minp(b)-minp(a));return r}
function render(){
 if(P.featured){const out=[],cs=Object.keys(EM);for(let k=0;out.length<8&&k<4;k++)cs.forEach(c=>{const x=L.filter(p=>p.c===c&&p.v[0][1]);if(x[k]&&out.length<8)out.push(x[k])});g.innerHTML=out.map(card).join('');return}
 if(P.wish){const r=L.filter(p=>MG.wish.has(p.s));g.innerHTML=r.map(card).join('')||'<p style="grid-column:1/-1;text-align:center;color:var(--mut);padding:50px 0">Your wishlist is empty. Tap the ♡ on any product to save it here.<br><br><a class="btn" href="shop.html">Browse products</a></p>';$('cnt').textContent=r.length+' saved';return}
 const r=list();g.innerHTML=r.slice(0,sh).map(card).join('')||'<p style="grid-column:1/-1;text-align:center;color:var(--mut);padding:40px 0">No products found. Message us on WhatsApp — we may be able to source it for you.</p>';
 $('cnt').textContent=r.length+' products'+(brand?' · '+brand:'')+(q?' · “'+U.get('q')+'”':'');
 $('more').style.display=r.length>sh?'':'none';
 const ch=$('chips');
 if(!P.cat){ch.innerHTML=['All',...Object.keys(EM)].map(c=>`<button class="chip ${c===cat?'on':''}" data-c="${c}">${c}</button>`).join('')}
 else{const bs=[...new Set(L.filter(p=>p.c===cat).map(p=>p.b))].sort();ch.innerHTML=bs.length>1?`<button class="chip ${brand?'':'on'}" data-b="">All brands</button>`+bs.map(b=>`<button class="chip ${b===brand?'on':''}" data-b="${esc(b)}">${esc(b)}</button>`).join(''):''}
}
g.addEventListener('change',e=>{if(!e.target.classList.contains('sz'))return;const c=e.target.closest('.pc'),p=L[+c.dataset.i],v=p.v[+e.target.value],pp=c.querySelector('.pp'),im=c.querySelector('.pi img');pp.textContent=money(v[1]);pp.classList.toggle('ask',!v[1]);if(v[2]&&im)im.src=v[2]});
g.addEventListener('click',e=>{const h=e.target.closest('.wh');if(h){MG.wish.toggle(h.dataset.s);h.classList.toggle('on');if(P.wish)render();return}
 if(!e.target.classList.contains('add'))return;const c=e.target.closest('.pc'),p=L[+c.dataset.i],s=c.querySelector('.sz'),v=p.v[s?+s.value:0];MG.add({brand:p.b,name:p.n,size:v[0]&&p.n.indexOf(v[0])<0?v[0]:'',price:v[1],qty:1})});
if(!P.featured&&!P.wish){
 $('chips').addEventListener('click',e=>{const t=e.target;if(t.dataset.c!==undefined)cat=t.dataset.c;else if(t.dataset.b!==undefined)brand=t.dataset.b;else return;sh=24;render()});
 $('sort').addEventListener('click',e=>{const b=e.target.closest('[data-s]');if(!b)return;sort=b.dataset.s;document.querySelectorAll('#sort .chip').forEach(c=>c.classList.toggle('on',c===b));render()});
 $('more').onclick=()=>{sh+=24;render()};
}
render();
})();
