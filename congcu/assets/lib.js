// Siêng Studio - công thức dùng chung (kiểm thử bằng node test.js)
var VN={CS:2530000,CAP_BH:50600000,VUNG:[5310000,4730000,4140000,3700000],GT:15500000,GTPT:6200000,
BAC:[[10e6,.05],[30e6,.10],[60e6,.20],[100e6,.30],[Infinity,.35]]};
function thueLuyTien(tn){var t=0,lo=0;if(tn<=0)return 0;for(var i=0;i<VN.BAC.length;i++){var hi=VN.BAC[i][0];if(tn>lo){t+=(Math.min(tn,hi)-lo)*VN.BAC[i][1]}lo=hi}return t}
function g2n(gross,o){o=o||{};var nguoiPT=o.pt||0,vung=o.vung||1,base=o.base>0?o.base:gross;
 var b1=Math.min(base,VN.CAP_BH),b2=Math.min(base,20*VN.VUNG[vung-1]);
 var bhxh=b1*.08,bhyt=b1*.015,bhtn=b2*.01,bh=bhxh+bhyt+bhtn;
 var gt=VN.GT+nguoiPT*VN.GTPT,tntt=Math.max(0,gross-bh-gt),thue=thueLuyTien(tntt);
 var cty={bhxh:b1*.175,bhyt:b1*.03,bhtn:b2*.01};cty.tong=cty.bhxh+cty.bhyt+cty.bhtn;
 return{gross:gross,bhxh:bhxh,bhyt:bhyt,bhtn:bhtn,bh:bh,gt:gt,tntt:tntt,thue:thue,net:gross-bh-thue,cty:cty,ctyTong:gross+cty.tong}}
function n2g(net,o){var lo=net,hi=net*3+1e7;for(var i=0;i<200;i++){var m=(lo+hi)/2;if(g2n(m,o).net<net)lo=m;else hi=m}return Math.round(hi)}
function lichGocDeu(P,rNam,n){var r=rNam/100/12,g=P/n,du=P,a=[];for(var i=1;i<=n;i++){var l=du*r;a.push([i,g,l,g+l,du-g]);du-=g}return a}
function lichNienKim(P,rNam,n){var r=rNam/100/12,A=r?P*r/(1-Math.pow(1+r,-n)):P/n,du=P,a=[];for(var i=1;i<=n;i++){var l=du*r,g=A-l;du-=g;a.push([i,g,l,A,Math.max(du,0)])}return a}
function laiTietKiem(P,rNam,thang,ky){ // ky: số kỳ tái tục (1 = không tái tục)
 ky=ky||1;var v=P;for(var i=0;i<ky;i++)v+=v*rNam/100*thang/12;return{cuoi:v,lai:v-P}}
// Âm lịch: thuật toán của Hồ Ngọc Đức (múi giờ +7)
var PI=Math.PI;function INT(d){return Math.floor(d)}
function jdFromDate(dd,mm,yy){var a=INT((14-mm)/12),y=yy+4800-a,m=mm+12*a-3,jd=dd+INT((153*m+2)/5)+365*y+INT(y/4)-INT(y/100)+INT(y/400)-32045;if(jd<2299161)jd=dd+INT((153*m+2)/5)+365*y+INT(y/4)-32083;return jd}
function jdToDate(jd){var a,b,c;if(jd>2299160){a=jd+32044;b=INT((4*a+3)/146097);c=a-INT(b*146097/4)}else{b=0;c=jd+32082}var d=INT((4*c+3)/1461),e=c-INT(1461*d/4),m=INT((5*e+2)/153);return[e-INT((153*m+2)/5)+1,m+3-12*INT(m/10),b*100+d-4800+INT(m/10)]}
function NewMoon(k){var T=k/1236.85,T2=T*T,T3=T2*T,dr=PI/180,Jd1=2415020.75933+29.53058868*k+0.0001178*T2-0.000000155*T3;Jd1+=0.00033*Math.sin((166.56+132.87*T-0.009173*T2)*dr);
var M=359.2242+29.10535608*k-0.0000333*T2-0.00000347*T3,Mpr=306.0253+385.81691806*k+0.0107306*T2+0.00001236*T3,F=21.2964+390.67050646*k-0.0016528*T2-0.00000239*T3;
var C1=(0.1734-0.000393*T)*Math.sin(M*dr)+0.0021*Math.sin(2*dr*M);C1=C1-0.4068*Math.sin(Mpr*dr)+0.0161*Math.sin(dr*2*Mpr);C1=C1-0.0004*Math.sin(dr*3*Mpr);
C1=C1+0.0104*Math.sin(dr*2*F)-0.0051*Math.sin(dr*(M+Mpr));C1=C1-0.0074*Math.sin(dr*(M-Mpr))+0.0004*Math.sin(dr*(2*F+M));C1=C1-0.0004*Math.sin(dr*(2*F-M))-0.0006*Math.sin(dr*(2*F+Mpr));
C1=C1+0.0010*Math.sin(dr*(2*F-Mpr))+0.0005*Math.sin(dr*(2*Mpr+M));var dt=T<-11?0.001+0.000839*T+0.0002261*T2-0.00000845*T3-0.000000081*T*T3:-0.000278+0.000265*T+0.000262*T2;return Jd1+C1-dt}
function nmDay(k,tz){return INT(NewMoon(k)+0.5+tz/24)}
function SunLong(jdn){var T=(jdn-2451545.0)/36525,T2=T*T,dr=PI/180,M=357.52910+35999.05030*T-0.0001559*T2-0.00000048*T*T2,L0=280.46645+36000.76983*T+0.0003032*T2;
var DL=(1.914600-0.004817*T-0.000014*T2)*Math.sin(dr*M);DL=DL+(0.019993-0.000101*T)*Math.sin(dr*2*M)+0.000290*Math.sin(dr*3*M);var L=(L0+DL)*dr;L=L-PI*2*INT(L/(PI*2));return L}
function sunL(d,tz){return INT(SunLong(d-0.5-tz/24)/PI*6)}
function m11(yy,tz){var off=jdFromDate(31,12,yy)-2415021,k=INT(off/29.530588853),nm=nmDay(k,tz);if(sunL(nm,tz)>=9)nm=nmDay(k-1,tz);return nm}
function leapOff(a11,tz){var k=INT((a11-2415021.076998695)/29.530588853+0.5),last=0,i=1,arc=sunL(nmDay(k+i,tz),tz);do{last=arc;i++;arc=sunL(nmDay(k+i,tz),tz)}while(arc!=last&&i<14);return i-1}
function s2l(dd,mm,yy,tz){tz=tz||7;var dn=jdFromDate(dd,mm,yy),k=INT((dn-2415021.076998695)/29.530588853),ms=nmDay(k+1,tz);if(ms>dn)ms=nmDay(k,tz);
var a11=m11(yy,tz),b11=a11,ly;if(a11>=ms){ly=yy;a11=m11(yy-1,tz)}else{ly=yy+1;b11=m11(yy+1,tz)}var ld=dn-ms+1,diff=INT((ms-a11)/29),leap=0,lm=diff+11;
if(b11-a11>365){var lo=leapOff(a11,tz);if(diff>=lo){lm=diff+10;if(diff==lo)leap=1}}if(lm>12)lm-=12;if(lm>=11&&diff<4)ly-=1;return[ld,lm,ly,leap]}
function l2s(ld,lm,ly,leap,tz){tz=tz||7;var a11,b11;if(lm<11){a11=m11(ly-1,tz);b11=m11(ly,tz)}else{a11=m11(ly,tz);b11=m11(ly+1,tz)}
var k=INT(0.5+(a11-2415021.076998695)/29.530588853),off=lm-11;if(off<0)off+=12;if(b11-a11>365){var lo=leapOff(a11,tz),lmo=lo-2;if(lmo<0)lmo+=12;if(leap&&lm!=lmo)return null;else if(leap||off>=lo)off+=1}else if(leap)return null;
return jdToDate(nmDay(k+off,tz)+ld-1)}
var CAN=['Giáp','Ất','Bính','Đinh','Mậu','Kỷ','Canh','Tân','Nhâm','Quý'],CHI=['Tý','Sửu','Dần','Mão','Thìn','Tỵ','Ngọ','Mùi','Thân','Dậu','Tuất','Hợi'];
function canChiNam(y){return CAN[(y+6)%10]+' '+CHI[(y+8)%12]}
function canChiNgay(d,m,y){var jd=jdFromDate(d,m,y);return CAN[(jd+9)%10]+' '+CHI[(jd+1)%12]}
function bmi(kg,cm){var b=kg/Math.pow(cm/100,2),p=b<18.5?'Thiếu cân':b<23?'Bình thường':b<25?'Thừa cân':b<30?'Béo phì độ I':'Béo phì độ II';return[b,p]}

// BHXH (Luật 41/2024/QH15): khoản 6 Điều 5 làm tròn tháng lẻ; Điều 66 lương hưu; Điều 68 trợ cấp 1 lần khi nghỉ hưu; Điều 70 BHXH 1 lần
function namLe(th){var y=Math.floor(th/12),m=th%12;return y+(m===0?0:m<=6?.5:1)}
function bhxh1Lan(bq,thTruoc,thSau,daDongNeuDuoi1Nam){var tong=thTruoc+thSau;if(tong<12&&tong>0){var cap=2*bq;var v=daDongNeuDuoi1Nam>0?Math.min(daDongNeuDuoi1Nam,cap):cap;return{nTruoc:0,nSau:0,tien:v,duoi1:true}}
var yT=Math.floor(thTruoc/12),le=thTruoc%12;if(thSau===0){var n=namLe(thTruoc);return{nTruoc:n,nSau:0,tien:n*1.5*bq}}var nS=namLe(thSau+le);return{nTruoc:yT,nSau:nS,tien:yT*1.5*bq+nS*2*bq}}
function luongHuu(gt,th,bq,o){o=o||{};var n=namLe(th),ty;if(th<180)return{du:false,n:n};
if(gt==='nu')ty=45+(n-15)*2;else ty=n<20?40+(n-15)*1:45+(n-20)*2;ty=Math.min(75,ty);
var tr=o.truocTuoi||0,giam=Math.floor(tr/12)*2+(tr%12>=6?1:0);ty=Math.max(0,ty-giam);var lh=bq*ty/100,san=false;
if(o.thamGiaTruoc2025&&th>=240&&lh<VN.CS){lh=VN.CS;san=true}
var nguong=gt==='nu'?30:35,tc=n>nguong?(n-nguong)*0.5*bq:0;return{du:true,n:n,ty:ty,lh:lh,san:san,tc1lan:tc,giam:giam}}
// chi phí doanh nghiệp: BHXH 17,5% (gồm 0,5% TNLĐ-BNN), BHYT 3%, BHTN 1%, KPCĐ 2% (Luật Công đoàn 2024)
function chiPhiDN(gross,o){o=o||{};var vung=o.vung||1,base=o.base>0?o.base:gross,b1=Math.min(base,VN.CAP_BH),b2=Math.min(base,20*VN.VUNG[vung-1]),tnld=o.tnld==null?.005:o.tnld;
var x={bhxh:b1*(.17+tnld),bhyt:b1*.03,bhtn:b2*.01,kpcd:o.kpcd===false?0:b1*.02};x.tong=x.bhxh+x.bhyt+x.bhtn+x.kpcd;x.chiPhi=gross+x.tong;x.nv=g2n(gross,o);return x}
// đọc số thành chữ tiếng Việt
var CS_=['không','một','hai','ba','bốn','năm','sáu','bảy','tám','chín'];
function doc3(n,full){var t=Math.floor(n/100),c=Math.floor(n%100/10),d=n%10,a=[];if(full||t>0){a.push(CS_[t],'trăm')}
if(c>1){a.push(CS_[c],'mươi');if(d===1)a.push('mốt');else if(d===4)a.push('tư');else if(d===5)a.push('lăm');else if(d>0)a.push(CS_[d])}
else if(c===1){a.push('mười');if(d===5)a.push('lăm');else if(d>0)a.push(CS_[d])}
else if(d>0){if(full||t>0)a.push('lẻ');a.push(CS_[d])}return a.join(' ')}
function soChu(n){n=Math.floor(Math.abs(n));if(n===0)return'không';return sc(n,false)}
function sc(n,lead){if(n>=1e9){var hi=Math.floor(n/1e9),lo=n%1e9;return(sc(hi,lead)+' tỷ'+(lo?' '+sc(lo,true):'')).trim()}
var g=[Math.floor(n/1e6),Math.floor(n%1e6/1000),n%1000],U=[' triệu',' nghìn',''],o=[],st=lead;for(var i=0;i<3;i++){if(g[i]===0)continue;o.push(doc3(g[i],st)+U[i]);st=true}return o.join(' ')}
function tienChu(n){var s=soChu(n);return s.charAt(0).toUpperCase()+s.slice(1)+' đồng'}
if(typeof module!=='undefined')module.exports={VN,thueLuyTien,g2n,n2g,lichGocDeu,lichNienKim,laiTietKiem,s2l,l2s,canChiNam,canChiNgay,bmi,namLe,bhxh1Lan,luongHuu,chiPhiDN,soChu,tienChu};
