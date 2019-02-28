<template>
    <div class="trademark-registant">
            <Headers @searchContent="getSearchContent" ></Headers>
            <scroller
                class="scroller" 
                :on-infinite="infinite"
                ref="scroller"
                >
                <div v-for="(item,index) in trademarkList"   class="list">
                    <div class="top">
                        <span v-if="item.audit_status=='1'">
                            <input type="checkbox" :value="item" :id="'a'+index" v-model="item.checked">
                            <label :for="'a'+index"></label>
                        </span>
                        <span v-if="item.audit_status!='1'">
                            <label @click="alert"></label>
                        </span>
                        <span class="company">
                            {{item.company_name}}
                        </span>
                        <span  v-if="item.audit_status!='3'&&item.audit_status!='0'" class="certifyType">
                            {{item.audit_status | auditStatus }}
                        </span>
                        <span v-if="item.audit_status =='3'"  class="certifyTypeNo" @click="cetified(item.registrant_hash)">
                            {{item.audit_status | auditStatus }}
                        </span>
                        <router-link v-if="item.audit_status =='0'" to='/authType' class="certifyTypeNo">
                            {{item.audit_status | auditStatus }}
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
                <div  class="right"  @click="nextStep">下一步</div>
            </div>
    </div>
</template>
<script>
import '@/style/trademark-registant.scss'
import {getTrdList,tmCertified} from "@/api/trademarkRegistant"
import Headers from '@/components/Header'
import { setTimeout } from 'timers';
// 审核状态,audit_status,1.审核通过=>已认证, 2.等待审核=>审核中,(0.未通过)=>认证失败 （3刚认领）=>未认证
export default {
    components:{
        Headers
    },
    data(){
        return{
            certifyType:'certifyType',
            list:[
                {   
                    company_name:"腾讯科技有限公司",
                    audit_status:"1",
                    num:"987",
                    registrant_hash:"175629"
                },
                {   
                    company_name:"腾讯科技有限公司",
                    audit_status:"2",
                    num:"987",
                    registrant_hash:"175629"
                },
                {   
                    company_name:"腾讯科技有限公司",
                    audit_status:"3",
                    num:"987",
                     registrant_hash:"175629"
                },
                {   
                    company_name:"腾讯科技有限公司",
                    audit_status:"0",
                    num:"987",
                    registrant_hash:"175629"
                },
                {   
                    company_name:"腾讯科技有限公司",
                    audit_status:"1",
                    num:"987",
                },
                {   
                    company_name:"腾讯科技有限公司",
                    audit_status:"1",
                    num:"987",
                },
                {   
                    company_name:"腾讯科技有限公司",
                    audit_status:"1",
                    num:"987",
                },
                {   
                    company_name:"腾讯科技有限公司",
                    audit_status:"1",
                    num:"987",
                },
                {   
                    company_name:"腾讯科技有限公司",
                    audit_status:"1",
                    num:"987",
                },
                {   
                    company_name:"腾讯科技有限公司",
                    audit_status:"1",
                    num:"987",
                },
                {   
                    company_name:"腾讯科技有限公司",
                    audit_status:"2",
                    num:"987",
                },
                {   
                    company_name:"腾讯科技有限公司",
                    audit_status:"1",
                    num:"987",
                },
                {   
                    company_name:"腾讯科技有限公司",
                    audit_status:"2",
                    num:"987",
                },
                {   
                    company_name:"腾讯科技有限公司",
                    audit_status:"1",
                    num:"987",
                },
                {   
                    company_name:"腾讯科技有限公司",
                    audit_status:"2",
                    num:"987",
                },
                {   
                    company_name:"腾讯科技有限公司",
                    audit_status:"1",
                    num:"987",
                },
                {   
                    company_name:"腾讯科技有限公司",
                    audit_status:"2",
                    num:"987",
                },
                {   
                    company_name:"腾讯科技有限公司",
                    audit_status:"1",
                    num:"987",
                },
                {   
                    company_name:"腾讯科技有限公司",
                    audit_status:"2",
                    num:"987",
                },
                {   
                    company_name:"腾讯科技有限公司",
                    audit_status:"1",
                    num:"987",
                },
                {   
                    company_name:"腾讯科技有限公司",
                    audit_status:"2",
                    num:"987",
                },
                {   
                    company_name:"腾讯科技有限公司",
                    audit_status:"1",
                    num:"987",
                },
                {   
                    company_name:"腾讯科技有限公司",
                    audit_status:"2",
                    num:"987",
                },
            ],
            trademarkList:[],
            page:1,
            regname:"",
            canPull:false,
            emptyData:false //主要用来判断数据为空 拉倒顶部又拉到底部 重新触发infinite事件不显示没有更多数据的问题
        }
    },
    created(){
        this.getTrademarkList(this.regname,this.page)
    },
    computed:{
        totalCount(){
            let totalArr = this.list.filter(item=>item.checked)
            return totalArr.length
        },
        ischeckAll:{
            get(){
                var list = this.list.filter((item)=>{
                    return item.audit_status=='1'
                })
                console.log(list)
                return list.every(item=>item.checked)
            },
            set(newValue){
                this.list.filter((item)=>{
                    return item.audit_status=='1'
                }).forEach(item=>{
                    item.checked=newValue
                })

            }
        }
    },
    filters:{
        auditStatus(val){
            if(val=='1'){
                return "已认证"
            }else if(val == '2'){
                return "认证中"
            }else if(val=='3'){
                return "未认证"
            }else{
                return "认证失败"
            }
        }
    },
    methods:{
        getTrademarkList(regname,page){ 
            getTrdList(regname,page).then((res)=>{
                if(this.page == '1'){
                    this.trademarkList = res.data
                    this.trademarkList.forEach(item=>{
                        this.$set(item,"checked",false)
                    })
                    if(this.trademarkList.length< 20){
                        this.canPull = false
                        return
                    }
                }else{
                    let resArr = res.data
                    if(resArr.length == 0){
                        this.$refs.scroller.finishInfinite(true)
                        this.emptyData = true
                        this.canPull = false
                        return
                    }
                    resArr.forEach(item=>{
                        this.$set(item,"checked",false)
                    })
                    this.trademarkList = [...this.trademarkList,...resArr]
                }
                this.canPull = true
            })
        },
        // 判断未认证的是否被别人认证过
        cetified(registrant_hash){
            tmCertified(registrant_hash).then((res)=>{
                if(res.errorCode!='200'){
                    alert('注册主体已被认证')
                }else{
                    this.$router.push({path:"/authType"})
                }
            })
        },
        infinite: function (done) {
            if(this.emptyData){ 
                this.$refs.scroller.finishInfinite(true)
                return;
            }
            if(!this.canPull){
                done()
                return
            }
            this.canPull = false
            this.page++;
            this.getTrademarkList(this.regname,this.page)
        },
        getSearchContent(val){
            this.canPull = false
            this.page = 1
            this.regname = val
            this.getTrademarkList(this.regname,this.page)
            console.log(val)
        },
        nextStep(){
           let trademarkArr=this.trademarkList.filter(item=>item.checked)
            console.log(trademarkArr)
            this.$router.push('/selectBrand');
        },
        alert(){
            this.$toast.text('注册主体未认证，不能进行上架操作。',)
        }
    }
}
</script>
