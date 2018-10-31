/*柱状图对象*/

var H5ComponentBar_v = function ( name, cfg ){
	var component = new H5ComponentBase( name, cfg);

	$.each(cfg.data, function(idx,item){
		var line = $('<div class="line">');
		var name =  $('<div class="name">');
		var rate =  $('<div class="rate">');
		var bg = $('<div class="bg"></div>');
		var per =  $('<div class="per">');

		var height = item[1]*100;
		
		if (item[2]){
			bg.css('background-color',item[2]);
		}
		rate.css('height',height*2 +'%');
		name.text(item[0]);
		per.text(height+'%');

		rate.append(bg).append(per);
		line.append(name).append(rate);
		component.append(line);

	});
	// 页面载入 散点图动画加载 事件
	// component.on('onLoad',function(){
	// 	if(points.length){
	// 		setTimeout(function(){
	// 			for(var i=0;i<points.length;i++){
	// 				points[i].animate({left:points[i].left,top:points[i].top,opacity:1})
	// 			}
	// 		},350);
	// 	}
	// 	return false;
	// });
	// // 页面离开 散点图动画消失 事件
	// component.on('onLeave',function(){
	// 	if(points.length){
	// 		setTimeout(function(){
	// 			for(var i=0;i<points.length;i++){
	// 				points[i].animate({left:points[i].centerPos,top:points[i].centerPos,opacity:0})
	// 			}
	// 		});
	// 	}
	// 	return false;
	// });

	return component;
}