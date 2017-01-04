/*!
 * HRG-wzb  v1.1.1 
 * Date: 2016-12-7 
 *
 * 调用说明：
 * openNav(item,step)
 * openNav(currentNav.item,currentNav.step-1);   上一步
 * openNav(currentNav.item,currentNav.step+1);   下一步
 */



/*
 * 栏目编号
 * item10-13    链接wif     
 * item20-22    云闪付   
 * item30-32    理财产品介绍 
 * item40-      购买理财产品 
 * item50-      取款
 * item60-      存款
 *  
 *  
 * 
 */
   var homevideo=document.getElementById("home-video");
   if (homevideo) {
    homevideo.volume=0
   }

var speakCont={
  "item1":[''],
  "item2":[''],
  "item21":[''],
  "item22":[''],
  "item23":[''],
  "item3":[''],
  "item4":['']
};
//刷新
$(".home-voice").click(function(event) {
  location.reload();
});
console.log(speakCont);
var currentNav={"item":1,"step":0};
function openNav(item,step,category){
  console.log("打开模板-"+item);
  //初始化栏目
  $(".cont,.contlist,.dirbtn,.answer-cont").css("display","none");
  currentNav.item=item;
  currentNav.step=step;
  console.log(speakCont["item"+item][step]);
   //cmdTTSspeak(speakCont["item"+item][step]);
 
   $(".homecont"+item+",.homecont"+item+"-step"+step).show();
   if (speakCont["item"+item].length>1) {
     if (step==0) {
    $(".homecont-next").show();
   }else if(0<step&&step<speakCont["item"+item].length-1){
     $(".homecont-next,.homecont-pre").show(); 
   }else if(step==speakCont["item"+item].length-1){
    $(".homecont-pre").show();
   }
   }
}
function closeNav(){
  $(".cont,.contlist,.dirbtn").css("display","none");
  $(".answer-cont").css("display","block");
}




$(".homecont-next").click(function(e) {
  openNav(currentNav.item,currentNav.step+1);
});

$(".homecont-pre").click(function(e) {
  openNav(currentNav.item,currentNav.step-1);
});

//下一步
function nextBtn(){
  openNav(currentNav.item,currentNav.step+1);
}
//上一步
function preBtn(){
  openNav(currentNav.item,currentNav.step-1);
}



$(".home-button").click(function(){
   closeNav();
   $(".pingbao").css("display","block");
});
//按钮点击效果
$(".btn-blue").on("touchstart",function(){
$(".btn-blue").css("backgroundPosition","0 -98px");
});
$(".btn-blue").on("touchend",function(){
$(".btn-blue").css("backgroundPosition","0 0");
});
$(".btn-red").on("touchstart",function(){
$(".btn-red").css("backgroundPosition","0 -98px");
});
$(".btn-red").on("touchend",function(){
$(".btn-red").css("backgroundPosition","0 0");
});
$(".btn-android").on("touchstart",function(){
$(".btn-android").css("backgroundPosition","0 -278px");
});
$(".btn-android").on("touchend",function(){
$(".btn-android").css("backgroundPosition","0 0");
});
$(".btn-ios").on("touchstart",function(){
$(".btn-ios").css("backgroundPosition","0 -278px");
});
$(".btn-ios").on("touchend",function(){
$(".btn-ios").css("backgroundPosition","0 0");
});

$("#find-wifi").on("touchend",function(){
  openNav(11,0);
});

$("#wifi-paidui").on("touchend",function(){
  openNav(12,0);
});

$("#wifi-phone").on("touchend",function(){
  openNav(13,0);
});

$("#shanfu-ios").on("touchend",function(){
 openNav(21,0);
});
$("#shanfu-android").on("touchend",function(){
 openNav(22,0);
});
//购买理财
$(".buy-licai").on("touchend",function(){
  $(".buy-licai").css("backgroundColor","#7fd8f5");
 openNav(40,0);
});
$("#buylicai-1").on("touchstart",function(){
$("#buylicai-1").css("backgroundPosition","0 -244px");
});
$("#buylicai-1").on("touchend",function(){
$("#buylicai-1").css("backgroundPosition","0 0");
   // openNav(51,0);
});
$("#buylicai-2").on("touchstart",function(){
$("#buylicai-2").css("backgroundPosition","0 -262px");
});
$("#buylicai-2").on("touchend",function(){
$("#buylicai-2").css("backgroundPosition","0 0");
    openNav(41,0);
});
$("#buylicai-3").on("touchstart",function(){
$("#buylicai-3").css("backgroundPosition","0 -243px");
});
$("#buylicai-3").on("touchend",function(){
$("#buylicai-3").css("backgroundPosition","0 0");
   // openNav(51,0);
});

//取钱
$("#qukuan-1").on("touchstart",function(){
$("#qukuan-1").css("backgroundPosition","0 -233px");
});
$("#qukuan-1").on("touchend",function(){
$("#qukuan-1").css("backgroundPosition","0 0");
    openNav(51,0);
});
$("#qukuan-2").on("touchstart",function(){
$("#qukuan-2").css("backgroundPosition","0 -235px");
});
$("#qukuan-2").on("touchend",function(){
 $("#qukuan-2").css("backgroundPosition","0 0");
    openNav(52,0);
});
$("#qukuan-3").on("touchstart",function(){
$("#qukuan-3").css("backgroundPosition","0 -234px");
});
$("#qukuan-3").on("touchend",function(){
$("#qukuan-3").css("backgroundPosition","0 0");
    openNav(53,0);
});
//手机购买理财
$("#buylicai-phone").on("touchstart",function(){
//$("#buylicai-phone").css("backgroundColor","#f961f0");
});
$("#buylicai-phone").on("touchend",function(){
  //$("#buylicai-phone").css("backgroundColor","#d205c5");
    openNav(41,0);
});
//取钱-两万以上--取号
$("#qukuan-quhao").on("touchstart",function(){
$("#qukuan-quhao").css("backgroundPosition","0 -235px");
});
$("#qukuan-quhao").on("touchend",function(){
$("#qukuan-quhao").css("backgroundPosition","0 0");
});
//取钱-两万以上--带路
$("#qukuan-move").on("touchstart",function(){
$("#qukuan-move").css("backgroundPosition","0 -234px");
});
$("#qukuan-move").on("touchend",function(){
$("#qukuan-move").css("backgroundPosition","0 0");
});
//理财产品详情
function goLicaiDetail(id){
   openNav(id,0);
}



//测试区
// $(".home-button").on('touchstart',function(){
//    closeNav();
//    cmdISRstart();
// });
// $(".home-button").on('touchend',function(){
//    cmdISRend();
// });
//  setTimeout(function(){
//    //cmdISRstart();
  
//  },8000);

 
  // openNav(3,0);
  //openNav(10,0);




var robot={
  getTime:function(){
     var myhours=new Date().getHours();
     var myminutes=new Date().getMinutes();
     if (myhours<10) {
       myhours="0"+new Date().getHours();
     }
     if (myminutes<10) {
       myminutes="0"+new Date().getMinutes();
     }
     return myhours+":"+myminutes;
  },
  getDate:function(i){
    return new Date().getFullYear()+i+(new Date().getMonth()+1)+i+new Date().getDate();
  },
  getWeek:function(){
  var weeks = new Array('星期日','星期一','星期二','星期三','星期四','星期五','星期六');
  return weeks[new Date().getDay()];
  }
}
setInterval(function(){
 $(".robotTime").text(robot.getTime());
 $(".robotDate1").text(robot.getDate("-"));
 $(".robotDate2").text(robot.getDate("/"));
 $(".robotWeek").text(robot.getWeek());
}, 1000);
console.log(robot);





