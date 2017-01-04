/*!
 * HRG-Camera-Vocie v1.1.1 
 * Copyright 2015-2016 HIT ROBOT GROUP
 * Date: 2016-6-23 17:33:30 
 *
 * 调用说明：
 * open_cameraVideo()        开启视频订阅
 * close_cameraVideo()       关闭视频订阅
 * open_cameraFaceRecog()    开启人脸识别 
 * close_cameraFaceRecog()   关闭人脸识别 
 * reg_cameraFaceRecog(image,name)     人脸注册 image-头像  name-姓名
 *
 * 收到推送信息执行函数：
 * getCameraVideo 视频信息推送 
 * getCameraFace  人脸识别信息推送
 * getFaceRegResult 人脸注册结果信息推送
 *
 */


function open_cameraVideo() {
  var a = {
    cmd: 0
  };
  Socket_Camera.send(JSON.stringify(a))
}

function close_cameraVideo() {
    videoUser=0;
  var a = {
    cmd: 1
  };
  Socket_Camera.send(JSON.stringify(a))
}
var isCameraFrg;

function open_cameraFaceRecog() {
	console.log("开启人脸识别");
  var a = {
    cmd: 4
  };
  if (isCameraFrg=="1") {
   try{
     Socket_Camera.send(JSON.stringify(a));
   }catch(e){}
  }
}
$("#faceRecog").change(function(event) {
  var isToggle=document.getElementById("faceRecog").checked;
   if (isToggle) {
    window.localStorage.setItem("cameraFg","0");
     isCameraFrg=0;
    close_cameraFaceRecog();
   }else{
    isCameraFrg=1;
    open_cameraFaceRecog();
   window.localStorage.setItem("cameraFg","1");
   }
});





function close_cameraFaceRecog() {
  var a = {
    cmd: 5
  };
  Socket_Camera.send(JSON.stringify(a))
}

function reg_cameraFaceRecog(a, b) {
  var b = document.getElementById("numkeyboard1").value,
    a = select_image_string;
  if (null != b && "" != b)
    if (null != a && "" != a) {
      a = a.substr(22, a.length - 22);
      for (var c = {
          imagebase64string: null,
          name: null
        }, d = {
          cmd: null,
          person: c
        }, e = a.length, f = 0; e > 0;) {
        var g = a.substr(0 + 500 * f, 500);
        d.cmd = 9, c.imagebase64string = g, Socket_Camera.send(JSON.stringify(d)), e -= 500, f++
      }
      d.cmd = 10, c.imagebase64string = null, c.name = b, Socket_Camera.send(JSON.stringify(d))
    } else alert("\u6ce8\u518c\u4fe1\u606f\u4e0d\u5b8c\u6574:\u8bf7\u9009\u62e9\u7167\u7247");
  else alert("\u6ce8\u518c\u4fe1\u606f\u4e0d\u5b8c\u6574:\u8bf7\u586b\u5199\u59d3\u540d")
}
var Socket_Camera = new WebSocket("ws://127.0.0.1:9002");
Socket_Camera.onopen = function(a) {
  var cameraFg=window.localStorage.getItem("cameraFg"); 
if (cameraFg==null) {
    isCameraFrg="1";
   // document.getElementById("faceRecog").checked=false;
    window.localStorage.setItem("cameraFg","1");
    open_cameraFaceRecog();
}else{
  if (cameraFg=="0") {
    isCameraFrg="0";
   // document.getElementById("faceRecog").checked=true;
    close_cameraFaceRecog();
  }else if(cameraFg=="1"){
    isCameraFrg="1";
  //  document.getElementById("faceRecog").checked=false;
    open_cameraFaceRecog();
  }
}

}, Socket_Camera.onmessage = function(a) {
  var b = JSON.parse(a.data);
  console.log(b);
  if (0 == b.state) switch (b.cmd) {
    case 6:
      getCameraVideo(b);
      break;
    case 8:
      var c = {},
        d = b.personfaces[0].FaceDetec.Attribute;
      null != b.personfaces[0].FaceRecog ? (c.name = b.personfaces[0].FaceRecog.Name, c.confidence = Math.round(b.personfaces[0].FaceRecog.Confidence)) : (c.name = "", c.confidence = ""), c.age = d.Age, c.attractive = d.Attractive, c.eyeglass = d.EyeGlass, c.gender = d.Gender, c.sunglass = d.SunGlass, c.smile = d.Smile, 0 == b.personfaces[0].FaceDetec.FaceEmotion ? c.emotion = "" : 1 == b.personfaces[0].FaceDetec.FaceEmotion ? c.emotion = "\u751f\u6c14" : 2 == b.personfaces[0].FaceDetec.FaceEmotion ? c.emotion = "\u5e73\u9759" : 3 == b.personfaces[0].FaceDetec.FaceEmotion ? c.emotion = "\u538c\u6076" : 4 == b.personfaces[0].FaceDetec.FaceEmotion ? c.emotion = "\u9ad8\u5174" : 5 == b.personfaces[0].FaceDetec.FaceEmotion ? c.emotion = "\u96be\u8fc7" : 6 == b.personfaces[0].FaceDetec.FaceEmotion && (c.emotion = "\u5403\u60ca"), getCameraFace(c);
      break;
    case 10:
      getFaceRegResult(b)
  }
}, Socket_Camera.onclose = function() {}, Socket_Camera.onerror = function() {};
var videoUser=0;
function getCameraVideo(data){
 /*!
  * data.cmd 视频信息
  * data.imagebase64string 视频信息
  * data.state 状态 0表示成功，其他异常
  */

if (videoUser==1) {
 document.getElementById("photo_image").src = "data:image/png;base64," + data.imagebase64string;
}else if (videoUser==2) {
 document.getElementById("recog_image").src = "data:image/png;base64," + data.imagebase64string;  
}else if (videoUser==3) {
 document.getElementById("camera_image").src = "data:image/png;base64," + data.imagebase64string;
}

       if (take_photo) {
        take_photo = false;
        if (count < 4){
                        switch (count) {
                            case 1:
                                document.getElementById("image1").src = "data:image/png;base64," + data.imagebase64string;
                                break;
                            case 2:
                                document.getElementById("image2").src = "data:image/png;base64," + data.imagebase64string;
                                break;
                            case 3:
                                document.getElementById("image3").src = "data:image/png;base64," + data.imagebase64string;
                                break;
                            default:
                                break;
                        }
                      if (count==3) {
                            count=0;
                      }
                    }

    }
    if (catch_photo) {
        catch_photo = false;
        if (catch_count < 2){
                        switch (catch_count) {
                            case 1:
                                document.getElementById("catch_image").src = "data:image/png;base64," + data.imagebase64string;
                                catchPhotoData=document.getElementById("catch_image").src;
                                break;
                        }
                      if (catch_count==1) {
                            catch_count=0;
                      }
                    }
    }
  
}

var faceBox = document.getElementById("faceBox");
var faceContent = "";
var take_photo = false;
var catch_photo=false;
var count=0;
var catch_count=0;
var speakName="";
var catchPhotoData;
var welcomeWord;
//场景设置
var welcomeWord=window.localStorage.getItem("welcomeWord");   
if (welcomeWord!=null) {
  $("#sceneVal").val(welcomeWord);
  }else{
    welcomeWord="欢迎光临哈工大机器人集团！";
  }
$("#saveScene").click(function(){
  welcomeWord=$("#sceneVal").val();
 window.localStorage.setItem("welcomeWord",$("#sceneVal").val());
  Materialize.toast('保存成功!', 500);
});
var wellcomeData=["您好，我是建行智能机器人小龙人，有什么可以帮助您？","您好，我是建行智能机器人小龙人，您可以这样对我说，怎样购买黄金钞？","您好，我是建行智能机器人小龙人，您可以这样问我，怎样购买理财产品？"];
var preTime="";
function getCameraFace(data){
  /*!
  * data.name 姓名
  * data.age  年龄
  * data.attractive 颜值0-100
  * data.eyeglass   是否戴眼镜 true戴 false未戴
  * data.gender     性别 0未知 1男 2女
  * data.sunglass   是否戴墨镜 true戴 false未戴
  * data.smile      微笑度0-100
  * data.confidence 置信度0-100
  * data.emotion    心情
  * 
  */
  
            // $(".face-name").text("");
            // $(".face-age").text("");
            // $(".face-sex").text("");
            // $(".face-yanzhi").text("");
            // $(".face-smile").text("");
            // $(".face-equal").text("");
            // $(".face-name").text(data.name);
            // $(".face-age").text(data.age);
            // $(".face-yanzhi").text(data.attractive);
            // $(".face-smile").text(data.smile);
            // $(".face-equal").text(data.confidence);


            //根据性别主动问候
           
            // if (data.gender == "1") {
            //     $(".face-sex").text("男");
            //     if (camTime - preTime > 15000) {
            //         if (data.name!= null) {
            //             cmdTTSspeak(data.name+"先生您好，"+welcomeWord);
            //         }
            //         else {
            //             cmdTTSspeak("先生您好，"+welcomeWord);
            //         }
               
            //         preTime = camTime;
            //     }
              
            // } else if (data.gender == "2") {
            //     $(".face-sex").text("女");
            //     if (camTime - preTime > 15000) {
            //         if (data.name != null) {
            //             cmdTTSspeak(data.name + "女士您好，"+welcomeWord);
            //         }
            //         else {
            //             cmdTTSspeak("女士您好，"+welcomeWord);
            //         }
              
            //         preTime = camTime;
            //     }
            // }

       console.log(data);
       //问好
       var isSpeakStatus=0;
       // if (isOnSpeak) {
       //      setTimeout(function(){
       //      	 isSpeakStatus=0;
       //      },40000);
       // }
        var camTime=Date.parse(new Date());

        if (!isOnSpeak && isSpeakStatus==0) {
         if (camTime - preTime > 15000) {  
              cmdTTSspeak(wellcomeData[parseInt(Math.random()*3)]);
        preTime = camTime;
       }       if (camTime - preTime > 15000) {  
              cmdTTSspeak(wellcomeData[parseInt(Math.random()*3)]);
        preTime = camTime;
       }
        }

      


}
function getFaceRegResult(data){
 /*!
  * data.cmd 结束人脸注册信息
  * data.state 状态 0表示成功，其他异常
  */
if (data.state==0) {
  Materialize.toast('恭喜您，注册成功！', 3000);
  }else{  Materialize.toast('注册失败，请重新注册！', 3000); }
}




var select_image_string = "";
        function choose(class_name) {
            switch (class_name) {
                case "li-1":
                    select_image_string = document.getElementById("image1").src;
                    document.getElementById("image1").style.border = "solid 1px #f00";
                    document.getElementById("image2").style.border = "solid 0px #f00";
                    document.getElementById("image3").style.border = "solid 0px #f00";
                    break;
                case "li-2":
                    select_image_string = document.getElementById("image2").src;
                    document.getElementById("image1").style.border = "solid 0px #f00";
                    document.getElementById("image2").style.border = "solid 1px #f00";
                    document.getElementById("image3").style.border = "solid 0px #f00";
                    break;
                case "li-3":
                    select_image_string = document.getElementById("image3").src;
                    document.getElementById("image1").style.border = "solid 0px #f00";
                    document.getElementById("image2").style.border = "solid 0px #f00";
                    document.getElementById("image3").style.border = "solid 1px #f00";
                    break;
                default:
                    break;
            }
            document.getElementById("image4").src = select_image_string;
        }

setInterval(function(){
    speakName="";
}, 300000);


$(function(){



$(".getInfoBtn").click(function(){
if (interval!=undefined) {
clearInterval(interval);
}
var timesRun = 5;
interval = setInterval(function(){
     $(".photoTime2").show();
 $(".photoTime2").text(timesRun);
--timesRun;
if(timesRun === 0){
clearInterval(interval);
 $(".photoTime2").hide();
  document.getElementById("photo-video").play();
        take_photo = true;
        ++count;
}
}, 1000);


});



 $(".photoTime").hide();
 var interval;
$(".catchPhoto-btn").click(function(){
    $(".catchPhoto1").css("border","solid 1px ");
            catchPhotoData="";
if (interval!=undefined) {
clearInterval(interval);
}
var timesRun = 5;
interval = setInterval(function(){
     $(".photoTime").show();
 $(".photoTime").text(timesRun);
--timesRun;
if(timesRun === -1){
clearInterval(interval);
 $(".photoTime").hide();
  document.getElementById("photo-video").play();
         catch_photo = true;
        ++catch_count;
}
//do whatever here..
}, 1000);

});

$("#image1").click(function(){
    choose("li-1");
});
$("#image2").click(function(){
    choose("li-2");
});
$("#image3").click(function(){
    choose("li-3");
});
$(".regSubmit").click(function(){
    reg_cameraFaceRecog();
});


$(".catchPhoto-save").click(function(){
    catchPhotoData=catchPhotoData.substr(22,catchPhotoData.length);
   if (catchPhotoData!="") {
            $.ajax({
        url:"http://127.0.0.1/Access.asmx/Takephoto",
        type: 'post',
        async: true,
        data: {imageString64:catchPhotoData},
        success: function(data) {
        if (data.result!="") {
         Materialize.toast('保存成功!', 2000); 
        }else{
         Materialize.toast('保存失败!', 2000); 
        }
        },
        error: function(request, error) {
         Materialize.toast('保存失败!', 2000); 
        }
    });
   }else{
         Materialize.toast('请选择要保存的照片!', 2000); 
   }


});
});