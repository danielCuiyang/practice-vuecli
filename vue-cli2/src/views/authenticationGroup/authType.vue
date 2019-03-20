<template>
    <div class="authType">
        <Headers @goBack="goBack"></Headers>
        <div class="personal">
            <span @click="toCertify('authPersonal')">
                <img src="../../image/personal.png" alt="">
            </span>
            <span>个人认证</span>
        </div>
        <div class="personal">
           <span @click="toCertify('authCompany')">
                 <img src="../../image/company.png" alt="">
            </span>
            <span>企业认证</span>
        </div>
    </div>
</template>


<script>
import '@/style/authenticationGroup/authType.scss'
import Headers from '@/components/Header'
export default {
    data(){
        return{
            registrant_hash:''
        }
    },
    components:{
        Headers
    },
    created(){
        this.registrant_hash = this.$route.query.registrant_hash
    },
    methods:{
        toCertify(name){
            this.$router.push({name:name,params: { registrant_hash: this.registrant_hash }})
        }
    }
}
</script>
