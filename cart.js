/* Marline Glow – cart. EDIT THE SETTINGS BELOW. */
(function(){
const CFG=window.MG_CFG={
  WA:'966573325959',          // WhatsApp number for order messages
  PAY_NUMBER:'01813575452',   // bKash / Nagad number for delivery charge
  DHAKA_FEE:70,               // delivery charge inside Dhaka (CHANGE TO YOUR REAL AMOUNT)
  OUTSIDE_FEE:130,            // delivery charge outside Dhaka (CHANGE TO YOUR REAL AMOUNT)
  SCRIPT_URL:''               // paste your Google Apps Script web app URL here
};
const K='mg_cart';
const get=()=>{try{return JSON.parse(localStorage.getItem(K))||[]}catch(e){return[]}};
const put=c=>{try{localStorage.setItem(K,JSON.stringify(c))}catch(e){}};
const fmt=n=>'৳ '+Number(n).toLocaleString('en-US');
window.MG={get,put,fmt,clear:()=>put([]),subtotal:c=>c.reduce((s,i)=>s+i.price*i.qty,0)};
const st=document.createElement('style');
st.textContent=`.cart-btn{position:relative}.cart-n{position:absolute;top:-7px;right:-7px;min-width:18px;height:18px;border-radius:9px;background:var(--gold);color:var(--teal-deep);font:700 10px Montserrat,sans-serif;display:none;align-items:center;justify-content:center;padding:0 4px}
.cdrawer{position:fixed;top:0;right:0;bottom:0;width:380px;max-width:92vw;z-index:1200;background:linear-gradient(180deg,#0d3d44,#0a2a2e);border-left:1px solid rgba(201,162,39,.3);transform:translateX(100%);transition:transform .35s;display:flex;flex-direction:column;color:var(--cream,#fdf8ec)}
.cdrawer.open{transform:none}.cdov{position:fixed;inset:0;background:rgba(0,0,0,.6);z-index:1100;opacity:0;visibility:hidden;transition:opacity .3s}.cdov.open{opacity:1;visibility:visible}
.ch{display:flex;justify-content:space-between;align-items:center;padding:22px 24px;border-bottom:1px solid rgba(201,162,39,.2);font:600 16px Cinzel,serif;letter-spacing:3px;color:var(--gold)}
.ch button{background:none;border:none;color:var(--gold);font-size:28px;cursor:pointer}
.cb{flex:1;overflow-y:auto;padding:8px 24px}.ci{padding:16px 0;border-bottom:1px solid rgba(201,162,39,.12)}
.ci b{display:block;font:500 9px Montserrat,sans-serif;letter-spacing:2px;text-transform:uppercase;color:var(--gold)}.ci span{display:block;margin:4px 0 8px;font-size:16px}
.cq{display:flex;align-items:center;gap:10px;font:500 13px Montserrat,sans-serif}.cq button{width:26px;height:26px;background:none;border:1px solid rgba(201,162,39,.4);color:var(--gold);cursor:pointer}.cq .rm{margin-left:auto;width:auto;border:none;font-size:11px;color:#a8c4c9;text-decoration:underline}
.cf{padding:20px 24px;border-top:1px solid rgba(201,162,39,.2)}.cf p{display:flex;justify-content:space-between;font:500 12px Montserrat,sans-serif;letter-spacing:1px;margin-bottom:14px}
.cf a{display:block;text-align:center;padding:15px;background:linear-gradient(135deg,#8a6a0a,#c9a227,#e8c84a);color:#0a2a2e;font:600 11px Montserrat,sans-serif;letter-spacing:2.5px;text-transform:uppercase;text-decoration:none}
.mgtoast{position:fixed;bottom:90px;right:24px;z-index:9999;background:#c9a227;color:#0a2a2e;padding:12px 20px;font:600 11px Montserrat,sans-serif;letter-spacing:2px;text-transform:uppercase;opacity:0;transform:translateY(20px);transition:all .3s;pointer-events:none}.mgtoast.show{opacity:1;transform:none}`;
document.head.appendChild(st);
const nr=document.querySelector('.nav-right');
if(nr){const b=document.createElement('button');b.className='nav-search-btn cart-btn';b.id='cartBtn';b.setAttribute('aria-label','Cart');b.innerHTML='🛒<span class="cart-n" id="cartN"></span>';nr.insertBefore(b,nr.firstChild)}
const ov=document.createElement('div');ov.className='cdov';
const dr=document.createElement('aside');dr.className='cdrawer';
dr.innerHTML='<div class="ch"><span>YOUR CART</span><button id="cClose">&times;</button></div><div class="cb" id="cBody"></div><div class="cf" id="cFoot"></div>';
const tt=document.createElement('div');tt.className='mgtoast';
document.body.append(ov,dr,tt);
const open=o=>{dr.classList.toggle('open',o);ov.classList.toggle('open',o)};
const esc=t=>String(t).replace(/&/g,'&amp;').replace(/</g,'&lt;');
function render(){
  const c=get(),n=c.reduce((s,i)=>s+i.qty,0),cn=document.getElementById('cartN');
  if(cn){cn.textContent=n;cn.style.display=n?'flex':'none'}
  document.getElementById('cBody').innerHTML=c.length?c.map((i,x)=>`<div class="ci"><b>${esc(i.brand)}</b><span>${esc(i.name)}</span><div class="cq"><button data-a="-" data-x="${x}">−</button>${i.qty}<button data-a="+" data-x="${x}">+</button><span style="margin:0 0 0 8px">${i.price?fmt(i.price*i.qty):'Price to confirm'}</span><button class="rm" data-a="x" data-x="${x}">Remove</button></div></div>`).join(''):'<p style="padding:40px 0;text-align:center;font-style:italic;color:#a8c4c9">Your cart is empty.</p>';
  document.getElementById('cFoot').innerHTML=c.length?`<p><span>SUBTOTAL</span><span>${fmt(MG.subtotal(c))}</span></p><a href="checkout.html">Checkout</a>`:'';
}
dr.addEventListener('click',e=>{const a=e.target.dataset.a;if(!a)return;const c=get(),i=c[+e.target.dataset.x];if(a==='+')i.qty++;else if(a==='-'){if(--i.qty<1)c.splice(+e.target.dataset.x,1)}else c.splice(+e.target.dataset.x,1);put(c);render()});
document.addEventListener('click',e=>{if(e.target.closest('#cartBtn'))open(true)});
document.getElementById('cClose').onclick=()=>open(false);ov.onclick=()=>open(false);
window.addToCart=function(btn){
  const p=btn.closest('.product-card');if(!p)return;
  const brand=p.querySelector('.product-brand').textContent,name=p.querySelector('.product-name').textContent,pt=p.querySelector('.product-price').textContent;
  const m=pt.match(/[\d,]+/),price=m?parseInt(m[0].replace(/,/g,'')):0,c=get();
  const f=c.find(i=>i.brand===brand&&i.name===name);
  if(f)f.qty++;else c.push({brand,name,price,qty:1,note:/From/.test(pt)?'size/price to confirm':(price?'':'price to confirm')});
  put(c);render();tt.textContent='✦ Added to cart';tt.classList.add('show');setTimeout(()=>tt.classList.remove('show'),1800);
};
render();
})();
