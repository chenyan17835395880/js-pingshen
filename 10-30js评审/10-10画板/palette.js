/*
* @Author: Administrator
* @Date:   2017-10-10 10:54:07
* @Last Modified by:   Administrator
* @Last Modified time: 2017-10-30 10:36:43
*/
/*

属性	  ：线宽、线端点样式、填充、描边、颜色、样式、边数
方法、功能：画线、虚线、矩形、多边形、多角形、圆、铅笔
			橡皮 
			撤销
			裁切
			新建
			保存
			反向 
 */

class palette{
	constructor(canvas,ctx,opacity){
		//画布
		this.canvas=canvas;
		this.ctx=ctx;
		this.opacity=opacity;
		this.cw=canvas.width;
		this.ch=canvas.height;
		//填充、描边
		this.style="stroke";///////////////用来设置
		this.lineCap="butt";
		this.lineWidth=5;
		//颜色
		this.fillStyle="red";
		this.strokeStyle="blue";
		//历史记录
		this.history=[];
		this.temp=null;
	}
	init(){
		this.ctx.lineCap=this.lineCap;///////////设置头
		this.ctx.fillStyle=this.fillStyle;
		this.ctx.strokeStyle=this.strokeStyle;
		this.ctx.lineWidth=this.lineWidth;
	};
	///////////////////////////////////////////////////共有的
	draw(type,n){
		this.opacity.onmousedown=function(e){
			let cx=e.offsetX,cy=e.offsetY;
			this.opacity.onmousemove=function(e){
				let ox=e.offsetX,oy=e.offsetY;
				this.ctx.clearRect(0, 0, this.cw, this.ch);
				if(this.history.length){
					this.ctx.putImageData(this.history[this.history.length-1],0,0);
				}
				this.init();
				this.ctx.beginPath();						
				this[type](cx,cy,ox,oy,n);						
			}.bind(this);
		}.bind(this);
		this.opacity.onmouseup=function(){
			this.history.push(this.ctx.getImageData(0, 0, this.cw, this.ch));
			this.opacity.onmousemove=null;
		}.bind(this);
		////////////////////////////////////////////////////////////////////撤销
		document.onkeydown=function(e){
			if(e.ctrlKey&&e.keyCode==90){
				if(this.history.length<0){
					return;
				}
				this.history.pop();
				this.ctx.clearRect(0, 0, this.cw, this.ch);
				this.ctx.putImageData(this.history[this.history.length-1],0,0);
			}
		}.bind(this);
	};
	////////////////////////////////////////////////画线
	line(cx,cy,ox,oy){
		this.ctx.moveTo(cx,cy);
		this.ctx.lineTo(ox,oy);
		this.ctx.lineWidth=0;///////////////////???????????
		this.ctx.setLineDash([0,0]);
		this.ctx.stroke();
	};
	////////////////////////////////////////////////画虚线
	dash(cx,cy,ox,oy){
		this.ctx.moveTo(cx,cy);
		this.ctx.lineTo(ox,oy);
		this.ctx.setLineDash([5,3]);	
		this.ctx.stroke();
	};
	///////////////////////////////////////////////画多边形
	poly(cx,cy,ox,oy,n){
		let rad=Math.PI*2/n;
		let r=Math.sqrt(Math.pow(cx-ox,2)+Math.pow(cy-oy,2));
		this.ctx.moveTo(cx+r,cy);
		for(let i=0;i<n;i++){
			let x=r*Math.cos(rad*i)+cx;
			let y=r*Math.sin(rad*i)+cy;
			this.ctx.lineTo(x,y);
		}
		this.ctx.closePath();
		this.ctx.setLineDash([0,0]);
		this.ctx[this.style]();	/////////////////////////////////////设置填充，描边	
	};
	///////////////////////////////////////////////画多角形
	polyJ(cx,cy,ox,oy,n){
		let rad=Math.PI/n;
		let r=Math.sqrt(Math.pow(cx-ox,2)+Math.pow(cy-oy,2));
		this.ctx.moveTo(cx+r,cy);
		for(let i=0;i<2*n;i++){
			let r1=(i%2==0)?r:r/2;
			let x=r1*Math.cos(rad*i)+cx;
			let y=r1*Math.sin(rad*i)+cy;
			this.ctx.lineTo(x,y);
		}
		this.ctx.closePath();
		this.ctx.setLineDash([0,0]);
		this.ctx[this.style]();			
	};
	////////////////////////////////////////////////画圆
	circle(cx,cy,ox,oy){
		let r=Math.sqrt(Math.pow(ox-cx,2)+Math.pow(oy-cy,2))
		this.ctx.arc(cx, cy, r, 0, Math.PI*2);
		this.ctx.closePath();
		this.ctx.setLineDash([0,0]);
		this.ctx[this.style]();
	};
	/////////////////////////////////////////////////画矩形
	rect(cx,cy,ox,oy){
		this.ctx.moveTo(cx, cy);
		this.ctx.rect(cx, cy, Math.abs(ox-cx), Math.abs(oy-cy));
		this.ctx[this.style]();
	};
	/////////////////////////////////////////////////橡皮擦
	eraser(eraser1,w,h){
		this.opacity.onmousedown=function(e){
			let cx=e.offsetX,cy=e.offsetY;	
			eraser1.style.display="block";
			eraser1.style.left=`${cx-w/2}px`;
			eraser1.style.top=`${cy-h/2}px`;
			this.opacity.onmousemove=function(e){
				let ox=e.offsetX-w/2,oy=e.offsetY-h/2;
				e.preventDefault();
				if(ox<=0){
						ox=0;
					}
					if(ox>=this.cw-w){
						ox=this.cw-w;
					}
					if(oy<=0){
						oy=0;
					}
					if(oy>=this.ch-h){
						oy=this.ch-h;
					}
				eraser1.style.left=`${ox}px`;
				eraser1.style.top=`${oy}px`;
				this.ctx.clearRect(ox, oy, w, h);
			}.bind(this);
		}.bind(this);
		this.opacity.onmouseup=function(){
			this.history.push(this.ctx.getImageData(0, 0, this.cw, this.ch));
			this.opacity.onmousemove=null;
			eraser1.style.display="none";
		}.bind(this);
	};
	/////////////////////////////////////////////////文本
	font(){
		let that=this;
		let cx,cy;
		let left,top;
		this.opacity.onmousedown=function(e){
			this.onmousedown=null;///////////////////////////////????????????
			cx=e.offsetX,cy=e.offsetY;
			let divs=document.createElement("div");
			divs.contentEditable="true";
			divs.style.cssText=`
				width:200px;
				height:100px;
				border:1px dashed #000;
				position:absolute;
				top:${cy}px;left:${cx}px;
				cursor:move;
			`;
			this.appendChild(divs);
			
			//////////////////////////////////////////////////////移动文本框
			divs.onmousedown=function(e){
				let ox=e.clientX,oy=e.clientY;
				let x=divs.offsetLeft,y=divs.offsetTop;
				document.onmousemove=function(e){
					let cox=e.clientX,coy=e.clientY;
					e.preventDefault();//蓝屏
					left=x+cox-ox;
					top=y+coy-oy;
					if(left<=0){
						left=0;
					}
					if(left>=that.cw-200){
						left=that.cw-200;
					}
					if(top<=0){
						top=0;
					}
					if(top>=that.ch-100){
						top=that.ch-100;
					}
					this.style.left=`${left}px`;
					this.style.top=`${top}px`;
				}.bind(this);
				divs.onmouseup=function(){
					document.onmousemove=null;
				}
			}

			//////////////////////////////////////////////////////保留内容
			divs.onblur=function(){
				let value=this.innerText;
				that.opacity.removeChild(divs);				
				that.ctx.font="normal 20px 微软雅黑";
				// that.ctx.textAlign="center";
				// that.ctx.textBaseLine="middle";
				that.ctx.fillText(value, left, top);

			}
		}
	};
	////////////////////////////////////////////////////裁切
	cai(obj){
		let minX,minY,w1,h1;	
		this.opacity.onmousedown=function(e){
			let cx=e.offsetX,cy=e.offsetY;
			obj.style.display="block";
			obj.style.width=0;
			obj.style.height=0;			
			this.opacity.onmousemove=function(e){
				let ox=e.offsetX,oy=e.offsetY;
				w1=Math.abs(ox-cx),h1=Math.abs(oy-cy);
				minX=(cx>=ox)?ox:cx;
				minY=(cy>=oy)?oy:cy;
				obj.style.left=`${minX}px`;
				obj.style.top=`${minY}px`;
				obj.style.width=`${w1}px`;
				obj.style.height=`${h1}px`;
			}.bind(this);
			this.opacity.onmouseup=function(){
				this.opacity.onmousemove=null;
				obj.style.display="none";
				this.temp=this.ctx.getImageData(minX,minY,w1,h1);
				this.ctx.clearRect(minX,minY,w1,h1);
				this.history.push(this.ctx.getImageData(0, 0, this.cw, this.ch));
				this.ctx.putImageData(this.temp,minX,minY);
				this.drag(obj);
			}.bind(this);
		}.bind(this);
	};
	/////////////////////////////////////////////////拖动裁切的图形
	drag(obj){
		this.opacity.onmousedown=function(){
			this.opacity.onmousemove=function(e){
				let ox=e.offsetX-parseInt(obj.style.width)/2,oy=e.offsetY-parseInt(obj.style.height)/2;
				obj.style.left=`${ox}px`;
				obj.style.top=`${oy}px`;
				this.ctx.clearRect(0, 0,  this.cw, this.ch);
				if(this.history.length){
					this.ctx.putImageData(this.history[this.history.length-1],0,0);
				}
				this.history.push(this.ctx.getImageData(0, 0, this.cw, this.ch));/////????
				this.ctx.putImageData(this.temp,ox,oy);

			}.bind(this);
			this.opacity.onmouseup=function(){
				this.history.push(this.ctx.getImageData(0, 0, this.cw, this.ch));
				this.opacity.onmousemove=null;
				this.temp=null;
		}.bind(this);
		}.bind(this);
	};
	///////////////////////////////////////////////////////////清空
	clearAll(){
		this.ctx.clearRect(0, 0,  this.cw, this.ch);
		this.history.push(this.ctx.getImageData(0, 0, this.cw, this.ch));
	};
	//////////////////////////////////////////////////////////反向
	Reverse(){
		let imagedata=this.ctx.getImageData(0,0,this.cw,this.ch);
		for(let i=0;i<imagedata.data.length;i+=4){
			imagedata.data[i]=255-imagedata.data[i];
			imagedata.data[i+1]=255-imagedata.data[i+1];
			imagedata.data[i+2]=255-imagedata.data[i+2];
		}
		this.ctx.putImageData(imagedata,0,0);
	}
	//////////////////////////////////////////////////////////铅笔
	qianbi(){
		this.opacity.onmousedown=function(e){
			let cx=e.offsetX,cy=e.offsetY;
			this.ctx.beginPath();
			this.ctx.moveTo(cx, cy);
			this.opacity.onmousemove=function(e){
				let ox=e.offsetX,oy=e.offsetY;
				this.ctx.lineTo(ox, oy);
				this.ctx[this.style]();
			}.bind(this);
		}.bind(this);
		this.opacity.onmouseup=function(){
			this.history.push(this.ctx.getImageData(0, 0, this.cw, this.ch));
			this.opacity.onmousemove=null;
		}.bind(this);
		document.onkeydown=function(e){
			if(e.ctrlKey&&e.keyCode==90){
				if(this.history.length<0){
					return;
				}
				this.history.pop();
				this.ctx.clearRect(0, 0, this.cw, this.ch);
				this.ctx.putImageData(this.history[this.history.length-1],0,0);
			}
		}.bind(this);
	}
}