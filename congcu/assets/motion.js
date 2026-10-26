(function(){var b=document.body,th=(b.className.match(/th-(\w+)/)||[])[1]||(b.dataset.bee==='tet'?'tet':''),S=document.currentScript,B=S?S.src.replace(/motion\.js.*$/,''):'';
var h=document.querySelector('.page-head')||document.querySelector('.tet');
if(h&&th){var a=document.createElement('div'),n=innerWidth<700?7:12;a.className='amb a-'+th;a.setAttribute('aria-hidden','true');for(var i=0;i<n;i++){var e=document.createElement('i');e.style.cssText='left:'+(Math.random()*96|0)+'%;--d:'+(7+Math.random()*7).toFixed(1)+'s;--w:'+(-Math.random()*12).toFixed(1)+'s;--x:'+((Math.random()*80-40)|0)+'px';a.appendChild(e)}h.insertBefore(a,h.firstChild)}
var r=document.querySelector('.res'),big=r&&r.querySelector('.big'),busy=0,lastAct=Date.now(),cf=0,lastBoom=0;
function num(t){var m=t.match(/-?\d{1,3}(?:\.\d{3})+|-?\d+/);if(!m||/\d,\d/.test(t))return null;return{s:m[0],v:+m[0].replace(/\./g,''),i:m.index}}
var prev=null,raf,mine='';function count(){big=r.querySelector('.big');if(!big)return;var t=big.textContent,p=num(t);if(!p){prev=null;return}var from=prev==null?0:prev,to=p.v;prev=to;if(from===to||Math.abs(to)>1e15)return;var pre=t.slice(0,p.i),post=t.slice(p.i+p.s.length),t0=performance.now();cancelAnimationFrame(raf);
 (function st(now){var k=Math.min(1,(now-t0)/600),e=1-Math.pow(1-k,3),v=Math.round(from+(to-from)*e);mine=pre+v.toLocaleString('vi-VN')+post;big.textContent=mine;if(k<1)raf=requestAnimationFrame(st)})(t0)}
function bee(){return document.querySelector('.bee')}
function act(c,ms){var w=bee();if(!w)return;['m-wave','m-flut','m-peek','m-think','m-sleep','m-love','m-party'].forEach(function(x){w.classList.remove(x)});void w.offsetWidth;if(c)w.classList.add(c);clearTimeout(w._m);if(ms)w._m=setTimeout(function(){w.classList.remove(c)},ms)}
function say(t,ms){var w=bee();if(!w)return;var f=w.querySelector('.fx');if(!f){f=document.createElement('span');f.className='fx';w.appendChild(f)}f.textContent=t;f.classList.add('on');clearTimeout(f._t);if(ms)f._t=setTimeout(function(){f.classList.remove('on')},ms)}
function heart(){var w=bee();if(!w)return;for(var i=0;i<3;i++){var e=document.createElement('span');e.className='ht';e.textContent='\u2665';e.style.setProperty('--dx',(i*14-14)+'px');e.style.animationDelay=i*.12+'s';w.appendChild(e);setTimeout(e.remove.bind(e),1400)}}
function boom(){var now=Date.now();if(now-lastBoom<6000)return;lastBoom=now;act('m-party',1300);function go(){var w=bee(),rc=(w||r).getBoundingClientRect();confetti({particleCount:70,spread:75,startVelocity:32,scalar:.8,ticks:140,origin:{x:(rc.left+rc.width/2)/innerWidth,y:(rc.top+rc.height/2)/innerHeight},disableForReducedMotion:true})}
 if(window.confetti)go();else if(!cf){cf=1;var s=document.createElement('script');s.src=B+'confetti.js';s.onload=go;document.head.appendChild(s)}}
function wake(){lastAct=Date.now();var w=bee();if(w&&w.classList.contains('m-sleep')){act('');say('',1);w.querySelector('.fx').classList.remove('on')}}
var ready=setInterval(function(){var w=bee();if(!w||!w.classList.contains('on'))return;clearInterval(ready);
 if(b.dataset.bee!=='tet'){act('m-wave',1600);say('Xin chào!',1800)}
 w.addEventListener('mouseenter',function(){wake();act('m-love',700);heart()});w.addEventListener('click',function(){wake();heart()});
 setInterval(function(){var w=bee();if(!w||document.hidden)return;var idle=Date.now()-lastAct;
  if(idle>20000){if(!w.classList.contains('m-sleep')){act('m-sleep');say('Zzz…')}}
  else if(!w.className.match(/m-(think|party|wave|love)/)&&!w.className.match(/s-(look|cheer|jump)/)){if(Math.random()<.35)act('m-peek',2200);else act('m-flut',500)}},4500)},300);
var tt;document.addEventListener('input',function(e){if(!e.target.closest('.fields,.panel'))return;wake();act('m-think');say('Để mình tính…');clearTimeout(tt);tt=setTimeout(function(){act('');var f=bee()&&bee().querySelector('.fx');if(f)f.classList.remove('on');boom()},900)});
['pointerdown','keydown','scroll'].forEach(function(ev){addEventListener(ev,wake,{passive:true})});
document.addEventListener('click',function(e){if(e.target.closest('.presets button'))setTimeout(boom,150)});
if(r){var mo=new MutationObserver(function(){var g=r.querySelector('.big');if(g&&g.textContent===mine)return;r.classList.remove('mupd');void r.offsetWidth;r.classList.add('mupd');count()});prev=big?((num(big.textContent)||{}).v):null;if(prev===undefined)prev=null;mo.observe(r,{childList:true,subtree:true,characterData:true})}
})();
