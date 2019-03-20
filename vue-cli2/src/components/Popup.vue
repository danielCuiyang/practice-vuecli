<template>
    <div class="popup">
        <div class="select">
            <div class="select-type">
                <span @click="sleectApplicant(1)"
                    :class="{active:selectType=='1'}"
                >申请人</span>
            </div>
            <div class="select-type">
                <span @click="sleectApplicant(2)"
                :class="{active:selectType=='2'}"
                >
                商标类别
                </span>
            </div>
        </div>
        <div class="select-popup">
            <div class="applicant" v-show="selectType=='1'">
                <div 
                v-for="(item,index) in registrants" 
                @click="choseApplicant(index,item)"
                :key='index'
                :class="{active:index==isChose}">
                {{item.company_name}}
                </div>
            </div>
            <div class="applicant" v-show="selectType=='2'">
                <div 
                v-for="(item,index) in brandTypeList" 
                @click="choseBrandType(index,item)" 
                :key='item.id'
                :class="{active:index==brandChose}">
                {{item.name}}
                </div>
            </div>
        </div>
        <div class="mask" v-show="selectType!=0" @click="selectType=0"></div>
    </div>
</template>


<script>
import '@/style/popup.scss'
import { brandTypeList } from "@/utils/brandTypeList";
export default {
    data(){
        return{
            //申请人列表弹框勾选
            isChose:0,
            //选择具体商标勾选
            brandChose:0,
            // 类别 //不同类别下的弹框显示
            selectType:this.select,
            brandTypeList:brandTypeList
        }
    },
    props:{
        registrants:{
            type:Array
        },
        select:{
            type:Number
        }
    },
    watch:{
        selectType(val){
            this.$emit("selectType",val)
        },
        select(val){
            this.selectType = val
        }
    },
    methods:{
         // 选择具体申请人
        choseApplicant(index,item){
            if(index == this.isChose){
                this.selectType =0 
                return
            }
            this.isChose = index
            this.selectType =0 
            this.$emit('applicant',item)
        },
        //选择具体商标类别
        choseBrandType(index,item){
            if(index == this.brandChose){
                this.selectType =0 
                return
            }
            this.brandChose = index
            this.selectType =0
            this.$emit('brandType',item)
        },
        //点击申请人
        sleectApplicant(index){
            this.selectType=index
        },
    }
}
</script>

