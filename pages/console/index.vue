<template>
<div>
    <mt-header fixed title="血糖故事">
      <img :src="`${profile.pictureUrl}/small`" alt="" slot="right" height="30px">
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
  async asyncData (context) {
    const userId = context.store.state.profile.userId
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

    let { data } = await axios.post('/graphql', {
      query: qlScript
    })

    return {
      records: data.data
    }
  },
  name: 'console',
  computed: {
    profile () {
      return this.$store.state.profile
    },
    alldata () {
      const bgRecord = this.records.userCustomusermodelByLineId.bgRecordBgmodelsByUserId.nodes
      const foodRecord = this.records.userCustomusermodelByLineId.foodRecordFoodmodelsByUserId.nodes

      const data = []
      bgRecord.forEach((item) => {
        data.push(item)
      })
      foodRecord.forEach((item) => {
        data.push(item)
      })

      return _.orderBy(data, 'time', 'desc')
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

<style scoped>
.flow-layout {
  margin-top: 40px;
  z-index: 0;
}

.mdl-card {
  min-height: initial;
  margin: auto;
  margin-top: 10px;
}

.mdl-card__actions {
  text-align: right;
}
</style>
