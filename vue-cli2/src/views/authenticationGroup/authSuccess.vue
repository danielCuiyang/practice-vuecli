<template>
    <div class="authSuccess">
        <Headers></Headers>
        <div class="section">
            <img src="../../image/authSuccess.png" alt="">
            <h1>提交成功</h1>
            <p>认证内容正在审核中，请耐心等待...</p>
            <button @click="complete">完成</button>
        </div>
    </div>
</template>

<script>
import Headers from '@/components/Header'
import '@/style/authenticationGroup/authSuccess.scss'
export default {
   components:{
        Headers,
    },
    methods:{
        complete(){
            
        }
    }
}
</script>

