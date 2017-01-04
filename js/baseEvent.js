var BaseEvent = BaseEvent || {
    REVISION: '0.0.0.1-2016-5-12'
};
BaseEvent.Url = "ws://127.0.0.1:9003";
BaseEvent.Socket = new WebSocket(BaseEvent.Url);

BaseEvent.CmdEnum=
{
  
    OpenWakeup : 0,
    CloseWakeup : 1,
    Wakeup : 2,
    GetDumpEnergy: 3,
    GetScramButton : 4,
    FaceColor : 5,
    GetProgramVersion : 6,
    dangerState : 7,

    getDropStatus:9,

    //eeprom
    GetPartNumber : 100,
    GetHardwareVersion : 101,
    GetSN : 102,
    GetManufactureDate : 103,
    GetGPSID : 104,

    //自检类
    Forward : 200,
    Back : 201,
    TurnLeft : 202,
    TurnRight : 203,
    Stop : 204,
    Ultrasonic : 205,
    StressTest : 206,
        
    Reboot : 1000,
    ShutDown : 1001,
    LogOff: 1002,
}
BaseEvent.RequestData = function (CmdEnum) {
    this.cmd = CmdEnum;
    return this;
}
BaseEvent.RequestData_Face = function (CmdEnum, FaceColorParams)
{
    this.cmd = CmdEnum;
    this.facecolorparams = FaceColorParams;
    return this; 
}
BaseEvent.RequestData_Ultrasonic = function (CmdEnum, UltrasonicParams) {
    this.cmd = CmdEnum;
    this.utparams = UltrasonicParams;
    return this;
}
BaseEvent.RequestData_Stress = function (CmdEnum, StressTestParams)
{
    this.cmd = CmdEnum;
    this.stparams = StressTestParams;
    return this;

}

BaseEvent.UltrasonicParams = function (num, distance)
{
    this.num = num;
    this.distance = distance;
    return this;
}
BaseEvent.FaceColorParams = function (id, colorR, colorG, colorB)
{
    this.id = id;
    this.colorR = colorR;
    this.colorG = colorG;
    this.colorB = colorB;
    return this;
}
BaseEvent.StressTestParams = function (motor, count)
{
    this.motor = motor;
    this.count = count;
    return this;
}
BaseEvent.Socket.onopen = function ()
{
//获取运行参数
var baseWorkData=new BaseEvent.WorkPool();
setTimeout(function(){
baseWorkData.GetDumpEnergy();
}, 2000);
// setTimeout(function(){
// baseWorkData.ReadEEPRom();
// }, 4000);
// setTimeout(function(){
// baseWorkData.ReadHV();
// }, 6000);
// setTimeout(function(){
// baseWorkData.ReadSN();
// }, 8000);
// setTimeout(function(){
// baseWorkData.ReadMD();
// }, 10000);
// setTimeout(function(){
// baseWorkData.ReadGPSID();
// }, 12000);
// setTimeout(function(){
// baseWorkData.ReadProgramVersion();
// }, 14000);
// setTimeout(function(){
// baseWorkData.GetScramState();
// }, 16000);

// setTimeout(function(){
// baseWorkData.GetDumpEnergy();
// }, 1800000);

 //重启
 var hd_status="";
$("#hd-reboot").click(function(){
    hd_status="reboot";
    $("#rebootMode").show();
    $("#hd-text").text("您确定要重启么？");
});
    //关机
$("#hd-shutDown").click(function(){
    hd_status="shutDown";
    $("#rebootMode").show();
        $("#hd-text").text("您确定要关机么？");
});
$("#rebootMode-no").click(function(){
     $("#rebootMode").hide();
});
$("#rebootMode-yes").click(function(){
      $("#rebootMode").hide();
      if (hd_status=="reboot") {
        reboot();
        setTimeout(function(){
        baseWorkData.Reboot();
    }, 3000);
      }else if (hd_status=="shutDown") {
        shutdown();
        setTimeout(function(){
            baseWorkData.ShutDown();
        }, 3000);
      }
});



   //急停状态
    // $("#hd-scramState").click(function(){
    //     baseWorkData.GetScramState();
    // });
    // $("#hd-settingColor1").click(function(){
    //     baseWorkData.SetEyesColor(255,0,0);
    // });
    // $("#hd-settingColor2").click(function(){
    //    baseWorkData.SetEyesColor(0,128,128);
    // });
    // $("#hd-settingColor3").click(function(){
    //    baseWorkData.SetEyesColor(27,11,245);
    // });
    // $("#hd-settingColor4").click(function(){
    //    baseWorkData.SetEyesColor(248,8,177);
    // });
    // $("#hd-settingColor5").click(function(){
    //    baseWorkData.SetEyesColor(160,8,248);
    // });
    // $("#hd-settingColor6").click(function(){
    //    baseWorkData.SetEyesColor(8,166,248);
    // });
    // $("#hd-settingColor7").click(function(){
    //    baseWorkData.SetEyesColor(121,248,8);
    // });
    // $("#hd-settingColor8").click(function(){
    //    baseWorkData.SetEyesColor(234,248,8);
    // });
    // $("#hd-settingColor9").click(function(){
    //    baseWorkData.SetEyesColor(255,255,255);
    // });
 //检测超声波
    $("#hd-SetUltrasonic").click(function(){
    var setUlt=1;
     setInterval(function(){
     baseWorkData.SetUltrasonic(setUlt);
        ++setUlt;
       if (setUlt==8) {
        setUlt=1;
       }
     }, 3000);
       
    });

    //电机检测
    $("#hd-StressTest-left").click(function(){
          baseWorkData.StressTest(2,10000);
    });
    $("#hd-StressTest-right").click(function(){
          baseWorkData.StressTest(3,10000);
    });
    //产品型号
    $("#hd-ReadEEPRom").click(function(){
        baseWorkData.ReadEEPRom();
    });
    //硬件版本
    $("#hd-ReadHV").click(function(){
        baseWorkData.ReadHV();
    });
    // 序列号
    $("#hd-ReadSN").click(function(){
        baseWorkData.ReadSN();
    });
    // 出厂日期
    $("#hd-ReadMD").click(function(){
        baseWorkData.ReadMD();
    });
    // 读取GPSID
    $("#hd-ReadGPSID").click(function(){
        baseWorkData.ReadGPSID();
    });
    // 读取程序版本
    $("#hd-ReadProgramVersion").click(function(){
        baseWorkData.ReadProgramVersion();
    });
    // 前进
    $("#hd-Forward").click(function(){
        baseWorkData.Forward();
    });
    // 后退
    $("#hd-Back").click(function(){
        baseWorkData.Back();
    });
    // 左转
    $("#hd-TurnLeft").click(function(){
        baseWorkData.TurnLeft();
    });
    // 右转
    $("#hd-TurnRight").click(function(){
        baseWorkData.TurnRight();
    });
    // 停止
    $("#hd-Stop").click(function(){
        baseWorkData.Stop();
    });
}

BaseEvent.Socket.onmessage = function (e)
{
    var Msg = JSON.parse(e.data);
    switch (Msg.cmd) {
        case BaseEvent.CmdEnum.Wakeup:
            break;
        case BaseEvent.CmdEnum.GetScramButton:
            if (Msg.value=="Normal") {
             document.getElementById("hd-scramState-value").innerHTML="正常";
            }else{
             document.getElementById("hd-scramState-value").innerHTML="异常";
            }
            break;
        case BaseEvent.CmdEnum.GetDumpEnergy:
             powerChange(Msg.value);
             //powerData(Msg.value);
             if (Msg.value<10) {
                 $(".system-tip").show();
                 $(".system-tip-title").text("电量不足");
             }else{
                 $(".system-tip").hide();
             }
            break;
        case BaseEvent.CmdEnum.GetPartNumber:
            document.getElementById("hd-ReadEEPRom-val").innerHTML="产品型号:" + Msg.value;
            break;
        case BaseEvent.CmdEnum.GetHardwareVersion:
            document.getElementById("hd-ReadHV-val").innerHTML="硬件版本:" + Msg.value;
            break;
        case BaseEvent.CmdEnum.GetSN:
            document.getElementById("hd-ReadSN-val").innerHTML="序列号:" + Msg.value;
            break;
        case BaseEvent.CmdEnum.GetManufactureDate:
            document.getElementById("hd-ReadMD-val").innerHTML="出厂日期:" + Msg.value;
            break;
        case BaseEvent.CmdEnum.GetGPSID:
            document.getElementById("hd-ReadGPSID-val").innerHTML="GPSID:" + Msg.value;
            break;
        case BaseEvent.CmdEnum.GetProgramVersion:
            document.getElementById("hd-ReadProgramVersion-val").innerHTML="程序版本:" + Msg.value;
            break;
        case BaseEvent.CmdEnum.StressTest:
            if (Msg.state==0) {
                document.getElementById("hd-StressTest-val").innerHTML="电机疲劳测试正常";
            }
            else {
                document.getElementById("hd-StressTest-val").innerHTML="电机疲劳测试异常:" + Msg.value;
            }
            break;
        case BaseEvent.CmdEnum.Forward:
            if (Msg.state == 0) {
                document.getElementById("hd-Forward-val").innerHTML="前进测试正常";
            }
            else {
        
                document.getElementById("hd-Forward-val").innerHTML="前进测试异常:" + Msg.value;
            }
            break;
        case BaseEvent.CmdEnum.Back:
            if (Msg.state == 0) {
                document.getElementById("hd-Back-val").innerHTML="后退测试正常";
            }
            else {
                document.getElementById("hd-Back-val").innerHTML="后退测试异常:" + Msg.value;
            }
            break;
        case BaseEvent.CmdEnum.TurnLeft:
            if (Msg.state == 0) {
                document.getElementById("hd-TurnLeft-val").innerHTML="左转测试正常";
            }
            else {
                document.getElementById("hd-TurnLeft-val").innerHTML="左转测试异常:" + Msg.value;
            }
            break;
        case BaseEvent.CmdEnum.TurnRight:
            if (Msg.state == 0) {
                document.getElementById("hd-TurnRight-val").innerHTML="右转测试正常";
            }
            else {
                document.getElementById("hd-TurnRight-val").innerHTML="右转测试异常:" + Msg.value;
            }
            break;
        case BaseEvent.CmdEnum.Ultrasonic:
            if (Msg.state == 0) {
                document.getElementById("hd-SetUltrasonic-val").innerHTML="超声波测试正常:" + Msg.utparams.distance;
            }
            else {
                document.getElementById("hd-SetUltrasonic-val").innerHTML="超声波测试异常:" + Msg.utparams.distance
            }
            break;
        case BaseEvent.CmdEnum.FaceColor:
            if (Msg.state == 0) {
            }
            else {
            }
            break;
        case BaseEvent.CmdEnum.dangerState:
            $("#danger").show();
             Stop_motion();
            break;
        case BaseEvent.CmdEnum.getDropStatus:
             if (Msg.value=="0") {
               document.getElementById("dropStatus").checked=true;
               window.localStorage.setItem("dropStatus","0");
             }else if (Msg.value=="1") {
               document.getElementById("dropStatus").checked=false;
               window.localStorage.setItem("dropStatus","1");
             }
            break;
        default:
            break;
    }
}


BaseEvent.Socket.onclose = function ()
{
    console.log("BaseEvent.Socket Closed!");
}
BaseEvent.Socket.onerror = function ()
{

}

/* 工作池 */
BaseEvent.WorkPool = function ()
{
    /* 订阅唤醒命令 */
    this.SubscribeWakeUp = function ()
    {
        var Send_Data = new BaseEvent.RequestData(BaseEvent.CmdEnum.OpenWakeup);
        BaseEvent.Socket.send(JSON.stringify(Send_Data));
    }
    /* 取消唤醒命令订阅 */
    this.UnsubscribeWakeUp = function ()
    {
        var Send_Data = new BaseEvent.RequestData(BaseEvent.CmdEnum.CloseWakeup);
        BaseEvent.Socket.send(JSON.stringify(Send_Data));
    }
    /* 获取电量 */
    this.GetDumpEnergy = function ()
    {
        var Send_Data = new BaseEvent.RequestData(BaseEvent.CmdEnum.GetDumpEnergy);
        BaseEvent.Socket.send(JSON.stringify(Send_Data));
    }
    /* 获取急停状态 */
    this.GetScramState = function ()
    {
        var p1 = new BaseEvent.UltrasonicParams(1, 3);
        var p2 = new BaseEvent.FaceColorParams(1, 255, 255, 255);
        var Send_Data = new BaseEvent.RequestData(BaseEvent.CmdEnum.GetScramButton, p1, p2);
        BaseEvent.Socket.send(JSON.stringify(Send_Data));
    }
    /* 设定眼睛颜色 */
    this.SetEyesColor = function (R, G, B) {
        var Color = new BaseEvent.FaceColorParams(1,R,G,B);
        var Send_Data = new BaseEvent.RequestData_Face(BaseEvent.CmdEnum.FaceColor,Color);
        BaseEvent.Socket.send(JSON.stringify(Send_Data));
    }
    /* 检测超声波 */
    this.SetUltrasonic = function (Num)
    {
        var Ultrasonic = new BaseEvent.UltrasonicParams(Num, 3);
        var Send_Data = new BaseEvent.RequestData_Ultrasonic(BaseEvent.CmdEnum.Ultrasonic, Ultrasonic);
        BaseEvent.Socket.send(JSON.stringify(Send_Data));
    }
    /* 电机疲劳测试 */
    this.StressTest = function (motor, count)
    {
        var Stress = new BaseEvent.StressTestParams(motor, count);
        var Send_Data = new BaseEvent.RequestData_Stress(BaseEvent.CmdEnum.StressTest, Stress);
        BaseEvent.Socket.send(JSON.stringify(Send_Data));
    }
    /* 读取产品型号 */
    this.ReadEEPRom = function ()
    {
        var Send_Data = new BaseEvent.RequestData(BaseEvent.CmdEnum.GetPartNumber);
        BaseEvent.Socket.send(JSON.stringify(Send_Data));
    }
    /* 读取硬件版本 */
    this.ReadHV = function ()
    {
        var Send_Data = new BaseEvent.RequestData(BaseEvent.CmdEnum.GetHardwareVersion);
        BaseEvent.Socket.send(JSON.stringify(Send_Data));
    }
    /* 读取序列号 */
    this.ReadSN = function ()
    {
        var Send_Data = new BaseEvent.RequestData(BaseEvent.CmdEnum.GetSN);
        BaseEvent.Socket.send(JSON.stringify(Send_Data));
    }
    /* 读取出厂日期 */
    this.ReadMD = function () {
        var Send_Data = new BaseEvent.RequestData(BaseEvent.CmdEnum.GetManufactureDate);
        BaseEvent.Socket.send(JSON.stringify(Send_Data));
    }
    /* 读取GPS ID */
    this.ReadGPSID = function () {
        var Send_Data = new BaseEvent.RequestData(BaseEvent.CmdEnum.GetGPSID);
        BaseEvent.Socket.send(JSON.stringify(Send_Data));
    }

    /* 读取程序版本 */
    this.ReadProgramVersion = function () {
        var Send_Data = new BaseEvent.RequestData(BaseEvent.CmdEnum.GetProgramVersion);
        BaseEvent.Socket.send(JSON.stringify(Send_Data));
    }
    /* 重启 */
    this.Reboot = function () {
        var Send_Data = new BaseEvent.RequestData(BaseEvent.CmdEnum.Reboot);
        BaseEvent.Socket.send(JSON.stringify(Send_Data));
    }
    /* 关机 */
    this.ShutDown = function () {
        var Send_Data = new BaseEvent.RequestData(BaseEvent.CmdEnum.ShutDown);
        BaseEvent.Socket.send(JSON.stringify(Send_Data));
    }

    /* 前进 */
    this.Forward = function () {
        var Send_Data = new BaseEvent.RequestData(BaseEvent.CmdEnum.Forward);
        BaseEvent.Socket.send(JSON.stringify(Send_Data));
    }
    /* 后退 */
    this.Back = function () {
        var Send_Data = new BaseEvent.RequestData(BaseEvent.CmdEnum.Back);
        BaseEvent.Socket.send(JSON.stringify(Send_Data));
    }
    /* 左转 */
    this.TurnLeft = function () {
        var Send_Data = new BaseEvent.RequestData(BaseEvent.CmdEnum.TurnLeft);
        BaseEvent.Socket.send(JSON.stringify(Send_Data));
    }
    /* 右转 */
    this.TurnRight = function () {
        var Send_Data = new BaseEvent.RequestData(BaseEvent.CmdEnum.TurnRight);
        BaseEvent.Socket.send(JSON.stringify(Send_Data));
    }
    /* 停止 */
    this.Stop = function () {
        var Send_Data = new BaseEvent.RequestData(BaseEvent.CmdEnum.Stop);
        BaseEvent.Socket.send(JSON.stringify(Send_Data));
    }
  
}

