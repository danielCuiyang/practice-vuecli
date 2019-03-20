//  H5页面调回app页面
 import {backToApp} from './url'
 var mixin ={
     methods:{
         goBack(){
            backToApp()
         }
     }
 }
 export {mixin}