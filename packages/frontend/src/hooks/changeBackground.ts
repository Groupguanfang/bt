import { watch, type Ref } from 'vue'
import { useDark } from '@vueuse/core'

export const changeBackground = (target: Ref) => {
  const isDark = useDark()
  watch(target, () => {
    if (isDark.value) {
      if (target.value === true) {
        document.documentElement.style.background = '#2c2c32'
      } else {
        document.documentElement.style.background = '#121212'
      }
    }
  })
}
