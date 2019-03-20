<template>
  <div class="sbState">
    <Headers @goBack="$router.go(-1)"></Headers>
    <ul class="ztlist">
      <li class="wg" v-for="item in msg">
        <span>{{item.flowName}}</span>
        <p>{{item.flowDate}}</p>
      </li>

    </ul>
  </div>
</template>

<script>
  import Headers from '@/components/Header'
  import {getDetail} from '@/api/trademarkList'
  export default {
    data(){
      return{
        msg:[]
      }
    },
    components:{
      Headers
    },
    created(){
      getDetail(this.$route.query.apply_no,this.$route.query.trademark_type).then((res)=>{
        this.msg = res.data.flow
      })
    },
  }
</script>

<style lang="scss" scoped>
  @import "../../style/trademarkList.scss"
</style>
