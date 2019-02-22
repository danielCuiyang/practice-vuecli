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
        <button class="submit">
            提交
        </button>
    </div>
</template>


<script>
import '@/style/authenticationGroup/authCompany.scss'
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
            company:"上海尚标互联网科技有限公司"
        }
    },
methods: {
      addImg(event){
        let inputDOM = this.$refs.inputer;
        // 通过DOM取文件数据
        this.fil = inputDOM.files;
        let size  =  Math.floor(this.fil[0].size / 1024);
        console.log(size)
          if (size > 5*1024*1024) {
            alert('请选择5M以内的图片！');
            return false
          }
          this.$set(this.imgs,"img",this.fil[0]);
          console.log(this.imgs,"imgs")
      },
      getObjectURL(file) {
          console.log(file,"file")
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
      submit(){
        for(let key in this.imgs){
          let name=key.split('?')[0];
          this.formData.append('multipartFiles',this.imgs[key],name);
        }
        this.$http.post('/opinion/feedback', this.formData,{
          headers: {'Content-Type': 'multipart/form-data'}
        }).then(res => {
          this.alertShow=true;
        });
      },
    }
}
</script>
