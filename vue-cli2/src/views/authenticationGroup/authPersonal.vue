<template>
    <div class="authPersonal">
        <Headers></Headers>
        <p class="title-tip">拍摄或上传身份证原件照片，确保照片完整清晰。</p>
        <h1>上传身份证人像面</h1>
        <div class="idCardFace idCard">
            <img v-for='(value, key) in idCardFace'  :src="getObjectURL(value)">
            <input type='file' id="file1" @change="addFaceImg"    ref="inputer1"
             accept="image/png,image/jpeg,image/gif,image/jpg"/>
            <label for="file1"></label>
        </div>
        <h1>上传身份证国徽面</h1>
        <div class="idCardBack idCard">
            <img v-for='(value, key) in idCardBack'  :src="getObjectURL(value)">
            <input type='file' id="file2" @change="addBackImg"    ref="inputer2"
             accept="image/png,image/jpeg,image/gif,image/jpg"/>
            <label for="file2"></label>
        </div>
        <div class="ifTicket">
          姓名
          <input type="text" placeholder="输入姓名" v-model="userMsg.name">
        </div>
        <div class=" ifTicket ticketSubject" >
          身份证号码
          <input type="text" placeholder="输入身份证号码" v-model="userMsg.idcard">
        </div>
        <button class="submit" @click="submit">
            确认上传
        </button>
    </div>
</template>


<script>
import '@/style/authenticationGroup/authPersonal.scss'
import Headers from '@/components/Header'
import { setTimeout } from 'timers';
export default {
    components:{
        Headers,
    },
    data(){
        return{
            formData:new FormData(),
            idCardBack:{},
            idCardFace:{},
            faceFile:"",
            backFile:"",
            userMsg:{
                idcard:"",
                name:""
            }
        }
    },
    methods: {
      addFaceImg(event){
        let inputDOM = this.$refs.inputer1;
        // 通过DOM取文件数据
        this.faceFile = inputDOM.files;
        let size  =  Math.floor(this.faceFile[0].size / 1024);
        console.log(size)
          if (size > 5*1024*1024) {
            alert('请选择5M以内的图片！');
            return false
          }
          this.$set(this.idCardFace,"img",this.faceFile[0]);
          console.log(this.idCardFace,"imgs")
      },
      addBackImg(event){
        let inputDOM = this.$refs.inputer2;
        // 通过DOM取文件数据
        this.backFile = inputDOM.files;
        let size  =  Math.floor(this.backFile[0].size / 1024);
        console.log(size)
          if (size > 5*1024*1024) {
            alert('请选择5M以内的图片！');
            return false
          }
          this.$set(this.idCardBack,"img",this.backFile[0]);
          console.log(this.idCardBack,"imgs")
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
          console.log(this.userMsg)
        this.formData.append('upfile',this.idCardFace['img'],"img");
        console.log(this.formData.get("upfile"),"formData")
        return
        this.$http.post('/opinion/feedback', this.formData,{
          headers: {'Content-Type': 'multipart/form-data'}
        }).then(res => {
          this.alertShow=true;
        });
      },
    }
}
</script>
