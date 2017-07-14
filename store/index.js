import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import _ from 'lodash'

Vue.use(Vuex)

const state = {
  profile: {},
  isLogined: '',
  totalData: [],
  DataByDate: {},
  news: [],
  bgSet: {},
  chartData: {}
}

const mutations = {
  SET_PROFILE (state, response) { // depreciated
    state.profile = response
  },
  GET_RELATED_NEWS (state, question) {
    const url = '/api/get-articles'

    axios.get(`${url}/${question}`)
    .then((res) => {
      state.news = res.data
    })
  },
  GET_TOTAL_DATA (state) {
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
        const BgRecord = data.data.userCustomusermodelByLineId.bgRecordBgmodelsByUserId.nodes
        const FoodRecord = data.data.userCustomusermodelByLineId.foodRecordFoodmodelsByUserId.nodes
        const DrugRecord = data.data.userCustomusermodelByLineId.bgRecordDrugintakemodelsByUserId.nodes
        const InsulinRecord = data.data.userCustomusermodelByLineId.bgRecordInsulinintakemodelsByUserId.nodes

        const allData = []
        const allDataByDate = {}

        BgRecord.forEach((val) => {
          val.dataType = 'bg'
          allData.push(val)
        })

        FoodRecord.forEach((val) => {
          val.dataType = 'food'
          allData.push(val)
        })

        DrugRecord.forEach((val) => {
          val.dataType = 'drug'
          allData.push(val)
        })

        InsulinRecord.forEach((val) => {
          val.dataType = 'insulin'
          allData.push(val)
        })

        allData.forEach((val) => {
          const time = new Date(val.time) // transfer to datetime type
          time.setHours(0, 0, 0, 0) // set time to 0, keep date only
          if (!(time in allDataByDate)) {
            allDataByDate[time] = []
          }
          allDataByDate[time].push(val)
        })

        // stack other records to the food record. (before or after two hour.)
        for (const key in allDataByDate) {
          const dataByDate = allDataByDate[key]
          dataByDate.forEach((record) => {
            if (record.dataType === 'food') {
              const recordTime = new Date(record.time)
              const before2hour = recordTime.setHours(recordTime.getHours() - 2)
              const after2hour = recordTime.setHours(recordTime.getHours() + 2)

              for (let i = 0; i < dataByDate.length; i++) {
                const otherRecord = dataByDate[i]
                const otherRecordTime = new Date(dataByDate[i].time)
                if (otherRecord.dataType === 'bg' && otherRecordTime.getTime() < after2hour && otherRecordTime.getTime() > before2hour) {
                  if (!('similar_record' in record)) record['similar_record'] = []
                  record['similar_record'].push(otherRecord) // append the record to the food record.
                  dataByDate.splice(i, 1) // remove the records.
                }
              }
            }
          })
        }

        state.DataByDate = allDataByDate
        state.totalData = {
          BgRecord: BgRecord,
          FoodRecord: FoodRecord,
          DrugRecord: DrugRecord,
          InsulinRecord: InsulinRecord
        }

        const bgData = []
        const labels = []
        state.totalData.BgRecord.forEach((element) => {
          const date = new Date(element.time)
          labels.push(date.getMonth() + '/' + date.getDate())
          bgData.push(element.glucoseVal)
        })

        state.chartData = {
          label: labels,
          data: bgData
        }

        state.bgSet = {
          'max': Math.max(...bgData),
          'min': Math.min(...bgData),
          'average': (_.sum(bgData) / bgData.length).toFixed(2)
        }
      })
    }
  }
}

const store = new Vuex.Store({
  state,
  mutations
})

const createStore = () => {
  return store
}

export default createStore
