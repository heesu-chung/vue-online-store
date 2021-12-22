<template>
  <div class="product-card">
    <Modal
      v-if="modalActive"
      :modalMessage="modalMessage"
      v-on:close-modal="closeModal"
    />
    <div class="delete-card" v-if="mypage">
      <div class="circle" @click="deleteCard">
        <button>X</button>
      </div>
    </div>
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
//import db from '../firebase/firebaseInit';
import Modal from '../components/Modal.vue';
export default {
  name: 'ProductCard',
  props: ['post', 'idx', 'mypage'],
  components: {
    Modal,
  },
  data() {
    return {
      productNum: null,
      price: 0,
      currentProduct: [],
      wish: null,
      modalActive: false,
      modalMessage: '잠시 후 다시 시도하세요',
    };
  },
  async mounted() {
    console.log(this.idx);
    this.getProductNum();
    this.calculatePrice();
    this.currentProduct = this.$store.state.shopPosts.filter(post => {
      return post.productId === this.post.productId;
    });
    if (this.currentProduct) this.wish = this.currentProduct[0].productWishes;
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
    async deleteCard() {
      if (this.currentProduct[0].productWishes) {
        const newWishList = this.$store.state.profileWishList.filter(post => {
          return post.productId !== this.post.productId;
        });

        this.currentProduct = newWishList;
        await this.$store.dispatch('deleteWishList', this.post.productId);
        this.$store.dispatch('getPost');
        this.$store.dispatch('getCurrentUser');
        this.$router.go(0);
      } else {
        this.modalActive = !this.modalActive;
      }
    },
    closeModal() {
      this.modalActive = !this.modalActive;
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

  .delete-card {
    position: absolute;

    cursor: pointer;
    background-color: #000;
    width: 280px;
    height: 280px;
    opacity: 0%;
    transition: 0.3s all ease;

    .circle {
      border: 1px solid #fff;
      background-color: #000;
      width: 30px;
      height: 30px;
      margin-left: 240px;
      margin-top: 10px;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      opacity: 30%;
      button {
        border: none;
        background-color: #000;
        color: #fff;
        font-size: 14px;
        cursor: pointer;
      }
      transition: 0.3s all ease;
      &:hover {
        opacity: 100%;
      }
    }
    &:hover {
      opacity: 60%;
    }
  }
}
</style>
