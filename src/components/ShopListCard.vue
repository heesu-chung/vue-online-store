<template>
  <div class="container-wrap">
    <change-quantity-modal
      v-if="modalActive"
      :modalMessage="modalMessage"
      :idx="this.idx"
      :shopList="shopList"
      :productQuantity="this.shopList.productQuantity"
      v-on:close-modal="closeModal"
    />
    <div class="list-card">
      <input
        type="checkbox"
        class="check-box"
        :value="idx"
        v-model="$store.state.checkLists"
        @click="clickFunc"
      />
      <router-link
        class="product"
        :to="{
          name: 'Product',
          params: { productId: this.shopList.productId },
        }"
      >
        <img :src="this.shopList.productPhoto" alt="" />
        <div class="product-name">{{ this.shopList.productName }}</div>
      </router-link>
      <div class="wish" v-if="isLikes" @click="likes">
        <icon-base icon-name="heart" iconColor="#7ba3c5">
          <icon-heart-filled
        /></icon-base>
      </div>
      <div class="wish" v-if="!isLikes" @click="likes">
        <icon-base icon-name="heart" iconColor="#7ba3c5">
          <icon-heart
        /></icon-base>
      </div>
      <div class="quantity-wrap">
        <h5 class="quantity">{{ this.shopList.productQuantity }}개</h5>
        <button class="change" @click="changeQuantity">변경</button>
      </div>
      <div class="method">택배</div>
      <div class="deli-prices">
        <h5 class="deli-price">무료</h5>
        <div class="question">?</div>
      </div>
      <h5 class="price">{{ totalPrice }}원</h5>
      <div class="btns">
        <button class="btn-link" @click="orderOne">주문</button>
        <button class="btn" @click="deleteList">삭제</button>
      </div>
    </div>
  </div>
</template>

<script>
import ChangeQuantityModal from './ChangeQuantityModal.vue';
import firebase from 'firebase/compat/app';
import db from '../firebase/firebaseInit';
export default {
  name: 'ShopListCard',
  props: ['shopList', 'idx'],
  components: {
    ChangeQuantityModal,
  },
  data() {
    return {
      currentProduct: [],
      arr: [],
      checked: false,
      modalMessage: '수량 변경',
      modalActive: false,
      index: null,

      isLikes: false,
      clicked: true,
      routeId: null,
      wish: null,
    };
  },
  async beforeCreate() {},
  async mounted() {
    this.currentProduct = await this.$store.state.profileShopList;
    this.$store.state.profileWishList.forEach(post => {
      if (post.productId === this.shopList.productId) {
        this.isLikes = true;
        this.clicked = false;
      }
    });

    this.currentProduct = this.$store.state.shopPosts.filter(post => {
      return post.productId === this.shopList.productId;
    });
    this.wish = this.currentProduct[0].productWishes;
  },
  computed: {
    totalPrice() {
      return this.shopList.totalProductPrice.toLocaleString();
    },
  },
  methods: {
    async deleteList() {
      this.$store.state.profileShopList.filter(post => {
        return post.productId !== this.shopList.productId;
      });
      this.currentProduct = this.$store.state.profileShopList;
      await this.$store.dispatch('deleteList', this.shopList.productId);
      this.$router.go(0);
    },
    clickFunc() {
      if (this.$store.state.checkLists.indexOf(this.idx) === -1) {
        this.checked = true;
        this.$store.state.checkLists.push(this.idx);
      } else {
        this.checked = false;
        const arr = this.$store.state.checkLists.filter(post => {
          return post !== this.idx;
        });
        this.$store.state.checkLists = arr;
      }
      // this.arr = this.$store.state.checkLists;
      this.$store.dispatch('updateTotalPrice');
    },
    orderOne() {
      this.$store.state.checkLists = [];
      this.$store.state.checkLists.push(this.idx);
      this.$router.push({ name: 'ShopPayment' });
    },
    changeQuantity() {
      this.modalActive = !this.modalActive;
    },
    closeModal() {
      this.modalActive = !this.modalActive;
    },
    async likes() {
      this.clicked = !this.isLikes;
      const timestamp = Date.now();
      const payload = {
        uid: firebase.auth().currentUser.uid,
        profileId: this.$store.state.profileId,
        productName: this.currentProduct[0].productName,
        productId: this.shopList.productId,
        productPhotoName: this.currentProduct[0].productPhotoName,
        productPhoto: this.currentProduct[0].productPhoto,
        date: timestamp,
        productPrice: this.currentProduct[0].productPrice,
        userWish: this.clicked,
      };
      this.routeId = this.shopList.productId;
      const productDB = await db.collection('shopPosts').doc(this.routeId);

      if (!this.isLikes) this.wish++;
      else this.wish--;

      await productDB.update({
        productWishes: this.wish,
      });
      this.currentProduct[0].productWishes = this.wish;
      this.$store.dispatch('getPost');
      this.$store.dispatch('likes', payload);
      this.isLikes = !this.isLikes;
      return;
    },
  },
  watch: {
    currentProduct() {
      //console.log(`changed detected`);
    },
  },
};
</script>

<style lang="scss" scoped>
* {
  //border: 1px solid #ccc;
  font-family: 'Noto Sans KR', sans-serif;
  font-weight: 400;
}
input[type='checkbox'] {
  zoom: 1.25;
}
button {
  width: 45px;
  height: 30px;
  border-radius: 15px;
  background-color: #fff;
  border: 1px solid #ccc;
  cursor: pointer;
  transition: 0.3s all ease;
  &:hover {
    background-color: #000;
    color: #fff;
  }
}
.list-card {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 10px 0;
  font-size: 13px;
  border-bottom: 1px solid #ccc;
  .check-box {
    flex: 1;
  }
  .product {
    text-decoration: none;
    flex: 8;
    text-align: left;
    display: flex;
    align-items: center;
    cursor: pointer;
    img {
      width: 60px;
      height: 60px;
      margin-right: 10px;
    }
    .product-name {
      text-decoration: none;
      font-weight: 400;
      font-size: 14px;
      color: #000;
    }
  }
  .wish {
    flex: 1;
    font-size: 12px;
    cursor: pointer;
  }
  .quantity-wrap {
    flex: 2;
    .quantity {
      font-size: 12px;
    }
    .change {
      margin-top: 5px;
    }
  }
  .method {
    flex: 2;
    font-size: 12px;
    font-weight: 400;
  }
  .deli-prices {
    flex: 2;
    display: flex;
    flex-direction: row;
    justify-content: center;
    font-size: 12px;
  }
  .price {
    flex: 2;
    text-align: right;
  }
  .btns {
    flex: 3;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    .btn {
      margin: 0 3px;
      .btn-link {
        text-decoration: none;
        color: #000;
        &:hover {
          color: #fff;
        }
      }
    }
  }
}
</style>
