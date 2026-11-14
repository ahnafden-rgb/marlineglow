(function(){
const P=window.PAGE||{},EM={'Skincare':'✨','Hair Care':'💆‍♀️','Body Care':'🧴','Organic':'🌿','Fragrance':'🌹','Wellness':'🍃'};
const U=new URLSearchParams(location.search),g=document.getElementById('grid'),esc=t=>t.replace(/&/g,'&amp;').replace(/</g,'&lt;');
const money=n=>n?MG.fmt(n):'Ask for price',L=PRODUCTS.map((p,i)=>({...p,i}));
let cat=P.cat||U.get('cat')||'All',brand=U.get('brand')||'',q=(U.get('q')||'').toLowerCase().trim(),sort='',sh=24;
const minp=p=>Math.min(...p.v.map(v=>v[1]||1e9));
function card(p){const m=p.v.length>1,one=p.v[0][0];
 return `<article class="pc" data-i="${p.i}"><div class="pi">${EM[p.c]||'✨'}${p.bs?'<span class="bd">Best Seller</span>':''}</div><div class="pb"><div class="pbr">${esc(p.b)}</div><h3>${esc(p.n)}</h3>${m?`<select class="sz" aria-label="Size">${p.v.map((v,k)=>`<option value="${k}">${v[0]}</option>`).join('')}</select>`:(one&&p.n.indexOf(one)<0?`<div class="sz1">${one}</div>`:'')}<div class="pf"><span class="pp${p.v[0][1]?'':' ask'}">${money(p.v[0][1])}</span><button class="add">Add to cart</button></div></div></article>`}
function list(){let r=L.filter(p=>(cat==='All'||p.c===cat)&&(!brand||p.b===brand)&&(!q||(p.b+' '+p.n).toLowerCase().includes(q)));
 if(sort)r.sort((a,b)=>sort==='lo'?minp(a)-minp(b):minp(b)-minp(a));return r}
function render(){
 if(P.featured){const out=[],cs=Object.keys(EM);for(let k=0;out.length<8&&k<4;k++)cs.forEach(c=>{const x=L.filter(p=>p.c===c&&p.v[0][1]);if(x[k]&&out.length<8)out.push(x[k])});g.innerHTML=out.map(card).join('');return}
 const r=list();g.innerHTML=r.slice(0,sh).map(card).join('')||'<p style="grid-column:1/-1;text-align:center;color:var(--mut);padding:40px 0">No products found. Message us on WhatsApp — we may be able to source it for you.</p>';
 document.getElementById('cnt').textContent=r.length+' products'+(brand?' · '+brand:'')+(q?' · “'+q+'”':'');
 document.getElementById('more').style.display=r.length>sh?'':'none';
 const ch=document.getElementById('chips');
 if(!P.cat){ch.innerHTML=['All',...Object.keys(EM)].map(c=>`<button class="chip ${c===cat?'on':''}" data-c="${c}">${c}</button>`).join('')}
 else{const bs=[...new Set(L.filter(p=>p.c===cat).map(p=>p.b))].sort();ch.innerHTML=bs.length>1?`<button class="chip ${brand?'':'on'}" data-b="">All brands</button>`+bs.map(b=>`<button class="chip ${b===brand?'on':''}" data-b="${esc(b)}">${esc(b)}</button>`).join(''):''}
}
g.addEventListener('change',e=>{if(!e.target.classList.contains('sz'))return;const p=L[+e.target.closest('.pc').dataset.i],v=p.v[+e.target.value],pp=e.target.closest('.pc').querySelector('.pp');pp.textContent=money(v[1]);pp.classList.toggle('ask',!v[1])});
g.addEventListener('click',e=>{if(!e.target.classList.contains('add'))return;const c=e.target.closest('.pc'),p=L[+c.dataset.i],s=c.querySelector('.sz'),v=p.v[s?+s.value:0];MG.add({brand:p.b,name:p.n,size:v[0]&&p.n.indexOf(v[0])<0?v[0]:'',price:v[1],qty:1})});
if(!P.featured){
 document.getElementById('chips').addEventListener('click',e=>{const t=e.target;if(t.dataset.c!==undefined)cat=t.dataset.c;else if(t.dataset.b!==undefined)brand=t.dataset.b;else return;sh=24;render()});
 document.getElementById('sort').onchange=e=>{sort=e.target.value;render()};
 document.getElementById('more').onclick=()=>{sh+=24;render()};
}
render();
})();
