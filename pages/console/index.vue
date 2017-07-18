<template>
<div class="console-layout">
  <mt-header fixed title="Debby - 血糖故事">
    <img :src="`${profile}/small`" alt="" slot="right" height="30px">
  </mt-header>

  <div class="spaceing"></div>

  <!--<div class="console-child-layout">-->
  <mt-tab-container v-model="selected" :swipeable="false">
    <mt-tab-container-item id="bgstory">
      <BGStory></BGStory>
    </mt-tab-container-item>
    <mt-tab-container-item id="summary">
      <SummaryReport></SummaryReport>
    </mt-tab-container-item>
    <mt-tab-container-item id="articles">
      <Articles></Articles>
    </mt-tab-container-item>
    <mt-tab-container-item id="shop">
      <shop></shop>
    </mt-tab-container-item>
  </mt-tab-container>
  <!--</div>-->

  <mt-tabbar v-model="selected">

    <mt-tab-item id="bgstory">
        <img slot="icon" src="~assets/svg/blood-drop.svg" class="tab-icon">
        血糖故事
    </mt-tab-item>
    <mt-tab-item id="summary">
        <img slot="icon" src="~assets/svg/pie-chart.svg" class="tab-icon">
        統計圖表
    </mt-tab-item>
    <mt-tab-item id="articles">
        <img slot="icon" src="~assets/svg/file.svg" class="tab-icon">
        推薦文章
    </mt-tab-item>
    <mt-tab-item id="shop">
        <img slot="icon" src="~assets/svg/cart.svg" class="tab-icon">
        商城選購
    </mt-tab-item>
    
  </mt-tabbar>
  
</div>
</template>

<script>
import Articles from '~components/console/Articles'
import BGStory from '~components/console/BGStory'
import Shop from '~components/console/Shop'
import SummaryReport from '~components/console/SummaryReport'
import { Indicator } from 'mint-ui'

export default {
  name: 'console',
  components: {
    BGStory,
    Articles,
    Shop,
    SummaryReport
  },
  data () {
    return {
      selected: 'bgstory'
    }
  },
  created () {
    if (process.BROWSER_BUILD) {
      Indicator.open()
    }
  },
  watch: {
    totalData () {
      if (process.BROWSER_BUILD) {
        if (Object.getOwnPropertyNames(this.totalData).length !== 0) {
          Indicator.close()
        }
      }
    }
  },
  computed: {
    profile () {
      if (process.BROWSER_BUILD) {
        return window.localStorage.getItem('pictureUrl')
      }
    },
    totalData () {
      return this.$store.state.totalData
    }
  }
}
</script>

<style lang="sass" scoped>
.spaceing
  height: 40px

.console-child-layout
  height: calc(100vh - 40px - 55px)

.tab-icon
  width: 24px
  height: 24px

.console-layout
  height: 100vh
  position: relative
</style>
