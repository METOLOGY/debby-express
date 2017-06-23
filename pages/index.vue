<template>
  <section class="container">
    <div class="page-wrap">
      <img src="../assets/img/test-logo.png" alt="Metology Logo" class="logo" />
     
      <h1 class="title">
        Metology
        <br>
        血糖故事
      </h1>
      <div class="line-wrap">
        <div class="straight-line"></div>
      </div>
      <a :href="loginURL">
        <img src="../assets/img/btn_login_base.png" width="150px"/>
      </a>
    </div>
  </section>
</template>

<script>
import axios from '~plugins/axios'

const redirectUri = 'http://localhost:3000'

let lineLoginBaseUrl = 'https://access.line.me/dialog/oauth/weblogin?'
lineLoginBaseUrl += 'response_type=code'
lineLoginBaseUrl += '&client_id=1505688700'
lineLoginBaseUrl += '&redirect_uri='
lineLoginBaseUrl += redirectUri
lineLoginBaseUrl += '&state=metology'

export default {
  async asyncData () {
    let { data } = await axios.get('/api/users')
    return {
      users: data
    }
  },
  head () {
    return {
      title: 'Users'
    }
  },
  data () {
    return {
      loginURL: lineLoginBaseUrl
    }
  },
  mounted () {
    const vm = this
    if (this.$route.query.code) {
      const request = {
        client_id: '1505688700',
        client_secret: '93e503e803bf6889cf1ba3c564e81fa0',
        code: vm.$route.query.code,
        redirect_uri: redirectUri,
        grant_type: 'authorization_code'
      }

      axios.post('/api/line-token', request)
      .then((res) => {
        const data = res.data
        const keys = Object.keys(data)

        for (let i = 0; i < keys.length; i++) {
          const key = keys[i]
          localStorage.setItem(key, data[key])
        }

        vm.$router.push('/console')
      })
    }
  }
}
</script>

<style scoped lang="sass">
.container
  height: 100vh
  display: flex
  .page-wrap
    margin: auto
    margin-top: 30%

.line-wrap
  display: flex
  padding-top: 20px
  padding-bottom: 50px
  .straight-line
    height: 2px
    background-color: black
    width: 200px
    margin: auto

.title
  margin: 30px 0;
.logo
  width: 65%

</style>
