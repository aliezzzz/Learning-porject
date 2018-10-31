var staticId;
var d_cango = [[2,4],[1,3,5],[2,6],[1,5,7],[2,4,6,8],[3,5,9],[4,8],[5,7,9],[6,8]];
function init () {
	var idarr = [1,2,3,4,5,6,7,8,9];
	var imgarr = [1,2,3,4,5,6,7,8,9];
	idarr.sort(function(){ return 0.5 - Math.random() });
	do{
		imgarr.sort(function(){ return 0.5 - Math.random() });
	}while(imgarr[8]==5);
	staticId = "d" + idarr.pop();
	var game = document.getElementById("game");
	for(var i=0;i<8;i++){
		var img = document.createElement("img");
		var imgId = "d" + idarr[i];
		var imgSrc = "images/" + imgarr[i] + ".png";
		img.setAttribute("id",imgId);
		img.setAttribute("src",imgSrc);
		game.appendChild(img);
	}
}
function move() {
	var game = document.getElementById("game");
	var imgs = game.getElementsByTagName("img");
	for (var i=0;i<imgs.length;i++){
		imgs[i].onclick = function() {
			var id = parseInt(this.id.substring(1));
			var tempId = parseInt(staticId.substring(1));
			var flag = false;
			for (var i=0;i<d_cango[id-1].length;i++){
				if(tempId == d_cango[id-1][i]){
					flag = true;
					break;
				}
			}
			if (flag) {
				console.log(staticId);
				staticId = this.id;
				this.id = "d" + tempId;
			}else{
				return false;
			}
		}
	}
}
function addLoadEvent(func) {
	var oldonload = window.onload;
	if (typeof window.onload != 'function') {
		window.onload = func;
	}else{
		window.onload = function() {
			oldonload();
			func();
		};
	}
}
addLoadEvent(init);
addLoadEvent(move);