<template>
  <div class="container">
    <div class="list-card">
      <img src="" alt="">
      <h2>{{post.productId}}</h2>
    </div>
  </div>
</template>

<script>
export default {
    name: 'ShopListCard',
    props: ["post"],
    methods: {

    },
    computed: {
      getProductTitle() {
        return this.shopList.productName;
      },
    },
}
</script>

<style lang="scss" scoped>

</style>