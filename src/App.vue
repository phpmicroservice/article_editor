<template>
  <div id="app">
    <editor></editor>
  </div>  
</template>

<script>
import editor from "@/components/editor"
import ws_token from './vendors/ws_token';
export default {
  components:{
    editor
  },
  mounted(){
    //组件挂在到实例后调用
    ws_token.can(() => {
            
    });
  }
};
</script>
<style>
</style>