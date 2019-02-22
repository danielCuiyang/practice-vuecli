<template>
    <div>
      <div v-for="(item,index) in routerArray" :key="index">
          <div v-for="(i,index) in item.children" :key="index">
               <router-link :to="i.path">{{i.name}}</router-link>
          </div>
      </div>
    </div>
</template>
<script>
import { routerArray } from '@/router'

export default {
    data(){
        return{
            routerArray : routerArray
        }
    },
    created(){
    }
}
</script>

