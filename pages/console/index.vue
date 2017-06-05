<template>
<div>
    <mt-header fixed title="固定在顶部"></mt-header>
    <h3>hello {{ profile.displayName }}</h3>
    <img :src="`${profile.pictureUrl}/small`" alt="">

    <ul>
      <li v-for="item in records.userCustomusermodelByLineId.bgRecordBgmodelsByUserId.nodes">
        {{ item.glucoseVal }} 
        {{ item.type }} 
        {{ item.time }}
      </li>
    </ul>

    <ul>
      <li v-for="item in records.userCustomusermodelByLineId.foodRecordFoodmodelsByUserId.nodes">
        {{ item.note }}
        <img :src="`https://debby.metology.com.tw/media/${item.foodImageUpload}`" alt="food_image" width="50%">
        {{ item.time }}
      </li>
    </ul>
    <mt-tabbar v-model="selected">
      <mt-tab-item id="外卖">
        
        外卖
      </mt-tab-item>
      <mt-tab-item id="订单">
        
        订单
      </mt-tab-item>
      <mt-tab-item id="发现">
        
        发现
      </mt-tab-item>
      <mt-tab-item id="我的">
       
        我的
      </mt-tab-item>
    </mt-tabbar>


</div>
</template>

<script>
import axios from 'axios'

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
    }
  }
}
</script>
