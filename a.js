/* Siêng Studio – cookie-less counter (abacus.jasoncameron.dev, no personal data) */
(function(){if(navigator.webdriver||/^(localhost|127\.)/.test(location.hostname))return;
var B='https://abacus.jasoncameron.dev/hit/siengstudio/';
function k(s){return s.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'').slice(0,60)||'home'}
function h(key){try{fetch(B+key,{mode:'cors',keepalive:true}).catch(function(){})}catch(e){}}
var p=k(location.pathname.replace(/index\.html$/,'')),d=new Date().toISOString().slice(0,10).replace(/-/g,'');
h('pv-total');h('pv-'+p);h('day-'+d);
var ref=document.referrer&&document.referrer.indexOf(location.host)<0?k(new URL(document.referrer).hostname):'';if(ref)h('ref-'+ref);
window.sTrack=function(e){h('ev-'+k(e))};
var once={};function o(e){if(!once[e]){once[e]=1;sTrack(e)}}
document.addEventListener('click',function(ev){var t=ev.target.closest&&ev.target.closest('button,a');if(!t)return;
 if(t.closest('.sfb-send'))sTrack('feedback-submit');
 if(t.closest('#dat')&&t.type==='submit')sTrack('order-click');
 if(t.getAttribute('href')==='#dat')sTrack('order-cta');
 if(/^\/congcu\/./.test(location.pathname)&&t.tagName==='BUTTON')o('tool-'+p);},true);
document.addEventListener('submit',function(ev){var f=ev.target;
 if(f.closest('#dat'))sTrack('order-submit');else if(f.classList.contains('leadform'))sTrack('lead-submit');},true);
if(/^\/congcu\/./.test(location.pathname))document.addEventListener('input',function(){o('tool-'+p)},true);
})();
