<script lang="ts">
import { defineComponent } from 'vue'
import { useAccountStore } from '@/stores/account'
import EndpointCard from '../components/EndpointCard.vue'
import TransportCard from '../components/TransportCard.vue'
import TryItOutApiCard from '../components/TryItOutApiCard.vue'

const placeholder = '********************************'

export default defineComponent({
  components: {
    EndpointCard,
    TransportCard,
    TryItOutApiCard
  },

  computed: {
    show() {
      const account = useAccountStore()
      return account.user == null
    },
    openId() {
      const account = useAccountStore()
      if (!account.user) {
        return placeholder
      }
      return account.user.open_id
    },
    projectId() {
      const account = useAccountStore()
      if (!account.user) {
        return placeholder
      }
      return account.user.project_id
    },
    connectedTransports() {
      const account = useAccountStore()
      if (!account.user) {
        return []
      }

      return account.user.transports.filter((value) => value.connected).map((value) => {
        return value.type
      })
    }
  }
})
</script>

<template>

  <div class="content" style="overflow: hidden;">
    <n-grid :cols="10" item-responsive responsive="screen" style="padding-top: 5vh;">
      <n-gi span="0 m:2 l:3" />

      <n-gi span="10 m:6 l:4">
        <n-space vertical>
          <n-spin :show="show" size="large">
            <template #icon>
            </template>
            <template #description>
              登录后可用
            </template>

            <!-- Endpoint -->
            <n-card class="card" title="我的接口" header-style="text-align: left;">
              <EndpointCard :openId="openId" :projectId="projectId">
              </EndpointCard>
            </n-card>

            <!-- Transport -->
            <n-card class="card" title="社交账号" header-style="text-align: left;">
              <TransportCard :openId="openId" :connectedTransports="connectedTransports"></TransportCard>
            </n-card>

            <!-- Try it out api -->
            <n-card class="card" title="在线工具" header-style="text-align: left;">
              <TryItOutApiCard :projectId="projectId"></TryItOutApiCard>
            </n-card>
          </n-spin>
        </n-space>
      </n-gi>
      <n-gi span="0 m:2 l:3" />
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
</style>
