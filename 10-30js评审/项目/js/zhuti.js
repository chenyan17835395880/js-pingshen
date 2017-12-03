/*
* @Author: Administrator
* @Date:   2017-10-25 13:08:19
* @Last Modified by:   Administrator
* @Last Modified time: 2017-10-25 13:10:57
*/
$(function(){
	////////////////////////////////返回顶部
	let back=$('.back');
	back.on('click',function(){
		let scrolls=document.documentElement
		$(scrolls).animate({scrollTop:0});
	})
})

