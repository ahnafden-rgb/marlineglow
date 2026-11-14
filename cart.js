/* Marline Glow – cart + menu. EDIT THE SETTINGS BELOW. */
(function(){
const CFG=window.MG_CFG={WA:'966573325959',PAY_NUMBER:'01813575452',DHAKA_FEE:70,OUTSIDE_FEE:130,SCRIPT_URL:'https://script.google.com/macros/s/AKfycbxGg7CuYUTZ00tXW5ggFx6fOD-zbLCJH981osYLZp2-LRoVk363eBebfJ5BZKP0x80M/exec'};
const K='mg_cart',$=id=>document.getElementById(id);
const get=()=>{try{return JSON.parse(localStorage.getItem(K))||[]}catch(e){return[]}};
const put=c=>{try{localStorage.setItem(K,JSON.stringify(c))}catch(e){}};
const fmt=n=>'৳ '+Number(n).toLocaleString('en-US'),esc=t=>String(t).replace(/&/g,'&amp;').replace(/</g,'&lt;');
const sub=c=>c.reduce((s,i)=>s+i.price*i.qty,0);
const ov=document.createElement('div');ov.className='ov';
const cd=document.createElement('aside');cd.className='dr r';
cd.innerHTML='<div class="dh"><span>Your Cart</span><button id="cX">&times;</button></div><div class="cb" id="cB"></div><div class="cf" id="cF"></div>';
const tt=document.createElement('div');tt.className='toast';document.body.append(ov,cd,tt);
const md=$('menuD');
const close=()=>{cd.classList.remove('open');md&&md.classList.remove('open');ov.classList.remove('open')};
const open=d=>{close();d.classList.add('open');ov.classList.add('open')};
function render(){
  const c=get(),n=c.reduce((s,i)=>s+i.qty,0),b=$('cN');
  if(b){b.textContent=n;b.style.display=n?'flex':'none'}
  $('cB').innerHTML=c.length?c.map((i,x)=>`<div class="ci"><small>${esc(i.brand)}</small>${esc(i.name)}${i.size?' · '+esc(i.size):''}<div class="cq"><button data-a="-" data-x="${x}">−</button>${i.qty}<button data-a="+" data-x="${x}">+</button><b style="margin-left:8px">${i.price?fmt(i.price*i.qty):'Price TBC'}</b><button class="rm" data-a="x" data-x="${x}">Remove</button></div></div>`).join(''):'<p style="padding:40px 0;text-align:center;color:var(--mut)">Your cart is empty.</p>';
  $('cF').innerHTML=c.length?`<p><span>Subtotal</span><span>${fmt(sub(c))}</span></p><a class="btn" href="checkout.html">Checkout</a>`:'';
}
cd.addEventListener('click',e=>{const a=e.target.dataset.a;if(!a)return;const c=get(),x=+e.target.dataset.x;if(a==='+')c[x].qty++;else if(a==='-'){if(--c[x].qty<1)c.splice(x,1)}else c.splice(x,1);put(c);render()});
document.addEventListener('click',e=>{if(e.target.closest('#cartBtn'))open(cd);else if(e.target.closest('#menuBtn')&&md)open(md);else if(e.target.closest('.dr nav a'))close()});
$('cX').onclick=close;ov.onclick=close;document.addEventListener('keydown',e=>{if(e.key==='Escape')close()});
window.MG={get,put,fmt,sub,esc,clear:()=>put([]),add(it){const c=get(),f=c.find(i=>i.brand===it.brand&&i.name===it.name&&i.size===it.size);f?f.qty++:c.push(it);put(c);render();tt.textContent='✦ Added to cart';tt.classList.add('show');setTimeout(()=>tt.classList.remove('show'),1700)}};
render();
})();
