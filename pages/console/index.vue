<template>
<div>
    <mt-header fixed title="血糖故事">
      <img :src="`${profile}/small`" alt="" slot="right" height="30px">
    </mt-header>
    <div class="mdl-layout mdl-js-layout flow-layout">
      <main class="mdl-layout__content">
        <div class="mdl-card mdl-shadow--2dp" v-for="item in alldata">
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

      </main>
    </div>
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
  margin-top: 40px;
  z-index: 0;

.mdl-card
  min-height: initial;
  margin: auto;
  margin-top: 10px;
  width: 100%;

.mdl-card__actions
  text-align: right;
</style>
