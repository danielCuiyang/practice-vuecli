<template>
    <div>发布商标</div>
</template>

<script>
  //  import { informations } from '@/api/issue'
    export default {
      created() {
        informations(2).then(res => {
          this.content = res.data.content
        })
      }
    }
</script>

<style scoped>

</style>
