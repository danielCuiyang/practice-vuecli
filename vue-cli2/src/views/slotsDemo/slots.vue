<template>
    <div>
        <h3>slots demo</h3>
        <hr>
        {{shopcartDetail.name}}(传给子组件，以及接受emit回来的值)
        <shopcart>
            <shopcart-item :message="shopcartDetail" @changeMsg="changeMsg">
                {{msg}}
            </shopcart-item>
        </shopcart>
    </div>
</template>
<script>
import Shopcart from './shopcart.vue'
import ShopcartItem from './shopcart-item.vue'
export default {
  name: 'slots',
  data () {
    return {
      msg: 'Welcome to Your Vue.js slots demo',
      shopcartDetail: {
        name: 'cuishuaiyang'
      }
    }
  },
  components: {
    Shopcart,
    ShopcartItem
  },
  methods: {
    changeMsg () {
      this.shopcartDetail.name = '崔央'
    }
  }
}
</script>
