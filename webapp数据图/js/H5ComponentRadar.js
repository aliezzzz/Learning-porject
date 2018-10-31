/* 折线图对象*/

var H5ComponentRadar = function ( name, cfg ){
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
	var step = cfg.data.length;

	// 绘制网格背景  背景层
	var isBlue = true;
	for(var s=10; s>0; s--){
		ctx.beginPath();
		for (var i=0;i<step;i++){
			var rad = (i+0.5)/step*2*Math.PI;
			var x = r + Math.sin(rad) * r * (s/10);
			var y = r + Math.cos(rad) * r * (s/10);
			ctx.lineTo(x,y);
		}
		ctx.closePath();
		ctx.fillStyle = isBlue ? '#99c0ff':'#f1f9ff';
		isBlue = ! isBlue;
		ctx.fill();
	}
	// 绘制伞骨
	for(var i=0;i<step;i++){
		var rad = (i+0.5)/step*2*Math.PI;
		var x = r + Math.sin(rad) * r;
		var y = r + Math.cos(rad) * r;
		ctx.strokeStyle = '#e0e0e0';
		ctx.moveTo(r,r);
		ctx.lineTo(x,y);
		// 项目文字
		var text = $('<div class="text">');
		text.text(cfg.data[i][0]);
		if (x > w/2 ){
			text.css('left',x/2 );
		}else{
			text.css('right',(w-x)/2 +5);
		}
		if (y > h/2 ){
			text.css('top',y/2 +5);
		}else{
			text.css('bottom',(h-y)/2 + 5);
		}
		text.css('opacity',0);
		component.append(text);
	}
	ctx.stroke();

	//数据层
	//加入一个画布
	var cns = document.createElement('canvas');
	var ctx = cns.getContext('2d');
	cns.width = ctx.width = w;
	cns.height = ctx.height = h;
	component.append(cns);
	// 绘制
	var draw = function( per ){
		if(per >= 1){
			component.find('.text').css('opacity',1);
		}
		if(per < 1){
			component.find('.text').css('opacity',0);
		}

		ctx.clearRect(0,0,w,h);
		// ctx.beginPath();
		for (var i=0;i<step;i++){
			var rate = cfg.data[i][1];
			var rad = (i+0.5)/step*2*Math.PI;
			var x = r + Math.sin(rad) * r * rate*2 *per;
			var y = r + Math.cos(rad) * r * rate*2 *per;
			ctx.lineTo(x,y);
		}
		ctx.closePath();
		ctx.strokeStyle = '#ff7676';
		ctx.fillStyle ='rgba(255,136,120,0.2)';
		ctx.fill();
		ctx.stroke();
		//输出数据点
		ctx.fillStyle = '#ff7676';
		for(var i=0;i<step;i++){
			var rate = cfg.data[i][1];
			var rad = (i+0.5)/step*2*Math.PI;
			var x = r + Math.sin(rad) * r * rate*2 *per;
			var y = r + Math.cos(rad) * r * rate*2 *per;
			ctx.beginPath();
			ctx.arc( x, y,3,0,2*Math.PI);
			ctx.fill();
			ctx.stroke();
		}
	}
	draw(1);
	//动画 
	component.on('onLoad',function(){
		var s = 0;
		for(i=0;i<100;i++){
			setTimeout(function(){
				s+=0.01;
				draw(s);
			},i*10+500);
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