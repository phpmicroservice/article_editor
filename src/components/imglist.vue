<template>
  <div class="imglist">
    <Modal v-model="model" width="660" class-name="imglist-modal" @on-visible-change="modelChange">
        <p slot="header" style="text-align:center">
            <Icon type="information-circled" color="green"></Icon>
            <span>附件管理</span>
        </p>
        <div>
            <Tabs type="card" v-model="tabName" @on-click="tabClick">               
                <TabPane name="my" label="我的附件" style="height:300px;">
                    <ul class="img-list">
                        <li v-for="(img,index) in myImgs" class="img" :class="{'right-margin':(index+1)%5!=0}" @click="myImgClick(img.id)">
                            <img :src="file_url+'/file/pic/' +img.id +'/1.jpg'">
                            <div class="border"></div>
                            <div class="active" v-if="myActiveIf(img.id)">
                                <div>
                                    <Icon class="dui" type="checkmark-round" size="16" color="#fff"></Icon>
                                </div> 
                            </div>
                        </li>
                        <li class="clear"></li>
                    </ul>
                    <Page class="page" :current="my_p" :page-size="my_pageSize" :total="my_total_items" show-total show-elevator @on-change="my_pageChange"></Page>
                </TabPane>
                <TabPane name="article" label="文章附件" style="height:300px;overflow:auto;">
                    <ul class="img-list">
                        <li v-for="(img,index) in articleImgs" class="img" :class="{'right-margin':(index+1)%5!=0}" @click="articleImgClick(img)">
                            <img :src="file_url+'/file/pic/' +img +'/1.jpg'">
                            <div class="border"></div>
                            <div class="active" v-if="articleActiveIf(img)">
                                <div>
                                    <Icon class="dui" type="checkmark-round" size="16" color="#fff"></Icon>
                                </div>    
                            </div>
                        </li>
                        <li class="clear"></li>
                    </ul>
                </TabPane>             
            </Tabs>            
        </div>
        <div slot="footer">
            <Button type="success" size="large" long @click="insert">插入</Button>
        </div>
        <Spin fix v-if="spinShow">
            <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
        </Spin>
    </Modal>
  </div>
</template>

<script>
import config from "@/config/config"
export default {
    data(){
        return {
            tabName:'my',
            file_url:config.file_url,
            model:this.value,
            my_p: 1,
            my_pageSize: 0,
            my_total_items: 0,
            myImgs:[],         
            articleImgs:[],
            myActiveImgs:[],   
            articleActiveImgs:[],
            spinShow:false
        }
    },
    props:{
        value:{
            type:Boolean,
            default:true
        },
        attachmentId:{
            type:String,
            default:''
        }
    },
    methods:{
        modelChange(value){
            this.$emit('input', value);
        },
        tabClick(name){
            switch(name){
                case 'my':
                    this.myLoading();
                    break;
                case 'article':
                    this.articleLoading();
                    break;    
            }
        },
        articleClick(index){
            this.articleImgs[index].active=!this.articleImgs[index].active;
        },
        myImgClick(id){
            let key=true;
            for(let i=0; i<this.myActiveImgs; i++){
                if(this.myActiveImgs[i]==id){
                    key=false;
                    this.myActiveImgs.splice(i,1);
                }
            }
            if(key){
                this.myActiveImgs.push(id);
            }
        },
        articleImgClick(id){
            let key=true;
            for(let i=0; i<this.articleActiveImgs; i++){
                if(this.articleActiveImgs[i]==id){
                    key=false;
                    this.articleActiveImgs.splice(i,1);
                }
            }
            if(key){
                this.articleActiveImgs.push(id);
            }
        },
        myActiveIf(id){
            let key=false;
            for(let i of this.myActiveImgs){
                if(i==id){
                    key=true;
                }   
            }
            return key;
        },
        articleActiveIf(id){
            let key=false;
            for(let i of this.articleActiveImgs){
                if(i==id){
                    key=true;
                }   
            }
            return key;
        },
        insert(){
            let activeImgs=[];
            for(let i of this.myActiveImgs){
                activeImgs.push(i);
            }
            for(let i of this.articleActiveImgs){
                activeImgs.push(i);
            }
            this.myActiveImgs=[];
            this.articleActiveImgs=[];
            this.$emit("insert",activeImgs);
        },
        myLoading(){
            this.spinShow=true;
            this.$socket('file@/user/my',{p:this.my_p},res=>{
                this.spinShow=false;
                this.myImgs=res.d.items;
                this.my_pageSize = res.d.limit;
                this.my_total_items = res.d.total_items;
            },error=>{
                this.spinShow=false;
                this.$Message.error(error.m);
            })
        },
        my_pageChange(p){
            this.my_p = p;
            this.myLoading();
        },
        articleLoading(){
            this.spinShow=true;
            this.$socket('file@/user/arraylist',{array_id:this.attachmentId},res=>{
                this.spinShow=false;
                this.articleImgs=res.d;
            },error=>{
                this.spinShow=false;
                this.$Message.error(error.m);
            })
        }
    },
    watch:{
        value(){
            this.model=this.value;
            if(!this.value){
                
            }else{
                switch(this.tabName){
                    case 'my':
                        this.myLoading();
                        break;
                    case 'article':
                        this.articleLoading();
                        break;    
                }
            }
        }
    }
}
</script>

<style>
    .imglist-modal .ivu-modal{
        top:40px !important;
    }
    .img-list>li.img{
        cursor:pointer;
        float:left;
        position: relative;
        margin-bottom:9px;       
    }
    .img-list>li.img:hover .border{
        display:block;
    }
    .clear{
        clear: both;
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
        width:100%;
        height:100%;
        top:0;
        left:0;
        border:3px solid #1094FA;          
    }
    .active>div{
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
    .page{
        position:absolute;
        bottom:10px;
    }
    .demo-spin-icon-load{
        animation: ani-demo-spin 1s linear infinite;
    }
</style>
