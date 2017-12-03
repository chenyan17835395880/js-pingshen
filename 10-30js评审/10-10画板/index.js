/*
* @Author: Administrator
* @Date:   2017-10-10 14:50:34
* @Last Modified by:   Administrator
* @Last Modified time: 2017-10-12 14:31:01
*/
window.onload=function(){
	let opacity=document.querySelector(".opacity");
	let line=document.querySelector(".line");
	let dash=document.querySelector(".dash");
	let poly=document.querySelector(".poly");
	let polyJ=document.querySelector(".polyJ");
	let eraser1=document.querySelector(".eraser-box");
	let eraser2=document.querySelector(".eraser");
	let chexiao=document.querySelector(".chexiao");
	let save=document.querySelector(".save");
	let fill=document.querySelector(".fill");
	let colorfill=document.querySelector("#fill");
	let colorstroke=document.querySelector("#stroke");
	let stroke=document.querySelector(".stroke");
	let tools=document.querySelectorAll("#tools");
	let cai=document.querySelector(".cai");
	let caiqie1=document.querySelector(".caiqie");
	let font=document.querySelector(".font");
	let lis=document.querySelectorAll("li");
	let clearAll=document.querySelector(".clearAll");
	let xinjian=document.querySelector(".xinjian");
	let reverse=document.querySelector(".reverse");

	let canvas=document.querySelector("canvas");
	let ctx=canvas.getContext("2d");
	let obj=new palette(canvas,ctx,opacity);

	////////////////////////////////////////////////撤销
	chexiao.onclick=function(){
		if(obj.history.length<0){
			return;
		}
		obj.history.pop();
		obj.ctx.clearRect(0, 0, obj.cw, obj.ch);
		obj.ctx.putImageData(obj.history[obj.history.length-1],0,0);
	}

	///////////////////////////////////////////////橡皮擦
	eraser2.onclick=function(){
		let width=prompt("请输入边数",50);
		obj.eraser(eraser1,width,width);
	}

	////////////////////////////////////////////////保存
	save.onclick=function(){
		let data=canvas.toDataURL("image/png");
		save.href=data;
		save.download="tu.png";
	}

	/////////////////////////////////////////////////清空
	clearAll.onclick=function(){
		obj.clearAll();
	}
	/////////////////////////////////////////////////新建
	xinjian.onclick=function(){
		let tishi=confirm("是否保存？");
		if(tishi){
			// save.onclick();
			location.href=canvas.toDataURL("image/png").replace("image/png","image/octet-stream");
		}
		clearAll.onclick();
		
	}
	////////////////////////////////////////////////反向
	reverse.onclick=function(){
		obj.Reverse();
	}


	///////////////////////////////////////////////点击变色
	lis.forEach(element=>{
		element.onclick=function(){
			for(let i=0;i<lis.length;i++){
				lis[i].style.background="#fff";				
			}
			element.style.background="#CDE4FC";
			if(element.className=="qianbi"){
				obj.qianbi();
				return;
			}
			let n=0;
			if(element.className=="poly"||element.className=="polyJ"){
				n=prompt("请输入边数",5)
			}
			if(element.className=="fill"||element.className=="stroke"){
				obj.style=this.className;
				return;
			}
			if(element.className=="font"){
				obj.font();
				return;
			}
			if(element.className=="cai"){
				obj.cai(caiqie1);
				return;
			}
			obj.draw(element.className,n);
		}	
	})
	lis[0].onclick();///////////或obj.draw("line");不点击也能触发点击事件，但要写在事件之后


	///////////////////////////////////////////////改变描边、填充颜色
	colorfill.onblur=function(){
		obj.fillStyle=`${colorfill.value}`;
	}
	colorstroke.onblur=function(){
		obj.strokeStyle=`${colorstroke.value}`;
	}
}