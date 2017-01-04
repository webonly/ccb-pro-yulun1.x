
var Socket_kinect = new WebSocket("ws://127.0.0.1:9004");
Socket_kinect.onerror = function(e){
   console.log('Socket_kinect error');
}
Socket_kinect.onopen = function(){
	 var RequestData={"cmd":0};
     Socket_kinect.send(JSON.stringify(RequestData));
}
Socket_kinect.onmessage = function(a){
	var k = JSON.parse(a.data);
	if (k.isPeople) {
    $(".pingbao").css("display","none");
	}else{

    $(".pingbao").css("display","block");
	}
}

