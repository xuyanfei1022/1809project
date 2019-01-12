
function Slider(obj){
	let defaultObj={
		$box : null,
		width : 400,
		height : 300,
		imgs : [],
		btnColor : 'black', //按钮的原始颜色
		btnHighColor : 'white',//按钮的高亮颜色
		btnSize : 20,//按钮的大小
		isCircle : true,//按钮是否为圆的
		currIndex : 0,
		timeSpace : 16,
		myTimer : null,
		isAutoPlay:true
	};
	for(let key in defaultObj){
		obj[key]!==undefined?(this[key] = obj[key]):(this[key] = defaultObj[key]);
	}

	this.createUI();
	this.addEvent();
	if(this.isAutoPlay){
		this.autoPlay();	
	}	
}

Slider.prototype.createUI = function(){
	this.$box.css({"overflow":"hidden"});
	let htmlstr="";
	//img
	for(let i=0;i<this.imgs.length;i++){
		htmlstr+='<img src="'+this.imgs[i]+'" style="position:absolute;top:0px;';
		htmlstr+='width:'+this.width+"px;";
		htmlstr+='height:'+this.height+"px;";
		htmlstr+='left:';			
		if(i==0){
			htmlstr+="0px;";
		}else{
			htmlstr+=this.width+"px;";
		}
		htmlstr+='" />';
	}
	this.$box.append(htmlstr);

	//ul li	
	htmlstr='<ul style="position:absolute;list-style:none;right:520px;bottom:10px;z-index:1;">';
	for(let i=0;i<this.imgs.length;i++){
		htmlstr+= '<li style="margin-right:20px;float:left;';
		htmlstr+='width:'+this.btnSize+"px;";
		htmlstr+='height:'+this.btnSize+"px;";
		if(this.isCircle){
			htmlstr+='border-radius:50%;';
		}
		htmlstr+='background-color:';
		if(i==0){
			htmlstr+=this.btnHighColor+';';			
		}else{
			htmlstr+=this.btnColor+';';			
		}
		htmlstr+='"></li>';
	}
	htmlstr+='</ul>';
	this.$box.append(htmlstr);
	
}

	//添加事件
Slider.prototype.addEvent = function(){
	//this;//是轮播图对象
	let that = this;
	
	this.$box.mouseover(function(){
		that.stop();
	});
	
	this.$box.mouseout(function(){
		if(that.isAutoPlay){
			that.autoPlay();	
		}	
	});
	
	let $li = $(this.$box.selector+" ul").children();
	$li.click(function(){
		that.goImg($(this).index());
	});	
}
	
	//1、自动播放
Slider.prototype.autoPlay = function(){	
	if(this.myTimer!=null){
		return;
	}
	this.myTimer = setInterval(()=>{
		//1、改变数据（图片序号）
		let outIndex = this.currIndex;//要出去的那张。
		this.currIndex=this.currIndex+1;
		//2、边界处理
		if(this.currIndex>this.imgs.length-1 || this.currIndex<0){
			this.currIndex = 0;
		}
		//3、改变外观
		this.showImg(outIndex,this.currIndex);
	},this.timeSpace);	
}

	//2、停止
Slider.prototype.stop=function(){
	if(this.myTimer!=null){
		window.clearInterval(this.myTimer);
		this.myTimer = null;
	}
}

	//3、跳转指定的图片
	//
Slider.prototype.goImg=function(transIndex){//2
	//1、改变数据（图片序号）
	let outIndex = this.currIndex;
	this.currIndex=transIndex;//2
	//2、边界处理
	if(this.currIndex>this.imgs.length-1 || this.currIndex<0){
		this.currIndex = 0;
	}
	//3、改变外观
	this.showImg(outIndex,this.currIndex);
}

	//
	//参数：
	//outIndex:淡出的那张图片的序号
	//inIndex:淡入的那张图片的序号
Slider.prototype.showImg=function(outIndex,inIndex){
	//3、改变外观
	//1)、改图片
	let $img =this.$box.children("img");
	$img.eq(inIndex).css({"left":this.width}).animate({
		"left":0
	},300);
	$img.eq(outIndex).animate({
		"left":-1*this.width
	},300);
	
	//2)、改豆豆

	let $li =$(this.$box.selector+" li");
	$li.eq(this.currIndex)
	.css({'background-color':this.btnHighColor})
	.siblings()
	.css({'background-color':this.btnColor});
}