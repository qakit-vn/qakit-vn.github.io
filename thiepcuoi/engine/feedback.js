/* Siêng Studio – widget góp ý thiệp cưới */
(function(){
var EP='https://formsubmit.co/ajax/f124244856ae4a7d19b7546e4e5a323f';
var page=location.pathname, isDemo=/\/demo\//.test(page);
var css=`.sfb-btn{position:fixed;right:14px;bottom:14px;z-index:99999;background:linear-gradient(135deg,#c9a36a,#a0784a);color:#fff;border:0;border-radius:999px;padding:10px 16px;font:600 14px/1.2 system-ui,sans-serif;box-shadow:0 6px 20px rgba(0,0,0,.25);cursor:pointer}
.sfb-wrap{position:fixed;inset:0;z-index:100000;background:rgba(20,14,8,.45);display:none;align-items:flex-end;justify-content:center;font-family:system-ui,sans-serif}
.sfb-wrap.on{display:flex}.sfb-card{background:#fffaf3;color:#3a2c1c;width:min(420px,100%);border-radius:20px 20px 0 0;padding:20px 18px 22px;box-shadow:0 -8px 30px rgba(0,0,0,.2)}
@media(min-width:600px){.sfb-wrap{align-items:center}.sfb-card{border-radius:20px}}
.sfb-card h3{margin:0 0 4px;font:600 19px/1.3 Georgia,serif}.sfb-card p{margin:0 0 12px;font-size:13px;color:#7a6650}
.sfb-stars{display:flex;gap:6px;margin:4px 0 12px}.sfb-stars button{background:none;border:0;font-size:30px;cursor:pointer;color:#ddd0bd;padding:0}.sfb-stars button.on{color:#e0a83a}
.sfb-card textarea,.sfb-card input{width:100%;box-sizing:border-box;border:1px solid #e6d8c4;border-radius:10px;padding:9px 10px;font:14px system-ui,sans-serif;margin-bottom:8px;background:#fff}
.sfb-row{display:flex;gap:8px;margin-top:6px}.sfb-row button{flex:1;border:0;border-radius:10px;padding:11px;font:600 14px system-ui,sans-serif;cursor:pointer}
.sfb-send{background:#a0784a;color:#fff}.sfb-x{background:#efe4d4;color:#5a4630}.sfb-err{color:#b04030;font-size:13px;min-height:16px}
.sfb-banner{max-width:960px;margin:14px auto;padding:12px 16px;border-radius:14px;background:linear-gradient(135deg,#fff4e2,#fde9e4);border:1px dashed #d4a86a;color:#5a4028;font:14px/1.5 system-ui,sans-serif;display:flex;gap:10px;align-items:center;justify-content:space-between;flex-wrap:wrap}
.sfb-banner b{color:#a0583a}.sfb-banner button{border:0;background:#a0784a;color:#fff;border-radius:999px;padding:8px 14px;font-weight:600;cursor:pointer}`;
var st=document.createElement('style');st.textContent=css;document.head.appendChild(st);
var w=document.createElement('div');w.className='sfb-wrap';
w.innerHTML='<div class="sfb-card" role="dialog" aria-label="Góp ý"><div class="sfb-body"><h3>Bạn thấy mẫu thiệp này thế nào?</h3><p>Góp ý thật lòng giúp Siêng Studio làm thiệp đẹp hơn. 10 cặp đôi đầu tiên góp ý (có để liên hệ) được <b>giảm 50%</b> khi đặt thiệp.</p><div class="sfb-stars">'+[1,2,3,4,5].map(function(i){return '<button type="button" data-v="'+i+'" aria-label="'+i+' sao">★</button>'}).join('')+'</div><textarea rows="2" class="sfb-like" placeholder="Bạn thích điều gì?"></textarea><textarea rows="2" class="sfb-dislike" placeholder="Điều gì chưa ổn / muốn thêm gì?"></textarea><input class="sfb-contact" placeholder="SĐT/Zalo/email (không bắt buộc – để nhận ưu đãi)"><div class="sfb-err"></div><div class="sfb-row"><button type="button" class="sfb-x">Để sau</button><button type="button" class="sfb-send">Gửi góp ý</button></div></div></div>';
document.body.appendChild(w);
var rate=0,stars=w.querySelectorAll('.sfb-stars button');
stars.forEach(function(b){b.onclick=function(){rate=+b.dataset.v;stars.forEach(function(s){s.classList.toggle('on',+s.dataset.v<=rate)})}});
function open(){w.classList.add('on')}function close(){w.classList.remove('on')}
w.onclick=function(e){if(e.target===w)close()};w.querySelector('.sfb-x').onclick=close;
w.querySelector('.sfb-send').onclick=function(){var err=w.querySelector('.sfb-err'),q=function(c){return w.querySelector(c).value.trim()};
 if(!rate){err.textContent='Bạn chọn số sao giúp mình nhé.';return}
 var btn=this;btn.disabled=true;btn.textContent='Đang gửi…';
 fetch(EP,{method:'POST',headers:{'Content-Type':'application/json',Accept:'application/json'},body:JSON.stringify({_subject:'[Góp ý thiệp cưới] '+rate+'★ '+page,_template:'table',_captcha:'false',loai:'gop-y-thiepcuoi',trang:page,so_sao:rate,thich:q('.sfb-like'),chua_thich:q('.sfb-dislike'),lien_he:q('.sfb-contact')})})
 .then(function(r){if(!r.ok)throw 0;w.querySelector('.sfb-body').innerHTML='<h3>Cảm ơn bạn rất nhiều! 💛</h3><p>Siêng Studio đã nhận góp ý'+(q?'':'')+'. Nếu bạn để lại liên hệ và nằm trong 10 cặp đôi đầu tiên, tụi mình sẽ nhắn mã giảm 50%.</p><div class="sfb-row"><button type="button" class="sfb-x">Đóng</button></div>';w.querySelector('.sfb-x').onclick=close})
 .catch(function(){btn.disabled=false;btn.textContent='Gửi góp ý';err.textContent='Gửi chưa được, bạn thử lại hoặc nhắn qua trang Liên hệ nhé.'})};
var b=document.createElement('button');b.className='sfb-btn';b.type='button';b.textContent='💬 Góp ý mẫu này';b.onclick=open;document.body.appendChild(b);
if(!isDemo){var bn=document.createElement('div');bn.className='sfb-banner';bn.innerHTML='<span>🎁 <b>Dùng thử miễn phí — góp ý nhận ưu đãi:</b> xem demo thoải mái, 10 cặp đôi đầu tiên gửi góp ý được giảm 50% khi đặt thiệp.</span><button type="button">Gửi góp ý</button>';bn.querySelector('button').onclick=open;
 var h=document.querySelector('header');(h&&h.parentNode?h.parentNode.insertBefore(bn,h.nextSibling):document.body.insertBefore(bn,document.body.firstChild))}
window.SSFeedback={open:open};
})();
