<template>
    <div>
        <div class="header" v-show="!showSearchBox" :class="{showBorder:$route.meta.showBorder}">
            <span class="nav-left" @click="goBack"></span>
            <span class="title">{{$route.meta.title}}</span>
            <span class="edit" v-if="$route.meta.showEdit" @click="edit" >{{editComplete}}</span>
            <span class="search" v-if="$route.meta.showSearch" @click="searchIcon"></span>
        </div>
        <div class="header-search" v-show="showSearchBox">
            <span class="nav-left" @click="searchAll"></span>
            <input type="text" v-model="searchContent" placeholder="请输入搜索内容" v-focus>
            <span v-show="cancel" class="cancel" @click="cancelSearch">取消</span>
            <span v-show="!cancel" class="cancel" @click="emtieSearchContent" >搜索</span>
        </div>
        <div class="mask" v-show="showMask"></div>
    </div>
</template>

<script>
import '@/style/header.scss'
export default {
    data(){
        return{
            showSearchBox:false,
            showMask:false,
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
               this.showSearchBox = true
               this.showMask = true
           }
       } 
    },
    methods:{
        // 点击取消
        cancelSearch(){
            this.showSearchBox =false
            this.showMask = false
            this.cancel = true
        },
        goBack(){
            this.$emit("goBack")
        },
        // 点击搜索按钮icon
        searchIcon(){
            this.showMask = true
            this.showSearchBox=true
            this.$emit("seachIcon",0)
        },
        // 搜索头部左侧返回icon 
        searchAll(){
            this.$emit('searchContent',"")
            this.showMask = false
            this.showSearchBox=false
        },
        // 点击"搜索"的方法
        emtieSearchContent(){
            this.showMask = false
            this.showSearchBox = true
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
            // inserted: function (el) {
            //     el.focus()
            //  },
            update(el){
                el.focus()
            }
        }
    }
}
</script>

