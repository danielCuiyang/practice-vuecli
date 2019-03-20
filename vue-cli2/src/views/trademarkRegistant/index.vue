<template>
<div class="trademark-registant">
    <Headers @searchContent="getSearchContent" ></Headers>       
    <scroller class="scroller" :on-infinite="infinite" style="top:1.1rem"  snappingHeight="60" ref="scroller" >
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
            trademarkList:[],
            page:1,
            regname:"",
            initScroll:false,
            emptyData:false //主要用来判断数据为空 拉倒顶部又拉到底部 重新触发infinite事件不显示没有更多数据的问题
        }
    },
    created(){
        this.getTrademarkList(this.regname,this.page)
    },
    computed:{
        totalCount(){
            let totalArr = this.trademarkList.filter(item=>item.checked)
            return totalArr.length
        },
        ischeckAll:{
            get(){
                var list = this.trademarkList.filter((item)=>{
                    return item.audit_status=='1'
                })
                return list.every(item=>item.checked)
            },
            set(newValue){
                this.trademarkList.filter((item)=>{
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
            let res  ={
                    "data":[
                        {
                            "user_id":"1",
                            "audit_status":3,
                            "created_at":1550806709,
                            "updated_at":0,
                            "registrant_hash":75247,
                            "origin_company_name":"深圳市鹏涛兴业科技有限公司",
                            "origin_company_name_en":"",
                            "company_name_en":"",
                            "company_name":"深圳市鹏涛兴业科技有限公司",
                            "origin_address":"广东省深圳市宝安区新安街道宝民一路96号白金酒店大厦31楼3114",
                            "origin_address_en":"",
                            "address_en":"",
                            "address":"广东省深圳市宝安区新安街道宝民一路96号白金酒店大厦31楼3114"
                        },
                        {
                            "user_id":"1",
                            "audit_status":3,
                            "created_at":1550806653,
                            "updated_at":0,
                            "registrant_hash":187326,
                            "origin_company_name":"晋江市嘉利玩具精品有限公司",
                            "origin_company_name_en":"",
                            "company_name_en":"",
                            "company_name":"晋江市嘉利玩具精品有限公司",
                            "origin_address":"福建晋江市安海镇桥头加工区5号",
                            "origin_address_en":"",
                            "address_en":"",
                            "address":"福建晋江市安海镇桥头加工区5号"
                        },
                        {
                            "user_id":"1",
                            "audit_status":1,
                            "created_at":1550806653,
                            "updated_at":0,
                            "registrant_hash":187326,
                            "origin_company_name":"晋江市嘉利玩具精品有限公司5",
                            "origin_company_name_en":"",
                            "company_name_en":"",
                            "company_name":"晋江市嘉利玩具精品有限公司",
                            "origin_address":"福建晋江市安海镇桥头加工区5号",
                            "origin_address_en":"",
                            "address_en":"",
                            "address":"福建晋江市安海镇桥头加工区5号"
                        },
                        {
                            "user_id":"1",
                            "audit_status":1,
                            "created_at":1550806653,
                            "updated_at":0,
                            "registrant_hash":187326,
                            "origin_company_name":"晋江市嘉利玩具精品有限公司4",
                            "origin_company_name_en":"",
                            "company_name_en":"",
                            "company_name":"晋江市嘉利玩具精品有限公司",
                            "origin_address":"福建晋江市安海镇桥头加工区5号",
                            "origin_address_en":"",
                            "address_en":"",
                            "address":"福建晋江市安海镇桥头加工区5号"
                        },
                        {
                            "user_id":"1",
                            "audit_status":1,
                            "created_at":1550806653,
                            "updated_at":0,
                            "registrant_hash":187326,
                            "origin_company_name":"晋江市嘉利玩具精品有限公司3",
                            "origin_company_name_en":"",
                            "company_name_en":"",
                            "company_name":"晋江市嘉利玩具精品有限公司3",
                            "origin_address":"福建晋江市安海镇桥头加工区5号3",
                            "origin_address_en":"",
                            "address_en":"",
                            "address":"福建晋江市安海镇桥头加工区5号"
                        },
                        {
                            "user_id":"1",
                            "audit_status":1,
                            "created_at":1550806653,
                            "updated_at":0,
                            "registrant_hash":187326,
                            "origin_company_name":"晋江市嘉利玩具精品有限公司2",
                            "origin_company_name_en":"",
                            "company_name_en":"",
                            "company_name":"晋江市嘉利玩具精品有限公司",
                            "origin_address":"福建晋江市安海镇桥头加工区5号",
                            "origin_address_en":"",
                            "address_en":"",
                            "address":"福建晋江市安海镇桥头加工区5号"
                        },
                        {
                            "user_id":"1",
                            "audit_status":1,
                            "created_at":1550806653,
                            "updated_at":0,
                            "registrant_hash":187326,
                            "origin_company_name":"晋江市嘉利玩具精品有限公司1",
                            "origin_company_name_en":"",
                            "company_name_en":"",
                            "company_name":"晋江市嘉利玩具精品有限公司",
                            "origin_address":"福建晋江市安海镇桥头加工区5号",
                            "origin_address_en":"",
                            "address_en":"",
                            "address":"福建晋江市安海镇桥头加工区5号"
                        },
                        {
                            "user_id":"1",
                            "audit_status":3,
                            "created_at":1550806653,
                            "updated_at":0,
                            "registrant_hash":196697,
                            "origin_company_name":"北京金源盛海生物科技有限公司",
                            "origin_company_name_en":"",
                            "company_name_en":"",
                            "company_name":"北京金源盛海生物科技有限公司",
                            "origin_address":"北京市朝阳区朝阳公园路6号院5号楼01层内L-VD1-1a、5#SA-56、L-BL2-07、L-BL2-09",
                            "origin_address_en":"",
                            "address_en":"",
                            "address":"北京市朝阳区朝阳公园路6号院5号楼01层内L-VD1-1a、5#SA-56、L-BL2-07、L-BL2-09"
                        },
                        {
                            "user_id":"1",
                            "audit_status":2,
                            "created_at":1550750838,
                            "updated_at":0,
                            "registrant_hash":93705,
                            "origin_company_name":"帝斯阁照明科技（深圳）有限公司",
                            "origin_company_name_en":"",
                            "company_name_en":"",
                            "company_name":"帝斯阁照明科技（深圳）有限公司",
                            "origin_address":"深圳市福田区沙头街道泰然九路海松大厦B座裙楼2楼202-77",
                            "origin_address_en":"",
                            "address_en":"",
                            "address":"深圳市福田区沙头街道泰然九路海松大厦B座裙楼2楼202-77"
                        }
                    ],
                    "total":4,
                    "message":"",
                    "errorCode":200
                }
            this.trademarkList = res.data
            this.trademarkList.forEach(item=>{
                this.$set(item,"checked",false)
            })
            return 
            // axios 获取
           getTrdList(regname,page).then((res)=>{
                if(this.page == '1'){
                    this.trademarkList = res.data
                    this.trademarkList.forEach(item=>{
                        this.$set(item,"checked",false)
                    })
                    this.initScroll = true
                    this.$refs.scroller.finishInfinite()
                    if(this.trademarkList.length< 20){
                        this.emptyData = true
                        return 
                    }
                }else{
                    this.$refs.scroller.finishInfinite()
                    let resArr = res.data
                    if(resArr.length == 0){
                        this.emptyData = true
                        return
                    }
                    resArr.forEach(item=>{
                        this.$set(item,"checked",false)
                    })
                    this.trademarkList = [...this.trademarkList,...resArr]
                }
            })
        },
        // 判断未认证的是否被别人认证过
        cetified(registrant_hash){
            tmCertified(registrant_hash).then((res)=>{
                if(res.errorCode!='200'){
                    this.$toast.text('注册主体已被认证')
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
            if(!this.initScroll){
                // this.$refs.scroller.finishInfinite()
                return
            }
            console.log("ajsx")
            this.page++;
            this.getTrademarkList(this.regname,this.page,done)
        },
        getSearchContent(val){
            this.initScroll = false
            this.emptyData = false
            this.page = 1
            this.regname = val
            this.getTrademarkList(this.regname,this.page)
        },
        nextStep(){
           let trademarkArr=this.trademarkList.filter(item=>item.checked)
            let registrant_hash =  []
            trademarkArr.forEach((item)=>{
                    registrant_hash.push(item.registrant_hash)
            })
            let registrantHash = registrant_hash.join(",")
            console.log(registrantHash)
            this.$router.push({name:'selectBrand',params:{registrant_hash:registrantHash}});
        },
        alert(){
            this.$toast.text('注册主体未认证，不能进行上架操作。')
        }
    }
}
</script>
