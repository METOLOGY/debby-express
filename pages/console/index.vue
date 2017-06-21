<template>
<div>
  <mt-header fixed title="血糖故事">
    <img :src="`${profile}/small`" alt="" slot="right" height="30px">
  </mt-header>

  <div class="spaceing"></div>

  <div class="flow-layout">
    <mt-swipe :show-indicators="false" :auto="0">
      <mt-swipe-item v-for="(dayData, datetime) in alldata">
        <div class="datetime-bar">
          {{ datetime | readableDate }}
        </div>

        <div class="card-wrap">
          <div class="mdl-card" v-for="item in dayData">
            <div v-if="item.dataType === 'food'" class="flow-image">
              <img :src="`https://debby.metology.com.tw/media/${item.foodImageUpload}`" alt="food_image" width="100%">
              <div class="food-image--mask"></div>
              <h3 v-if="item.similar_record" class="food-image--text">{{ item.similar_record[0].glucoseVal }}<small>mg/dL</small> {{ item.type === 'before' ? "餐前" : "飯後"  }}</h3>
            </div>


            <div class="mdl-card__supporting-text bg-supporting-text" v-if="item.dataType === 'bg'">
                <div class="supporting-text-wrap">
                  <h5 v-if="item.dataType === 'bg'">{{ item.type === 'before' ? "餐前" : "飯後"  }}</h5>
                  <h1 v-if="item.type">
                    {{ item.glucoseVal }}
                    <span id="bg-unit"><small>mg/dL</small></span>
                  </h1>
                </div>
            </div>

            <div class="mdl-card__supporting-text food-supporting-text" v-else>
              <div v-if="item.note"><h5>{{ item.note }}</h5></div>
            </div>


            <div v-if="alldata.length === 0" class="empty">
              <img src="~assets/svg/debby-no-record.svg" id="debby">
            </div>

            <div class="mdl-card__actions">
              <small>{{ item.time | readableTime }}</small>
            </div>

            <div class="mdl-card__menu">
              <div class="media">
                <img src="~assets/svg/blood-drop.svg" v-if="item.dataType === 'bg'" class="media-icon">
                <img src="~assets/svg/salad.svg" v-if="item.dataType === 'food'" class="media-icon">
              </div>
            </div>

          </div>
        </div>
      </mt-swipe-item>
    </mt-swipe>

    <mt-tabbar>
      <mt-tab-item id="all">
        <img slot="icon" src="~assets/svg/blood-drop.svg">
        血糖故事
      </mt-tab-item>
      <mt-tab-item id="bg">
        <img slot="icon" src="~assets/svg/file.svg">
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
      const datetime = new Date(val)
      // const date = datetime.getFullYear() + '/' + datetime.getMonth() + '/' + datetime.getDate()
      const time = datetime.getHours() + ':' + datetime.getMinutes()
      return time
    },
    readableDate (val) {
      const datetime = new Date(val)
      const date = datetime.getFullYear() + ' - ' + datetime.getMonth() + ' - ' + datetime.getDate()
      return date
    }
  }
}
</script>

<style lang="sass" scoped>

// mdl format
.mdl-card__actions
  text-align: center
  background-color: #65bdbc
  color: white

.mdl-card
  min-height: initial;
  margin: auto;
  margin-top: 5px;
  width: 98%;
  &:first-child
    margin-top: 0px

.mdl-card__supporting-text
  width: 100%
  padding: 0px


// original

h1
  font-size: 150px
  margin: 0px
  text-align: center
  line-height: 1.0

h5
  margin: 0px

// custom
.flow-layout
  z-index: 0;
  height: calc(100vh - 55px - 40px);
  overflow: scroll;
  background-color: rgba(0,0,0,0.1)
  padding-bottom: 5px

.summary-card
  width: calc(100% - 10px)
  margin: auto
  height: 100%

.media
  width: 50px;
  height: 50px;
  display: flex;
  //border: 2px solid black;
  border-radius: 50%;
  background: white;
  .media-icon
    margin: auto
    height: 35px

.flow-image
  width: 100%
  position: relative
  img

  .food-image--mask
    position: absolute
    background: linear-gradient(to bottom, rgba(255,255,255,0) 0%,rgba(255,255,255,0.2) 80%,rgba(81,81,81,1) 100%);
    top: 0px;
    height: 100%;
    width: 100%;
  .food-image--text
    position: absolute
    bottom: 0px
    left: 5%;
    margin: 16px 0px;
    color: white;
    font-weight: 100;

.bg-supporting-text
  min-height: calc(100vw - 34px)
  display: flex
  .supporting-text-wrap
    margin: auto

.food-supporting-text
  padding: 5%

#bg-unit
  font-size: 0.3em

.datetime-bar
  background: white;
  padding: 10px;
  font-size: 20px;
  line-height: 1;
  text-align: center;

.card-wrap
  height: calc(100% - 44px)
  overflow: auto
  padding-top: 1%


// mint-setting
.mint-header
  background-color: #1158a8

.mint-swipe
  // height: 200px

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
