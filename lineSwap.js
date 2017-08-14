window.onload = function(){
var editor = function(){
	var selLineBgn = 0,//index:selected line begin
		selLineEnd = 0,//index:selected line end
		caretBgn = 0,//index:selected strings begin
		caretEnd = 0,//index:selected strings end
		selLine = '',//string of selected line
		txtTag = '';//DOM:textarea
}
//selected line insert into after following line
editor.downTxt = function(){
	var insPoint = this.txt.indexOf('\n',this.selLineEnd+1);
	insPoint = insPoint < 0 ?this.txt.length:insPoint+1;
	var startTxt = this.txt.substring(0,this.selLineBgn);
	var targetLine = this.txt.substring(this.selLineEnd,insPoint);
	var endTxt = this.txt.slice(insPoint);
	//keep line break
	targetLine = targetLine.search(/\n$/) == -1?targetLine + '\n':targetLine;
	//keep selected strings
	this.caretBgn = this.caretBgn + targetLine.length;
	this.caretEnd = this.caretEnd + targetLine.length;
	this.txtTag.value = startTxt + targetLine + this.selLine + endTxt;
	this.txtTag.selectionStart = this.caretBgn;
	this.txtTag.selectionEnd = this.caretEnd;
}
//selected line insert into before leading line
editor.upTxt = function () {
	var insPoint = this.txt.lastIndexOf('\n',this.selLineBgn-2);
	insPoint = insPoint < 0 ?0:insPoint+1;
	var startTxt = this.txt.substring(0,insPoint);
	var targetLine = this.txt.substring(insPoint,this.selLineBgn);
	var endTxt = this.txt.slice(this.selLineEnd);
	this.selLine = this.selLine.search(/\n$/) == -1?this.selLine + '\n':this.selLine;
	this.caretBgn = this.caretBgn - targetLine.length;
	this.caretEnd = this.caretEnd - targetLine.length;
	this.txtTag.value = startTxt + this.selLine + targetLine + endTxt;
	this.txtTag.selectionStart = this.caretBgn;
	this.txtTag.selectionEnd = this.caretEnd;
}
//get selected line&strings info
editor.getCurrent = function () {
	this.txtTag = document.getElementById('txt');
	this.txt = this.txtTag.value;
	this.caretBgn = this.txtTag.selectionStart;
	this.caretEnd = this.txtTag.selectionEnd;
	this.selLineBgn = this.txt.lastIndexOf('\n',this.caretBgn-1);
	this.selLineBgn = this.selLineBgn == -1?0:this.selLineBgn+1;
	this.selLineEnd = this.txt.indexOf('\n',this.caretEnd);
	this.selLineEnd = this.selLineEnd == -1 ? this.txt.length : this.selLineEnd+1;
	this.selLine = this.txt.slice(this.selLineBgn,this.selLineEnd);
}
editor.moveTxt = function (key) {
	if(key == 38){//up
		this.getCurrent();
		this.upTxt();
	}else if(key == 40){//down
		this.getCurrent();
		this.downTxt();
	}
}
document.getElementById('txt').onkeydown = function(e) {
	//if(e.altKey){
	if(e.ctrlKey){
		editor.moveTxt(e.keyCode);
	}
};
}
