<template>
<div class="trademark-registant">
        <Headers @searchContent="getSearchContent" ></Headers>
        <scroller
            class="scroller" 
            :on-infinite="infinite"
            ref="scroller"
            >
            <div v-for="(item,index) in list"   class="list">
                <div class="top">
                    <span v-if="item.certifyType=='已认证'">
                        <input type="checkbox" :value="item" :id="'a'+index" v-model="item.checked">
                        <label :for="'a'+index"></label>
                    </span>
                    <span v-if="item.certifyType!='已认证'">
                        <label @click="alert"></label>
                    </span>
                    
                    <span class="company">
                        {{item.company}}
                    </span>
                    <span  v-if="item.certifyType=='已认证'" class="certifyType">
                        {{item.certifyType}}
                    </span>
                    <router-link v-else to='/' class="certifyTypeNo">
                        {{item.certifyType}}
                    </router-link>
                </div>
                <div class="info">
                    可发布商标数量
                    <span>{{item.num}}</span>
                    个
                </div>
            </div>
            <div style="height:100px">
            </div>
        </scroller>
        <div class="bottom" v-if="totalCount > 0">
            <div class="left">
                <span>
                    <input type="checkbox" v-model="ischeckAll" id="all" >
                    <label for="all"></label>
                </span>
                <span class="all">全选</span>
                <span>共<span class="fc">{{totalCount}}</span>个商品</span>
            </div>
            <router-link  class="right"  to='/selectBrand'>下一步</router-link>
        </div>
</div>
</template>
<script>
import '@/style/trademark-registant.scss'
import Headers from '@/components/Header'
import { setTimeout } from 'timers';
export default {
    components:{
        Headers
    },
    data(){
        return{
            certifyType:'certifyType',
            certifyTypeNo:'certifyTypeNo',
            list:[
                {   
                    id:1,
                    company:"腾讯科技有限公司",
                    certifyType:"已认证",
                    num:"987",
                },
                {
                    id:2,
                    company:"腾讯科技有限公司",
                    certifyType:"未认证",
                    num:"987",

                },
                {
                    id:3,
                    company:"腾讯科技有限公司",
                    certifyType:"已认证",
                    num:"987",
                },
                {   
                    id:1,
                    company:"腾讯科技有限公司",
                    certifyType:"已认证",
                    num:"987",
                },
                {
                    id:2,
                    company:"腾讯科技有限公司",
                    certifyType:"未认证",
                    num:"987",

                },
                {
                    id:3,
                    company:"腾讯科技有限公司",
                    certifyType:"已认证",
                    num:"987",
                },
                {   
                    id:1,
                    company:"腾讯科技有限公司",
                    certifyType:"已认证",
                    num:"987",
                },
                {
                    id:2,
                    company:"腾讯科技有限公司",
                    certifyType:"未认证",
                    num:"987",

                },
                {
                    id:3,
                    company:"腾讯科技有限公司",
                    certifyType:"已认证",
                    num:"987",
                },
            ]
        }
    },
    created(){
        this.list.forEach(item=>{
            this.$set(item,"checked",false)
        })
    },
    computed:{
        totalCount(){
            let totalArr = this.list.filter(item=>item.checked)
            return totalArr.length
        },
        ischeckAll:{
            get(){
                var list = this.list.filter((item)=>{
                    return item.certifyType=='已认证'
                })
                console.log(list)
                return list.every(item=>item.checked)
            },
            set(newValue){
                this.list.filter((item)=>{
                    return item.certifyType=='已认证'
                }).forEach(item=>{
                    item.checked=newValue
                })

            }
        }
    },
    methods:{
        infinite: function (done) {
            if(this.list.length>10){
                done(true)
                console.log(456)
                this.$refs.scroller.finishInfinite(true)
                return
            }
            console.log(123)
            setTimeout(()=>{
                this.list.push(               
                {   
                    id:1,
                    company:"1213123",
                    certifyType:"已认证",
                    num:"987",
                },)
                 done()
            },1000)
            
        },
        getSearchContent(val){
            console.log(val)
        },
        alert(){
            alert('注册主体未认证，不能进行上架操作。')
        }
    }
}
</script>
