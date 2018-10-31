/* 折线图对象*/

var H5ComponentRing = function ( name, cfg ){
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

	//背景层
	ctx.beginPath();
	ctx.strokeStyle = '#fff';
	ctx.arc(r,r,r,0,2*Math.PI);
	ctx.fillStyle = '#eee';
	ctx.fill();

	ctx.beginPath();
	ctx.arc(r,r,r-45,0,2*Math.PI);
	ctx.fillStyle = '#fff';
	ctx.fill();
	ctx.stroke();

	// 绘制数据层
	var cns = document.createElement('canvas');
	var ctx = cns.getContext('2d');
	cns.width = ctx.width = w;
	cns.height = ctx.height = h;
	component.append(cns);

	//文本 
	var text = $('<div class="text">');
	text.text(cfg.data[0][0]); 
	var per = $('<div class="per">');
	per.text(cfg.data[0][1]*100 +'%');
	text.append(per);
	text.css('left',r/2-10).css('top',r/2-15).css('opacity',0);
	var color = cfg.data[0][2] ? cfg.data[0][2] : '#ff7676';
	text.css('color',color);
	component.append(text);


	var sAngel = 1.5 * Math.PI; // 设置开始的角度为 12点
	var eAngel = 0; //结束角度
	var aAngel = Math.PI*2; // 100%圆圈结束的角度
	var draw = function( per ){
		if(per >= 1){
			component.find('.text').css('opacity',1);
		}
		if(per < 1){
			component.find('.text').css('opacity',0);
		}
		ctx.clearRect(0,0,w,h);
		eAngel = sAngel + aAngel*cfg.data[0][1]*per;
		ctx.beginPath();
		ctx.strokeStyle = '#fff';
		ctx.moveTo(r,r);
		ctx.arc(r,r,r,sAngel,eAngel);
		ctx.fillStyle = cfg.data[0][2] ? cfg.data[0][2] : '#ff7676';
		ctx.fill();
		ctx.stroke();

		ctx.beginPath();
		ctx.moveTo(r,r);
		ctx.arc(r,r,r-45,0,2*Math.PI);
		ctx.fillStyle = '#fff';
		ctx.fill();
		ctx.stroke();
	}

	//动画 
	component.on('onLoad',function(){
		var s = 0;
		for(i=0;i<100;i++){
			setTimeout(function(){
				s+=0.01;
				draw(s);
			},i*10+300);
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