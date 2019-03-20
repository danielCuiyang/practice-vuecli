<template>
    <div class="chose-brand">
        <Headers @searchContent="getSearchContent" @editEv='editHandle'></Headers>
        <Popup @applicant='getApplicant' @brandType='getBrandType' :registrants="registrants"></Popup>
        <div>
            <div class="section-title">
                <span class="brandname">商标名称</span>
                <span class="type">类别</span>
                <span class="price">价格</span>
            </div>
            <scroller
            class="scroller" 
            :on-infinite="infinite"
            ref="scroller"
            >
            <div v-for="(item,index) in list" :key="index"  class="list">
                    <span>
                        <!-- 价格为空并且不是在编辑模式下 绑定上disabled -->
                        <input type="checkbox" :disabled="!showSetPrice&&!item.price" :id="'a'+index" v-model="item.checked">
                        <label :for="'a'+index" @click="dialogTip(item)"></label>
                    </span>
                    <span class="company">
                        {{item.trademark_name}}
                    </span>
                    <span class="type">
                        {{item.trademark_type}}
                    </span>
                    <span v-if="item.price" class="price">
                        {{item.price}}
                    </span>
                    <span v-else class="pricing" @click="openDialog(1,item)">
                        定价
                    </span>
            </div>
            <div style="height:200px">
            </div>
            </scroller>
        </div>
        <div class="bottom" v-show="totalCount > 0">
            <div class="left">
                <span>
                    <input type="checkbox" v-model="ischeckAll" id="all" >
                    <label for="all"></label>
                </span>
                <span class="all">全选</span>
                <span>共<span class="fc">{{totalCount}}</span>个商品</span>
            </div>
            <button v-if="showSetPrice" @click="openDialog(2)">设定价格</button>
            <span v-if="!showSetPrice" class="right" @click="publish">发布</span>
        </div>
        <!-- tip about no set price -->
        <div class="toast" v-show='toast'>
            您还没有设定价格哦
        </div>
        <!-- setPrice dialog -->
        <div class="dialog" v-show="hidMask">
            <input type="text" v-model="inputPrice" placeholder="请输入商标价格"/>
            <b class="price">(元)</b>
            <span class="cancel" @click="hidMask=false">取消</span>
            <span class="confirm" @click="confirm">确定</span>
        </div>
        <div class="mask" v-show="hidMask"></div>
        <!-- publish dialog -->
        <div class="publish-dialog" v-show="publishMask">
            <div class="content">
                <h1>您的商标信息已成功提交</h1>
                <p>本次发布商标
                    <span>{{totalCount}}</span>
                    个 ，我们将尽快帮您审核
                </p>
                <span  @click="rebackMyBrand" class="rebackMyBrand">返回我的商标</span>
                <span  @click="watchPublishBrand" class="watchPublishBrand">查看发布商标</span>
            </div>
        </div>
        <div class="mask" v-show="publishMask"></div>
    </div>
</template>

<script>
import '@/style/select-brand.scss'
import '@/style/trademark-registant.scss'
import Headers from '@/components/Header'
import Popup from '@/components/Popup'
import {registrantsGet} from '@/api/registrantsGet'
import { setTimeout } from 'timers';
export default {
    data(){
        return{
            certifyType:'certifyType',
            certifyTypeNo:'certifyTypeNo',
            // 认领商标列表
            list:[],
            // 申请人列表
            registrants:[],
            // 控制设定价格的遮罩的show hide
            hidMask:false,
            //控制底部设定价格的show hide
            showSetPrice:false,
            // 设定价格是由那个事件调起来 1是定价，2是设定价格
            dialogType:'',
            // 存放定价调起弹框存放的item
            dialogItem:"",
            inputPrice:"",
            // 没有设定价格的toast
            toast:false,
            // 发布弹框遮罩
            publishMask:false,
            // 上个页面穿来的hash 和type值
            formData:{
                page:'1',
                pagesize:'20',
                type:"",
                registrant_hash:'',
                trademark_type:"",
                keyword:""
            }
        }
    },
    components:{
       Headers ,
       Popup
    },
    created(){
      
        this.formData.registrant_hash = this.$route.params.registrant_hash
        this.formData.type = this.$route.params.type
        this.getData()
    },
    computed:{
        totalCount(){
            let totalArr = this.list.filter(item=>item.checked)
            return totalArr.length
        },
        ischeckAll:{
                get(){
                    var list = this.list.filter((item)=>{
                        return item.price
                    })
                    return list.every(item=>item.checked)
                },
                set(newValue){
                    this.list.filter((item)=>{
                        return item.price
                    }).forEach(item=>{
                        item.checked=newValue
                    })
                }
            }
    },
    methods:{
        getData(){
            let form = this.formData
            let res ={
                "data":[
                    {
                        "trademark_name":"来往扎堆",
                        "trademark_type":"41",
                        "register_number":1452,
                        "registrant_hash":3687928580,
                        "price":0,
                        "mark_img":"http://sb-bigdata-pic.oss-cn-shanghai.aliyuncs.com/86a5003b658ff259dc548f3f6eab0894.jpg"
                    },
                    {
                        "trademark_name":"TMALL.COM",
                        "trademark_type":"9",
                        "register_number":1356,
                        "registrant_hash":3687928580,
                        "price":0,
                        "mark_img":"http://sb-bigdata-pic.oss-cn-shanghai.aliyuncs.com/d4bd845ad4aaddd378498ce2014315f3.jpg"
                    },
                    {
                        "trademark_name":"鑫起点",
                        "trademark_type":"35",
                        "register_number":1557,
                        "registrant_hash":3687928580,
                        "price":0,
                        "mark_img":"http://sb-bigdata-pic.oss-cn-shanghai.aliyuncs.com/464ef43b3315d33e1c91d6ff588e0321.jpg"
                    },
                    {
                        "trademark_name":"源生鲜",
                        "trademark_type":"16",
                        "register_number":1507,
                        "registrant_hash":3687928580,
                        "price":0,
                        "mark_img":"http://sb-bigdata-pic.oss-cn-shanghai.aliyuncs.com/faee9eab9141092983d76c7e0423947b.jpg"
                    },
                    {
                        "trademark_name":"宝令",
                        "trademark_type":"41",
                        "register_number":1271,
                        "registrant_hash":3687928580,
                        "price":0,
                        "mark_img":"http://sb-bigdata-pic.oss-cn-shanghai.aliyuncs.com/a3d82e5ce426fa133b70bd5a8189bef0.jpg"
                    },
                    {
                        "trademark_name":"百业汇",
                        "trademark_type":"38",
                        "register_number":1208,
                        "registrant_hash":3687928580,
                        "price":0,
                        "mark_img":"http://sb-bigdata-pic.oss-cn-shanghai.aliyuncs.com/59eb2834087be5ac2ee13bccc1d5f626.jpg"
                    },
                    {
                        "trademark_name":"无名良品",
                        "trademark_type":"42",
                        "register_number":0,
                        "registrant_hash":3687928580,
                        "price":0,
                        "mark_img":"http://sb-bigdata-pic.oss-cn-shanghai.aliyuncs.com/fe2f3f6bb33de3600744288d17583fab.jpg"
                    },
                    {
                        "trademark_name":"图形",
                        "trademark_type":"16",
                        "register_number":1537,
                        "registrant_hash":3687928580,
                        "price":0,
                        "mark_img":"http://sb-bigdata-pic.oss-cn-shanghai.aliyuncs.com/be787427641b06b338955a6ca71230e5.jpg"
                    },
                    {
                        "trademark_name":"聊",
                        "trademark_type":"42",
                        "register_number":1361,
                        "registrant_hash":3687928580,
                        "price":0,
                        "mark_img":"http://sb-bigdata-pic.oss-cn-shanghai.aliyuncs.com/9882280eba8bc074a8ecf7a3058dde53.jpg"
                    },
                    {
                        "trademark_name":"安特",
                        "trademark_type":"9",
                        "register_number":1534,
                        "registrant_hash":3687928580,
                        "price":0,
                        "mark_img":"http://sb-bigdata-pic.oss-cn-shanghai.aliyuncs.com/4503a3f1903e35b5753ca195ea7fa16a.jpg"
                    },
                    {
                        "trademark_name":"支付宝 ALIPAY",
                        "trademark_type":"35",
                        "register_number":1586,
                        "registrant_hash":3687928580,
                        "price":0,
                        "mark_img":"http://sb-bigdata-pic.oss-cn-shanghai.aliyuncs.com/e22756b31385e8de894673bac77be714.jpg"
                    },
                    {
                        "trademark_name":"图形",
                        "trademark_type":"26",
                        "register_number":1592,
                        "registrant_hash":3687928580,
                        "price":0,
                        "mark_img":"http://sb-bigdata-pic.oss-cn-shanghai.aliyuncs.com/8e715080b2736ca2ad5ef052ff182728.jpg"
                    },
                    {
                        "trademark_name":"图形",
                        "trademark_type":"3",
                        "register_number":1592,
                        "registrant_hash":3687928580,
                        "price":0,
                        "mark_img":"http://sb-bigdata-pic.oss-cn-shanghai.aliyuncs.com/76e62f634ad38568e2b6bcbf5ea0613e.jpg"
                    },
                    {
                        "trademark_name":"图形",
                        "trademark_type":"31",
                        "register_number":1592,
                        "registrant_hash":3687928580,
                        "price":0,
                        "mark_img":"http://sb-bigdata-pic.oss-cn-shanghai.aliyuncs.com/a453e95a3aff77e0627ffdebd13ff00b.jpg"
                    },
                    {
                        "trademark_name":"图形",
                        "trademark_type":"30",
                        "register_number":1592,
                        "registrant_hash":3687928580,
                        "price":0,
                        "mark_img":"http://sb-bigdata-pic.oss-cn-shanghai.aliyuncs.com/06665af16abdf3b20a2920fa65076d5e.jpg"
                    },
                    {
                        "trademark_name":"蚂可",
                        "trademark_type":"42",
                        "register_number":1563,
                        "registrant_hash":3687928580,
                        "price":0,
                        "mark_img":"http://sb-bigdata-pic.oss-cn-shanghai.aliyuncs.com/b66dd17eab79d40e4919fdee6f37ff16.jpg"
                    },
                    {
                        "trademark_name":"ANT CAMPUS",
                        "trademark_type":"9",
                        "register_number":1572,
                        "registrant_hash":3687928580,
                        "price":0,
                        "mark_img":"http://sb-bigdata-pic.oss-cn-shanghai.aliyuncs.com/4b837bbad8f5cffc1e7a9744fdc7c4a7.jpg"
                    },
                    {
                        "trademark_name":"EBUCKLER",
                        "trademark_type":"9",
                        "register_number":1539,
                        "registrant_hash":3687928580,
                        "price":0,
                        "mark_img":"http://sb-bigdata-pic.oss-cn-shanghai.aliyuncs.com/ad2e893c6c0816fb9cd1739fec850d7d.jpg"
                    },
                    {
                        "trademark_name":"YUNOS",
                        "trademark_type":"16",
                        "register_number":1498,
                        "registrant_hash":3687928580,
                        "price":0,
                        "mark_img":"http://sb-bigdata-pic.oss-cn-shanghai.aliyuncs.com/4d56e3db4fb3701d8f4a3a3fa2fd53ae.jpg"
                    },
                    {
                        "trademark_name":"借呗",
                        "trademark_type":"38",
                        "register_number":0,
                        "registrant_hash":3687928580,
                        "price":0,
                        "mark_img":"http://sb-bigdata-pic.oss-cn-shanghai.aliyuncs.com/b88e59f6a3702b58d53e4c705852ea23.jpg"
                    }
                ],
                "total":2297,
                "message":"",
                "errorCode":200,
                "registrants":[

                ]
            }
            this.list =res.data
            this.list.forEach(item=>{
                this.$set(item,"checked",false)
            })
            return
            registrantsGet(form).then((res)=>{
                this.registrants = res.registrants
                this.registrants.unshift({registrant_hash:'0',company_name:'全部申请人'})
            })
        },
        // 接受popup组件 emit的申请人
        getApplicant(item){
            console.log(item)
        },
        // 接受popup组件 emit的尚标状态
        getBrandType(item){
            console.log(item)
        },  
        // 接受Header组件搜索emit 的内容
        getSearchContent(val){
            console.log(val,"search val")
        },
        // 接受Header组件 点击编辑emit 的内容
        editHandle(bol){
            if(bol){
               this.list.forEach((item)=>{
                   item.checked=true
               })
            }else{
                  this.list.forEach((item)=>{
                   if(!item.price){
                       item.checked=false
                   }
               })
            }
            this.showSetPrice= bol
        },
        // 调起设定价格弹框
        openDialog(id,item){
            this.dialogItem = item
            console.log(item,"item")
            this.dialogType = id
            this.hidMask = true
        },
        confirm(){
            if(this.dialogType == '1'){
                this.dialogItem.price = this.inputPrice
            }else{
                this.list.forEach(item=>{
                    if(item.checked){
                        item.price = this.inputPrice
                    }
                })
            }
            this.inputPrice= ''
            this.hidMask = false
        },
        publish(){
            var publishList = this.list.filter(item=>{
                return item.checked
            })
            this.publishMask = true
            console.log(publishList)
        },
        infinite: function (done) {
            if(this.emptyData){ 
                this.$refs.scroller.finishInfinite(true)
                return;
            }
            if(!this.initScroll){
                return
            }
            this.formData.page++;
            this.getData()
        },
        // 返回我的商标
        rebackMyBrand(){

        },
        // 查看发布商标
        watchPublishBrand(){

        },
        dialogTip(item){
            // 不在编辑模式下并且价格为空
            if(!item.price&&!this.showSetPrice){
                this.toast = true
                setTimeout(()=>{
                    this.toast = false
                },1500)
            }
        }
    }
}
</script>
