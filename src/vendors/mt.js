import Vue from 'vue';
let mt=function(key){
    let str='';
    if(typeof key =='string'){     
        for(let i of key.split("&")){
            str+=Vue.t(i);
        }
    }
    return str;
}
export{mt}