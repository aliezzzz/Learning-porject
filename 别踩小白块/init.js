var clock = null;
var state = 0;
var speed = 4;

function createDiv(classname) {
	var div = document.createElement('div');
	div.className = classname;
	return div;
}

function createRow(){
	var con = $('con');
	var row = createDiv('row');
	var arr = createCell();

	con.appendChild(row);

	for (var i = 0; i < 4; i++){
		row.appendChild(createDiv(arr[i]));
	}

	if (con.firstChild == null){
		con.appendChild(row);
	}else{
		con.insertBefore(row, con.firstChild);
	}
}

function delRow(){
	var con = $('con');
	if (con.childNodes.length == 6){
		con.removeChild(con.lastChild);
	}
}

function createCell(){
	var temp = ['cell', 'cell', 'cell', 'cell'];
	var i = Math.floor(Math.random()*4);
	temp[i] = 'cell black';
	return temp;
}

function move(){
    var con = $('con');
    var top = parseInt(window.getComputedStyle(con, null)['top']);

    if(speed + top > 0){
        top = 0;
    }else{
        top += speed;
    }            
    con.style.top = top + 'px';

    if(top == 0){
        createRow();
        con.style.top = '-100px';
        delRow();
    }else if(top == (-100 + speed)){
        var rows = con.childNodes;
        if((rows.length == 5) && (rows[rows.length-1].pass !== 1) ){
            fail();
        }
    }
}

function fail(){
	clearInterval(clock);
	confirm("Your final score:" + parseInt($('score').innerHTML));
}

function judge(ev){
	if (ev.target.className.indexOf('black')!= -1){
		ev.target.className = 'cell';
		ev.target.parentNode.pass = 1;
		score();
	}
}
function $(id) {
	return document.getElementById(id);
}
function speedUp(){
	speed += 1;
	if (speed == 20){
		alert('you god damn it.');
	}
}
function score(){
	var newscore = parseInt($('score').innerHTML) + 1;
	$('score').innerHTML = newscore;
	if(newscore % 10 == 0){
		speedUp();
	}
}
function init(){
	for(var i=0; i<4;i++){
		createRow();
	}
	$('main').onclick = function(ev){
		judge(ev);
	}
	clock = window.setInterval('move()', 30);
}
init();
