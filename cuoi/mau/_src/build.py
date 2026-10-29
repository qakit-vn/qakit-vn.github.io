#!/usr/bin/env python3
"""Sinh trang demo cho mỗi theme: python3 _src/build.py"""
import os,re
D=os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ids=re.findall(r"^(\w+):\{name:'([^']+)'",open(os.path.join(D,'themes.js'),encoding='utf-8').read(),re.M)
SH='''<!doctype html><html lang="vi"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>Mẫu trang cưới {name} · Siêng Studio</title>
<meta name="description" content="Demo trang cưới online phong cách {name}: hiệu ứng mở thiệp, nhạc nền, chuyện tình, bản đồ sự kiện. Cặp đôi hư cấu. Thiết kế bởi Siêng Studio.">
<link rel="canonical" href="https://qakit-vn.github.io/cuoi/mau/{id}/">
<meta property="og:title" content="Mẫu trang cưới {name} · Siêng Studio"><meta property="og:type" content="website">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="../base.css"></head><body><main id="app"></main>
<script>window.MAU_DEFAULT='{id}';window.MAU_DEMO=1;window.MAU_AUDIO_BASE='/thiepcuoi/audio/';</script>
<script src="../themes.js"></script><script src="../base.js"></script></body></html>
'''
for i,n in ids:
    os.makedirs(os.path.join(D,i),exist_ok=True)
    open(os.path.join(D,i,'index.html'),'w',encoding='utf-8').write(SH.replace('{id}',i).replace('{name}',n))
print(ids)
