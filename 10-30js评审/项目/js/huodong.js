/*
* @Author: Administrator
* @Date:   2017-10-21 14:13:04
* @Last Modified by:   Administrator
* @Last Modified time: 2017-10-25 08:36:01
*/
$(function(){
////////////////////////////////返回顶部
	let back=$('.back');
	back.on('click',function(){
		let scrolls=document.documentElement
		$(scrolls).animate({scrollTop:0});
	})
})

