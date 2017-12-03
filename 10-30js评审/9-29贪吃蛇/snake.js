/*
* @Author: Administrator
* @Date:   2017-09-29 16:00:23
* @Last Modified by:   Administrator
* @Last Modified time: 2017-10-28 13:38:55
*/
/*move():加头、去尾*/


 function Snake(){
 	this.snake=["5_3","6_3","7_3"];
 	this.sence=document.querySelector(".sence");
 	this.direction=39;
 	this.flag={"5_3":true,"6_3":true,"7_3":true};
 	this.food="";
 }
 Snake.prototype={
 	stop:function(){
 		this.start()=null;
 		this.move()=null;
 		clearInterval(this.t)
 	},
 	start:function(){
 		this.drawLine();
 		this.drawSnake();
 		this.move();
 		this.key();
 		this.dropfood();
 	},
 	drawLine:function(){///////////////////////////////////画块
 		for(let i=0;i<20;i++){
 			for(let j=0;j<20;j++){
 				this.sence.innerHTML+=`<div class="block" id="${i}_${j}"}></div>`;
 			}
 		}
 	},
 	drawSnake:function(){/////////////////////////////////画蛇
 		this.snake.forEach((element)=>{
 			let change=document.getElementById(element);
 			change.classList.add("hot");
 		})
 	},
 	move:function(){
 		/*加头   去尾*/
 		let that=this;
 		this.t=setInterval(function(){
 			let oldhead=that.snake[that.snake.length-1];//"7_3"
	 		let arr=oldhead.split("_");//是一个字符串："7"  "3"
	 		let newhead="";//用*1的方法把数字型字符串转换为数字："8_3"
	 		
	 		if(that.direction==37){//左
	 			newhead=`${arr[0]*1}_${arr[1]*1-1}`;
	 		}else if(that.direction==38){//上
	 			newhead=`${arr[0]*1-1}_${arr[1]*1}`;
	 		}else if(that.direction==39){//右
	 			newhead=`${arr[0]*1}_${arr[1]*1+1}`;
	 		}else if(that.direction==40){//下
	 			newhead=`${arr[0]*1+1}_${arr[1]*1}`;
	 		}

	 		let newarr=newhead.split("_");
	 		if(newarr[0]<0||newarr[0]>19||newarr[1]<0||newarr[1]>19||that.flag[newhead]){
	 			clearInterval(that.t);
	 			alert('游戏结束');
	 			return;
	 		}

	 		//新头坐标  ==  食物 新头
	 		if(newhead==that.food){
	 			that.snake.push(newhead);
		 		that.flag[newhead]=true;
		 		document.getElementById(that.food).style.background="#fff";
		 		that.dropfood();
	 		}else{	 			
		 		that.snake.push(newhead);
		 		that.flag[newhead]=true;
		 		let weiba=that.snake.shift();/////返回被删掉的元素
		 		// console.log(weiba)
		 		delete that.flag[weiba];
		 		document.getElementById(weiba).classList.remove("hot");
		 		that.drawSnake();   
	 		}
	 		
 		},600)
 	},
 	key:function(){
 		let that=this;
 		document.onkeydown=function(e){
 			let key=e.keyCode;
 			if(Math.abs(key-that.direction)==2){
 				return;
 			}
 			that.direction=key;
 		}
 	},
 	dropfood:function(){
 		let foodX=Math.floor(Math.random()*20);
 		let foodY=Math.floor(Math.random()*20);
 		do{
 			foodX=Math.floor(Math.random()*20);
 			foodY=Math.floor(Math.random()*20);
 		}while(this.flag["`${foodX}_${foodY}`"]==true)
 		this.food=`${foodX}_${foodY}`;//3_4
 		document.getElementById(this.food).style.background="#000";
 	}



 }