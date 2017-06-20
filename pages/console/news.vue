<template>
  <div class="news-layout">
    <mt-search v-model="question"></mt-search>
    <div class="mdl-card" v-for="data in news">
      <div class="mdl-card__title">
        <h5 class="mdl-card__title-text">{{ news.title }}</h5>
        <small><p>{{ news.post_date }}</p></small>
      </div>
      <div class="mdl-card__supporting-text">{{ news.summary }}</div>
      <div class="mdl-card__actions"><a :href="news.read_more_link">閱讀更多</a></div>
    </div>
  </div>
</template>

<script type="text/javascript">
export default {
  name: 'News',
  data () {
    return {
      question: '糖尿病'
    }
  },
  created () {
    this.$store.commit('GET_RELATED_NEWS', this.question)
  },
  computed: {
    news () {
      return this.$store.state.news
    }
  }
}

</script>
