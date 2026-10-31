#!/usr/bin/env python3
"""One template, two sides. Run: python3 _src/build.py  -> index.html (nhà trai), nha-trai/, nha-gai/"""
import json, os, urllib.parse as up
D=os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BASE='https://qakit-vn.github.io/cuoi/duclong-anhnguyet/'
q=up.quote
def maps(a): return 'https://www.google.com/maps/search/?api=1&query='+q(a)
def cal(title,start,end,loc,url): return ('https://calendar.google.com/calendar/render?action=TEMPLATE&text='+q(title)+'&dates='+start+'/'+end+'&location='+q(loc)+'&details='+q(url,safe=''))
SIDES={
 'trai':dict(TT='10:00',TD='29',TWD='Chủ Nhật',TL='21',TP='Tư gia nhà trai',TPU='TƯ GIA NHÀ TRAI',TPN='nhà trai',
   TA='Thôn Ngưu Trì Thượng, xã Nam Trực, tỉnh Ninh Bình',MAPQ='Thôn Ngưu Trì Thượng, xã Nam Trực, Ninh Bình',
   CAL=('20261129T030000Z','20261129T060000Z'),CH1B='07',song='bg',CREDIT='Nhạc: Sớm'),
 'gai':dict(TT='16:00',TD='28',TWD='Thứ Bảy',TL='20',TP='Tư gia nhà gái',TPU='TƯ GIA NHÀ GÁI',TPN='nhà gái',
   TA='Số 9 ngõ 32 đường 1 Đồng Vân, Đồng Tháp, Đan Phượng',MAPQ='Số 9 ngõ 32 đường 1 Đồng Vân, Đồng Tháp, Đan Phượng, Hà Nội',
   CAL=('20261128T090000Z','20261128T120000Z'),CH1B='02',song='nhagai',
   CREDIT='Nhạc: Can\'t Help Falling In Love – Brooklyn Duo'),
}
T=open(os.path.join(D,'_src','template.html'),encoding='utf-8').read()
def render(side,url,prefix):
    c=SIDES[side]; s=T
    rep={k:c[k] for k in ('TT','TD','TWD','TL','TP','TPU','TPN','TA','CH1B','CREDIT')}
    rep['URL']=url; rep['TMAP']=maps(c['MAPQ']).replace('&','&amp;')
    rep['TCAL']=cal('Tiệc cưới Đức Long & Ánh Nguyệt',*c['CAL'],c['TA'],url).replace('&','&amp;')
    rep['SIDEJSON']=json.dumps({'side':side,'song':c['song']},ensure_ascii=False)
    for k,v in rep.items(): s=s.replace('{{'+k+'}}',v)
    assert '{{' not in s
    if prefix:  # subfolder: point assets one level up
        for a in ('img/','audio/'):
            for p in ('"',"'",'(','`'):
                s=s.replace(p+a,p+prefix+a)
    return s
def w(path,s):
    os.makedirs(os.path.dirname(path),exist_ok=True); open(path,'w',encoding='utf-8').write(s)
w(os.path.join(D,'index.html'),render('trai',BASE,''))
w(os.path.join(D,'nha-trai','index.html'),render('trai',BASE,'../').replace('<meta name="robots"','<link rel="canonical" href="'+BASE+'">\n<meta name="robots"'))
w(os.path.join(D,'nha-gai','index.html'),render('gai',BASE+'nha-gai/','../'))
print('ok')
MOI='''<!doctype html><html lang="vi"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Tạo link mời khách · Đức Long & Ánh Nguyệt</title><meta name="robots" content="noindex,nofollow">
<style>body{font:17px/1.5 system-ui,sans-serif;background:#fbf7ef;color:#3b3226;margin:0;padding:20px}main{max-width:640px;margin:auto}h1{font-size:1.3rem}
label{display:inline-flex;gap:6px;margin-right:16px}textarea{width:100%;min-height:150px;font:inherit;padding:10px;border:1px solid #d9c49a;border-radius:8px;box-sizing:border-box}
button{font:inherit;padding:.55em 1.1em;border-radius:20px;border:1px solid #b48a3c;background:#b48a3c;color:#fff;cursor:pointer}button.s{background:#fff;color:#7a5a20}
ul{list-style:none;padding:0}li{background:#fff;border:1px solid #ead9b8;border-radius:8px;padding:10px;margin:8px 0;display:flex;gap:8px;align-items:center}li div{flex:1;min-width:0}li b{display:block}li small{word-break:break-all;color:#7a6d5a}</style></head>
<body><main><h1>Tạo link thiệp có tên khách</h1>
<p><label><input type="radio" name="s" value="" checked> Nhà trai</label><label><input type="radio" name="s" value="nha-gai/"> Nhà gái</label></p>
<p>Nhập tên khách, mỗi dòng một người:</p><textarea id="t" placeholder="Anh Minh&#10;Cô Lan và gia đình"></textarea>
<p><button id="g">Tạo link</button> <button class="s" id="all">Sao chép tất cả</button></p><ul id="o"></ul></main>
<script>const B="__BASE__";let L=[];const esc=s=>s.replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
async function cp(v,b){try{await navigator.clipboard.writeText(v)}catch(e){const a=document.createElement("textarea");a.value=v;document.body.appendChild(a);a.select();document.execCommand("copy");a.remove()}if(b){const x=b.textContent;b.textContent="Đã chép ✓";setTimeout(()=>b.textContent=x,1200)}}
function gen(){const s=document.querySelector("[name=s]:checked").value;L=t.value.split("\\n").map(x=>x.trim()).filter(Boolean).map(n=>[n,B+s+"?khach="+encodeURIComponent(n)]);
o.innerHTML=L.map((x,i)=>`<li><div><b>${esc(x[0])}</b><small>${esc(x[1])}</small></div><button class="s" data-i="${i}">Chép</button></li>`).join("");
o.querySelectorAll("button").forEach(b=>b.onclick=()=>cp(L[b.dataset.i][1],b))}
g.onclick=gen;document.querySelectorAll("[name=s]").forEach(r=>r.onchange=()=>L.length&&gen());
all.onclick=()=>{if(!L.length)gen();cp(L.map(x=>x[0]+": "+x[1]).join("\\n"),all)}</script></body></html>'''
w(os.path.join(D,'moi','index.html'),MOI.replace('__BASE__',BASE))
