<template>
    <div class="authType">
        <Headers></Headers>
        <div class="personal">
            <router-link to="/authPersonal">
                <img src="../../image/personal.png" alt="">
            </router-link>
            <span>个人认证</span>
        </div>
        <div class="personal">
           <router-link to="/authCompany">
                 <img src="../../image/company.png" alt="">
            </router-link>
            <span>企业认证</span>
        </div>
    </div>
</template>


<script>
import '@/style/authenticationGroup/authType.scss'
import Headers from '@/components/Header'
export default {
    components:{
        Headers
    },
    created(){
    },
    methods:{
        toast(){
        }
    }
}
</script>
