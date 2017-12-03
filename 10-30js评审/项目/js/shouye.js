/*
* @Author: Administrator
* @Date:   2017-10-14 20:10:22
* @Last Modified by:   Administrator
* @Last Modified time: 2017-10-25 14:03:41
*/
$(function(){

	let wid=parseInt($(".banner").width());
	////////////////////////轮播
	let now=0;
	let next=0;
	let t;
	t=setInterval(move, 4000);
	function move(){
		next++;
		if(next==$(".banner1").length){
			next=0;
		}
		$(`.banner1`).eq(`${next}`).css({left:`${wid}px`});//wid+"px"
		$(`.banner1`).eq(`${now}`).animate({left:-wid});//json对象不用加单位,animate.js内部已经处理了
		$(`.banner1`).eq(`${next}`).animate({left:0});
		now=next;
	}
	console.log(next)	
	function moveL(){
		next--;
		if(next==-1){
			next=$(".banner1").length-1;
		}
		$(`.banner1`).eq(`${next}`).css({left:`${-wid}px`});//`${wid}px`
		$(`.banner1`).eq(`${now}`).animate({left:wid});//json对象不用加单位,animate.js内部已经处理了
		$(`.banner1`).eq(`${next}`).animate({left:0});
		now=next;
	}
	$(".control-left").on('click',(function(){
		moveL();
	}));
	$(".control-right").click(function(){
		move();
	});
	$(".banner").mouseover(function(){
		clearInterval(t);
	});
	$(".banner").mouseout(function(){
		t=setInterval(move, 3000);
	});

	///////////////////////banner点
	let iconF=$('.icon-page-first');
	let iconR=$('.icon-pageNext');
	console.log(iconF)
	let t1;
	t1=setInterval(move1, 1000);
	function move1(){
		iconF.css({width:'100px'})
		// iconF.animate({transform:'tranlateX(100px)'})
	}
	

	///////////////////////厨师
	let chief_one=$('.chief-one');
	let widP=chief_one.width();
	let botR=$('.right1');
	let botL=$('.left1');
	let chief_everyW=$('.chief-every').width();
	let chief_every=$('.chief-every');

	chief_one.html(function(index,value){
		return value+=value;
	});
	chief_one.css({width:`${widP*2}px`});
	let i=0;
	botR.click(function(){
		// if(Math.floor(chief_one.position().left)==(`${-chief_everyW*i}`)){		
			if(i>8){
				return;
			}
			i++;
			chief_one.css({transform: `translate3d(${-chief_everyW*i}px, 0px, 0px)`});
			
		// }
		
	})
	botL.click(function(){
		// if(Math.floor(chief_one.position().left)==(`${-chief_everyW*i}`)){	
			i--;	
			if(i<=0){
				i=0;
			}
			chief_one.css({transform: `translate3d(${-chief_everyW*i}px, 0px, 0px)`});			
		// }
	})


////////////////////////////有关评价
	let dians=$('.dian-dian>span');
	let W=$('.fankui-one').innerWidth();
	let fankui_box=$('.fankui-every');
	dians.each(function(index,value){
		/*setInterval(function(){
			$(value).triggerHandler('click');
		}, 3000);*/
		
		$(value).on('click',function(){
			$(value).css({background:'#240C08'});
			dians.not(value).css({background:'#C2CBC8'});
			fankui_box.css({transform:`translate3d(${-W*index}px, 0px, 0px)`});
		})		
	})
		/*setInterval(function(){
			dians.triggerHandler('click');
		}, 1000);*/


////////////////////////////////返回顶部
	let back=$('.back');
	back.on('click',function(){
		let scrolls=document.documentElement
		$(scrolls).animate({scrollTop:0});
	})

////////////////////////////////餐厅菜单
	let menu_lis=$('li','.menu-box');
	let zaocans=$('.zaocan');
	zaocans.first().nextAll().addClass('none');
	let a=$('a','.menu-box>li');
	
	Array.from(menu_lis).forEach((element,index)=>{
		$(element).on('click',function(){
			a.removeClass('bianse');
			a.eq(index).addClass('bianse');
			zaocans.addClass('none');
			$('.active').removeClass('active');
			zaocans.eq(index).addClass('active');
		})
	})

/////////////////////////////当前显示
	// let 






})