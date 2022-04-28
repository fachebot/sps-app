<script lang="ts">
import { defineComponent } from 'vue'
import { useMessage, useLoadingBar } from 'naive-ui'
import { BaseURI, pushMessage } from '@/api'

export default defineComponent({
  props: {
    projectId: String
  },

  computed: {
    baseuri() {
      return BaseURI
    }
  },

  data() {
    return {
      title: '测试',
      content: '这是一条测试消息',
      sending: false,
      message: useMessage(),
      loadingBar: useLoadingBar()
    }
  },

  methods: {
    async handleClieck() {
      if (!this.projectId) {
        return
      }
      if (this.title.length == 0 && this.content.length == 0) {
        return
      }

      this.sending = true
      this.loadingBar.start()

      try {
        const res = await pushMessage(this.projectId, this.title, this.content)
        if (res.ok) {
          this.loadingBar.finish()
          this.message.info('消息推送成功')
        } else {
          this.loadingBar.error()
          this.message.error(res.description as string)
        }
      } catch (error) {
        this.loadingBar.error()
        this.message.error('发送失败，请稍后再试')
      }

      this.sending = false
    }
  }
})
</script>

<template>
  <n-form label-placement="left" label-width="auto" require-mark-placement="right-hanging">
    <n-form-item class="try-it-input" label="标题" path="inputValue">
      <n-input v-model:value="title" maxlength="30" show-count clearable placeholder="" />
    </n-form-item>
    <n-form-item class="try-it-input" label="内容" path="textareaValue">
      <n-input v-model:value="content" maxlength="120" show-count clearable placeholder="" type="textarea" :autosize="{
        minRows: 3,
        maxRows: 5
      }" />
    </n-form-item>
    <div>
      <n-button type="primary" @click="handleClieck" :disabled="sending">
        推送消息
      </n-button>
    </div>
  </n-form>
</template>

<style scoped>
.try-it-input {
  text-align: left
}
</style>
