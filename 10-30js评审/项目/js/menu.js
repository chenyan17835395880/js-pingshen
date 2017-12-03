/*
* @Author: Administrator
* @Date:   2017-10-20 10:34:09
* @Last Modified by:   Administrator
* @Last Modified time: 2017-10-25 08:32:08
*/
$(function(){
	let imgs=$('.imgs');
	let mask=$('.mask');
	let M_img=$('img',mask);
	let close=$('.close');
	let botR=$('.botR');
	let botL=$('.botL');
	let i;

	imgs.on('click',function(){
		let img=$('img',this);
		M_img.attr('src',img.attr('src'));
		mask.addClass('active');
		i=$(this).index();
	});
	close.on('click',function(){
		mask.removeClass('active');
	});
	botR.on('click',function(){
		i++;
		if(i==imgs.length){
			return;
		}
		M_img.attr('src',$('img',imgs.eq(i)).attr('src'));
	})
	botL.on('click',function(){
		i--;
		if(i<0){
            return;
		}
		M_img.attr('src',$('img',imgs.eq(i)).attr('src'));
	})
////////////////////////////////返回顶部
	let back=$('.back');
	back.on('click',function(){
		let scrolls=document.documentElement
		$(scrolls).animate({scrollTop:0});
	})





})