/*基本散点图标对象*/

var H5ComponentPoint = function ( name, cfg ){
	var component = new H5ComponentBase( name, cfg);
	var base = cfg.data[0][1];
	var points = [];

	// 输出每一个 Point
	$.each(cfg.data, function(idx,item){
		var point = $('<div class="point point_'+idx+'">');

		//item[0]文本设置
		var name = $('<div class="name">'+item[0]+'</div>');
		var rate = $('<div class="rate">'+(item[1]*100)+'%</div>');
		name.append(rate);
		point.append(name);

		//item[1]大小设置
		var per = item[1]/base*100 + '%';
		point.width(per).height(per);

		// item[2]颜色设置
		if(item[2]){
			point.css('background-color',item[2]);
		}
		// item[3]位置设置
		if(idx==0){
			point.css('z-index',10);
		}
		if(item[3]!=undefined &&item[4]!=undefined){
			point.centerPos = '40%';
			point.css('left',point.centerPos).css('top',point.centerPos).css('opacity',1);
			point.left = item[3];
			point.top = item[4];
			points.push(point);
		}

		component.append(point);
	});

	// 页面载入 散点图动画加载 事件
	component.on('onLoad',function(){
		if(points.length){
			setTimeout(function(){
				for(var i=0;i<points.length;i++){
					points[i].animate({left:points[i].left,top:points[i].top,opacity:1})
				}
			},350);
		}
		return false;
	});
	// 页面离开 散点图动画消失 事件
	component.on('onLeave',function(){
		if(points.length){
			setTimeout(function(){
				for(var i=0;i<points.length;i++){
					points[i].animate({left:points[i].centerPos,top:points[i].centerPos,opacity:0})
				}
			});
		}
		return false;
	});

	return component;
}