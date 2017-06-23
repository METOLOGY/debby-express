<template>
  <div class="shop-layout">
    <div class="building-wrap">
      <img src="~assets/svg/girl.svg" alt="">
      <h5>還在施工中...</h5>
      <h5>敬請期待！</h5>
    </div>
    
  </div>
</template>

<script>
export default {
  name: 'Shop'
}
</script>

<style lang="sass" scoped>
h5
  margin: 10px 0px
  

.shop-layout
  height: calc(100vh - 55px - 40px)
  display: flex
  .building-wrap
    margin: auto 
    text-align: center

</style>
