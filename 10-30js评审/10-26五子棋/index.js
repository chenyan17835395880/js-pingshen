$(function(){
	let ul=$('ul');
	let hei={};
	let bai={};
	for(let i=0;i<15;i++){		
		for(let j=0;j<15;j++){
			$('<li>').addClass('qizi').appendTo('.qipai')		
		}
		$('<div>').addClass('hang').appendTo('.qipai')	
		$('<span>').addClass('shu').appendTo('.qipai')	
		if(i<5){
			$('<i>').addClass('shu').appendTo('.qipai')
		}	
	}
	let lis=$('ul>li');
	let flag=true;
		lis.on('click',function(){
			if($(this).hasClass('hei') || $(this).hasClass('bai')){
				return;
			}
			if(flag){
				$(this).addClass('hei');
				hei[data.x+'_'+data.y] = true;
				pd(data,hei)
			}else{
				$(this).addClass('bai')
				hei[data.x+'_'+data.y] = true;
				pd(data,bai)
			}
			flag=!flag;
		})





   function pd(pos,obj){
   	let rows=1,cols=1,zx=1,yx=1;
   	let i=pos.x,j=pos.y;

   }
})