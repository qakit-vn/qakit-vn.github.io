(function(){const I='/thiepcuoi/img/';
const C=[['congiao','cg','Minh Khôi','Thảo Vy','2027-01-16T09:30','Thánh lễ Hôn phối','Nhà thờ Giáo xứ (địa điểm mẫu)','/thiepcuoi/audio/avemaria.mp3','Ave Maria – Free Tim (CC0)'],
['truyenthong','tt','Quang Huy','Ngọc Hân','2027-02-20T10:00','Lễ Vu quy','Tư gia nhà gái (địa chỉ mẫu)','',''],
['phatgiao','pg','Thiện Tâm','An Nhiên','2027-03-13T08:00','Lễ Hằng thuận','Chùa (địa điểm mẫu)','',''],
['toigian','tg','Bảo Nam','Linh Chi','2026-12-12T18:00','Tiệc cưới','Trung tâm tiệc cưới (mẫu)','',''],
['hanquoc','hq','Tuấn Kiệt','Hà My','2027-04-10T17:30','Tiệc cưới','Nhà hàng (mẫu)','',''],
['vintage','vf','Đăng Khoa','Mai Anh','2027-05-08T11:00','Tiệc cưới','Nhà hàng (mẫu)','',''],
['garden','gd','Gia Bảo','Khánh Linh','2027-03-27T16:30','Tiệc cưới ngoài trời','Khu vườn tiệc (mẫu)','',''],
['luxury','lx','Hoàng Phúc','Bảo Ngọc','2027-01-30T18:30','Tiệc cưới','Khách sạn (mẫu)','',''],
['bien','bi','Nhật Minh','Thu Trang','2027-06-19T16:00','Tiệc cưới bên biển','Resort ven biển (mẫu)','','']];
const D={};C.forEach(([t,p,g,b,dt,ev,pl,ms,cr])=>{D[t]={demo:1,slug:'demo-'+t,template:t,palette:0,film:true,date:dt,lunar:'(Âm lịch – điền theo thông tin thật)',
groom:{name:g,father:'Ông Nguyễn Văn A',mother:'Bà Trần Thị B'},bride:{name:b,father:'Ông Lê Văn C',mother:'Bà Phạm Thị D'},
events:[{title:ev,date:dt,place:pl,address:'Địa chỉ mẫu – chỉ dùng cho bản demo'}],
photos:{hero:I+p+'1.webp',scenes:[I+p+'2.webp',I+p+'1.webp'],album:[I+p+'1.webp',I+p+'2.webp',I+'d1.webp',I+'d2.webp',I+'d3.webp',I+'d4.webp']},
timeline:[{d:'2021',t:'Lần đầu gặp',x:'Câu chuyện mẫu – khách hàng sẽ tự kể.'},{d:'2024',t:'Lời cầu hôn',x:'Một buổi tối thật đặc biệt.'},{d:'2027',t:'Về chung một nhà',x:'Và câu chuyện mới bắt đầu.'}],
gifts:[{side:'Mừng cưới (QR MẪU – không chuyển tiền)',bank:'Ngân hàng mẫu',bin:'970422',acc:'0000000000',holder:'TAI KHOAN MAU'}],
music:{src:ms,credit:cr||'Nhạc: Canon in D – Kevin MacLeod (CC BY 3.0)'},sections:{live:0}}});
window.SS_DEMOS=D;})();
