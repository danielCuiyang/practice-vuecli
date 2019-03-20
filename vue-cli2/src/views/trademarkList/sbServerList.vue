<template>
  <div class="sbServerList">
    <Headers @goBack="$router.go(-1)"></Headers>
    <ul class="xqfwlb">
      <li v-for="item in msg">{{item.goodsName}}</li>

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
        this.msg = res.data.group
      })
    },
  }
</script>

<style lang="scss" scoped>
  @import "../../style/trademarkList.scss"
</style>
