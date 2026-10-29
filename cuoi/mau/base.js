/* Siêng Studio · renderer dùng chung cho mọi phong cách. Dữ liệu: window.MAU_DATA, ghi đè bằng ?s=<theme>&d=<base64url JSON> */
(function(){
var TH=window.MAU_THEMES,Q=new URLSearchParams(location.search);
var DEF=window.MAU_DEFAULT||'gothic',sid=Q.get('s')&&TH[Q.get('s')]?Q.get('s'):DEF,T=TH[sid];
function dec(s){try{s=s.replace(/-/g,'+').replace(/_/g,'/');var b=atob(s),u=new Uint8Array(b.length);for(var i=0;i<b.length;i++)u[i]=b.charCodeAt(i);return JSON.parse(new TextDecoder().decode(u))}catch(e){return{}}}
var U=Q.get('d')?dec(Q.get('d')):null;
var D=Object.assign({},T.ex,U||{});
var custom=!!U;
function e(s){return String(s==null?'':s).replace(/[&<>"']/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}
function safeUrl(u){u=String(u||'');return /^https:\/\//i.test(u)?u:''}
function maps(a){return 'https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(a)}
var R=document.documentElement.style,c=T.c;
['bg','bg2','ink','mut','ac','ac2'].forEach(function(k){R.setProperty('--'+k,c[k])});
R.setProperty('--fs','"'+T.f.script+'"');R.setProperty('--fd','"'+T.f.disp+'"');R.setProperty('--fb','"'+T.f.body+'"');
var fl=[T.f.script,T.f.disp,T.f.body].filter(function(v,i,a){return a.indexOf(v)==i}).map(function(f){return 'family='+f.replace(/ /g,'+')+':wght@400;600;700'}).join('&');
var lk=document.createElement('link');lk.rel='stylesheet';lk.href='https://fonts.googleapis.com/css2?'+fl+'&display=swap';document.head.appendChild(lk);
var dt=new Date((D.d||'2026-12-20')+'T'+(D.tt||'10:00')+':00+07:00');
var p2=function(n){return (n<10?'0':'')+n};
var dd=isNaN(dt)?'':p2(dt.getDate())+' · '+p2(dt.getMonth()+1)+' · '+dt.getFullYear();
var WD=['Chủ Nhật','Thứ Hai','Thứ Ba','Thứ Tư','Thứ Năm','Thứ Sáu','Thứ Bảy'];
document.title=D.a+' & '+D.b+' · Thiệp cưới '+dd.replace(/ · /g,'.');
/* ornaments */
var ORN={
cross:'<svg class="orn" viewBox="0 0 150 40" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M10 20h50M90 20h50"/><path d="M75 6v28M66 15h18"/><circle cx="75" cy="20" r="12" opacity=".4"/></svg>',
hy:'<svg class="orn" viewBox="0 0 150 40"><path d="M8 20h44M98 20h44" stroke="currentColor" stroke-width="1.5"/><text x="75" y="31" text-anchor="middle" font-size="30" fill="currentColor" font-family="serif">囍</text></svg>',
line:'<svg class="orn" viewBox="0 0 150 40"><path d="M20 20h110" stroke="currentColor" stroke-width="1"/><circle cx="75" cy="20" r="3" fill="currentColor"/></svg>',
floral:'<svg class="orn" viewBox="0 0 150 40" fill="none" stroke="currentColor" stroke-width="1.3"><path d="M10 22c20-14 40 10 65-2 25 12 45-12 65 2"/><g fill="currentColor" opacity=".8"><circle cx="75" cy="20" r="4"/><ellipse cx="66" cy="16" rx="5" ry="2.5" transform="rotate(-30 66 16)"/><ellipse cx="84" cy="16" rx="5" ry="2.5" transform="rotate(30 84 16)"/></g></svg>',
heart:'<svg class="orn" viewBox="0 0 150 40"><path d="M15 20h45M90 20h45" stroke="currentColor" stroke-width="1.4" stroke-dasharray="2 5" stroke-linecap="round"/><path d="M75 31l-9-9a5.5 5.5 0 0 1 9-6 5.5 5.5 0 0 1 9 6z" fill="currentColor"/></svg>'};
var orn=ORN[T.orn]||ORN.line;
/* chapter art: original SVG per theme */
function art(i){var a=c.ac,b=c.ac2,g=c.bg2,k=c.bg,id='g'+i;
 var motif=[
  '<circle cx="170" cy="130" r="34" fill="none" stroke="'+a+'" stroke-width="6"/><circle cx="222" cy="130" r="34" fill="none" stroke="'+b+'" stroke-width="6"/>',
  '<path d="M200 186l-46-46a29 29 0 0 1 46-32 29 29 0 0 1 46 32z" fill="'+a+'"/>',
  '<g fill="'+a+'"><path d="M150 190V110l50-40 50 40v80z" opacity=".9"/></g><path d="M185 190v-40a15 15 0 0 1 30 0v40" fill="'+k+'"/>'][i%3];
 var deco={cross:'<path d="M60 40v30M50 50h20" stroke="'+b+'" stroke-width="3"/>',hy:'<text x="330" y="70" font-size="44" fill="'+b+'" font-family="serif" text-anchor="middle">囍</text>',line:'<path d="M40 60h80" stroke="'+b+'" stroke-width="2"/>',floral:'<g fill="'+b+'"><circle cx="60" cy="60" r="10"/><circle cx="340" cy="56" r="8"/><circle cx="320" cy="76" r="5"/></g>',heart:'<g fill="'+b+'" opacity=".7"><circle cx="60" cy="56" r="14"/><circle cx="340" cy="70" r="10"/><circle cx="96" cy="40" r="6"/></g>'}[T.orn]||'';
 return '<svg viewBox="0 0 400 260" role="img" aria-label="Minh hoạ"><defs><linearGradient id="'+id+'" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="'+k+'"/><stop offset="1" stop-color="'+g+'"/></linearGradient></defs><rect width="400" height="260" fill="url(#'+id+')"/><path d="M0 210c80-40 140 10 200-10s120-40 200 0v60H0z" fill="'+b+'" opacity=".35"/><path d="M0 230c90-30 170 20 260 0s100-10 140 0v30H0z" fill="'+a+'" opacity=".25"/>'+deco+motif+'</svg>'}
var CH=D.st||[['Gặp gỡ','Một ngày bình thường, hai người lạ bỗng thành quen.'],['Thương nhau','Những buổi chiều dài hơn, những tin nhắn ngọt hơn.'],['Về chung một nhà','Và rồi, chúng mình quyết định nắm tay nhau thật lâu.']];
function ev(t,time,v,a,m,dateStr){var mp=safeUrl(m)||maps(a||v);var s=new Date((D.d)+'T'+time+':00+07:00');var cal='';
 if(!isNaN(s)){var f=function(x){return x.toISOString().replace(/[-:]/g,'').replace(/\.\d+/,'')};cal='https://calendar.google.com/calendar/render?action=TEMPLATE&text='+encodeURIComponent(t+' '+D.a+' & '+D.b)+'&dates='+f(s)+'/'+f(new Date(+s+3*36e5))+'&location='+encodeURIComponent(a||v)}
 return '<div class="card rv"><div class="caps">'+e(t)+'</div><div class="t">'+e(time)+'</div><div>'+e(WD[dt.getDay()]||'')+', '+e(dd)+'</div><h3 style="margin-top:10px">'+e(v)+'</h3><p>'+e(a)+'</p><a class="btn f" target="_blank" rel="noopener" href="'+e(mp)+'">Xem bản đồ</a>'+(cal?'<a class="btn" target="_blank" rel="noopener" href="'+e(cal)+'">Lưu lịch</a>':'')+'</div>'}
var nm='<span>'+e(D.a)+'</span><span class="amp">&amp;</span><span>'+e(D.b)+'</span>';
var h=(window.MAU_DEMO?'<div class="demo-bar">'+(custom?'Bản xem thử tạo bởi <a href="/thiepcuoi/tao-thiep/">Siêng Studio</a> · ':'Demo mẫu “'+e(T.name)+'” · cặp đôi hư cấu · ')+'<a href="/thiepcuoi/#dat">Đặt trang cưới riêng</a></div>':'')+
'<section class="hero"><div class="caps">Trân trọng kính mời</div>'+orn+'<h1 class="names sc">'+nm+'</h1>'+orn+'<div class="date dp">'+e(dd)+'</div><div class="cd" id="cd"></div></section>'+
'<section class="wrap"><div class="caps rv">Chuyện của chúng mình</div><div class="ch">'+CH.map(function(x,i){return '<figure class="rv">'+art(i)+'<figcaption><div class="caps">Chương '+(i+1)+'</div><h3>'+e(x[0])+'</h3>'+e(x[1])+'</figcaption></figure>'}).join('')+'</div></section>'+
'<section class="wrap" style="background:var(--bg2)"><div class="caps rv">Sự kiện</div><h2 class="sc rv" style="font-size:2.6rem;color:var(--ac)">Hẹn gặp bạn</h2><div class="ev">'+ev(D.ct||'Lễ cưới',D.tt,D.tv,D.ta,D.tm)+(D.pv?ev(D.pt||'Tiệc cưới',D.ptt||D.tt,D.pv,D.pa,D.pm):'')+'</div></section>'+
(D.m?'<section class="wrap"><div class="rv">'+orn+'<p class="msg">'+e(D.m)+'</p></div></section>':'')+
'<section class="wrap ty"><div class="caps rv">Cảm ơn bạn</div><div class="names sc rv" style="flex-direction:row;flex-wrap:wrap;justify-content:center;gap:.25em">'+nm+'</div></section>'+
'<footer>'+e(T.credit)+'<br>Thiết kế bởi <a href="/thiepcuoi/">Siêng Studio</a> · <a href="/thiepcuoi/tao-thiep/">Tạo thiệp miễn phí</a></footer>'+
'<button id="mbtn" aria-label="Bật/tắt nhạc">♪</button><button id="mhint">Chạm để bật nhạc ♪</button>';
var main=document.getElementById('app');main.innerHTML=h;
/* countdown */
(function tick(){var n=dt-new Date(),x=document.getElementById('cd');if(!x)return;if(isNaN(n)||n<0){x.innerHTML='';return}
 var u=[[864e5,'Ngày'],[36e5,'Giờ'],[6e4,'Phút']];x.innerHTML=u.map(function(q){var v=Math.floor(n/q[0]);n-=v*q[0];return '<div><b>'+v+'</b><span>'+q[1]+'</span></div>'}).join('');setTimeout(tick,30000)})();
/* reveal */
var io='IntersectionObserver' in window?new IntersectionObserver(function(es){es.forEach(function(x){if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target)}})},{threshold:.15}):null;
document.querySelectorAll('.rv').forEach(function(x){io?io.observe(x):x.classList.add('in')});
/* music: plain <audio>, started on the tap (works in Zalo in-app browser) */
var au=new Audio(window.MAU_AUDIO_BASE+(T.song));au.loop=true;au.preload='auto';au.setAttribute('playsinline','');
var mb=document.getElementById('mbtn'),mh=document.getElementById('mhint');
function play(){var p=au.play();if(p&&p.then)p.then(function(){mb.classList.add('on');mh.style.display='none'},function(){mh.style.display='block'});else mb.classList.add('on')}
mb.onclick=function(){if(au.paused)play();else{au.pause();mb.classList.remove('on')}};mh.onclick=play;
document.addEventListener('visibilitychange',function(){if(document.hidden&&!au.paused){au.pause();au._r=1}else if(!document.hidden&&au._r){au._r=0;play()}});
/* gates */
function leaves(lsvg,rsvg){return '<div class="leaf l">'+lsvg+'</div><div class="leaf r">'+rsvg+'</div>'}
function gothicLeaf(m){var a=c.ac,w='#6b4a2b',w2='#8a6238';return '<svg viewBox="0 0 100 220" preserveAspectRatio="none"'+(m?' style="transform:scaleX(-1)"':'')+'><defs><linearGradient id="wd'+m+'" x1="0" x2="1"><stop offset="0" stop-color="'+w2+'"/><stop offset="1" stop-color="'+w+'"/></linearGradient></defs><path d="M0 220V70C0 30 55 6 100 0v220z" fill="url(#wd'+m+')" stroke="'+a+'" stroke-width="2.5"/><path d="M14 205V78C14 48 52 28 88 20v185z" fill="none" stroke="'+a+'" stroke-width="1.4" opacity=".8"/><path d="M26 120h56M26 160h56" stroke="'+a+'" stroke-width="1" opacity=".6"/><circle cx="88" cy="140" r="4" fill="'+a+'"/></svg>'}
function hyLeaf(side){return '<div style="position:absolute;inset:0;background:linear-gradient(90deg,#9e0f1b,#c8162a 60%,#9e0f1b);border-'+(side?'left':'right')+':2px solid #e0b44c"></div><div style="position:absolute;top:50%;'+(side?'left':'right')+':0;width:200%;transform:translate('+(side?'-50%':'50%')+',-58%);text-align:center;color:#f2cf73;font:min(48vw,38vh)/1 serif;overflow:hidden">囍</div>'}
var G=document.createElement('div');G.id='gate';var ui='<div class="gui"><div class="nm sc">'+e(D.a)+' &amp; '+e(D.b)+'</div><div class="tap">Chạm để mở thiệp</div></div>';
var gt=T.gate,inner='';
if(gt=='gothic')inner='<div id="cam"><div class="frame" style="filter:drop-shadow(0 18px 30px rgba(60,40,20,.35))">'+leaves(gothicLeaf(0),gothicLeaf(1))+'</div></div>';
else if(gt=='songhy'){G.style.setProperty('--gtx','#f6d77f');G.style.setProperty('--gbt','#e0b44c');G.style.setProperty('--gbtx','#5a1414');inner='<div id="cam"><div class="leaf l" style="overflow:hidden">'+hyLeaf(0)+'</div><div class="leaf r" style="overflow:hidden">'+hyLeaf(1)+'</div></div>'}
else if(gt=='minimal')inner='<div id="cam"><div class="leaf t" style="position:absolute;left:0;right:0;top:0;height:50%;width:auto;background:#fff;border-bottom:1px solid #1d1d1f"></div><div class="leaf b" style="position:absolute;left:0;right:0;bottom:0;top:auto;height:50%;width:auto;background:#fff"></div><div id="mline" style="position:absolute;left:10%;right:10%;top:50%;height:1px;background:#1d1d1f;transform-origin:50% 50%"></div></div>';
else if(gt=='envelope')inner='<div id="cam"><div id="env" style="position:relative;width:min(84vw,73vh);aspect-ratio:1.4;filter:drop-shadow(0 16px 26px rgba(74,59,44,.3))"><svg viewBox="0 0 140 100" style="position:absolute;inset:0;width:100%;height:100%"><rect width="140" height="100" rx="3" fill="#e9dcc4"/><path d="M0 100L70 52 140 100z" fill="#e2d2b6"/><path d="M0 0L70 52 0 100zM140 0L70 52 140 100z" fill="#efe4cf"/></svg><div id="flap" style="position:absolute;left:0;right:0;top:0;height:60%;transform-origin:50% 0;backface-visibility:hidden"><svg viewBox="0 0 140 60" preserveAspectRatio="none" style="width:100%;height:100%"><path d="M0 0h140L70 52z" fill="#dcc9a8" stroke="#c9a27e" stroke-width=".6"/></svg></div><div id="seal" style="position:absolute;left:50%;top:52%;width:17%;aspect-ratio:1;transform:translate(-50%,-50%);border-radius:50%;background:radial-gradient(circle at 35% 35%,#b5654a,#7c3a28);display:flex;align-items:center;justify-content:center;color:#f3dcc4;font:700 min(4vw,2.4vh) serif;box-shadow:0 2px 6px rgba(0,0,0,.3)">'+e((D.a||'?').trim().split(' ').pop()[0]||'')+'&amp;'+e((D.b||'?').trim().split(' ').pop()[0]||'')+'</div></div></div>';
else {G.style.setProperty('--gtx','#8a4660');var heartsBg="url('data:image/svg+xml,"+encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="60" height="60"><path d="M30 42l-9-9a5.5 5.5 0 0 1 9-6 5.5 5.5 0 0 1 9 6z" fill="#fff" opacity=".95"/></svg>')+"')";
 inner='<div id="cam"><div class="leaf l" style="background:'+heartsBg+',repeating-linear-gradient(90deg,rgba(255,255,255,0) 0 22px,rgba(255,255,255,.35) 30px,rgba(255,255,255,0) 38px),linear-gradient(90deg,#f4b5c5,#fbd6e0);box-shadow:inset -14px 0 20px rgba(228,138,160,.25)"></div><div class="leaf r" style="background:'+heartsBg+',repeating-linear-gradient(90deg,rgba(255,255,255,0) 0 22px,rgba(255,255,255,.35) 30px,rgba(255,255,255,0) 38px),linear-gradient(270deg,#bcd4ef,#dfe8f7);box-shadow:inset 14px 0 20px rgba(169,199,232,.25)"></div></div>'}
G.innerHTML=inner+ui;document.body.appendChild(G);document.body.classList.add('locked');
var opened=false;
function done(){G.remove();document.body.classList.remove('locked')}
G.addEventListener('click',function(){if(opened)return;opened=true;if(!G._auto)play();var u=G.querySelector('.gui');
 var A=function(el,k,o){return el&&el.animate?el.animate(k,Object.assign({fill:'forwards'},o)):null};
 if(!G.animate){done();return}
 A(u,[{opacity:1},{opacity:0}],{duration:250});
 var L=G.querySelector('.leaf.l'),Rr=G.querySelector('.leaf.r'),cam=G.querySelector('#cam'),last;
 var ez='cubic-bezier(.6,.05,.3,1)';
 if(gt=='gothic'){A(L,[{transform:'rotateY(0)'},{transform:'rotateY(-100deg)'}],{duration:900,easing:ez});A(Rr,[{transform:'rotateY(0)'},{transform:'rotateY(100deg)'}],{duration:900,easing:ez});A(cam,[{transform:'scale(1)'},{transform:'scale(4)'}],{delay:250,duration:1100,easing:'ease-in-out'});last=A(G,[{opacity:1},{opacity:0}],{delay:1000,duration:400})}
 else if(gt=='songhy'){A(L,[{transform:'translateX(0)'},{transform:'translateX(-101%)'}],{duration:1000,easing:ez});A(Rr,[{transform:'translateX(0)'},{transform:'translateX(101%)'}],{duration:1000,easing:ez});last=A(G,[{opacity:1},{opacity:0}],{delay:850,duration:350})}
 else if(gt=='minimal'){var ml=G.querySelector('#mline');A(ml,[{transform:'scaleX(.2)'},{transform:'scaleX(1.3)'}],{duration:350,easing:'ease-out'});A(G.querySelector('.leaf.t'),[{transform:'translateY(0)'},{transform:'translateY(-101%)'}],{delay:300,duration:800,easing:ez});A(G.querySelector('.leaf.b'),[{transform:'translateY(0)'},{transform:'translateY(101%)'}],{delay:300,duration:800,easing:ez});A(ml,[{opacity:1},{opacity:0}],{delay:300,duration:300});last=A(G,[{opacity:1},{opacity:0}],{delay:900,duration:300})}
 else if(gt=='envelope'){A(G.querySelector('#seal'),[{transform:'translate(-50%,-50%) scale(1)',opacity:1},{transform:'translate(-50%,-50%) scale(1.4)',opacity:0}],{duration:300});A(G.querySelector('#flap'),[{transform:'perspective(800px) rotateX(0)'},{transform:'perspective(800px) rotateX(-180deg)'}],{delay:150,duration:650,easing:ez});A(cam,[{transform:'scale(1)'},{transform:'scale(3.2)'}],{delay:650,duration:800,easing:'ease-in'});last=A(G,[{opacity:1},{opacity:0}],{delay:1050,duration:400})}
 else {A(L,[{transform:'translateX(0) scaleX(1)'},{transform:'translateX(-60%) scaleX(.35)'}],{duration:1000,easing:ez});A(Rr,[{transform:'translateX(0) scaleX(1)'},{transform:'translateX(60%) scaleX(.35)'}],{duration:1000,easing:ez});last=A(G,[{opacity:1},{opacity:0}],{delay:800,duration:400})}
 last.onfinish=done;
});
if(Q.get('open')=='1')setTimeout(function(){G._auto=1;G.click()},50);
})();
