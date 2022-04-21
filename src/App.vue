<template>
  <main>
    <n-layout position="absolute">
      <n-layout-scroll-container>
        <!-- header -->
        <n-layout-header style="
            --side-padding: 64px;
            grid-template-columns: calc(360px - var(--side-padding)) 1fr auto;
          " class="nav" bordered>
          <!-- logo -->
          <n-text class="ui-logo">
            <img src="@/assets/logo.svg" />
            <span>Simple Push Service</span>
          </n-text>

          <!-- menu -->
          <div style="display: flex; align-items: center">
            <n-menu mode="horizontal" :options="menuOptions" />
          </div>

          <!-- login -->
          <div class="nav-end">
            <n-button text>
              <img src="@/assets/metamask.svg" />
              <span>钱包登录</span>
            </n-button>
          </div>
        </n-layout-header>

        <!-- content -->
        <n-layout position="absolute" style="top: var(--header-height);">
          <HomeView></HomeView>
        </n-layout>>
      </n-layout-scroll-container>
    </n-layout>
  </main>
</template>

<script setup lang="ts">
import type { MenuOption } from "naive-ui"
import HomeView from './views/HomeView.vue'

const menuOptions: MenuOption[] = [
  {
    label: "首页",
    key: "home",
  },
  {
    label: "接口",
    key: "interface",
  },
];
</script>

<style>
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
