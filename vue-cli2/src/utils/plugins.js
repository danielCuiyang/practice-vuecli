import ToastComponent from "@/components/Toast"
import { mergeOptions } from './plugin_helper'
import objectAssign from 'object-assign'
let $vm
let watcher

const plugin = {
  install (vue, pluginOptions = {}) {
    const Toast = vue.extend(ToastComponent)
    if (!$vm) {
      $vm = new Toast({
        el: document.createElement('div')
      })
      document.body.appendChild($vm.$el)
    }
    const defaults = {}
    for (let i in $vm.$options.props) {
      if (i !== 'value') {
        defaults[i] = $vm.$options.props[i].default
      }
    }
    console.log(defaults,"defaults")
    const toast = {
      show (options = {}) {
        // destroy watcher
        watcher && watcher()
        // console.log(options,"options")
        // console.log(typeof options,"options")
        if (typeof options === 'string') {
          mergeOptions($vm, objectAssign({}, pluginOptions, {text: options}))
        } else if (typeof options === 'object') {
            console.log(123)
          mergeOptions($vm, objectAssign({}, pluginOptions, options))
        }
        if (typeof options === 'object' && options.onShow || options.onHide) {
            console.log(456)
          watcher = $vm.$watch('show', (val) => {
            val && options.onShow && options.onShow($vm)
            val === false && options.onHide && options.onHide($vm)
          })
        }
        $vm.show = true
      },
      text (text, position = 'default') {
        this.show({
          type: 'text',
          width: 'auto',
          position,
          text
        })
      },
      hide () {
        $vm.show = false
      },
      isVisible () {
        return $vm.show
      }
    }
    vue.prototype.$toast = toast
  }
}

export default plugin
export const install = plugin.install

