<template>
    <div class="authCompany">
        <Headers></Headers>
        <div class="image">
            <img v-for='(value, key) in imgs'  :src="getObjectURL(value)">
            <input type='file' id="file" @change="addImg" ref="inputer"
             accept="image/png,image/jpeg,image/gif,image/jpg"/>
            <label for="file"></label>
        </div>
        <p>上传盖有公章的营业执照</p>
        <div class="ifTicket">
          是否能开具发票
          <Switchs class="switchs" v-model="showTicketSub"></Switchs>
        </div>
        <div class="ticketSubject" v-show="showTicketSub">
          关联开票主体
          <span class="link"></span>
          <span>{{company}}</span>
        </div>
        <div class="ticket-tip" v-show="!showTicketSub">

        </div>
        <button class="submit" @click="submit">
            提交
        </button>
    </div>
</template>


<script>
import '@/style/authenticationGroup/authCompany.scss'
import {upload,authPC} from '@/api/auth'
import Headers from '@/components/Header'
import Switchs from '@/components/Switch'
export default {
    components:{
        Headers,
        Switchs
    },
    data(){
        return{
           formData:new FormData(),
            imgs:{
            },
            fil:"",
            showTicketSub:true,
            imgId:"",
            company:"11"
        }
    },
methods: {
      addImg(event){
        let inputDOM = this.$refs.inputer;
        // 通过DOM取文件数据
        this.fil = inputDOM.files;
        let size  =  Math.floor(this.fil[0].size / 1024);
          // if (size > 5*1024*1024) {
          //   alert('请选择5M以内的图片！');
          //   return false
          // }
          this.$set(this.imgs,"img",this.fil[0]);
          this.formData.append('file',this.imgs['img']);
          this.uploadImg(this.formData)
      },
      getObjectURL(file) {
        var url = null ;
        if (window.createObjectURL!=undefined) { // basic
          url = window.createObjectURL(file) ;
        } else if (window.URL!=undefined) { // mozilla(firefox)
          url = window.URL.createObjectURL(file) ;
        } else if (window.webkitURL!=undefined) { // webkit or chrome
          url = window.webkitURL.createObjectURL(file) ;
        }
        return url ;
      },
      uploadImg(formData,id){
          upload(formData).then((res)=>{
            this.imgId = res.data.id
          })
      },
      validDate(){
        if(this.showTicketSub&&!this.company){
           return {code:"error",msg:"请选择开票主体"}
        }
        if(!this.imgId){
          console.log(123)
          return {code:"error",msg:"请上传营业执照"}
        }
        return{code:"success"}
      },
      submit(){
        var validRes = this.validDate()
        if(validRes.code == 'error'){
          alert(validRes.msg)
          return
        }
          authPC(this.imgId,2).then((res)=>{
                console.log(res,"res")
          })
        }
    }
}
</script>
