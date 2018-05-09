<template>
  <div class="imglist">
    <Modal v-model="model" width="660" @on-visible-change="modelChange">
        <p slot="header" style="text-align:center">
            <Icon type="information-circled" color="green"></Icon>
            <span>附件管理</span>
        </p>
        <div>
            <Tabs type="card" v-model="tabName">               
                <TabPane name="article" label="文章附件" style="height:400px;overflow-y:scroll;">
                    <ul class="img-list">
                        <li v-for="(img,index) in articleImgs" :class="{'right-margin':(index+1)%5!=0}" @click="articleClick(index)">
                            <img :src="img.src">
                            <div class="border"></div>
                            <div class="active" v-if="img.active">
                                <Icon class="dui" type="checkmark-round" size="16" color="#fff"></Icon>
                            </div>
                        </li>
                    </ul>
                </TabPane>
                <TabPane name="my" label="我的附件">
                    <ul class="img-list">
                        <li v-for="(img,index) in myImgs" :class="{'right-margin':(index+1)%5!=0}" @click="myClick(index)">
                            <img :src="img.src">
                            <div class="border"></div>
                            <div class="active" v-if="img.active">
                                <Icon class="dui" type="checkmark-round" size="16" color="#fff"></Icon>
                            </div>
                        </li>
                    </ul>
                </TabPane>             
            </Tabs>            
        </div>
        <div slot="footer">
            <Button type="success" size="large" long @click="insert">插入</Button>
        </div>
    </Modal>
  </div>
</template>

<script>
import img1 from "@/assets/images/1.jpg"
import img2 from "@/assets/images/2.jpg"
import img3 from "@/assets/images/3.jpg"
import img4 from "@/assets/images/4.jpg"
import img5 from "@/assets/images/5.jpg"
import img6 from "@/assets/images/6.jpg"
import img7 from "@/assets/images/7.jpg"
import img8 from "@/assets/images/8.jpg"
import img9 from "@/assets/images/9.jpg"
import img10 from "@/assets/images/10.jpg"
export default {
    data(){
        return {
            tabName:'article',
            model:this.value,
            articleImgs:[
                {src:img1,active:false},
                {src:img2,active:false},
                {src:img3,active:false},
                {src:img4,active:false},
                {src:img5,active:false},
                {src:img6,active:false},
                {src:img7,active:false},
                {src:img8,active:false},
                {src:img9,active:false},
                {src:img10,active:false}
            ],
            myImgs:[
                {src:img1,active:false},
                {src:img2,active:false},
                {src:img3,active:false},
                {src:img4,active:false},
                {src:img5,active:false},
                {src:img6,active:false}
            ]
        }
    },
    props:{
        value:{
            type:Boolean,
            default:true
        }
    },
    methods:{
        modelChange(value){
            this.$emit('input', value);
        },
        articleClick(index){
            this.articleImgs[index].active=!this.articleImgs[index].active;
        },
        myClick(index){
            this.myImgs[index].active=!this.myImgs[index].active;
        },
        insert(){
            let imgArr=[];
            for(let i of this.articleImgs){
                if(i.active){
                    imgArr.push(i.src);
                }
            }
            for(let i of this.myImgs){
                if(i.active){
                    imgArr.push(i.src);
                }
            }
            this.$emit("insert",imgArr);
        }
    },
    watch:{
        value(){
            this.model=this.value;
            if(!this.value){
                for(let i of this.articleImgs){
                    i.active=false;
                }
                for(let i of this.myImgs){
                    i.active=false;
                }
            }
        }
    }
}
</script>

<style scoped>
    .img-list>li{
        cursor:pointer;
        float:left;
        position: relative;
        margin-bottom:9px;       
    }
    .img-list>li:hover .border{
        display:block;
    }
    .right-margin{
        margin-right:9px;
    }
    .img-list img{
        width:113px;
        height:113px;
    }
    .border{
        display:none;
        position: absolute;
        width:100%;
        height:100%;
        top:0;
        left:0;
        border:3px solid #1094FA;
    }
    .active{
        position: absolute;
        bottom:0;
        right:0;
        width: 0;
        height: 0;
        border-bottom: 35px solid #1094FA;
        border-left: 35px solid transparent;
    }
    .dui{
        position: absolute;
        bottom:-31px;
        right:3px;
    }
</style>
