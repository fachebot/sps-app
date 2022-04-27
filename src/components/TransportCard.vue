<script lang="ts">
import { TelegramSharp as TelegramIcon } from '@vicons/material'
import { LogoDiscord as DiscordIcon } from '@vicons/ionicons5'
import { defineComponent } from 'vue'

export default defineComponent({
  components: {
    DiscordIcon,
    TelegramIcon
  }
})
</script>

<template>
  <div>
    <n-tooltip trigger="hover">
      <template #trigger>
        <n-button text type="error" style="font-size: 28px" disabled>
          <n-icon>
            <discord-icon />
          </n-icon>
        </n-button>
      </template>
      Discord
    </n-tooltip>

    <n-tooltip trigger="hover">
      <template #trigger>
        <n-button text type="info" style="font-size: 28px">
          <n-icon>
            <telegram-icon />
          </n-icon>
        </n-button>
      </template>
      Telegram
    </n-tooltip>
  </div>
</template>
