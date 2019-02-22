<template>
    <div>
        {{msg}}
        <br>
        {{message.name}}(props接受到到的值)
        <br>
        <slot></slot> (slot接受到的值)
        <br>
        <button @click="changeMsg">
            点我
        </button>
    </div>
</template>
<script>
export default {
  props: {
    message: Object
  },
  data () {
    return {
      msg: 'shopcart-item.vue'
    }
  },
  methods: {
    changeMsg () {
      this.$emit('changeMsg', '我更改了name')
    }
  }
}
</script>
