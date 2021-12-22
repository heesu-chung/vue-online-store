<template>
  <div class="container-wrap">
    <div class="infos">
      <h4 class="title">위시리스트</h4>
      <div class="circle">
        <h5>{{ this.wishLists.length }}</h5>
      </div>
    </div>
    <div class="product-cards">
      <ProductCard
        class="product-card"
        :post="post"
        v-for="(post, index) in wishLists"
        :key="index"
        :mypage="mypage"
        :idx="index"
      />
    </div>
  </div>
</template>

<script>
import ProductCard from '../ProductCard.vue';
export default {
  name: 'WishList',
  components: {
    ProductCard,
  },
  data() {
    return {
      mypage: true,
    };
  },
  async mounted() {
    await this.$store.dispatch('getPost');
    await this.$store.dispatch('getCurrentUser');
  },
  computed: {
    wishLists() {
      return this.$store.state.profileWishList;
    },
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.container-wrap {
  width: 100%;
  display: flex;
  flex-direction: column;
  .infos {
    display: flex;
    flex-direction: row;
    align-items: center;

    .title {
      margin-bottom: 10px;
      margin-right: 10px;
    }
    .circle {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background-color: #7ba3c5;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      font-size: 12px;
      margin-top: -8px;
      h5 {
        margin-top: -2px;
      }
    }
  }

  .product-cards {
    display: grid;
    margin: 0 auto;
    grid-template-columns: 1fr;
    gap: 20px;
    row-gap: 50px;
    @media (min-width: 500px) {
      grid-template-columns: repeat(2, 1fr);
    }
    @media (min-width: 900px) {
      grid-template-columns: repeat(3, 1fr);
    }
    @media (min-width: 1200px) {
      grid-template-columns: repeat(4, 1fr);
    }

    .product-card {
      zoom: 0.8;
      transition: 0.3s all ease;
      &:hover {
      }
    }
  }
}
</style>
