<template>
  <div class="details">
    <Headers @goBack="$router.go(-1)"></Headers>
    <div class="trademarkImg">
      <img :src='getImgUrl(msg.mark_img_oss)' alt="">
    </div>
    <div class="trademarkName">
      <span>商标名称：</span>{{msg.trademark_name}}
    </div>
    <ul class="trademarkDetailsMsg">
      <li>商标类别：{{msg.trademark_type}}</li>
      <router-link tag="li" class="backActive" :to="{path:'/trademarkSbState',query:{apply_no:msg.apply_no,trademark_type:msg.trademark_type}}">
        当前状态：{{msg.cur_status}}
      </router-link>
      <li>注册号：{{msg.apply_no}}</li>
      <li>申请人：{{msg.agentname}}</li>
      <li>使用期限：{{msg.dead_line_start}}-{{msg.dead_line_end}}</li>
    </ul>
    <router-link tag="div" class="trademarkDetailsServeList backActive" :to="{path:'/trademarkSbServerList',query:{apply_no:msg.apply_no,trademark_type:msg.trademark_type}}">商品服务列表
    </router-link>
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
    methods: {
      getImgUrl(ossImg){
        return 'https://sb-bigdata-pic.oss-cn-shanghai.aliyuncs.com/'+ossImg;
      },
    },
    components:{
      Headers
    },
    created(){
      getDetail(this.$route.query.apply_no,this.$route.query.trademark_type).then((res)=>{
        this.msg = res.data;
      })
    },
  }
</script>

<style lang="scss" scoped>
  @import "../../style/trademarkList.scss"
</style>

