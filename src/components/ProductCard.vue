<template>
  <div class="product-card">
    <router-link
      class="product"
      :to="{ name: 'Product', params: { productId: this.post.productId } }"
      :post="post"
    >
      <img class="product-img" :src="post.productPhoto" alt="" />
      <router-link
        :to="{ name: 'Product', params: { productId: this.post.productId } }"
        class="product-name"
        >{{ post.productName }}</router-link
      >
    </router-link>
    <h5 class="product-price">{{ this.price }}원</h5>
    <div class="soldout" v-show="!this.productNum">
      <h5>SOLDOUT</h5>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductCard',
  props: ['post', 'idx'],
  data() {
    return {
      productNum: null,
      price: 0,
    };
  },
  async mounted() {
    this.getProductNum();
    this.calculatePrice();
  },
  computed: {},
  methods: {
    getProductNum() {
      this.$store.state.shopPosts.forEach(post => {
        if (post.productId === this.post.productId) {
          this.productNum = post.productRemainQuantity;
        }
      });
    },
    calculatePrice() {
      this.price = this.post.productPrice.toLocaleString();
    },
  },
};
</script>

<style lang="scss" scoped>
* {
  font-family: 'Noto Sans KR', sans-serif;
  font-weight: 400;
}
.product-card {
  width: 280px;
  .product {
    display: flex;
    flex-direction: column;
    text-decoration: none;
    .product-img {
      width: 100%;
      height: 280px;
      object-fit: cover;
      background-color: #aaa;
      cursor: pointer;
    }
    .product-name {
      text-decoration: none;
      color: #000;
      text-align: center;
      font-size: 12px;
      font-weight: 700;
      cursor: pointer;
      margin-top: 12px;
      margin-bottom: 3px;
    }
  }
  .product-price {
    text-align: center;
    font-family: Helvetica;
    font-size: 12px;
    margin-bottom: 5px;
  }
  .soldout {
    background-color: #666;
    width: 70px;
    height: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    h5 {
      color: #fff;
      font-family: Helvetica;
      font-size: 11px;
      margin: 0 auto;
    }
  }
}
</style>
