<template>
    <div>
        <div class="header">
            <span class="nav-left" @click="goBack"></span>
            <span class="title">{{$route.meta.title}}</span>
            <span class="edit" v-if="$route.meta.showEdit" @click="edit" >{{editComplete}}</span>
            <span class="search" v-if="$route.meta.showSearch" @click="showSearchBox=true"></span>
        </div>
        <div class="header-search" v-show="showSearchBox">
            <input type="text" v-model="searchContent" placeholder="请输入搜索内容" v-focus>
            <span v-show="cancel" class="cancel" @click="showSearchBox=false">取消</span>
            <span v-show="!cancel" class="cancel" @click="emtieSearchContent" >搜索</span>
        </div>
        <div class="mask" v-show="showSearchBox" @click="showSearchBox=false"></div>
    </div>
</template>

<script>
import '@/style/header.scss'
export default {
    data(){
        return{
            showSearchBox:false,
            cancel:true,
            searchContent:'',
            editComplete:"编辑",
            editId:true
        }
    },
    watch:{
       searchContent:function(val){
           if(val){
               this.cancel=false
           }else{
               this.cancel=true
           }
       } 
    },
    methods:{
        goBack(){
            console.log(123)
            this.$router.go('-1');
        },
        emtieSearchContent(){
            this.showSearchBox=false
            this.$emit('searchContent',this.searchContent)
        },
        edit(){
            if(this.editId){
                 this.editComplete = '完成'
                 this.editId = false
            }else{
                this.editComplete = '编辑'
                 this.editId = true
            }
            this.$emit('editEv',!this.editId)
        }
    },
    directives: {
        focus: {
            // 指令的定义
            inserted: function (el) {
            el.focus()
        }
    }
}
}
</script>

