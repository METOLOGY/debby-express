<template>
<div>
  <mt-header fixed title="選單">
    <img :src="`${profile}/small`" alt="" slot="right" height="30px">
  </mt-header>

  <div class="spaceing"></div>

  <div class="flow-layout">
    <mt-swipe :show-indicators="false" :auto="0">
      <mt-swipe-item v-for="dayData in alldata">
        <div class="mdl-card" v-for="item in dayData">
          <div class="mdl-card__title">

            <div class="media">
              <img src="~assets/svg/blood-drop.svg" v-if="item.dataType === 'bg'" class="media-icon">
              <img src="~assets/svg/salad.svg" v-if="item.dataType === 'food'" class="media-icon">
            </div>

            <div class="desc">
              <div v-if="item.type">{{ item.type === 'before' ? "餐前" : "飯後"  }}血糖:  {{ item.glucoseVal }} </div>
              <div v-if="item.note">{{ item.note }}</div>
              <small>{{ item.time | readableTime }}</small>
            </div>

          </div>

          <div v-if="item.foodImageUpload" class="flow-image">
            <img :src="`https://debby.metology.com.tw/media/${item.foodImageUpload}`" alt="food_image" width="100%">
          </div>

          <div v-if="alldata.length === 0" class="empty">
            <img src="~assets/svg/debby-no-record.svg" id="debby">
          </div>
        </div>
      </mt-swipe-item>
    </mt-swipe>

    <mt-tabbar>
      <mt-tab-item id="all">
        <img slot="icon" src="~assets/svg/file.svg">
        血糖故事
      </mt-tab-item>
      <mt-tab-item id="bg">
        <img slot="icon" src="~assets/svg/blood-drop.svg">
        推薦文章
      </mt-tab-item>
    <!--     <mt-tab-item id="food">
        <img slot="icon" src="~assets/svg/salad.svg">
        飲食分享
      </mt-tab-item> -->
      <mt-tab-item id="drug_insulin">
        <img slot="icon" src="~assets/svg/pill-capsule.svg">
        商城選購
      </mt-tab-item>
    </mt-tabbar>
  </div>
</div>
</template>

<script>
// import _ from 'lodash'
// import c3 from 'c3'
// import FastClick from 'fastclick'

// require('d3')

export default {
  name: 'console',
  created () {
    this.$store.commit('GET_TOTAL_DATA')
    // FastClick.attach(document.body)
  },
  mounted () {
    // if (process.BROWSER_BUILD) {
    //   const time = ['x']
    //   const value = ['glucoseVal']
    //   this.$store.state.totalData.BgRecord.forEach((item) => {
    //     time.push(new Date(item.time))
    //     value.push(item.glucoseVal)
    //   })

    //   console.log(time)
    //   console.log(value)
    //   c3.generate({
    //     size: {
    //       height: 200
    //     },
    //     legend: {
    //       show: true
    //     },
    //     tooltip: {
    //       show: true
    //     },
    //     bindto: '#weekly-chart',
    //     data: {
    //       x: 'x',
    //       columns: [
    //         time,
    //         value
    //       ]
    //     },
    //     axis: {
    //       x: {
    //         type: 'timeseries',
    //         tick: {
    //           format: '%m-%d'
    //         }
    //       }
    //     }
    //   })
    // }
  },
  data () {
    return {
      selected: 'all'
    }
  },
  computed: {
    profile () {
      if (process.BROWSER_BUILD) {
        return window.localStorage.getItem('pictureUrl')
      }
    },
    alldata () {
      return this.$store.state.DataByDate
      // switch (this.selected) {
      //   case 'all':
      //     const all = []
      //     for (let key in this.$store.state.totalData) {
      //       const item = this.$store.state.totalData[key]
      //       item.forEach((val) => {
      //         all.push(val)
      //       })
      //     }
      //     return _.orderBy(all, 'time', 'desc')
      //   case 'bg':
      //     return _.orderBy(this.$store.state.totalData.BgRecord, '-time')
      //   case 'food':
      //     return _.orderBy(this.$store.state.totalData.FoodRecord, '-time')
      //   case 'drug_insulin':
      //     const drugInsulin = []
      //     this.$store.state.totalData.DrugRecord.forEach((val) => {
      //       drugInsulin.push(val)
      //     })
      //     this.$store.state.totalData.InsulinRecord.forEach((val) => {
      //       drugInsulin.push(val)
      //     })
      //     return _.orderBy(drugInsulin, '-time')
      // }
    }
  },
  filters: {
    readableTime (val) {
      const date = val.split(' ')[0]
      const time = val.split(' ')[1].split('.')[0]
      return date + ' ' + time
    }
  }
}
</script>

<style lang="sass" scoped>
.flow-layout
  z-index: 0;
  height: calc(100vh - 55px - 40px);
  overflow: scroll;
  background-color: rgba(0,0,0,0.1)
  padding-top: 5px
  padding-bottom: 5px

.mdl-card
  min-height: initial;
  margin: auto;
  margin-top: 5px;
  width: 100%;
  &:first-child
    margin-top: 0px

.summary-card
  width: calc(100% - 10px)
  margin: auto
  height: 100%

.mdl-card__actions
  text-align: right;

.media
  width: 50px
  .media-icon
    height: 35px

.flow-image
  width: 100%

// mint-setting
.mint-header
  background-color: #1158a8

.mint-swipe
  height: 200px

.mint-tabbar
  z-index: 2

.spaceing
  height: 40px

.empty
  position: relative
  height: calc(100% - 200px);
  #debby
    position: absolute
    bottom: 0px
    width: 98%
    left: 1%
</style>
