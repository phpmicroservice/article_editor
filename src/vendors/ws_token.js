import Vue from 'vue';
import lodash from 'lodash'
import Hashes from 'jshashes'
import config from '@/config/config'
var MD5 = new Hashes.MD5
let ws_token={
    get(){
        //获取
        let ws_token =Vue.ls.get('ws-token',false);
        return ws_token;
        
    },
    set(new_token){
        //设置
        let re =Vue.ls.set('ws-token',new_token,config.token_time);
        return re;
    },
    can(callback){
        //当token存在的时候执行
        let ws_token =this.get();
        if(ws_token==false){
            //token不存在就先获取token在执行回调函数
            let ws_token=MD5.hex(MD5.hex(new Date().getTime()) + MD5.hex(lodash.random(9999999, true))+ MD5.hex(lodash.random(9999999, true)));
            this.set(ws_token);
            callback.call();

        }else{
            callback.call();
        }
    }
}
export default ws_token;