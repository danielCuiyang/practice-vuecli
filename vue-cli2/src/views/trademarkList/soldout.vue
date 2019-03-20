<template>
  <div>
    <Headers  @seachIcon="selectType" @searchContent="getSearchContent" @goBack="goBack"></Headers>
    <Popup   :select ="select" @selectType="selectType" @applicant='getApplicant' @brandType='getBrandType' :registrants="registrants"></Popup>
    <div style="position: absolute;top: 2.1rem;bottom: 0;left: 0;right: 0;margin: auto;z-index: 0">
      <scroller  :on-infinite="infinite" v-if="isDataNull"    snappingHeight="60" ref="my_scroller" >
        <ul class="trademarkList">
          <router-link tag="li" v-for="item,index in listData" :key="index" :to="{path:'/trademarkdetails',query:{apply_no:item.register_number,trademark_type:item.trademark_type}}">
            <div class="trademarkImg">
              <img :src='getImgUrl(item.mark_img_oss)' alt="">
            </div>
            <div class="reademarkMessage">
              <h3>{{item.trademark_name}}</h3>
              <p><span>商标类别：{{item.trademark_type}}</span><span class="number">注册号：{{item.register_number}}</span></p>
              <p>申请人：{{item.company_name}} </p>
              <p style="color: #E33735">价格：{{item.price}} </p>
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
  import Popup from '@/components/Popup'
  import {toaudit} from '@/api/trademarkList'
  let firstLoaded = false;
  export default {
    data(){
      return{
        listData:[],
        select:0,
        registrants:[],
        trademark_type:[
          {
            name:'第一类 医药管理',
            id:1
          },
          {
            name:'第二类 医药管理',
            id:2
          },
          {
            name:'第三类 医药管理',
            id:3
          },
          {
            name:'第四类 医药管理',
            id:4
          },
          {
            name:'第五类 医药管理',
            id:5
          },
        ],
        isDataNull:true,
        form:{
          page:1,
          pagesize:20,
          type:4,
          registrant_hash:'',
          trademark_type:'',
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
        toaudit(this.form).then((res)=>{
          this.registrants = res.subData;
          if(this.form.page==1){
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
      },
      getSearchContent(val){
        firstLoaded = false
        this.form.keyword = val;
        this.form.page = 1;
        this.listData = [];
        this.getData();
      },
      infinite(){
        if (!firstLoaded) {
          return;
        };
        this.form.page+=1;
        this.getData();
      },
      getApplicant(hash){
        firstLoaded = false;
        this.form.page = 1;
        this.form.registrant_hash = hash.registrant_hash;
        this.listData = [];
        this.getData();
      },
      getBrandType(type){
        firstLoaded = false;
        this.form.page = 1;
        this.form.trademark_type = type.id;
        this.listData = [];
        this.getData();
      },
      selectType(val){
        this.select = val
      }
    },
    components:{
      Headers,
      Popup
    },
  }
</script>

<style lang="scss" scoped>
  @import "../../style/trademarkList.scss";
</style>
