<script lang="ts">
import { Copy as CopyIcon } from '@vicons/ionicons5'
import { defineComponent } from 'vue'
import { useMessage } from 'naive-ui'
import useClipboard from 'vue-clipboard3'

export default defineComponent({
  components: {
    CopyIcon
  },

  props: {
    text: String
  },

  setup(props) {
    const message = useMessage()
    const { toClipboard } = useClipboard()

    return {
      async handleClick() {
        if (!props.text) {
          return
        }

        try {
          await toClipboard(props.text)
          message.success('复制成功')
        } catch (e) {
          message.success('复制失败')
        }
      }
    }
  }
})
</script>

<template>
  <div>
    <n-text depth="3">{{ text }}</n-text>
    <n-button tertiary size="tiny" @click="handleClick">
      <template #icon>
        <n-icon>
          <copy-icon />
        </n-icon>
      </template>
    </n-button>
  </div>
</template>
