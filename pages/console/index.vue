<template>
<div>
  <mt-header fixed title="選單">
    <img :src="`${profile}/small`" alt="" slot="right" height="30px">
  </mt-header>

  <div class="spaceing"></div>

  <mt-swipe :show-indicators="true">
    <mt-swipe-item>
      <div class="mdl-card summary-card">
        weekly report
      </div>
    </mt-swipe-item>
  </mt-swipe>

  <div class="flow-layout">
    <div class="mdl-card" v-for="item in alldata">
      <div class="mdl-card__title">
        <div v-if="item.type">{{ item.type === 'before' ? "餐前" : "飯後"  }}血糖:  {{ item.glucoseVal }} </div>
        <div v-if="item.foodImageUpload">
          <img :src="`https://debby.metology.com.tw/media/${item.foodImageUpload}`" alt="food_image" width="100%">
        </div>
      </div>
      <div class="mdl-card__supporting-text" v-if="item.note">
        {{ item.note }}
      </div>
      <div class="mdl-card__actions">
        {{ item.time | readableTime }}
      </div>
    </div>
  </div>

  <mt-tabbar v-model="selected">
    <mt-tab-item id="綜合">
      <img slot="icon" src="~assets/svg/file.svg">
      綜合
    </mt-tab-item>
    <mt-tab-item id="血糖">
      <img slot="icon" src="~assets/svg/blood-drop.svg">
      血糖
    </mt-tab-item>
    <mt-tab-item id="飲食">
      <img slot="icon" src="~assets/svg/salad.svg">
      飲食
    </mt-tab-item>
    <mt-tab-item id="藥物">
      <img slot="icon" src="~assets/svg/pill-capsule.svg">
      藥物
    </mt-tab-item>
  </mt-tabbar>

</div>
</template>

<script>
import axios from 'axios'
import _ from 'lodash'

export default {
  created () {
    if (process.BROWSER_BUILD) {
      const userId = window.localStorage.getItem('userId')

      const qlScript = `
        {
          userCustomusermodelByLineId(lineId:"${userId}") {
            bgRecordBgmodelsByUserId(orderBy:TIME_DESC){
              nodes {
                time,
                glucoseVal,
                type
              }
            },
            foodRecordFoodmodelsByUserId(orderBy: TIME_DESC) {
              nodes {
                time,
                note,
                foodImageUpload
              }
            },
            bgRecordDrugintakemodelsByUserId(orderBy: TIME_DESC) {
              nodes {
                time,
                status
              }
            },
            bgRecordInsulinintakemodelsByUserId(orderBy: TIME_ASC) {
              nodes {
                time,
                status
              }
            }
          }
        }`

      axios.post('/graphql', {
        query: qlScript
      })
      .then((res) => {
        const data = res.data
        const bgRecord = data.data.userCustomusermodelByLineId.bgRecordBgmodelsByUserId.nodes
        const FoodRecord = data.data.userCustomusermodelByLineId.foodRecordFoodmodelsByUserId.nodes

        const totalData = []
        bgRecord.forEach((item) => {
          totalData.push(item)
        })

        FoodRecord.forEach((item) => {
          totalData.push(item)
        })

        this.$store.commit('SET_TOTAL_DATA', _.orderBy(totalData, 'time', 'desc'))
      })
    }
  },
  data () {
    return {
      selected: ''
    }
  },
  name: 'console',
  computed: {
    profile () {
      if (process.BROWSER_BUILD) {
        return window.localStorage.getItem('pictureUrl')
      }
    },
    alldata () {
      return this.$store.state.totalData
    }
  },
  filters: {
    readableTime (val) {
      const data = val.split(' ')[0]
      const time = val.split(' ')[1].split('.')[0]
      return data + ' ' + time
    }
  }
}
</script>

<style lang="sass" scoped>
.flow-layout
  z-index: 0;
  height: calc(100vh - 55px - 40px - 250px);
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
  width: 90%
  margin: auto
  height: 100%

.mdl-card__actions
  text-align: right;


// mint-setting

.mint-header
  background-color: #1158a8

.mint-swipe
  height: 200px

.mint-tabbar
  z-index: 2

.spaceing
  height: 40px
</style>
