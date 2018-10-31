var tabs = document.getElementById("tabs").getElementsByTagName("li");
for(var i =0;i<tabs.length;i++){
	tabs[i].onclick = showlist;
}
function showlist() {
	for(var i = 0;i<tabs.length;i++){
		tabs[i].className = "";
	}
	this.className = "active";
}
window.onscroll = function() {
	var scrollTop = document.documentElement.scrollTop;
	if (scrollTop >= 260 ){
		document.getElementById("nav").className = "seckill_nav seckill_navfixed";
	}else{
		document.getElementById("nav").className = "seckill_nav";
	}
}