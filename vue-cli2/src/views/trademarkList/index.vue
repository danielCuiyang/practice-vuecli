<template>
  <div>
    <Headers @searchContent="getSearchContent" @goBack="goBack"></Headers>
    <div class="navlist">
      <ul>
        <li :class="{'active':typeIndex==item.id}" @click="typeGetList(item.id)" v-for="item in typeList">{{item.name}}</li>
      </ul>
    </div>
    <div style="position: absolute;top: 2.1rem;bottom: 0;left: 0;right: 0;margin: auto;z-index: 0">
      <scroller  :on-infinite="infinite" v-if="isDataNull"  snappingHeight="60" ref="my_scroller" >
        <ul class="trademarkList">
          <router-link tag="li" v-for="item,index in listData" :key="index" :to="{path:'/trademarkdetails',query:{apply_no:item.apply_no,trademark_type:item.trademark_type}}">
            <div class="trademarkImg">
              <img :src='getImgUrl(item.mark_img_oss)' alt="">
            </div>
            <div class="reademarkMessage">
              <h3>{{item.trademark_name}}</h3>
              <p><span>商标类别：{{item.trademark_type}}</span><span class="number">注册号：{{item.apply_no}}</span></p>
              <p>申请人：{{item.agentname}} </p>
              <p>商标状态：{{item.cur_status}} </p>
            </div>
          </router-link>
        </ul>
      </scroller>
    </div>
    <div class="dataNull" v-if="!isDataNull">
      您还没有商标哦
    </div>
  </div>
</template>

<script>
  import Headers from '@/components/Header'
  import {getList} from '@/api/trademarkList'
  let firstLoaded = false;
  export default {
    data(){
      return{
        listData:[],
        isDataNull:true,
        typeList:[
          {id:0,name:"全部"},
          {id:1,name:"注册中"},
          {id:2,name:"已注册"},
          {id:3,name:"满3年"},
          {id:4,name:"将到期"},
          {id:5,name:"已到期"},
          {id:6,name:"已无效"},
        ],
        typeIndex:0,
        getList:{
          page:1,
          type:0,
          keyword:''
        }
      }
    },
    created(){
      this.getData()
    },
    methods: {
      getImgUrl(ossImg){
        return 'https://sb-bigdata-pic.oss-cn-shanghai.aliyuncs.com/'+ossImg;
      },
      getData(){
        this.isDataNull = true;
        getList(this.getList).then((res)=>{
          if(this.getList.page==1){
            this.listData = res.data;
          }else {
            this.listData = this.listData.concat(res.data);
          }
          if(this.listData.length==0){
            this.isDataNull = false;
          }
          if(res.data.length>=4){
            firstLoaded = true;
            this.$refs.my_scroller.finishInfinite();
          }else {
            firstLoaded = false;
            this.$refs.my_scroller.finishInfinite(true);
          }
        })
        .catch((err)=>{
            this.isDataNull = false;
        })
      },
      typeGetList(id){
        firstLoaded = false
        this.typeIndex = id;
        this.getList.type = id;
        this.getList.page = 1;
        this.listData = [];
        this.getData();
      },
      infinite() {
        if (!firstLoaded) {
          return;
        };
        this.getList.page+=1;
        this.getData();
      },
      getSearchContent(val){
        firstLoaded = false
        this.getList.keyword = val;
        this.getList.page = 1;
        this.listData = [];
        this.getData();
      }
    },
    components:{
      Headers
    },
  }
</script>

<style lang="scss" scoped>
  @import "../../style/trademarkList.scss";
</style>
