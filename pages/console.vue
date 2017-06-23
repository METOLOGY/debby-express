<template>
<div>
  <mt-header fixed title="血糖故事">
    <img :src="`${profile}/small`" alt="" slot="right" height="30px">
  </mt-header>

  <div class="spaceing"></div>

  <div class="console-child-layout">
    <nuxt-child></nuxt-child>
  </div>

  <mt-tabbar>
    <mt-tab-item id="bgstory">
      <img slot="icon" src="~assets/svg/blood-drop.svg">
      血糖故事
    </mt-tab-item>
    <mt-tab-item id="news">
      <nuxt-link to="/console/news">
      <img slot="icon" src="~assets/svg/file.svg">
      推薦文章
      </nuxt-link>
    </mt-tab-item>
    <mt-tab-item id="shop">
      <img slot="icon" src="~assets/svg/pill-capsule.svg">
      商城選購
    </mt-tab-item>
  </mt-tabbar>
  
</div>
</template>

<script>
export default {
  name: 'console',
  created () {
    this.$store.commit('GET_TOTAL_DATA')
  },
  data () {
    return {
      selected: ''
    }
  },
  watch: {
    selected () {
      console.log(this.selected)
      this.$router.push(`/console/${this.selected}`)
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
</style>
