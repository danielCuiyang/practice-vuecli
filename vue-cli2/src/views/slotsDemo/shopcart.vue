<template>
    <div class="shopcart">
        {{msg}}
        <hr>
        <slot></slot>
    </div>
</template>
<script>
export default{
  name: 'shopcart',
  data () {
    return {
      msg: 'shopcart.vue'
    }
  }
}
</script>
