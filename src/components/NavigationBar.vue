<script lang="ts">
import { defineComponent } from 'vue'
import router from "@/router"
import { useMessage } from 'naive-ui'
import type { MenuOption } from "naive-ui"
import type { User } from "@/api"
import { authentication, getMe } from "@/api"
import { useAccountStore } from '@/stores/account'
import detectEthereumProvider from '@metamask/detect-provider'

export default defineComponent({
  data() {
    return {
      address: '',
      showModal: false,
      connected: false,
      message: useMessage(),
    }
  },

  methods: {
    loginWithMetamask: async function () {
      const account = useAccountStore()

      try {
        const provider = (await detectEthereumProvider()) as any
        if (!provider) {
          this.message.error('请先安装MetaMask钱包')
          return
        }

        await provider.enable()

        const ts = parseInt((((new Date()).getTime() / 1000)).toFixed(0))
        let text = `I agree to connect my wallet to the simple push service. Timestamp: ${ts}`
        const request = { method: "personal_sign", params: [text, provider.selectedAddress] }
        const signature = await provider.request(request)

        this.showModal = true
        const res = await authentication(provider.selectedAddress, ts, signature)

        if (!res.ok) {
          this.showModal = false
          this.message.error(res.description as string)
          return
        }

        const getMeRes = await getMe(res.result.access_token)
        if (!getMeRes.ok) {
          this.showModal = false
          this.message.error(getMeRes.description as string)
          return
        }
        const user = getMeRes.result as User;

        this.showModal = false
        account.setUser(user)
        account.setProvider(provider)
        account.setAccessToken(res.result.access_token)

        this.connected = true
        this.address = provider.selectedAddress;
      } catch (error) {
        this.showModal = false
        this.message.error('登录失败，请稍后再试')
      }
    }
  },

  setup() {
    const menuOptions: MenuOption[] = [
      {
        label: "首页",
        key: "/",
      },
      {
        label: "接口",
        key: "/profile",
      },
    ]

    return {
      menuOptions,
      routerLinkTo(key: string) {
        router.push({ path: key })
      },
    }
  }
})
</script>

<template>
  <n-layout-header style="--side-padding: 64px;grid-template-columns: calc(360px - var(--side-padding)) 1fr auto;"
    class="nav" bordered>
    <n-modal :show="showModal">
      <n-space>
        <n-spin size="large" />
      </n-space>
    </n-modal>

    <!-- logo -->
    <n-text class="ui-logo" @click="routerLinkTo('/')">
      <img src="@/assets/logo.svg" />
      <span>Simple Push Service</span>
    </n-text>

    <!-- menu -->
    <div style="display: flex; align-items: center">
      <n-menu :on-update:value="routerLinkTo" mode="horizontal" :options="menuOptions" />
    </div>

    <!-- login -->
    <div class="nav-end">
      <n-button v-if="!connected" text :focusable="false" @click="loginWithMetamask">
        <img src="@/assets/metamask.svg" />
        <span>钱包登录</span>
      </n-button>

      <div v-else style="display: flex; align-items: center; flex-wrap: nowrap;">
        <img src="@/assets/metamask.svg" />
        <n-text strong style="font-size: 14px;">{{ address }}</n-text>
      </div>
    </div>
  </n-layout-header>
</template>

<style scoped>
.nav {
  display: grid;
  height: 72px;
  grid-template-rows: calc(var(--header-height) - 1px);
  padding: 0 var(--side-padding);
}

.nav .ui-logo {
  cursor: pointer;
  display: flex;
  font-size: 18px;
  align-items: center;
}

.nav .ui-logo img {
  height: 32px;
  margin-right: 12px;
  width: 32px;
}

.nav-end {
  align-items: center;
  display: flex;
  font-size: 24px;
  align-items: center;
}

.nav-end img {
  height: 32px;
  margin-right: 6px;
  width: 32px;
}
</style>