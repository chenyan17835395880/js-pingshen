/*
* @Author: Administrator
* @Date:   2017-10-19 23:33:04
* @Last Modified by:   Administrator
* @Last Modified time: 2017-10-25 09:26:46
*/
$(function(){
	////////////////////////////////返回顶部
	let back=$('.back');
	back.on('click',function(){
		let scrolls=document.documentElement
		$(scrolls).animate({scrollTop:0});
	})

})