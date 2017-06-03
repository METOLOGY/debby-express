<template>
  <section class="container">
    <img src="../assets/img/logo.png" alt="Nuxt.js Logo" class="logo" />
    <h1 class="title">
      USERS
    </h1>
    <ul class="users">
      <li v-for="(user, index) in users" class="user">
        <nuxt-link :to="{ name: 'id', params: { id: index }}">
          {{ user.name }}
        </nuxt-link>
      </li>
    </ul>
    <a :href="loginURL">line login</a>
  </section>
</template>

<script>
import axios from '~plugins/axios'

let lineLoginBaseUrl = 'https://access.line.me/dialog/oauth/weblogin?'
lineLoginBaseUrl += 'response_type=code'
lineLoginBaseUrl += '&client_id=1505688700'
lineLoginBaseUrl += '&redirect_uri=http://localhost:3000'
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
        redirect_uri: 'http://localhost:3000',
        grant_type: 'authorization_code'
      }

      axios.post('/api/line-token', request)
      .then((res) => {
        console.log(res)
      })
    }
  }
}
</script>

<style scoped>
.title
{
  margin: 30px 0;
}
.users
{
  list-style: none;
  margin: 0;
  padding: 0;
}
.user
{
  margin: 10px 0;
}
</style>
