<template>
    <div class="authPersonal">
        <Headers @goBack="$router.go(-1)"></Headers>
        <p class="title-tip">拍摄或上传身份证原件照片，确保照片完整清晰。</p>
        <h1>上传身份证人像面</h1>
        <div class="idCardFace idCard">
            <img v-for='(value, key) in idCardFace'  :src="getObjectURL(value)">
            <input type='file' id="file1" @change="addFaceImg"    ref="inputer1"
             accept="image/png,image/jpeg,image/gif,image/jpg,image/*"/>
            <label for="file1"></label>
        </div>
        <h1>上传身份证国徽面</h1>
        <div class="idCardBack idCard">
            <img v-for='(value, key) in idCardBack'  :src="getObjectURL(value)">
            <input type='file' id="file2" @change="addBackImg"    ref="inputer2"
             accept="image/png,image/jpeg,image/gif,image/jpg"/>
            <label for="file2"></label>
        </div>
        <!-- <div class="ifTicket">
          姓名
          <input type="text" placeholder="输入姓名" v-model="userMsg.name">
        </div>
        <div class=" ifTicket ticketSubject" >
          身份证号码
          <input type="text" placeholder="输入身份证号码" v-model="userMsg.idcard">
        </div> -->
        <button :disabled="disabled" :class="{ active: disabled }" class="submit" @click="submit">
              确认上传
        </button>
    </div>
</template>


<script>
import '@/style/authenticationGroup/authPersonal.scss'
import {upload,authPC} from '@/api/auth'
import Headers from '@/components/Header'
import { setTimeout } from 'timers';
export default {
    components:{
        Headers,
    },
    data(){
        return{
            formData:new FormData(),
            formDatas:new FormData(),
            idCardBack:{},
            idCardFace:{},
            faceFile:"",
            backFile:"",
            registrant_hash:this.$route.params.registrant_hash,
            disabled:false,
            userMsg:{
                // idcard:"",
                // name:"",
                faceId:"", //人像面
                emblemId:"", //国徽面
            }
        }
    },
    created(){
    },
    methods: {
      addFaceImg(event){
        let inputDOM = this.$refs.inputer1;
        // 通过DOM取文件数据
        this.faceFile = inputDOM.files;
        let size  =  Math.floor(this.faceFile[0].size / 1024);
        this.$set(this.idCardFace,"img",this.faceFile[0]);
        this.formData.append('file',this.idCardFace['img']);
        this.uploadImg(this.formData,2)
      },
      addBackImg(event){
        let inputDOM = this.$refs.inputer2;
        // 通过DOM取文件数据
        this.backFile = inputDOM.files;
        let size  =  Math.floor(this.backFile[0].size / 1024);
          this.$set(this.idCardBack,"img",this.backFile[0]);
          this.formDatas.append('file',this.idCardBack['img']);
          this.uploadImg(this.formDatas,1)
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
        upload(formData,id).then((res)=>{
            if(id==2){
              this.userMsg.faceId =res.data.id
            }else{
                this.userMsg.emblemId =res.data.id
            }
        })
      },
      validResult(){
        if(!this.userMsg.faceId){
          return {code:"error",msg:"请上传身份证人像面"}
        }
        else if(!this.userMsg.emblemId){
          return {code:"error",msg:"请上传身份证国徽面"}
        }
        // else if(!this.userMsg.name){
        //   return {code:"error",msg:"请填写姓名"}
        // }
        // else if(!this.userMsg.idcard){
        //   return {code:"error",msg:"请填写身份证号"}
        // }
        else{
          return {code:"success"}
        }
      },
      submit(){
         var validRes = this.validResult()
         if(validRes.code == 'error'){
            this.$toast.text(validRes.msg)
            return
         }
         var imgsId = this.userMsg.emblemId + '|' + this.userMsg.faceId
        authPC(imgsId,1,this.registrant_hash).then((res)=>{
            this.disabled = true
          // if(res.data[0].result == 200){
              this.$router.push({path:"/authSuccess"})
          // }
        }).catch(err=>{
          this.disabled = false
        })
      },
    }
}
</script>
