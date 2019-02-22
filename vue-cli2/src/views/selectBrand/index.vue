<template>
    <div class="chose-brand">
        <Headers @searchContent="getSearchContent" @editEv='editHandle'></Headers>
        <Popup @applicant='getApplicant' @brandType='getBrandType'></Popup>
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
                        <span v-if="item.price">
                            <input type="checkbox" :value="item" :id="'a'+index" v-model="item.checked">
                            <label :for="'a'+index"></label>
                        </span>
                        <span v-else @click="alert">
                            <label></label>
                        </span>
                        <span class="company">
                            {{item.company}}
                        </span>
                        <span class="type">
                            {{item.type}}
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
                <router-link to='/' class="rebackMyBrand">返回我的商标</router-link>
                <router-link to='/' class="watchPublishBrand">查看发布商标</router-link>
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
import { setTimeout } from 'timers';
export default {
    data(){
        return{
            certifyType:'certifyType',
            certifyTypeNo:'certifyTypeNo',
            list:[
                {   
                    id:1,
                    company:"1腾讯科技有限公司",
                    certifyType:"已认证",
                    num:"987",
                    type:"35类",
                    price:"1"
                },
                {   
                    id:1,
                    company:"1腾讯科技有限公司",
                    certifyType:"已认证",
                    num:"987",
                    type:"35类",
                    price:""
                },
                {   
                    id:1,
                    company:"1腾讯科技有限公司",
                    certifyType:"已认证",
                    num:"987",
                    type:"35类",
                    price:""
                },
                {   
                    id:1,
                    company:"1腾讯科技有限公司",
                    certifyType:"已认证",
                    num:"987",
                    type:"35类",
                    price:""
                },
                {   
                    id:1,
                    company:"1腾讯科技有限公司",
                    certifyType:"已认证",
                    num:"987",
                    type:"35类",
                    price:""
                },
            ],
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
            publishMask:false
        }
    },
    components:{
       Headers ,
       Popup
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
        editHandle(val){
            console.log(val,"edit");
            this.showSetPrice= val
        },
        // 调起设定价格弹框
        openDialog(id,item){
            this.dialogItem = item
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
                    type:'35类',
                    price:""
                },)
                 done()
            },1000)
            
        },
        alert(){
            this.toast = true
            setTimeout(()=>{
                this.toast = false
            },1500)
        }
    }
}
</script>
