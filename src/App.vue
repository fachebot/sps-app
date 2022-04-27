<script lang="ts">
import { defineComponent } from 'vue'
import NavigationBar from './components/NavigationBar.vue'

export default defineComponent({
  components: {
    NavigationBar
  }
})
</script>

<template>
  <main>
    <n-message-provider>
      <n-layout position="absolute">
        <n-layout-scroll-container>
          <NavigationBar></NavigationBar>

          <n-layout position="absolute" style="top: var(--header-height);">
            <RouterView />
          </n-layout>>
        </n-layout-scroll-container>
      </n-layout>
    </n-message-provider>
  </main>
</template>
