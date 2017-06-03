<template>
<div>
    <h3>hello {{ profile.displayName }}</h3>
    <img :src="`${profile.pictureUrl}/small`" alt="">

    <ul>
      <li v-for="item in records.userCustomusermodelByLineId.bgRecordBgmodelsByUserId.nodes">{{ item.glucoseVal }} {{ item.type }} {{ item.time }}</li>
    </ul>
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
