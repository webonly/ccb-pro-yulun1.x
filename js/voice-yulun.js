/**
 *
 */


/*!
 * TAX-Voice v1.1.1 
 * Copyright 2015-2016 HIT ROBOT GROUP
 * Date: 2016-12-15 16:33:30 
 *
 * 调用说明：
 * openTaxVoice()       开启语音交互
 * closeTaxVoice()      关闭语音交互
 * sendQuestion(text)       发送问题请求
 */
var picURL="http://128.128.112.188:8080";
var URL="ws://127.0.0.1:9009";
var nextStepMsg;


var tax_websocket=new WebSocket(URL);
//开启语音交互
function openTaxVoice(){
  console.log("开启语音");
	var sendData={"cmd":"open","uid":"唯一序列"};
	tax_websocket.send(JSON.stringify(sendData));
}
//关闭语音交互
function closeTaxVoice(){
        console.log("关闭语音");
	var sendData={"cmd":"close","uid":"唯一序列"}
	tax_websocket.send(JSON.stringify(sendData));
}
//发送问题请求
function sendQuestion(text){
	var sendData={"cmd":"question","question":"你好"};
	sendData.question=text;
		tax_websocket.send(JSON.stringify(sendData));
}

tax_websocket.onopen=function(){
     console.log("连接成功");
     openTaxVoice();
}
tax_websocket.onmessage=function(e){
    console.log(e);
    var data=JSON.parse(e.data);
    console.log(data);
    if (data.cmd=="open" && data.result=="1") {
    	// 开启语音交互成功
        console.log("开启成功");
        $(".voice-cont").html(data.welcome+"&nbsp;&nbsp;");
              $(".pingbao").css("display","none");
    }
     if (data.cmd=="close" && data.result=="1") {
        // 开启语音交互成功
        console.log("关闭成功");
    }   
    //提问消息推送
    if (data.func=="question") {
//     	{
//   "func":"question",
//   "body":{
// 	"ustatus":0,
// 	"question":"你是谁？",
//   }
// }

     //我要去咨询区
     if (data.body.question.match("贵宾区")) {
        console.log("贵宾区");
        mapController(1);
     }
      if (data.body.question.match("贵宾室")) {
        console.log("贵宾区");
        mapController(1);
     }
     if (data.body.question.match("体验区")) {
        console.log("体验区");
        mapController(2);
     }
     if (data.body.question.match("迎宾区")) {
        console.log("咨询区");
        mapController(0);
     }
      console.log(data.body.question);
      if (data.body.question!="。") {
        $(".voice-cont").html(data.body.question+"&nbsp;&nbsp;");
      }
      // if (data.body.question.match('我要上网')) {
      // 	openNav(10,0);
      // }
      // if (data.body.question.match('下一步')) {
      // 	//openNav(currentNav.item,currentNav.step+1); 
      // 	if ((currentNav.step+1)==1) {
      // 		sendQuestion("上网步骤一");
      // 		currentNav.step=currentNav.step+1;
      // 	}
      // 	if ((currentNav.step+1)==2) {
      // 		currentNav.step=currentNav.step+1;
      // 		sendQuestion("上网步骤二");
      // 	}
      // }

    }

    //应答消息推送
    if (data.func=="answer") {
    $(".pingbao").css("display","none");
//     	{
//   "func":"answer",
//   "body":{
// 	"ustatus":0,
// "answer":"您好，我是机器人，很高兴为您服务，有什么可以帮您呢?",
// 	"answerType":"1"
//   }
// }



 
    
  if (data.body.attr!=null && data.body.attr.length>0) {
    var attrImage;
    var attrCodeNext;

    for(var i=0;i<data.body.attr.length;i++){
        if (data.body.attr[i].plustype=="codemsg") {
           if (data.body.attr[i].plusmsg=="next") {
             //sendQuestion(nextStepMsg);
             attrCodeNext="next";
           }else {
             nextStepMsg=data.body.attr[i].plusmsg;
           }
        }else if(data.body.attr[i].plustype=="imgmsg"){
            attrImage=data.body.attr[i].plusurl;
        }
    }

  
   console.log(attrCodeNext);
   console.log(nextStepMsg);
   console.log(attrImage);
   if(attrCodeNext=="next"){
      sendQuestion(nextStepMsg.substring(13));
      attrCodeNext="";
   }
   if (attrImage!="") {
       if (data.body.answer_link.length==0) {
        console.log('只有图片');
      openNav(1,0);
      if (data.body.answer!="。") {
        $(".answerpic-cont").html(data.body.answer);
      }
      $("#answerOnlyPic").html("<image class='answer-picsize'  src='"+picURL+attrImage+"' height='400'>");
       }else if(data.body.answer_link.length>0){
       if (data.body.attr[0].plustype=="imgmsg") {
                  console.log('图片+按钮');
      openNav(3,0);
      if (data.body.answer!="。") {
        $(".answerpic-cont").html(data.body.answer);
      }
      $("#answerBtnPic").html("<image class='answer-picsize'  src='"+picURL+attrImage+"' height='400'>");

            var btnstr="";
      for(var i=0;i<data.body.answer_link.length;i++){
         btnstr+=data.body.answer_link[i];
      }
      if (data.body.answer!="。") {
        $(".answerpic-cont").html(data.body.answer);
      }
      console.log(btnstr);
      $("#answerPicBtn").html(btnstr);
       
       }else{
       

        console.log('只有按钮'+nextStepMsg);

        if (nextStepMsg=="move:vip") {
        openNav(4,0);
         if (data.body.answer!="。") {
                $(".answerpic-cont").html(data.body.answer);
              }
        }else{

        var btnstr="";
        for(var i=0;i<data.body.answer_link.length;i++){
           btnstr+=data.body.answer_link[i];
        }
        if (data.body.answer!="。") {
        $(".answerpic-cont").html(data.body.answer);

        console.log(btnstr);
         openNav(2,0);
         $("#answerOnlyBtn").html(btnstr);


       }
        

        }
       }


      }

      attrImage="";
   }
  


  }else if(data.body.attr==null && data.body.answer_link.length>0){ //只有按钮的
      console.log('只有按钮2');
      var btnstr="";
      for(var i=0;i<data.body.answer_link.length;i++){
         btnstr+=data.body.answer_link[i];
      }
      
      if (data.body.answer_link.length==1) {
         openNav(21,0);
         $("#answerOnlyBtn1").html(btnstr);
      }
      if (data.body.answer_link.length==2) {
         openNav(22,0);
         $("#answerOnlyBtn2").html(btnstr);
      }
      if (data.body.answer_link.length==3) {
         openNav(23,0);
         $("#answerOnlyBtn3").html(btnstr);
      }

      if (data.body.answer!="。") {
        $(".answerpic-cont").html(data.body.answer);
      }

  }else{
          console.log('其他');
          closeNav();
          $(".answer-cont").html(data.body.answer+"&nbsp;&nbsp;");
    }
    











    // if (data.body.attr!=null && data.body.answer_link.length==0) {       //只带图片
    //   console.log('只有图片');
    //   openNav(1,0);
    //   $(".answerpic-cont").html(data.body.answer+"&nbsp;&nbsp;");
    //   $("#answerOnlyPic").html("<image class='answer-picsize'  src='"+picURL+data.body.attr[0].plusurl+"' height='400'>");
    //   console.log(picURL+data.body.attr[0]);
    // }else if (data.body.attr==null && data.body.answer_link.length>0) {      //只带按钮的
    //   console.log('只有按钮');
    //   openNav(2,0);
    //   var btnstr="";
    //   for(var i=0;i<data.body.answer_link.length;i++){
    //      btnstr+=data.body.answer_link[i];
    //   }
    //   $(".answerpic-cont").html(data.body.answer+"&nbsp;&nbsp;");
    //   console.log(btnstr);
    //   $("#answerOnlyBtn").html(btnstr);
    // }else if (data.body.attr!=null && data.body.answer_link.length>0) {         //带图片+按钮
    //         console.log('图片+按钮');
    //   openNav(3,0);
    //   $(".answerpic-cont").html(data.body.answer+"&nbsp;&nbsp;");
    //   $("#answerBtnPic").html("<image class='answer-picsize'  src='"+picURL+data.body.attr[0].plusurl+"' height='400'>");

    //         var btnstr="";
    //   for(var i=0;i<data.body.answer_link.length;i++){
    //      btnstr+=data.body.answer_link[i];
    //   }
    //   $(".answerpic-cont").html(data.body.answer+"&nbsp;&nbsp;");
    //   console.log(btnstr);
    //   $("#answerPicBtn").html(btnstr);
    // }else{
    //       console.log('其他');
    //       closeNav();
    //       $(".answer-cont").html(data.body.answer+"&nbsp;&nbsp;");
    // }











     // var text2=data.body.answer_link;
     // console.log(text2);
     // var textStr="";
     // for(var i=0;i<text2.length;i++){
     //       textStr+=text2[i];
     // }
     // console.log(textStr);
     // document.getElementById("tellcont").innerHTML=textStr;
      
     //  $(".voice-cont").text(c);
     //  $(".answer-cont").text(textStr);
     //$("#tellcont").append("<p class='voice-robot'>" + c + "</p><p class='voice-human'>" + textStr + "</p>"), $(".voice-cont").scrollTop($(".voice-cont")[0].scrollHeight);
    }












}

function audiosend(text){
   sendQuestion(text) 
}

// 按钮触发事件
function audiosend(value){
   console.log(value);
   sendQuestion(value);
}

// setTimeout(function(){
//   sendQuestion("理财产品");
// },7000);


$("#open").click(function(){
openTaxVoice();
});
$("#close").click(function(){
closeTaxVoice();
});
$("#speak").click(function(){
 var text=document.getElementById("voicetext").value;
 console.log(text);
sendQuestion(text);
});