<script lang="ts">
import { defineComponent } from 'vue'
import { BaseURI } from '@/api'
import CopyText from './CopyText.vue'

export default defineComponent({
  components: {
    CopyText
  },

  props: {
    openId: String,
    projectId: String
  },

  computed: {
    baseuri() {
      return BaseURI
    }
  }
})
</script>

<template>
  <div class="enpoint">
    <n-h6>Open ID</n-h6>
    <CopyText :text="openId"></CopyText>

    <n-h6>接口地址</n-h6>
    <CopyText :text="baseuri + '/' + projectId">
    </CopyText>
  </div>
</template>

<style scoped>
.enpoint {
  display: flex;
  flex-direction: column;
  text-align: left
}
</style>
