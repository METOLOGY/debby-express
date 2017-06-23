<template>
<div>
  <mt-header fixed title="血糖故事">
    <img :src="`${profile}/small`" alt="" slot="right" height="30px">
  </mt-header>

  <div class="spaceing"></div>

  <!--<div class="console-child-layout">-->
  <mt-tab-container v-model="selected" :swipeable="false">
    <mt-tab-container-item id="bgstory">
      <BGStory></BGStory>
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
      <!--<nuxt-link to="/console/bgstory">-->
        <img slot="icon" src="~assets/svg/blood-drop.svg" class="tab-icon">
        血糖故事
      <!--</nuxt-link>-->
    </mt-tab-item>
    

    <mt-tab-item id="articles">
      <!--<nuxt-link to="/console/news">-->
        <img slot="icon" src="~assets/svg/file.svg" class="tab-icon">
        推薦文章
      <!--</nuxt-link>-->
    </mt-tab-item>
    
    <mt-tab-item id="shop">
      <!--<nuxt-link to="/console/shop">-->
        <img slot="icon" src="~assets/svg/cart.svg" class="tab-icon">
        商城選購
      <!--</nuxt-link>-->
    </mt-tab-item>
    
  </mt-tabbar>
  
</div>
</template>

<script>
import Articles from '~components/console/Articles'
import BGStory from '~components/console/BGStory'
import Shop from '~components/console/Shop'

export default {
  name: 'console',
  created () {
    this.$store.commit('GET_TOTAL_DATA')
  },
  components: {
    BGStory,
    Articles,
    Shop
  },
  data () {
    return {
      selected: 'bgstory'
    }
  },
  computed: {
    profile () {
      if (process.BROWSER_BUILD) {
        return window.localStorage.getItem('pictureUrl')
      }
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

// mint-setting
.mint-header
  background-color: #1158a8
</style>
