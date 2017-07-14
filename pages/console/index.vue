<template>
<div>
  <mt-header fixed title="血糖故事">
    <img :src="`${profile}/small`" alt="" slot="right" height="30px">
  </mt-header>

  <div class="spaceing"></div>

  <!--<div class="console-child-layout">-->
  <mt-tab-container v-model="selected" :swipeable="false">
    <mt-tab-container-item id="summary">
      <SummaryReport></SummaryReport>
    </mt-tab-container-item>
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
    <mt-tab-item id="summary">
        <img slot="icon" src="~assets/svg/pie-chart.svg" class="tab-icon">
        統計圖表
    </mt-tab-item>


    <mt-tab-item id="bgstory">
        <img slot="icon" src="~assets/svg/blood-drop.svg" class="tab-icon">
        血糖故事
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
import axios from 'axios'
import Articles from '~components/console/Articles'
import BGStory from '~components/console/BGStory'
import Shop from '~components/console/Shop'
import SummaryReport from '~components/console/SummaryReport'

const redirectUri = 'http://localhost:3000/console/'

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
  computed: {
    profile () {
      if (process.BROWSER_BUILD) {
        return window.localStorage.getItem('pictureUrl')
      }
    }
  },
  created () {
    const vm = this
    if (this.$route.query.code) {
      const request = {
        client_id: '1505688700',
        client_secret: '93e503e803bf6889cf1ba3c564e81fa0',
        code: vm.$route.query.code,
        redirect_uri: redirectUri,
        grant_type: 'authorization_code'
      }

      axios.post('/api/line-token', request)
      .then((res) => {
        const data = res.data
        const keys = Object.keys(data)

        for (let i = 0; i < keys.length; i++) {
          const key = keys[i]
          localStorage.setItem(key, data[key])
        }

        this.$store.commit('GET_TOTAL_DATA')
        // vm.$router.push('/console')
      })
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
</style>
