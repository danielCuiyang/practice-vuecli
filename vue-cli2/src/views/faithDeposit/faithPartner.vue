<template>
    <div class="faithPartner">
       <div class="banner">
           <Headers></Headers>
           <div class="tip" v-show='showTip'>
                <span @click="showTip = false"></span>
           </div>
           <p class="price" :class="{active:!showTip}">
               {{faithPrice}}
           </p>
           <p class="balance">
               余额（元）
           </p>
           <img src="../../image/gold-icon.png" alt="">
       </div>
       <div class="grid">
           <p class="grid-title">
               <span>享受权益</span>
           </p>
           <ul>
               <li>
                   <img src="../../image/faith-icon1.png" alt="">
                   <span>“诚信”标识</span>
               </li>
               <li>
                   <img src="../../image/faith-icon2.png" alt="">
                   <span>官网展示优先权</span>
               </li>
               <li>
                   <img src="../../image/faith-icon3.png" alt="">
                   <span>活动优先权</span>
               </li>
               <li>
                   <img src="../../image/faith-icon4.png" alt="">
                   <span>推广优惠价</span>
               </li>
           </ul>
           <div class="explain">
               加入诚信保证金合作的持有人，
               名下商标将标注【诚信】的标签，
               并且享有在尚标官网展示优先权、
               享受活动优先权、享受推广优惠价，
               更多权益敬请期待！
           </div>
           <p class="grid-title grid-title2">
               <span>违约处罚</span>
           </p>
           <div class="explain bg-ye">
               第一次：违反诚信保证条约，
               按照约定正常赔付之外，持有人积分归零
               ，星级归零，名下商标全部下架，商标不再展示与推荐！
               【恢复商标上架的途径：三倍缴纳诚信保证金】
           </div>
           <div class="explain bg">
                第二次：违反诚信保证条约，
                按照约定正常赔付之外，持有人积分归零，
                星级归零，名下商标全部下架
                ，尚标不再展示与推荐！
                【恢复商标上架的途径：十倍缴纳诚信保证金】
           </div>
           <div class="explain bg3">
                第三次：违反诚信保证条约，
                按照约定正常赔付之外，持有人积分归零，星级归零，
                名下商标全部下架，纳入尚标黑名单终身不再合作！
           </div>
           
            <p class="grid-title grid-title3">
               <span>保证金安全及提取说明</span>
           </p>
            <div class="explain">
                尚标平台将保障您的资金安全，商标权利人符合以下条件即可提出退出诚信保证金，同时您不再享有对应的权益：<br/>
                ① 无未处理完成的举报维权<br/>
                ② 无未偿还的平台垫付款项<br/>
                ③ 无未结束的交易<br/>
                ④ 最后一笔已完结的交易的完结时间已经超过360天<br/>
                本协议最终解释权归尚标，如有疑问可拨打<br/>
                400 119 0860与我们联系！
           </div>
       </div>
    </div>
</template>

<script>
import '@/style/faithDeposit/faithPartner.scss'
import {faith} from '@/api/faith'
import Headers from '@/components/Header.vue'
export default {
    components:{
        Headers
    },
    data(){
        return{
            showTip:true,
            faithPrice:3000.00
        }
    },
    created(){
        this.getData()
    },
    methods:{
        getData(){
            faith().then((res)=>{
                this.faithPrice = res.data.price
            })
        }
    }
}
</script>
