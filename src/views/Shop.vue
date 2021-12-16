<template>
  <div class="container">
    <h4 class="quantity">SHOP</h4>
    <!-- :post v-for :key -->
    <div class="product-cards-wrap">
      <div class="product-cards">
        <ProductCard :post="post" v-for="(post, index) in shopPosts" :key="index" :idx="index"/>
      </div>
    </div>
    <div class="page-wrap">
        
        <Page class="page-num" v-for="(num, idx) in pageNumbers" :key="idx" :page="num" :currentPage="currentPage" :value="idx" />

    </div>
  </div>
</template>

<script>
import Page from '../components/Page.vue';
import ProductCard from '../components/ProductCard.vue';
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

export default {
    name: 'Shop',
    data() {
      return {
        currentPage: 1,
        showPostNum: 8,
      }
    },
    components: {
      ProductCard, Page
    },
    created() {
       this.$store.dispatch('getPost');
       firebase.auth().onAuthStateChanged((user) => {
        this.$store.commit("updateUser", user);
      });

    },
    async mounted() {
      this.currentPage = this.$route.params.page;
      //console.log(this.$route.params.page);
    },
    computed: {
      pageNumbers() {
        const num = this.$store.state.shopPosts.length;
        return this.calculatePageNum(num);
      },
      sampleProducts() {
        return this.$store.state.sampleProducts;
      },
      shopPosts() {
        const page = (this.$route.params.page-1)*this.showPostNum;
        const postForPage = this.$store.state.shopPosts.slice(page,page+this.showPostNum);
        return postForPage;
      },
    },
    methods: {
      calculatePageNum(num) {
        if(num % this.showPostNum === 0) {
          return parseInt(num / this.showPostNum);
        } else {
          return parseInt(num / this.showPostNum + 1);
        }
      },
      goToPageNum(){
        
      }
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
  .page-wrap {
  
    display: flex;
    flex-direction: row; 
    margin: 0 auto;
    color: #aaa;
    align-items: center;
    justify-content: center;
    padding: 20px 0;
    padding-top: 50px;
    h3{
      
      padding: 0 5px;
    }
    .page-num {
      padding: 0 10px;
    }

  }
}
</style>