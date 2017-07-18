import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import _ from 'lodash'
import moment from 'moment'

Vue.use(Vuex)

const state = {
  profile: {},
  isLogined: '',
  totalData: [],
  DataByDate: {},
  news: [],
  bgSet: {},
  chartData: {},
  allDataByDate: {}
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
          const time = moment(val.time) // transfer to datetime type
          time.startOf('day') // set time to 0, keep date only
          console.log(time)
          const date = time.years() + '-' + (time.months() + 1) + '-' + time.date()
          if (!(date in allDataByDate)) {
            allDataByDate[date] = []
          }
          allDataByDate[date].push(val)
        })

        // stack other records to the food record. (before or after two hour.)
        for (const key in allDataByDate) {
          const dataByDate = allDataByDate[key]
          dataByDate.forEach((record) => {
            if (record.dataType === 'food') {
              const recordTime = moment(record.time)
              const before2hour = recordTime.subtract(2, 'hour')
              const after2hour = recordTime.add(2, 'hour')

              for (let i = 0; i < dataByDate.length; i++) {
                const otherRecord = dataByDate[i]
                const otherRecordTime = moment(dataByDate[i].time)
                if (otherRecord.dataType === 'bg' && otherRecordTime.isBetween(before2hour, after2hour)) {
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
        // get the data of this week

        const now = moment()
        const last7days = moment().subtract(7, 'day')
        state.totalData.BgRecord.forEach((element) => {
          const date = moment(element.time)
          if (date.isBetween(last7days, now)) {
            labels.push(date.month() + '/' + date.date())
            bgData.push(element.glucoseVal)
          }
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
