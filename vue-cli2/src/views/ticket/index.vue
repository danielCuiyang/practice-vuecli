<template>
    <div class="ticket">
        <Headers ></Headers>
        <div class="section">
            <div class="section-header">
                <div class="personal">
                    <span >
                        <input type="radio" v-model="ticketForm.character"
                        value="1"
                        id="personal" name="brand">
                        <label for="personal"></label>
                    </span>
                    <span class="people">我是注册人</span>
                </div>
                <div class="personal">
                    <span >
                        <input type="radio" v-model="ticketForm.character"
                        value="2"
                        id="agent" name="brand">
                        <label for="agent"></label>
                    </span>
                    <span class="people">我是代理人</span>
                </div>
            </div>
            <ul>
                <li>
                    <span class="title">抬头类型</span>
                    <span class="symbol">*</span>                    
                    <input class="msg" 
                    placeholder="选择抬头类型"
                    :value="ticketForm.be_made | be_made" readonly/>
                    <span class="link" @click="showTitleList=true"></span>
                </li>
                <li>
                    <span class="title">开票主体</span>
                    <span class="symbol">*</span>
                    <input class="msg" 
                    placeholder="填写开票主体"
                  v-model="ticketForm.subject_name" />
                </li>
                <li>
                    <span class="title">开票类型</span>
                    <span class="symbol">*</span>
                    <input class="msg" 
                    readonly 
                    placeholder="选择开票类型"
                    :value="ticketForm.general | general" />
                    <span class="link" @click="showTicketList=true"></span>
                </li>
                <li>
                    <span class="left">
                        <span class="title">税点</span>
                        <span class="symbol">*</span>
                    </span>
                    <input class="msg"
                    placeholder="填写税点"
                    v-model="ticketForm.tax_point"/>
                </li>
                <li v-show="ticketForm.be_made == '1'">
                    <span class="title">身份证号</span>
                    <span class="symbol">*</span>
                    <input class="msg" 
                    placeholder="填写身份证号"
                    v-model='ticketForm.idcard' />
                </li>
                <li v-show="ticketForm.be_made == '2' ">
                    <span class="title">公司税号</span>
                    <span class="symbol">*</span>
                    <input class="msg" 
                    placeholder="填写公司税号"
                    v-model="ticketForm.tfn" />
                </li>
                <li>
                    <span class="title left">开户行</span>
                    <input class="msg" 
                    v-model="ticketForm.bank_deposit"
                    placeholder="填写完整的开户行信息" />
                </li>
                <li>
                    <span class="title left">账号</span>
                    <input class="msg"
                    v-model="ticketForm.bank_account"
                     placeholder="填写开户账号信息" />
                </li>
                <li class="remark">
                    <span class="title left">备注</span>
                    <textarea class="msg"
                    v-model="ticketForm.remark"
                     placeholder="填写备注信息" />
                </li>
            </ul>
        </div>
        <button @click="submit">提交认证</button>
        <!-- dialog -->
        <div class="select-popup" v-show="showTicketList">
            <div class="select-ticket">
                <div :class="{active:ischose==1}" @click="choseTicket(1)">
                    增值税普通发票
                </div>
                <div :class="{active:ischose==2}"
                    @click="choseTicket(2)"
                >
                    增值税专用发票
                </div>
                <div class="cancel" @click="showTicketList=false">
                    取消
                </div>
            </div>
        </div>
        <div class="select-popup" v-show="showTitleList">
            <div class="select-ticket">
                <div :class="{active:titleChose==1}" @click="choseTitle(1)">
                    个人
                </div>
                <div :class="{active:titleChose == 2}"
                    @click="choseTitle(2)"
                >
                    公司
                </div>
                <div class="cancel" @click="showTitleList=false">
                    取消
                </div>
            </div>
        </div>
        <div class="mask" v-show="showTicketList"></div>
        <div class="mask" v-show="showTitleList"></div>
    </div>
</template>

<script>
import Headers from '@/components/Header'
import {invoiceSave,invoiceDetail} from "@/api/ticket"
import "@/style/ticket.scss"
export default {
    components:{
        Headers
    },
    data(){
        return{
            //1是注册人，2是代理人

            // 增值税active
            ischose:'0',
            // 抬头active
            titleChose:"0",
            // 增值税弹框显隐
            showTicketList:false,
            // 抬头类型显隐 
            showTitleList:false,
            ticketForm:{
                character:"1",
                be_made:'', //抬头类型 //1 个人 2 公司
                subject_name:"", //开票主体
                general:"" , //开票类型 //1普通 2//专用
                tax_point:"", //税点
                idcard:"",
                tfn:"", //公司税号
                bank_deposit:"",//开户行信息
                bank_account:"",
                remark:"",
                id:""
           }
        }
    },
    filters: {
        be_made: function (value) {
            if(value == '1'){
                return "个人"
            }else if(value == '2'){
                return "公司"
            }
        },
        general: function (value) {
            if(value == '1'){
                return "增值税普通发票"
            }else if(value == '2'){
                return "增值税专用发票"
            }
        }
    },
    created(){
        this.invoiceDetails()
    },
    methods:{
        validate(){
            let form = this.ticketForm
           if(!form.be_made){
               return {code:"error",msg:"请选择抬头类型"}
           }
           else if(!form.subject_name){
            return {code:"error",msg:"请填写开票主体"}
           }
           else if(!form.general){
            return {code:"error",msg:"请选择开票类型"}
           }
           else if(!form.tax_point){
            return {code:"error",msg:"请填写税点"}
           }
           else if(!form.tfn&&form.be_made=='2'){
            return {code:"error",msg:"请填写公司税号"}
           }
           else if(!form.idcard&&form.be_made=='1'){
            return {code:"error",msg:"请填写身份证号"}
           }
           else{
               return {code:"success",msg:""}
           }
        },
        invoiceDetails(){
            invoiceDetail().then((res)=>{
                this.ticketForm = res.data
                console.log(this.ticketForm)
                if(res.data.be_made=='2'){
                    this.ticketForm.tfn = res.data.card_number
                }else{
                    this.ticketForm.idcard = res.data.card_number
                }
            })
        },
        submit(){
            let validResult=this.validate()
            if(validResult.code=='error'){
                alert(validResult.msg);
                return
            }
            console.log(this.ticketForm)
            invoiceSave(this.ticketForm).then((res)=>{

            })
        },
        choseTicket(index){
            this.ischose = index
            if(index == '1'){
                this.ticketForm.general = "1"
            }else{
                this.ticketForm.general = "2"
            }
            this.showTicketList = false
        },
        choseTitle(index){
            this.titleChose = index
            if(index == '1'){
                this.ticketForm.be_made = "1"
            }else{
                this.ticketForm.be_made = "2"
            }
            this.showTitleList = false
        }
    }
}
</script>

