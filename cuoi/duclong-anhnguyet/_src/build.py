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
