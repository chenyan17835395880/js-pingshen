/*
* @Author: Administrator
* @Date:   2017-09-28 14:26:30
* @Last Modified by:   Administrator
* @Last Modified time: 2017-10-28 19:22:24
*/
/*
属性：哪些字母、个数、速度、位置、生命、分数
方法；产生字符、下落、消除、重叠、重新开始（初始值）、下一关、重复、
 */

	function Game(){
		//页面元素的来源
		this.charArr=[
			["Q","img/Q.png"],
			["W","img/W.png"],
			["E","img/E.png"],
			["R","img/R.png"],
			["T","img/T.png"],
			["Y","img/Y.png"],
			["U","img/U.png"],
			["I","img/I.png"],
			["O","img/O.png"],
			["P","img/P.png"],
			["A","img/A.png"],
			["S","img/S.png"],
			["D","img/D.png"],
			["F","img/F.png"],
			["G","img/G.png"],
			["H","img/H.png"],
			["J","img/J.png"],
			["K","img/K.png"],
			["L","img/L.png"],
			["M","img/M.png"],
			["N","img/N.png"],
			["B","img/B.png"],
			["V","img/V.png"],
			["C","img/C.png"],
			["X","img/X.png"],
			["Z","img/Z.png"]
		];
		//页面元素
		this.current=[];
		//位置
		this.position=[];
		//个数
		this.number=5;
		//速度
		this.speed=10;
		//关卡
		this.gk=10;
		//变化的分数
		this.score=0;
		//变化的生命值
		this.life=10;
		this.guanka=1;
		this.guankaObj=document.querySelector(".guanka>span");
		//显示的分数
		this.scoreObj=document.querySelector(".score>span");
		//显示的生命值
		this.lifeObj=document.querySelector(".life>span");
	}
	Game.prototype={
		start:function(){
			this.getchars();
			this.drop();
			this.key();
		},
		getchars:function(){/////////////////////////////////////////获取页面元素
			for(let i=0;i<this.number;i++){
				this.getchar();////////////////一个一个取
			}
		},
		getchar:function(){////////////////////////////////////////一个一个获取
			//取下标
			let num=Math.floor((Math.random()*this.charArr.length));
			//this.charArr[num]   this.current[i].innerText
			
			
			let divs=document.createElement("div");
			while(this.checkReapt(this.charArr[num][0])){
				num=Math.floor((Math.random()*this.charArr.length));
			}

			divs.innerText=this.charArr[num][0];
			divs.classList.add("char");
			let tops=Math.random()*100;
			let lefts=Math.random()*(innerWidth-400)+200; 
			
			while(this.checkPosition(lefts)){
				lefts=Math.random()*(innerWidth-400)+200; 
			}
			
			divs.style.top=`${tops}px`;
			divs.style.left=`${lefts}px`;
			divs.style.background=color();
			divs.style.background=`url(${this.charArr[num][1]}) center / cover`;
			divs.style.fontSize=0;
			
			document.body.appendChild(divs);
			this.current.push(divs);
			this.position.push(lefts);

			function color(){
				let colors="rgb(";
				for(let i=0;i<3;i++){
					let num=Math.floor(Math.random()*256);
					colors+=num+",";
					}
					colors=colors.slice(0,-1)+")";
					return colors;
			}		
		},
		checkPosition:function(v){//////////////////////////去重叠
			let flag=this.position.some(function(value){
				return Math.abs(value-v)<60;
			})
			return flag;
		},
		checkReapt:function(element){
			//this.charArr[num]   this.current[i].innerText
			let flag1=this.current.some(function(value){
				return element==value.innerHTML;
			})
			return flag1;
		},
		drop:function(){////////////////////////////////////字母下落
			let that=this;
			this.t=setInterval(function(){
				for(let i=0;i<that.current.length;i++){
					let Dtops=that.current[i].offsetTop+that.speed;
					that.current[i].style.top=`${Dtops}px`;
					if(Dtops>=innerHeight){
						document.body.removeChild(that.current[i]);
						that.current.splice(i,1);
						that.position.splice(i,1);////////////////////////?????????
						that.life--;
						that.lifeObj.innerText=that.life;//////--this.life
						if(that.life<=0){
							// that.life=0;
							let cont=confirm("游戏结束，是否继续？");
							if(cont){							
								that.restart();
							}else{
								close();
							}
						}
						that.getchar();
					}
				}
			},500);
		},
		key:function(){///////////////////////////////////按键消除
			let that=this;
			document.onkeydown=function(e){
				//String.fromCharCode(keyCode)  current[i].innertext
				for(let i=0;i<that.current.length;i++){
					if(String.fromCharCode(e.keyCode)==that.current[i].innerText){
						document.body.removeChild(that.current[i]);
						that.current.splice(i,1);
						that.position.splice(i,1);
						that.getchar();
						that.score++;
						that.scoreObj.innerText=that.score;
						if(that.score==that.gk){
							that.guanka++;
								that.guankaObj.innerText=that.guanka;//////--this.life
							that.next();
						}
						console.log(that.score);
					} 
				}
			}
		},
		next:function(){/////////////////////////////////////下一关
			clearInterval(this.t);
			/*document.body.innerHTML="";*/
			for(let i=0;i<this.current.length;i++){
				document.body.removeChild(this.current[i]);
			}
			this.current.length=0;//////////////////////////////////////////???????????
			this.position.length=0;
			this.gk++;
			this.number++;
			this.life++;
			this.start();
		},
		restart:function(){/////////////////////////////重新开始
			clearInterval(this.t);
			for(let i=0;i<this.current.length;i++){
				document.body.removeChild(this.current[i]);
			}
			this.current.length=0;//////////////////////////////////////////???????????
			this.position.length=0;
			this.number=4;
			this.gk=10;
			this.score=0;		
			this.life=10;
			this.guanka=1;
			this.guankaObj.innerText=1;
			this.scoreObj.innerText=0;
			this.lifeObj.innerText=10;
			this.start();
		}
	
	}
	