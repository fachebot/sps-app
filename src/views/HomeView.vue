<script lang="ts">
import router from "@/router";
import { defineComponent } from 'vue'
import LeftImage from '../components/images/LeftImage.vue'
import RightImage from '../components/images/RightImage.vue'

export default defineComponent({
  components: {
    LeftImage,
    RightImage
  },

  setup() {
    return {
      routerLinkTo(key: string) {
        router.push({ path: key })
      }
    }
  },
})
</script>

<template>
  <div class="banner" style="overflow: hidden;">
    <n-el class="right-image">
      <RightImage></RightImage>
    </n-el>

    <n-h1 class="naive-title" style="margin-top: 0px; font-size: 80px !important;">
      <span>简易推送服务</span>
    </n-h1>

    <n-p style="font-size: 16px; margin-top: 0px; margin-bottom: 0px;"> 一个易于使用的推送服务</n-p>
    <n-p style="font-size: 16px; margin-bottom: 4px; margin-top: 4px; font-weight: 500;">简单的几行代码，实时推送消息到
      Telegram、Discord...</n-p>
    <n-p style="font-size: 16px; margin-top: 0px;"> 可用于服务器告警、程序监控通知等场景</n-p>

    <div>
      <n-button type="primary" size="large" @click="routerLinkTo('/profile')">开始使用</n-button>
    </div>

    <n-el class="left-image">
      <LeftImage></LeftImage>
    </n-el>
  </div>
</template>

<style scoped>
.banner {
  display: flex;
  flex-direction: column;
  height: calc(100vh - 72px);
  justify-content: center;
  position: relative;
  text-align: center
}

.banner:after {
  content: "";
  height: 64px;
  width: 100%
}

.naive-title {
  font-family: Metropolis, sans-serif;
  line-height: 1;
  margin-bottom: 18px !important;
}

.left-image,
.right-image {
  position: absolute;
  top: 50%;
  transform: translateY(-50%)
}

@media only screen and (max-width:1920px) {
  .left-image {
    right: calc(50% + 270px)
  }

  .left-image,
  .right-image {
    min-width: 440px;
    width: calc(50% - 270px)
  }

  .right-image {
    left: calc(50% + 270px)
  }
}

@media only screen and (min-width:1920px) {
  .left-image {
    left: 0;
    width: 700px
  }

  .right-image {
    right: 0;
    width: 700px
  }
}

@media only screen and (max-width:1023px) {
  .banner {
    height: calc(100vh - 124px);
    min-height: 550px;
    padding-left: 16px;
    padding-right: 16px;
    padding-top: 60px;
    position: static;
    text-align: left;
    transform: none
  }

  .left-image {
    left: -16px;
    min-width: unset;
    position: relative;
    top: 8px;
    transform: none;
    width: 300px
  }
}
</style>
