var server = {}
var user = {}

var megaphone = [];

const viewAll = "\u200b".repeat(500)+"\n";

function response(room, msg, sender, isGroupChat, replier, ImageDB, packageName, threadID){
const re = (str) => { replier.reply(str) }
const reTo = (recv, str) => { replier.reply(recv,str) }
try{
var b = msg.split(" ");
var millis = java.lang.System.currentTimeMillis();
var code = java.lang.String(ImageDB.getProfileImage()).hashCode();
msg = msg.trim();
sender = sender.replace(/\{/g,"(").replace(/\}/g,")").replace(/,/g,".");
const comma = (value) => { return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",") }

if(!isGroupChat&&room==sender){

function alert(a,str,value){
var b = Object.keys(user);
for(var c = 0; c<b.length; c++){
if(user[b[c]]==user[a])
if(!value){
if(a!=b[c]) reTo(b[c],str)
}
else reTo(b[c],str)
}
}

function mafiaC(a,str){
for(var maff in server[user[sender]].player){
if((server[user[sender]].player[maff].job=="마피아"|| server[user[sender]].player[maff].contact||server[user[sender]].player[maff].death)&& a!=maff)
reTo(maff,str);
}
}

function cultC(a,str){
for(var cult in server[user[sender]].player){
if((server[user[sender]].player[cult].cult|| server[user[sender]].player[cult].death)&& a!=cult)
reTo(cult,str);
}
}

function deadC(a,str){
for(var dead in server[user[sender]].player){
if(server[user[sender]].player[dead].death&& a!=dead)
reTo(dead,str);
}
}

function nightC(a,str){
for(var night in server[user[sender]].player){
if(server[user[sender]].player[night].death&& a!=night)
reTo(night,str);
}
}
//대기중일때 채팅
if(user[sender]!=undefined||user[sender]!=""){
if(server[user[sender]]!=undefined){
if(msg.indexOf("ㅁ")!=0 && !server[user[sender]].started)
alert(sender,sender+"❭ 💬\n"+msg);
}
}
//리로드
if(msg=="ㅁ%리로드&&"){
Api.reload("마피아게임.js");
java.lang.Thread.sleep(5000);
for(var tt = 0; tt<megaphone.length; tt++)
reTo(megaphone[tt],"리로드되었습니다.\n방목록이 모두 초기화됩니다.");
}
//확성기
if(megaphone.indexOf(sender)==-1)
megaphone.push(sender);
if(b[0]=="ㅁ확성기"){
if(user[sender]!=undefined){
if(!server[user[sender]].started){
var data = msg.substr(5);
for(var tt = 0; tt<megaphone.length; tt++)
reTo(megaphone[tt],"["+sender+"]📢 "+data);
}
}
}
//게임중일때 채팅
if(user[sender]!=undefined){
if(msg.indexOf("ㅁ")!=0&&isNaN(msg)&& (msg!="찬성"&&msg!="반대")&& server[user[sender]].started){

if(server[user[sender]].player[sender].death)
deadC(sender,sender+"❭ ☠\n"+msg);
else {
if(server[user[sender]].time!="밤")
alert(sender,sender+"❭\n"+msg);

if(server[user[sender]].time=="밤"){
if(server[user[sender]].player[sender].job=="마피아"||server[user[sender]].player[sender].contact)
mafiaC(sender,sender+" ❭ 🔴\n"+msg);
if(server[user[sender]].player[sender].job=="교주")
cultC(sender,sender+"❭ 🔶\n"+msg);
if((server[user[sender]].player[sender].job!="마피아"||server[user[sender]].player[sender].job!="교주")&&!server[user[sender]].player[sender].contact)
nightC(sender,sender+"❭ 🔵\n"+msg);
}

}
}
}

if(msg=="ㅁ도움말"){
re("제발 닉네임은 신중하게 하고 바꾸지 마세요.\n버그의 원인입니다.\nㅁ방목록\n - 방목록을 봅니다.\nㅁ방생성\n - 방을 생성합니다.\nㅁ참가 (방번호)\n - 해당 방에 참가합니다.\nㅁ나가기\n - 탈주합니다.\nㅁ참가자\n - 참가자 목록을 확인합니다.\nㅁ시작\n - 게임을 시작합니다.\nㅁ종료\n - 아마도 종료될겁니다?\n[게임중일때]\nㅁ투표 (번호)\n - (번호)를 투표합니다.\n능력사용은 오직 지목할 사람의 번호만 입력해 주세요.\n직업은 마피아, 스파이, 경찰, 의사, 기자, 군인, 시민 만 있습니다.");
}

var servs = Object.keys(server);

if(msg=="ㅁ방생성"){
if(servs.indexOf(sender)==-1&&user[sender]==undefined){
server[sender] = {
started: false,
player: {},
days: 0,
time: "낮",//낮,투표,밤
remain: -1,//남은 시간*10 초
target: -1,//마피아 총구
spyprobe: -1,//스파이 조사
heal: -1,//의사 치유
probe: -1,//경찰 조사
report: -1,//기자 취재
soldier: -1, //군인 방탄
cult: -1, //교주 포교
vote: {}
}
server[sender].player[sender] = {job: "시민", death: false, vote: -1, time: false, contact: false, cult: false}
user[sender] = room;
re("방 생성 완료");
} else { re("이미 방에 참가한 상태입니다.") }
}

if(msg=="ㅁ%gh1"){
for(var n = 0; n<4; n++){
server[sender].player["유령계정00"+(n+1)] = {job: "시민", death: false, vote: -1, time: false, contact: false, cult: false}
user["유령계정00"+(n+1)] = room;
}
re("유령계정 참여.");
}

if(msg=="ㅁ%gh2"){
for(var n = 4; n<8; n++){
server[sender].player["유령계정00"+(n+1)] = {job: "시민", death: false, vote: -1, time: false, contact: false, cult: false}
user["유령계정00"+(n+1)] = room;
}
re("유령계정 참여.");
}

if(msg=="ㅁ방목록"){
var servlist = [];
if(servs.length==0){
re("참가 가능한 방이 없습니다.");
} else {
function rch(str){
if(server[str].started) return " [게임중]";
if(!server[str].started) return "";
}
for(var i = 0; i<servs.length; i++){
var ty = Object.keys(server[servs[i]].player).length;
servlist.push("["+(Number(i)+1)+"] "+servs[i]+"님의 방 ("+ty+"/12) "+rch(servs[i]));
}
re(servlist.join("\n"));
}
}

if(b[0]=="ㅁ참가"){

var data = msg.substr(4);
if(data=="") re("어느 방에 참가할지 입력하세요.\n'ㅁ방목록' 으로 방을 찾거나\n'ㅁ방생성' 으로 방을 만드세요.");

else {
data = Number(data)-1;

if(servs.length==0){
re("참가 가능한 방이 없습니다.\n'ㅁ방생성' 으로 방을 만드세요.");
}

else {

if(data>=0&&data<servs.length){

var idk = Object.keys(server[servs[data]].player)
if(idk.length<12){

if(!server[servs[data]].started){

if(user[sender]==undefined){
server[servs[data]].player[sender] = {job: "시민", death: false, vote: -1, time: false, contact: false, cult: false}
user[sender] = servs[data];
alert(sender,sender+"님이 참가했습니다.");
re(servs[data]+"님의 방에 참가했습니다.");
} else re("이미 "+user[sender]+"님의 방에 참가했습니다.");

} else re("이미 시작한 방입니다.");

} else re("꽉 찬 방입니다.");

}
}
}
}

if(msg=="ㅁ참가자"){
if(user[sender]!=undefined){
var EASUCKS = [];
var QAQ = Object.keys(server[user[sender]].player);
for(var i = 0; i<QAQ.length; i++)
EASUCKS.push("["+(Number(i)+1)+"] "+QAQ[i]);
re(user[sender]+"님의 방 참가자\n"+EASUCKS.join("\n"));
} else re("어떠한 방에도 참가하지 않았습니다.");
}

if(msg=="ㅁ나가기"){
if(user[sender]==undefined){
re("참가한적이 없습니다.");
} else {
if(server[user[sender]].started){
re("게임중에는 나갈 수 없습니다.");
} else {
var bj = Object.keys(server[user[sender]].player);
if(bj[0]==sender){
alert(sender, sender+"님이 나갔습니다.\n방장이 나기서 방이 터졌습니다.");
for(var yyr in server[sender].player)
delete user[yyr];
delete server[sender];
re("방을 나갔습니다.\n당신이 방장이었던 방은 터졌습니다.");
} else {
alert(sender, sender+"님이 나갔습니다.");
delete server[user[sender]].player[sender];
delete user[sender];
re("방을 나갔습니다.");
}

}
}
}
/*ㅡㅡㅡ 시작 명령어와 게임중 ㅡㅡㅡ*/
var uuu = [];
var unn = [];
if(server[user[sender]]!=undefined)
unn = Object.keys(server[user[sender]].player);

if(msg=="ㅁ시작"){
if(server[user[sender]]!=undefined)
uuu = Object.keys(server[user[sender]].player);

if(uuu[0]!=sender){
re("방장이 아닙니다.");
} else {
if(uuu.length<5){
re("인원이 부족하여 시작할 수 없습니다.");
} else {
alert(sender,"게임이 시작됩니다.",true);
server[user[sender]].started = true;
server[user[sender]].time = "밤";
server[user[sender]].remain = 3;//30초간 밤
server[user[sender]].days = 1;
var EASUCKS = [];
var QAQ = Object.keys(server[user[sender]].player);
for(var i = 0; i<QAQ.length; i++)
EASUCKS.push("["+(Number(i)+1)+"] "+QAQ[i]);
EASUCKS = EASUCKS.join("\n");
alert(sender,"첫날밤입니다.",true);
//교주선택(9인 이상 아니면 없음)
var culter = false;
if(uuu.length>=9) culter = true;
if(culter){
var cultl = Math.floor(Math.random()*uuu.length);
server[user[sender]].player[uuu[cultl]].job = "교주";
server[user[sender]].player[uuu[cultl]].death = false;
server[user[sender]].player[uuu[cultl]].contact = false;
server[user[sender]].player[uuu[cultl]].cult = true;
reTo(uuu[cultl],"당신은 교주입니다.\n사람들을 포교하여 승리하세요.\n\n'(유저번호)' 로 포교할 사람을 선택하세요.\n\n"+EASUCKS);
uuu.splice(cultl,1);
}
//마피아선택
var maf = 2;
if(uuu.length<=8) maf = 1;
for(var mafia = 0; mafia<maf; mafia++){
var mafi = Math.floor(Math.random()*uuu.length);
server[user[sender]].player[uuu[mafi]].job = "마피아";
server[user[sender]].player[uuu[mafi]].death = false;
server[user[sender]].player[uuu[mafi]].contact = false;
server[user[sender]].player[uuu[mafi]].cult = false;
reTo(uuu[mafi],"당신은 마피아입니다.\n시민팀을 모두 처치하여 승리하세요.\n\n'(유저번호)' 로 처치할 사람을 선택하세요.\n\n"+EASUCKS);
uuu.splice(mafi,1);
}
//스파이선택
var spy = Math.floor(Math.random()*uuu.length);
server[user[sender]].player[uuu[spy]].job = "스파이";
server[user[sender]].player[uuu[spy]].death = false;
server[user[sender]].player[uuu[spy]].contact = false;
server[user[sender]].player[uuu[spy]].cult = false;
reTo(uuu[spy],"당신은 스파이입니다.\n마피아를 도와 모두 처치하여 승리하세요.\n\n'(유저번호)' 로 조사할 사람을 선택하세요.\n\n"+EASUCKS);
uuu.splice(spy,1);
//의사선택
var doc = Math.floor(Math.random()*uuu.length);
server[user[sender]].player[uuu[doc]].job = "의사";
server[user[sender]].player[uuu[doc]].death = false;
server[user[sender]].player[uuu[doc]].contact = false;
server[user[sender]].player[uuu[doc]].cult = false;
reTo(uuu[doc],"당신은 의사입니다.\n시민들을 살려 마피아를 저지하세요.\n\n'유저번호' 로 살릴 시민을 선택하세요.\n\n"+EASUCKS);
uuu.splice(doc,1);
//경찰선택
var poli = Math.floor(Math.random()*uuu.length);
server[user[sender]].player[uuu[poli]].job = "경찰";
server[user[sender]].player[uuu[poli]].death = false;
server[user[sender]].player[uuu[poli]].contact = false;
server[user[sender]].player[uuu[poli]].cult = false;
reTo(uuu[poli],"당신은 경찰입니다.\n마피아를 모두 찾아내세요.\n\n'(유저번호)' 로 조사할 사람을 선택하세요.\n\n"+EASUCKS);
uuu.splice(poli,1);
//나머지 시민...중에 직업 분배
var civilJ = [["기자","\n취재를 통해 진실을 밝히세요.\n첫날은 취재가 불가능합니다."],["군인","\n마피아로부터 시민을 지키세요.\n'(유저번호)' 로 지킬 사람을 선택하세요.\n군인은 한번 무적으로 다른사람 대신 맞을 수 있습니다."]];
for(var civil = 0; civil<uuu.length; civil++){
var cimin = Math.random()*2;
if(cimin<1){
if(civilJ.length>0){
var tukjik = Math.floor(Math.random()*civilJ.length);
server[user[sender]].player[uuu[civil]].job = civilJ[tukjik][0];
reTo(uuu[civil],"당신은 "+civilJ[tukjik][0]+"입니다."+civilJ[tukjik][1]+"\n\n"+EASUCKS);
civilJ.splice(tukjik,1);
} else {
server[user[sender]].player[uuu[civil]].job = "시민";
reTo(uuu[civil],"당신은 시민입니다.\n마피아를 잡아 승리하세요.\n\n"+EASUCKS);
}
}
if(cimin>=1){
server[user[sender]].player[uuu[civil]].job = "시민";
reTo(uuu[civil],"당신은 시민입니다.\n마피아를 잡아 승리하세요.\n\n"+EASUCKS);
}

server[user[sender]].player[uuu[civil]].death = false;
server[user[sender]].player[uuu[civil]].contact = false;
server[user[sender]].player[uuu[civil]].cult = false;
}

for(;;){
if(server[user[sender]].started){
//10초 카운팅
java.lang.Thread.sleep(10000);
if(!server[user[sender]].started) break;
server[user[sender]].remain--;

var ended = false;

var mafs = 0;
var civis = 0;
var cults = 0;
function update(){
for(var j in server[user[sender]].player){
if(server[user[sender]].player[j].job=="마피아"&& !server[user[sender]].player[j].death&& !server[user[sender]].player[j].cult)
mafs++;
if(server[user[sender]].player[j].contact&& !server[user[sender]].player[j].death&&
!server[user[sender]].player[j].cult)
mafs++;
if(server[user[sender]].player[j].job!="마피아"&& !server[user[sender]].player[j].death&& !server[user[sender]].player[j].cult)
civis++;
if(server[user[sender]].player[j].cult)
cults++;
}
}

var qhd = [];

function updateU(){
var uhd  = Object.keys(server[user[sender]].player);
for(var i = 0; i<uhd.length; i++){
var icon = "";
if(server[user[sender]].player[uhd[i]].death)
icon = "☠";
qhd.push("["+(Number(i)+1)+"] "+uhd[i]+icon);
}
qhd = qhd.join("\n");
}

if(server[user[sender]].remain==3){
if(server[user[sender]].time=="낮")
alert(sender, "투표까지 30초 남았습니다.",true);
}
if(server[user[sender]].remain==1){
if(server[user[sender]].time=="밤")
alert(sender, "밤이 끝날때까지 10초 남았습니다.",true);
if(server[user[sender]].time=="낮")
alert(sender, "투표까지 10초 남았습니다.",true);
if(server[user[sender]].time=="투표")
alert(sender, "투표가 끝날때까지 10초 남았습니다.",true);
if(server[user[sender]].time=="찬반")
alert(sender, "찬성/반대 결정이 10초 남았습니다.", true);
}

var chanban = false;
var scores = [];

if(server[user[sender]].remain<=0){
//낮으로 바꾸고 remain을 인원수에 맞게 조정
if(server[user[sender]].time=="밤"){
server[user[sender]].time = "낮";
var menleft = Object.keys(server[user[sender]].player).length;
server[user[sender]].remain = menleft+2;
alert(sender,server[user[sender]].days+"일째 낮이 되었습니다.",true);
//기자 특종
if(server[user[sender]].report!=-1){
if(server[user[sender]].report!=-2){
alert(sender,"📰[특종] "+unn[server[user[sender]].report]+"님은 "+server[user[sender]].player[unn[server[user[sender]].report]].job+"이라고 이라고 합니다!",true);
server[user[sender]].report = -2;
}
}
//마피아 총쏘기
if(server[user[sender]].target==-1){
alert(sender,"아무도 죽지 않았습니다.",true);
} else {
var killed = unn[server[user[sender]].target];
if(server[user[sender]].target!= server[user[sender]].heal&& server[user[sender]].target!= server[user[sender]].soldier)
{
if(server[user[sender]].player[killed].job=="군인"&&server[user[sender]].soldier==-2||server[user[sender]].player[killed].job!="군인"){
server[user[sender]].player[killed].death = true;
alert(killed,killed+"님이 마피아에 의해 죽었습니다.");
reTo(killed,"마피아에 의해 죽었습니다.");
}
else if(server[user[sender]].player[killed].job== "군인"&&server[user[sender]].soldier!=-2) {
alert(sender,killed+"님은 마피아의 공격을 버텨냈습니다.",true);
server[user[sender]].soldier = -2;
}
}
else if(server[user[sender]].target== server[user[sender]].heal){
alert(killed,killed+"님은 의사덕분에 죽지 않았습니다.",true);
}
else if(server[user[sender]].soldier== server[user[sender]].target){
alert(killed,killed+"님은 군인이 지켜주었습니다.",true);
server[user[sender]].soldier = -2;
}
}
//낮마다 초기화
server[user[sender]].target = -1;
server[user[sender]].spyprobe = -1;
server[user[sender]].heal = -1;
server[user[sender]].probe = -1;
server[user[sender]].cult = -1;
//승리조건
update();
if(mafs>=civis){
alert(sender,"마피아팀이 승리했습니다.",true);
ended = true;
}
else if(mafs==0){
alert(sender,"시민팀이 승리했습니다.",true);
ended = true;
}
else if(mafs==0&&cults>=civils){
alert(sender,"교주팀이 승리했습니다.",true);
ended = true;
}
}
//투표시간으로 바꾸고 투표시간 20초
else if(server[user[sender]].time=="낮"){
server[user[sender]].time = "투표";
server[user[sender]].remain = 3;
updateU();
alert(sender,"투표시간입니다.\n투표시간은 30초입니다.\n\n투표는 'ㅁ투표 (번호)' 로 투표합니다.\n\n"+qhd,true);
}
//투표시간을 찬반시간으로 바꾸고 20초, 
else if(server[user[sender]].time=="투표"){
scores = [];
var mutu = true;
for(var key in server[user[sender]].vote){
scores.push([key,server[user[sender]].vote[key]]);
}
scores.sort(function (a,b){ return b[1]-a[1]});
if(scores.length>1){
if(scores[0][1]>scores[1][1]){
mutu = false;
}
}
else if(scores.length==1){
mutu = false;
}

if(!mutu){
server[user[sender]].time = "찬반";
server[user[sender]].remain = 2;
}
if(mutu){
server[user[sender]].days++;
server[user[sender]].time = "밤";
server[user[sender]].remain = 3;
server[user[sender]].vote = {};
alert(sender, "투표로 아무도 죽지 않았습니다.");
updateU();
for(var uys in server[user[sender]].player){
if(!server[user[sender]].player[uys].death){
var outp = "\n";
if(server[user[sender]].player[uys].job=="마피아")
outp += "'(유저번호)' 로 처치할 사람을 선택하세요.";
if(server[user[sender]].player[uys].job=="스파이")
outp += "'(유저번호)' 로 조사할 사람을 선택하세요.";
if(server[user[sender]].player[uys].job=="의사")
outp += "'(유저번호)' 로 치료할 사람을 선택하세요.";
if(server[user[sender]].player[uys].job=="경찰")
outp += "'(유저번호)' 로 조사할 사람을 선택하세요.";
if(server[user[sender]].player[uys].job=="기자")
outp += "'(유저번호)' 로 취재할 사람을 선택하세요.";
if(server[user[sender]].player[uys].job=="군인")
outp += "'(유저번호)' 로 지킬 사람을 선택하세요.";
if(server[user[sender]].player[uys].job=="시민")
outp = "";
if(server[user[sender]].player[uys].job=="교주"&& server[user[sender]].days%2==1)
outp += "'(유저번호)' 로 포교할 사람을 선택하세요.";
if(server[user[sender]].player[uys].job=="교주"&& server[user[sender]].days%2==0)
outp += "다음날 포교할 수 있습니다.";
reTo(uys,server[user[sender]].days+"일째 밤이 되었습니다."+outp+"\n\n"+qhd);
} else reTo(uys,server[user[sender]].days+"일째 밤입니다.\n\n"+qhd);
server[user[sender]].player[uys].vote = -1;
server[user[sender]].player[uys].time = false;
}

}

//승리조건 버닝썬 승리아님 수고
update();
if(mafs>=civis){
alert(sender,"마피아팀이 승리했습니다.",true);
ended = true;
}
else if(mafs==0){
alert(sender,"시민팀이 승리했습니다.",true);
ended = true;
}
else if(mafs==0&&cults>=civils){
alert(sender,"교주팀이 승리했습니다.",true);
ended = true;
}
//무투나지 않고 승리가 없으면
if(!mutu&&!ended){
chanban = true;
}

for(var ky in server[user[sender]].player)
server[user[sender]].player[ky].vote = -1;
if(chanban){
server[user[sender]].vote = {찬: 0, 반: 0}
alert(sender, "["+scores[0][0]+"]\n 찬성 / 반대", true);
server[user[sender]].mpx = scores[0][0];
}
}

//찬반시간이 끝나고 밤으로
else if(server[user[sender]].time=="찬반"){
server[user[sender]].time = "밤";
server[user[sender]].remain = 3;
if(server[user[sender]].vote.찬>server[user[sender]].vote.반){
var sco = server[user[sender]].mpx;
server[user[sender]].player[sco].death = true;
reTo(sco,"투표로 인해 사망하였습니다.");
alert(sco,sco+"님이 투표에 의해 죽었습니다.");
}
//승리조건
update();
if(mafs>=civis&&cults!=0){
alert(sender,"마피아팀이 승리했습니다.",true);
ended = true;
}
else if(cults==0&&mafs==0){
alert(sender,"시민팀이 승리했습니다.",true);
ended = true;
}
else if(mafs==0&&cults>=civils){
alert(sender,"교주팀이 승리했습니다.",true);
ended = true;
}
//아무도 승리가 아닐때
if(!ended){
server[user[sender]].days++;
server[user[sender]].time = "밤";
server[user[sender]].remain = 3;
server[user[sender]].vote = {}
updateU();
for(var uys in server[user[sender]].player){
if(!server[user[sender]].player[uys].death){
var outp = "";
if(server[user[sender]].player[uys].job=="마피아")
outp += "'(유저번호)' 로 처치할 사람을 선택하세요.";
if(server[user[sender]].player[uys].job=="스파이")
outp += "'(유저번호)' 로 조사할 사람을 선택하세요.";
if(server[user[sender]].player[uys].job=="의사")
outp += "'(유저번호)' 로 치료할 사람을 선택하세요.";
if(server[user[sender]].player[uys].job=="경찰")
outp += "'(유저번호)' 로 조사할 사람을 선택하세요.";
if(server[user[sender]].player[uys].job=="기자")
outp += "'(유저번호)' 로 취재할 사람을 선택하세요.";
if(server[user[sender]].player[uys].job=="군인")
outp += "'(유저번호)' 로 지킬 사람을 선택하세요.";
if(server[user[sender]].player[uys].job=="교주"&& server[user[sender]].days%2==1)
outp += "'(유저번호)' 로 포교할 사람을 선택하세요.";
if(server[user[sender]].player[uys].job=="교주"&& server[user[sender]].days%2==0)
outp += "다음날 포교할 수 있습니다.";
if(server[user[sender]].player[uys].job=="시민")
outp = "";
reTo(uys,server[user[sender]].days+"일째 밤이 되었습니다."+outp+"\n\n"+qhd);
} else reTo(uys,server[user[sender]].days+"일째 밤입니다.\n\n"+qhd);
server[user[sender]].player[uys].vote = -1;
server[user[sender]].player[uys].time = false;
}
}

}
//끝나고 초기화
if(ended){
var jobss = [];
for(var ghh in server[user[sender]].player)
jobss.push(" • "+ghh+"님 ("+server[user[sender]].player[ghh].job+")");
alert(sender,"직업 공개\n"+jobss.join("\n"),true)
var players = server[user[sender]].player;
server[user[sender]].started = false;
server[user[sender]] = {
started: false,
player: players,
days: 0,
time: "낮",
remain: -1,
target: -1,
spyprobe: -1,
heal: -1,
probe: -1,
report: -1,
soldier: -1,
cult: -1,
vote: {}
}
break;
}

}}//for공간

}
}
}
}//시작 명령어 끝

var nums = Number(msg)-1;

if(user[sender]!=undefined){
if(server[user[sender]].started&& !server[user[sender]].player[sender].death){

if(server[user[sender]].time=="밤"&&!isNaN(nums)){
//마피아 처형
if(server[user[sender]].player[sender].job=="마피아"&&nums>=0&&nums<unn.length){
if(!server[user[sender]].player[unn[nums]].death){
for(var maff in server[user[sender]].player){
server[user[sender]].target = nums;
if(server[user[sender]].player[maff].job=="마피아"&& sender!=maff)
reTo(maff,sender+"님이 "+unn[nums]+"님을 지목했습니다.");
}
re(unn[nums]+"님을 처형합니다.");
} else re("이미 죽은사람입니다.");
}
//스파이 조사
if(server[user[sender]].player[sender].job=="스파이"&&nums>=0&&nums<unn.length){
if(server[user[sender]].spyprobe==-1){
if(!server[user[sender]].player[unn[nums]].death){
server[user[sender]].spyprobe = nums;
re(unn[nums]+"님을 조사했습니다.");
if(server[user[sender]].player[unn[nums]].job=="마피아"){
server[user[sender]].player[sender].contact = true;
server[user[sender]].spyprobe = nums;
re("마피아와 접선했습니다.");
for(var maff in server[user[sender]].player){
if(server[user[sender]].player[maff].job=="마피아"&& sender!=maff)
reTo(maff,sender+"님이 접선하였습니다.");
}
} else {
re(unn[nums]+"님은 "+server[user[sender]].player[unn[nums]].job+"입니다.");
if(server[user[sender]].player[unn[nums]].job=="군인")
reTo(unn[nums],"스파이("+sender+")가 당신을 조사했습니다.");
}
} else re("이미 죽은사람입니다.");
} else re("이미 조사하였습니다.");
}
//의사 치료
if(server[user[sender]].player[sender].job=="의사"&&nums>=0&&nums<unn.length){
if(!server[user[sender]].player[unn[nums]].death){
server[user[sender]].heal = nums;
re(unn[nums]+"님을 치료합니다.");
} else re("이미 죽은사람입니다.");
}
//경찰 조사
if(server[user[sender]].player[sender].job=="경찰"&&nums>=0&&nums<unn.length){
if(server[user[sender]].probe==-1){
if(!server[user[sender]].player[unn[nums]].death){
server[user[sender]].probe = nums;
re(unn[nums]+"님을 조사했습니다.");
if(server[user[sender]].player[unn[nums]].job=="마피아")
re(unn[nums]+"님은 마피아입니다!");
else re(unn[nums]+"님은 마피아가 아닙니다.");
} else re("이미 죽은사람입니다.");
} else re("이미 조사하였습니다.");
}
//기자 취재
if(server[user[sender]].player[sender].job=="기자"&&nums>=0&&nums<unn.length){
if(!server[user[sender]].player[unn[nums]].death){
if(server[user[sender]].days!=1){
if(server[user[sender]].report>=-1){
server[user[sender]].report = nums;
re(unn[nums]+"님을 취재합니다.");
}
else if(server[user[sender]].report==-2){
re("이미 취재했습니다.");
}
} else re("첫날밤에는 취재가 불가능합니다.");
} else re("이미 죽은사람입니다.");
}
//군인 방탄
if(server[user[sender]].player[sender].job=="군인"&&nums>=0&&nums<unn.length){
if(!server[user[sender]].player[unn[nums]].death){
if(server[user[sender]].soldier!=-2){
server[user[sender]].soldier = nums;
re(unn[nums]+"님을 지킵니다.");
} else re("더이상 지킬 수 없습니다.");
} else re("이미 죽은사람입니다.");
}
//교주 포교
if(server[user[sender]].player[sender].job=="교주"&&nums>=0&&nums<unn.length){
if(!server[user[sender]].player[unn[nums]].death){
if(server[user[sender]].days%2==1){
if(server[user[sender]].cult>=-1){
if(server[user[sender]].player[unn[nums]].job=="마피아"){
server[user[sender]].cult = nums;
re("포교에 실패했습니다.\n"+unn[nums]+"님은 마피아입니다.");
} else {
server[user[sender]].player[unn[nums]].cult = true;
server[user[sender]].cult = nums;
re(unn[nums]+"님을 포교했습니다.");
reTo(unn[nums],"교주("+sender+")가 당신을 포교했습니다.\n교주를 도와 승리하세요.");
alert(sender,"교주의 종소리가 울려퍼졌습니다.");
}
}
else if(server[user[sender]].player[unn[nums]].cult)
re("이미 포교한 사람입니다.");
else if(server[user[sender]].cult!=-1)
re("지금은 포교를 할 수 없습니다.");
} else re("짝수날에는 포교가 불가능합니다.");
} else re("이미 죽은사람입니다.");
}

}

if(server[user[sender]].time=="낮"){
if(msg=="ㅁ단축"||msg=="ㅁ시단"||msg=="ㅁ시간단축"){
if(!server[user[sender]].player[sender].time){
alert(sender,sender+"님이 시간단축을 했습니다.",true);
server[user[sender]].player[sender].time = true;
server[user[sender]].remain--;
} else re("더이상 단축시킬 수 없습니다.");
}
if(msg=="ㅁ증가"||msg=="ㅁ시증"||msg=="ㅁ시간증가"){
if(!server[user[sender]].player[sender].time){
alert(sender,sender+"님이 시간증가를 했습니다.",true);
server[user[sender]].player[sender].time = true;
server[user[sender]].remain++;
} else re("더이상 증가시킬 수 없습니다.");
}
}

if(server[user[sender]].time=="투표"){
var votee = Number(msg.substr(4))-1;
if(b[0]=="ㅁ투표"){
if(server[user[sender]].player[sender].vote==-1&&votee>=0&&votee<unn.length){
if(!server[user[sender]].player[unn[votee]].death){
alert(sender,unn[votee]+" 한 표!",true);
server[user[sender]].player[sender].vote = votee;
if(server[user[sender]].vote[unn[votee]]==undefined)
server[user[sender]].vote[unn[votee]] = 0;
server[user[sender]].vote[unn[votee]]++;
} else re("이미 죽은사람입니다.");
} else re("이미 투표했거나 범위 밖입니다.");
}
}

if(server[user[sender]].time=="찬반"){
if(msg=="찬성"){
if(server[user[sender]].player[sender].vote!=-1) re("이미 결정했습니다.");
else {
server[user[sender]].player[sender].vote = -2;
server[user[sender]].vote.찬++;
re("찬성했습니다.");
}
}
if(msg=="반대"){
if(server[user[sender]].player[sender].vote!=-1) re("이미 결정했습니다.");
else {
server[user[sender]].player[sender].vote = -2;
server[user[sender]].vote.반++;
re("반대했습니다.");
}
}
}

if(msg=="ㅁ종료"){
if(unn[0]!=sender) re("방장이 아닙니다.");
else {
var players = server[user[sender]].player;
server[user[sender]].started = false;
server[user[sender]] = {
started: false,
player: players,
days: 0,
time: "낮",
remain: -1,
target: -1,
heal: -1,
probe: -1,
vote: {}
}
alert(sender,"방장이 게임을 중단했습니다.");
re("종료됨");
}
}

}
}

if(msg=="ㅁ%dump"){
re("server = "+JSON.stringify(server));
re("user = "+JSON.stringify(user));
re("uuu = "+uuu);
re("unn = "+unn);
}

if(msg=="ㅁ%경찰"){
server[user[sender]].player[sender].job = "경찰";
re("경찰으로 변경");
}
if(msg=="ㅁ%마피아"){
server[user[sender]].player[sender].job = "마피아";
re("마피아로 변경");
}
if(msg=="ㅁ%스파이"){
server[user[sender]].player[sender].job = "스파이";
re("스파이로 변경");
}
if(msg=="ㅁ%의사"){
server[user[sender]].player[sender].job = "의사";
re("의사로 변경");
}
if(msg=="ㅁ%기자"){
server[user[sender]].player[sender].job = "기자";
re("기자로 변경");
}
if(msg=="ㅁ%교주"){
server[user[sender]].player[sender].job = "교주";
re("교주로 변경");
}
if(msg=="ㅁ%시민"){
server[user[sender]].player[sender].job = "시민";
re("시민으로 변경");
}
if(msg=="ㅁ%사망"){
server[user[sender]].player[sender].death = true;
re("사망함.");
}
if(msg=="ㅁ%부활"){
server[user[sender]].player[sender].death = false;
re("부활함");
}

/*ㅡㅡㅡ ㅡㅡㅡ ㅡㅡㅡ ㅡㅡㅡ ㅡㅡㅡ*/

}//isGroupChat

} catch(e) {
reTo("영훈들","마피아게임 에러"+viewAll+"\n"+e.lineNumber+"\n"+e+"\n\n"+sender+"\n"+msg);
}

}//response