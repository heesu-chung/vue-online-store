<template>
  <div class="container">
    <h4 class="quantity">SHOP</h4>
    <!-- :post v-for :key -->
    <div class="product-cards-wrap">
      <div class="product-cards">
        <ProductCard :post="post" v-for="(post, index) in shopPosts" :key="index"/>
      </div>
    </div>
    <div class="page">
      <h3> O </h3>
      <ul>
        <li></li>
      </ul>
      <h3> O </h3>
    </div>
  </div>
</template>

<script>
import ProductCard from '../components/ProductCard.vue';
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
export default {
    name: 'Shop',
    components: {
      ProductCard,
    },
    created() {
       this.$store.dispatch('getPost');
       firebase.auth().onAuthStateChanged((user) => {
        this.$store.commit("updateUser", user);
      });
    },
    computed: {
      sampleProducts() {
        return this.$store.state.sampleProducts;
      },
      shopPosts() {
        //console.log(this.$store.state.shopPosts);
        return this.$store.state.shopPosts;
      },
    }
}
</script>

<style lang="scss" scoped>
*{
  font-family: 'Noto Sans KR', sans-serif;
  font-weight: 400;
}
.container {
  width: 1200px;
  margin: 0 auto;
  position: relative;
  .quantity {
    margin: 20px 0;
    font-family: Helvetica;
    font-size: 12px;
  }
  .product-cards-wrap {
    position: relative;
    
    .product-cards {
      display: grid;
      grid-template-columns: 1fr;
      gap: 26px;
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
    }
  }
  .page {
    display: flex;
    flex-direction: row; 
    margin: 0 auto;
    color: #aaa;
    align-items: center;
    justify-content: center;
    padding: 20px 0;
    padding-top: 50px;
    h3{
      cursor: pointer;
      padding: 0 5px;
    }
  }
}
</style>