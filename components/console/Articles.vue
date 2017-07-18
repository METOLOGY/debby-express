<template>
  <div class="articles-layout">
    <!--<div class="question-layout">
      <input type="text" placeholder="請輸入糖尿病相關的問題" v-model="question"><button >送出</button>
    </div>-->

    <div class="card-wrap">
      <div class="mdl-card" v-for="data in articles">
        <div class="og-image" v-if="data.url_og_image">
          <img :src="data.url_og_image" alt="og-image">
        </div>
        <div class="mdl-card__title">
          <h5 class="mdl-card__title-text">{{ data.title }}</h5>
        </div>
        <div class="mdl-card__supporting-text">{{ data.summary }}</div>
        <div class="mdl-card__actions" v-if="data.read_more_link"><a :href="data.read_more_link">閱讀更多</a></div>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
export default {
  name: 'Articles',
  data () {
    return {
      question: '糖尿病'
    }
  },
  mounted () {
    this.$store.commit('GET_RELATED_NEWS', this.question)
  },
  watch: {
    question () {
      this.$store.commit('GET_RELATED_NEWS', this.question)
    }
  },
  computed: {
    articles () {
      console.log(this.news)
      return this.$store.state.news.data
    }
  }
}

</script>

<style lang="sass" scoped>
.articles-layout
  z-index: 0;
  height: calc(100vh - 55px - 40px);
  overflow: scroll;
  background-color: rgba(0,0,0,0.1)
  padding-bottom: 5px
  -webkit-overflow-scrolling: touch;

.card-wrap
  height: calc(100%)

.question-layout
  height: 48px
  input
    padding: 1%
    width: 80%
    height: 30px
    font-size: 20px

.mdl-card__title 
  background-size: cover
  background-position: center

.mdl-card__actions
  a
    color: white
    font-weight: 100
    text-decoration: none

.og-image
  img
    width: 100%


</style>
