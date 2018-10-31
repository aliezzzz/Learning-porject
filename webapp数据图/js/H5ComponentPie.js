/* 折线图对象*/

var H5ComponentPie = function ( name, cfg ){
	var component = new H5ComponentBase( name, cfg);
	var w = cfg.width;
	var h = cfg.height;

	//加入一个画布
	var cns = document.createElement('canvas');
	var ctx = cns.getContext('2d');
	cns.width = ctx.width = w;
	cns.height = ctx.height = h;
	component.append(cns);

	var r = w/2;

	// 加入一个底图层
	ctx.beginPath();
	ctx.fillStyle = '#eee';
	ctx.strokeStyle = '#eee';
	ctx.lineWidth = 1;
	ctx.arc(r,r,r,0,2*Math.PI);
	ctx.fill();
	ctx.stroke();

	// 绘制数据层
	var cns = document.createElement('canvas');
	var ctx = cns.getContext('2d');
	cns.width = ctx.width = w;
	cns.height = ctx.height = h;
	component.append(cns);

	var colors = ['#F69689','#93EBC1','#95BEE9','#D9A0DF','#D4ABB5'];
	var sAngel = 1.5 * Math.PI; // 设置开始的角度为 12点
	var eAngel = 0; //结束角度
	var aAngel = Math.PI*2; // 100%圆圈结束的角度

	var step = cfg.data.length;
	ctx.strokeStyle = '#eee';
	// 绘制
	var draw = function( per ){
		if(per >= 1){
			component.find('.text').css('opacity',1);
		}
		if(per < 1){
			component.find('.text').css('opacity',0);
		}
		ctx.clearRect(0,0,w,h);
		sAngel = 1.5 * Math.PI;
		for(var i=0;i<step;i++){
			var item = cfg.data[i];
			eAngel = sAngel + aAngel*item[1]*per;
			ctx.beginPath();
			ctx.fillStyle = colors[i];
			ctx.lineWidth = 1;
			ctx.moveTo(r,r);
			ctx.arc(r,r,r,sAngel,eAngel);
			ctx.fill();
			ctx.stroke();
			sAngel = eAngel;
		}
	}
	// 文本
	var sAngel = 1.5 * Math.PI;
	for (var i=0;i<step;i++){
		eAngel = sAngel + aAngel*cfg.data[i][1];
		midAngel = (eAngel + sAngel)/2;
		var text = $('<div class="text">');
		text.text(cfg.data[i][0]);
		var per = $('<div class="per">');
		per.text(cfg.data[i][1]*100 +'%');
		text.append(per);
		var x = r + Math.cos(midAngel) * r;
		var y = r + Math.sin(midAngel) * r;
		text.css('color',colors[i]);
		text.css('top',y/1.7-33);
		if(x<w/2){
			text.css('left',x/1.7 - 40);
		}else{
			text.css('left',x/1.9);
		}
		text.css('opacity',0);
		component.append(text);
		sAngel = eAngel;
	}
	//动画 
	component.on('onLoad',function(){
		var s = 0;
		for(i=0;i<100;i++){
			setTimeout(function(){
				s+=0.01;
				draw(s);
			},i*10+200);
		}
	});
	component.on('onLeave',function(){
		var s = 1;
		for(i=0;i<100;i++){
			setTimeout(function(){
				s-=0.01;
				draw(s);
			},i*10);
		}
	});

	return component;
}