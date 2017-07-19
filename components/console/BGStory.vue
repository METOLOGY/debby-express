<template>
  <div class="flow-layout">
    <mt-swipe :show-indicators="false" :auto="0" :speed="100">
      <mt-swipe-item v-for="(dayData, datetime) in alldata" v-bind:dayData="dayData" v-bind:datetime="datetime">
        

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

            <div class="mdl-card__supporting-text food-supporting-text" v-if="item.note">
              <div><h5>{{ item.note }}</h5></div>
            </div>

            <!-- no data: when user login first time.  -->
            <div v-if="alldata.length === 0" class="empty">
              <img src="~assets/svg/debby-no-record.svg" id="debby">
            </div>

            <div class="mdl-card__actions">
              {{ item.time | readableTime }}
            </div>

            <div class="mdl-card__menu">
              <div class="media">
                <img src="~assets/svg/blood-drop.svg" v-if="item.dataType === 'bg'" class="media-icon">
                <img src="~assets/svg/salad.svg" v-if="item.dataType === 'food'" class="media-icon"> 
                <img src="~assets/svg/pill-capsule.svg" v-if="item.dataType === 'drug'" class="media-icon"> 
                <!-- <img src="~assets/svg/salad.svg" v-if="item.dataType === 'food'" class="media-icon">  -->
              </div>
            </div>

          </div>
        </div>

        <div class="datetime-bar">
          {{ datetime }}
        </div>

      </mt-swipe-item>
    </mt-swipe>
  </div>
</template>


<script>
import moment from 'moment'

export default {
  name: 'BGStory',
  created () {
    this.$store.commit('GET_TOTAL_DATA')
  },
  computed: {
    alldata () {
      return this.$store.state.DataByDate
    }
  },
  filters: {
    readableTime (val) {
      const datetime = moment(val)
      const time = datetime.hour() + ':' + datetime.minutes()
      return time
    }
  }
}
</script>


<style lang="sass">

// mdl format
.mdl-card__actions
  text-align: center
  background-color: rgb(95,193,199)
  color: white

.mdl-card
  min-height: initial;
  margin: auto;
  margin-top: 5px;
  width: 98%;
  &:first-child
    margin-top: 0px



// original

h1
  font-size: 150px
  margin: 0px
  text-align: center
  line-height: 1.0
  @media screen and (max-width: 400px)
    font-size: 110px

h5
  margin: 0px

// custom
.flow-layout
  z-index: 0;
  height: calc(100vh - 55px - 40px);
  overflow: scroll;
  background-color: rgba(0,0,0,0.1)
  padding-bottom: 5px
  -webkit-overflow-scrolling: touch;

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
  background: rgb(237, 111, 5);
  padding: 10px;
  font-size: 16px;
  line-height: 1;
  text-align: center;
  color: white;

.card-wrap
  height: calc(100% - 44px)
  overflow: auto
  padding-top: 1%
  padding-bottom: 1%


// mint-setting
.mint-header
  background-color: #1158a8

.mint-swipe
  // height: 200px

.mint-tabbar
  z-index: 2
  
.mint-indicator-wrapper
  z-index: 100

.empty
  position: relative
  height: calc(100% - 200px);
  #debby
    position: absolute
    bottom: 0px
    width: 98%
    left: 1%
</style>
