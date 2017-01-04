$(function(){
	$('.swiper-container-bottomServer .swiper-slide').click(function(){
		var index_server=$(this).index();
		console.log(index_server);
		$(this).css({'border':'1px solid lightblue'}).siblings().css({'border':'1px solid lightpink'})
		$('.serverPicture').children().eq(index_server).css('z-index','5').siblings().css('z-index','1');
		$('.serverPicture').children().eq(index_server).slideDown(500).siblings().slideUp(500);
		
	})
})