$(function(){
    ////////////////////////////////返回顶部
    let back=$('.back');
    back.on('click',function(){
        let scrolls=document.documentElement
        $(scrolls).animate({scrollTop:0});
    })

})