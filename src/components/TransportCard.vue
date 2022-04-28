<script lang="ts">
import { TelegramSharp as TelegramIcon } from '@vicons/material'
import { LogoDiscord as DiscordIcon } from '@vicons/ionicons5'
import { defineComponent } from 'vue'

interface Transport {
  name: string,
  color: string,
  url: string,
  connected: boolean
}

export default defineComponent({
  components: {
    DiscordIcon,
    TelegramIcon
  },

  props: {
    openId: String,
    connectedTransports: Array,
  },

  data() {
    return {
      transport: {
        discord: {
          name: 'Discord',
          color: '#CF2020',
          url: '',
          connected: false,
        },
        telegram: {
          name: 'Telegram',
          color: '#38BBD2',
          url: 'https://t.me/simple_push_bot?start=${open_id}',
          connected: false
        }
      }
    }
  },

  watch: {
    connectedTransports(value: Array<String>) {
      value.forEach((value) => {
        switch (value) {
          case 'discord':
            this.transport.discord.connected = true
            break
          case 'telegram':
            this.transport.telegram.connected = true
            break
        }
      })
    }
  },

  methods: {
    showName(transport: Transport) {
      if (transport.connected) {
        return `${transport.name}(已连接)`
      }
      return `${transport.name}(未连接)`
    },

    showColor(transport: Transport) {
      return transport.connected ? transport.color : ''
    },

    handleClick(transport: Transport) {
      if (transport.connected) {
        return
      }

      const url = transport.url.replace('${open_id}', this.openId as string);
      window.open(url, '_blank')
    }
  },

  mounted() {
    this.connectedTransports?.forEach((value) => {
      switch (value) {
        case 'discord':
          this.transport.discord.connected = true
          break
        case 'telegram':
          this.transport.telegram.connected = true
          break
      }
    })
  },
})
</script>

<template>
  <div>
    <n-tooltip trigger="hover">
      <template #trigger>
        <n-icon size="32" :color="showColor(transport.discord)" @click="handleClick(transport.discord)">
          <discord-icon />
        </n-icon>
      </template>
      {{ showName(transport.discord) }}
    </n-tooltip>

    <n-tooltip trigger="hover">
      <template #trigger>
        <n-icon size="32" :color="showColor(transport.telegram)" @click="handleClick(transport.telegram)">
          <telegram-icon />
        </n-icon>
      </template>
      {{ showName(transport.telegram) }}
    </n-tooltip>
  </div>
</template>
