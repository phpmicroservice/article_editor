import Hashes from 'jshashes'
import lodash from 'lodash'
import config from '../config/config'
import Vue from 'vue';
var MD5 = new Hashes.MD5
var wsServer = new WebSocket(config.scoket_url);
// wsServer.onopen = function () {
//     // Web Socket 已连接上，使用 send() 方法发送数据

// };
wsServer.onclose = function () { //当链接关闭的时候触发
    // console.log('连接已关闭');       
};
wsServer.onerror = function (e) { //错误情况触发
    // if(error){
    //     error(e);
    // }     
}
setInterval(()=>{
    socket('article@/demo/index',{},res=>{
        
    })
},50000)
function socket(mt, d,res = false, error = false,p) {
    //发送消息并绑定回调函数
    // 如果没有传p
    if(!p){
        p=MD5.hex(mt+JSON.stringify(d)+new Date().getTime()+Vue.ls.get('ws-token'));
    }
    var mt = mt.split('@');
    var data = {
        s: mt[0],
        r: mt[1],
        d: d,
        p:p,
        sid:Vue.ls.get('ws-token')
    }
    var time =null;
    var receive = function (d) {    
        clearTimeout(time);
        var res_data = JSON.parse(d.data);
        if(p==res_data.p){
            //如果成功
            if(!JSON.parse(d.data).e){
                res(JSON.parse(d.data));
            }else{
                // 没有权限
                if(JSON.parse(d.data).e==401||JSON.parse(d.data).e==403){
                    window.parent.postMessage({
                        'event':'403',
                        'data':{}
                    },"*");
                }
                error(JSON.parse(d.data));
            }
            wsServer.removeEventListener("message",receive);
        }   
    }
    wsServer.addEventListener('message', receive);
    try {
        data = JSON.stringify(data);
    } catch (err) {
        return false;
    }    
    if(wsServer.readyState==1){
        time=setTimeout(() => {
            wsServer.send(data);
        },10);  
    }else{
        wsServer.addEventListener('open', function () {            
            time=setTimeout(() => {
                wsServer.send(data);
            },10);  
        });
    }
}
export {
    socket
}