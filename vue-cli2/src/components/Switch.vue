<template>
<div>
    <input
        class="inline-x-switch weui-switch"
        type="checkbox"
        :disabled="disabled"
        v-model="currentValue"/>
</div>

</template>

<script>
export default {
  name: 'x-switch',
  methods: {
    toBoolean (val) {
      if (!this.valueMap) {
        return val
      } else {
        const index = this.valueMap.indexOf(val)
        return index === 1
      }
    },
    toRaw (val) {
      if (!this.valueMap) {
        return val
      } else {
        return this.valueMap[val ? 1 : 0]
      }
    }
  },
  props: {
    disabled: Boolean,
    value: {
      type: [Boolean, String, Number],
      default: false
    },
    valueMap: {
      type: Array,
      default: () => ([false, true])
    }
  },
  data () {
    return {
      currentValue: this.toBoolean(this.value)
    }
  },
  watch: {
    currentValue (val) {
      const rawValue = this.toRaw(val)
      this.$emit('input', rawValue)
      this.$emit('on-change', rawValue)
    },
    value (val) {
      this.currentValue = this.toBoolean(val)
    }
  }
}
</script>

<style lang="scss">
$switch-checked-border-color:#53de77;
$switch-checked-bg-color:#53de77;
.weui-switch{
    -webkit-appearance: none;
    appearance: none;
}
.weui-switch,
.weui-switch-cp__box{
    position: relative;
    width: .73rem;
    height: .38rem;
    border: 1px solid #DFDFDF;
    outline: 0;
    border-radius: .19rem;
    box-sizing: border-box;
    background-color: #f5f5f5;
    transition: background-color .1s, border .1s;
    &:before{
        content: " ";
        position: absolute;
        top: 0;
        left: 0;
        // width: .73rem;
        height: .34rem;
        border-radius: .15rem;
        background-color: #FDFDFD;
        transition:transform .35s cubic-bezier(0.45, 1, 0.4, 1);
    }
    &:after{
        content: " ";
        position: absolute;
        top: 0;
        left: 0;
        width:.34rem;
        height:.34rem;
        border-radius: .17rem;
        background-color: #FFFFFF;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
        transition:transform .35s cubic-bezier(0.4, 0.4, 0.25, 1.35);
    }
}
.weui-switch:checked,
.weui-switch-cp__input:checked ~ .weui-switch-cp__box{
    /** vux **/
    border-color: $switch-checked-border-color;
    background-color: $switch-checked-bg-color;
    /** end vux **/
    &:before {
        transform: scale(0);
    }
    &:after {
        transform: translateX(20px);
    }
}
// 兼容IE Edge的版本
.weui-switch-cp__input{
    position: absolute;
    left: -9999px;
}
.weui-switch-cp__box{
    display: block;
}

</style>
