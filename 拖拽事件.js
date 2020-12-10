//创建参数
var startX = 0,
	startY = 0,
	endX = 0,
	endY = 0;
var content = document.getElementsByClassName("content")[0];
var tzbtn = new Object();
//调用方法
var pic1 =document.getElementsByClassName("formPic1")[0];
move.init(pic1);
var move = {
	ansArr: new Array,
	index:0,
	bool:true,
	clickbool:false,
	init: function(id) {
		id.addEventListener(touchStart,move.touchstart1, false);
	},
	touchstart1: function(e) {
		var Event = e || window.event;
		var otouch;
		if(Event.touches) {
			otouch = Event.touches[0];
		} else {
			otouch = Event;
		}
		startX = otouch.clientX;
		startY = otouch.clientY;
		tzbtn = this;
//		console.log(tzbtn);
		//阻止默认事件,必须加的
		document.addEventListener(touchMove, move.touchMove1, {
			passive: false
		});
		document.addEventListener(touchEnd, move.touchend1, {
			passive: false
		});
		return false;
	},
	touchMove1: function(e) {
		var Event1 = e || window.event;
		var otouch;
		var bodyh = content.clientHeight;
		var bodyw = content.clientWidth;
		var picw = tzbtn.clientWidth;
		var pich = tzbtn.clientHeight;
		if(Event1.touches) {
			otouch = Event1.touches[0];
		} else {
			otouch = Event1;
		}
		endX = otouch.clientX;
		endY = otouch.clientY;
		//获得位移量
		var zhix = tzbtn.offsetLeft + (endX - startX);
		var zhiy = tzbtn.offsetTop+(endY - startY);
		//当移动物高大于小于容器高需做特别处理 
//		100是为了滑动最大空间偏出  符合正常使用习惯
		var gety =pich>bodyh?(pich-bodyh+100):(bodyh-pich+100)
//		console.log(gety + "gety");
//		console.log(zhiy + "zhiy");
	//向右位移不得超出100
		zhix = zhix>=100?100:zhix;
		
		zhix = zhix<=(bodyw-picw-100)?(bodyw-picw-100):zhix;
		zhiy = zhiy<=-gety?-gety:zhiy;
		zhiy = zhiy>=100?100:zhiy;
		tzbtn.style.left = zhix + "px";
		tzbtn.style.top = zhiy + "px";
		
		startX = endX;
		startY = endY;
		//阻止默认事件,必须加的
		Event1.preventDefault();
		return false;
	},
	touchend1: function(e,arr) {
		document.removeEventListener(touchMove, move.touchMove1);
		document.removeEventListener(touchEnd, move.touchend1);
	}
}