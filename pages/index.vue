<template>
  <section class="container">
    <img src="../assets/img/metology-logo.png" alt="Metology Logo" class="logo"></img>
    <h1 class="title">
      Metology
    </h1>
    <a :href="loginURL">
      <img src="../assets/img/btn_login_base.png" width="150px"></img>
    </a>
  </section>
</template>

<script>
import axios from '~plugins/axios'

// const redirectUri = 'https://limitless-shore-51089.herokuapp.com/'
const redirectUri = 'http://localhost:3000/console/'

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
