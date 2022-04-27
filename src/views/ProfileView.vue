<script lang="ts">
import { defineComponent } from 'vue'
import EndpointCard from '../components/EndpointCard.vue'
import TransportCard from '../components/TransportCard.vue'

export default defineComponent({
  components: {
    EndpointCard,
    TransportCard
  }
})
</script>

<template>
  <div class="content" style="overflow: hidden;">
    <n-grid x-gap="12" :cols="3" style="padding-top: 5vh;">
      <n-gi />

      <n-gi>
        <!-- Endpoint -->
        <n-card class="card" title="我的接口" header-style="text-align: left;">
          <EndpointCard openId="8babf611-87b5-414f-9a9c-e1bd6fde904e"
            projectId="O3bnoP83RVKOWdivimCpZpdKCJ3xSpIVzbkvVdty9yhT3z8ZOckLdmoCO0BLuhAf">
          </EndpointCard>
        </n-card>

        <!-- Transport -->
        <n-card class="card" title="社交账号" header-style="text-align: left;">
          <TransportCard></TransportCard>
        </n-card>

        <!-- Try it online -->
        <n-card class="card" title="在线工具" header-style="text-align: left;">
          <n-form label-placement="left" label-width="auto" require-mark-placement="right-hanging">
            <n-form-item class="try-it-input" label="标题" path="inputValue">
              <n-input placeholder="" />
            </n-form-item>
            <n-form-item class="try-it-input" label="内容" path="textareaValue">
              <n-input placeholder="" type="textarea" :autosize="{
                minRows: 3,
                maxRows: 5
              }" />
            </n-form-item>
            <div>
              <n-button type="primary">
                发送
              </n-button>
            </div>
          </n-form>
        </n-card>
      </n-gi>

      <n-gi />
    </n-grid>
  </div>
</template>

<style scoped>
.content {
  display: flex;
  flex-direction: column;
  height: calc(100vh - 72px);
  position: relative;
  text-align: center
}

.content .card {
  margin-bottom: 20px;
}

.content .card .try-it-input {
  text-align: left
}
</style>
