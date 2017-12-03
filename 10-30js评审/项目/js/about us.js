/*
* @Author: Administrator
* @Date:   2017-10-19 12:58:38
* @Last Modified by:   Administrator
* @Last Modified time: 2017-10-23 15:35:38
*/
$(function(){
////////////////////////////////返回顶部
	let back=$('.back');
	back.on('click',function(){
		let scrolls=document.documentElement
		$(scrolls).animate({scrollTop:0});
	})
	
})
