(function(){
'use strict';
var $=function(s,r){return (r||document).querySelector(s)};
var $$=function(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))};
var P=window.BR_PRODUCTS,BYID={};P.forEach(function(p){BYID[p.id]=p});
function fmt(n){return '$'+Math.round(n).toLocaleString('en-US')}
function esc(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;')}
var FALLBACK='data:image/svg+xml;utf8,'+encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><rect width="200" height="200" fill="none"/><text x="100" y="108" text-anchor="middle" font-family="Arial" font-size="14" fill="#9a958c">Foto del producto</text></svg>');
window.__fb=function(i){i.onerror=null;i.src=FALLBACK};
var tt;function toast(m){var t=$('#toast');t.textContent=m;t.classList.add('show');clearTimeout(tt);tt=setTimeout(function(){t.classList.remove('show')},2600)}

function card(p){
 var np=p.price*(1-p.off/100);
 return '<article class="pc" data-cat="'+p.cat+'">'+
  '<div class="ph"><span class="off">-'+p.off+'%</span><img src="'+p.img+'" alt="'+esc(p.name)+'" loading="lazy" onerror="__fb(this)"></div>'+
  '<div class="br">'+esc(p.brand)+'</div>'+
  '<a class="nm" href="#" data-toast="En la tienda real abre la ficha: '+esc(p.name)+'">'+esc(p.name)+'</a>'+
  '<div class="pr"><b>'+fmt(np)+'</b><s>'+fmt(p.price)+'</s></div>'+
  '<div class="sv">Ahorras '+fmt(p.price-np)+'</div>'+
  '<div class="bt"><a class="btn dark" href="#" data-toast="En la tienda real aquí se añade al carrito">Añadir al carrito</a></div></article>'}
$('#gTop').innerHTML=window.BR_TOP.map(function(id){return card(BYID[id])}).join('');
$('#gMas').innerHTML=P.filter(function(p){return window.BR_TOP.indexOf(p.id)<0}).map(card).join('');

/* por instrumento */
var PROF=[
 {tag:'Hasta 20%',t:'Bateristas',img:'assets/img/d-galax-negra.webp',items:[['Baterías Aureal Atomic, Galax y Galax Kids','20%'],['Platillos Vansir V-MUTE','20%'],['Batería eléctrica Roland TD-02K','15%']],cta:'Ver baterías',f:'bat'},
 {tag:'Hasta 20%',t:'Pianistas y tecladistas',img:BYID.s192n.img,items:[['Piano digital Aureal S-192','20%'],['Teclado sintetizador Roland XPS-10X','15%'],['Piano digital Roland GO-88PX','10%']],cta:'Ver pianos y teclados',f:'pia'},
 {tag:'Hasta 20%',t:'Guitarristas',img:BYID.gt1.img,items:[['Procesador de efectos Boss GT-1','20%'],['Amplificador Boss Katana Mini','10%'],['Guitarra Fender FA-125CE','5%']],cta:'Ver guitarras y efectos',f:'gui'}
];
$('#prof').innerHTML=PROF.map(function(x){return '<article class="pf"><span class="tag">'+x.tag+'</span><h3>'+x.t+'</h3><div class="pi"><img src="'+x.img+'" alt="" loading="lazy" onerror="__fb(this)"></div><ul>'+x.items.map(function(i){return '<li><span>'+i[0]+'</span><b>-'+i[1]+'</b></li>'}).join('')+'</ul><a class="btn red" href="#mas" data-f="'+x.f+'">'+x.cta+' <svg class="i"><use href="#i-arrow"/></svg></a></article>'}).join('');

/* marcas */
$('#brands').innerHTML=window.BR_BRANDS.map(function(b){return '<a class="bd'+(b.off<10?' lo':'')+'" href="#" data-toast="En la tienda real abre la colección de '+esc(b.n)+'"><span class="go"><svg class="i"><use href="#i-arrow"/></svg></span><span class="pc2">'+b.off+'<small>%</small></span><div><div class="nm2">'+esc(b.n)+'</div><div class="tx">'+(b.hi?esc(b.hi):'de descuento en toda la marca')+'</div></div></a>'}).join('')+
 '<a class="bd" href="#mas" style="background:var(--ink);color:#fff;border-color:var(--ink)"><span class="go" style="background:var(--red);color:#fff"><svg class="i"><use href="#i-arrow"/></svg></span><span class="pc2" style="color:var(--cyan);font-size:40px;letter-spacing:-1px">+ modelos</span><div><div class="nm2">Ofertas por modelo</div><div class="tx" style="color:#bdbdbd">Hasta 20% en productos seleccionados</div></div></a>';

/* UGC */
var U=[['Batería Aureal Galax','Video UGC de baterista'],['Piano digital Aureal S-192','Video UGC de pianista'],['Procesador Boss GT-1','Video UGC de guitarrista'],['Roland XPS-10X','Video UGC de tecladista']];
$('#ugc').innerHTML=U.map(function(u){return '<div class="vd"><span class="bd2">Espacio UGC</span><span class="pl"><svg class="i"><use href="#i-play"/></svg></span><b>'+u[0]+'</b><span>'+u[1]+'</span></div>'}).join('');

/* filtros */
function filt(f){
 $$('#chips .chip').forEach(function(c){c.setAttribute('aria-pressed',c.dataset.f===f)});
 $$('#gMas .pc').forEach(function(c){c.style.display=(f==='all'||c.dataset.cat===f)?'':'none'});
}
$('#chips').addEventListener('click',function(e){var c=e.target.closest('.chip');if(c)filt(c.dataset.f)});
document.addEventListener('click',function(e){var a=e.target.closest('a[data-f]');if(a)filt(a.dataset.f)});

/* faq */
$('#faq').addEventListener('click',function(e){var b=e.target.closest('.fq button');if(!b)return;var f=b.parentNode;f.classList.toggle('open');b.setAttribute('aria-expanded',f.classList.contains('open'))});

/* toasts */
document.addEventListener('click',function(e){var t=e.target.closest('[data-toast]');if(t){e.preventDefault();toast(t.dataset.toast)}});

/* cuenta regresiva (hora de Ciudad de México, UTC-6) */
var START=Date.parse('2026-11-10T00:00:00-06:00'),END=Date.parse('2026-11-18T23:59:59-06:00');
function box(n,l){return '<div class="bx"><b>'+(n<10?'0':'')+n+'</b><span>'+l+'</span></div>'}
function tick(){
 var now=Date.now(),el=$('#count'),target,label;
 if(now<START){target=START;label='Empieza en'}else if(now<=END){target=END;label='Termina en'}else{el.innerHTML='<div class="done">La promoción Buen Rock 2026 terminó. ¡Gracias!</div>';return}
 var s=Math.floor((target-now)/1000),d=Math.floor(s/86400),h=Math.floor(s%86400/3600),m=Math.floor(s%3600/60),x=s%60;
 el.innerHTML='<div class="lb">'+label+'</div><div class="boxes">'+box(d,'días')+box(h,'horas')+box(m,'min')+box(x,'seg')+'</div>';
}
tick();setInterval(tick,1000);

/* barras del ecualizador */
var eq=$('.eq');for(var i=0;i<60;i++){var b=document.createElement('i');b.style.animationDelay=(-(i*0.37%1.6)).toFixed(2)+'s';b.style.animationDuration=(1.2+(i*7%10)/10).toFixed(2)+'s';eq.appendChild(b)}

/* barra fija en móvil al salir del hero */
if('IntersectionObserver' in window){new IntersectionObserver(function(es){$('#sticky').classList.toggle('on',!es[0].isIntersecting)},{threshold:0}).observe($('.hero'))}
})();
