/*!
 * HRG-Power v1.1.1 
 * Copyright 2015-2016 HIT ROBOT GROUP
 * Date: 2016-6-23 17:33:30 
 *
 * 调用说明：
 * powerChange()        首页电量显示,值（0-100）
 * powerData()          后台电量显示，值（0-100）
 * storageData()        后台内存使用量显示，值（0-0100）
 *
 */
function powerChange(a){$(".power").text(a+"%"),a=a/100+1;var b=document.getElementById("pover-canv"),c=b.getContext("2d");c.clearRect(0,0,142,194),c.beginPath(),c.arc(60,60,46,3.14,Math.PI*a,0),c.strokeStyle="#0e5be1",c.lineCap="round",c.shadowBlur=10,c.shadowColor="rgba(255, 255, 255, 1)",c.lineWidth=4,c.stroke(),c.closePath(),c.beginPath(),a>1.1?c.arc(60,60,46,3.14,1.1*Math.PI,0):c.arc(60,60,46,3.14,Math.PI*a,0),c.strokeStyle="#ff4444",c.lineWidth=4,c.stroke(),c.closePath()}
      

powerChange(80);
