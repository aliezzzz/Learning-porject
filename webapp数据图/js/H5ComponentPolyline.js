/* 折线图对象*/

var H5ComponentPolyline = function ( name, cfg ){
	var component = new H5ComponentBase( name, cfg);


	//绘制网格线
	var w = cfg.width;
	var h = cfg.height;
	//加入一个画布（网格线背景）背景层
	var cns = document.createElement('canvas');
	var ctx = cns.getContext('2d');
	cns.width = ctx.width = w;
	cns.height = ctx.height = h;
	component.append(cns);
	// 水平网格线
	var step = 10;
	ctx.beginPath();
	ctx.lineWidth = 1;
	ctx.strokeStyle = '#aaa';
	window.ctx = ctx;
	for(var i=0;i<step+1;i++){
		var y = (h/step) *i;
		ctx.moveTo(0,y);
		ctx.lineTo(w,y);
	}
	//垂直网格线 (根据项目的个数去分)
	step = cfg.data.length+1;
	var text_w = w/step;
	for(var i=0;i<step+1;i++){
		var x =(w/step)*i;
		ctx.moveTo(x,0);
		ctx.lineTo(x,h);

		if(cfg.data[i]){
			var text = $('<div class="text">');
			text.text( cfg.data[i][0] );
			text.css('width',text_w).css('left',x/2);
			component.append(text);
		}
	}
	ctx.stroke();
	
	//加入画布 数据层
	var cns = document.createElement('canvas');
	var ctx = cns.getContext('2d');
	cns.width = ctx.width = w;
	cns.height = ctx.height = h;
	component.append(cns);

	/**绘制折线图 和数据
	 * 传入per
	 * component元素
	 */ 
	var draw = function( per ){
		ctx.clearRect(0,0,w,h);
		//绘制折线数据
		ctx.beginPath();
		ctx.lineWidth = 3;
		ctx.strokeStyle = '#FF8878';

		var x = 0;
		var y = 0;
		var row_w = w/(cfg.data.length+1);
		//画点 数据
		for (i in cfg.data) {
			var item = cfg.data[i];
			x = row_w * i + row_w;
			y = h*(1-item[1]*per);
			ctx.moveTo(x,y);
			ctx.arc(x,y,5,0,2*Math.PI);
			ctx.fillStyle = item[2] ? item[2] :'#595959';
			ctx.font ='16px Gergrgia';
			ctx.fillText((item[1]*100>>0)+'%',x-10,y-20);
		}
		//连线
		ctx.moveTo(row_w,h*(1-cfg.data[0][1]*per));
		for (i in cfg.data){
			var item = cfg.data[i];
			x = row_w * i + row_w;
			y = h*(1-item[1]*per);
			ctx.lineTo(x,y);
		}
		ctx.stroke();
		ctx.lineWidth = 1;
		ctx.strokeStyle ='rgba(255,255,255,0)';
		// 绘制阴影
		ctx.lineTo(x,h);
		ctx.lineTo(row_w,h);
		ctx.fillStyle ='rgba(255,136,120,0.2)';
		ctx.fill();
	}
	
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

	ctx.stroke();
	return component;
}