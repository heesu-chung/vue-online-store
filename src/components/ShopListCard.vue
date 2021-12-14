<template>
<div class="container-wrap">
    <change-quantity-modal v-if="modalActive" :modalMessage="modalMessage" :idx="this.idx" :shopList="shopList" v-on:close-modal="closeModal" />
    <div class="list-card">
      <input type="checkbox" class="check-box" :value="1" v-model="arr" @change="clickFunc">
      <router-link class="product" :to="{name: 'Product', params: {productId: this.shopList.productId }}">
        <img src="" alt="" >
        <div class="product-name" >{{this.shopList.productName}}</div>
      </router-link>
      <div class="wish">{{this.idx}}</div>
      <div class="quantity-wrap">
        <h5 class="quantity">{{this.shopList.productQuantity}}개</h5>
        <button class="change" @click="changeQuantity">변경</button>
      </div>
      <div class="method">택배</div>
      <div class="deli-prices">
        <h5 class="deli-price">무료</h5>
        <div class="question">?</div>
      </div>
      <h5 class="price">{{totalPrice}}원</h5>
      <div class="btns">
        <button class="btn">
          <router-link class="btn-link" :to="{name:'ShopPayment'}">주문</router-link></button>
        <button class="btn" @click="deleteList">삭제</button>
      </div>
    </div>
    </div>
</template>

<script>
import ChangeQuantityModal from '../components/ChangeQuantityModal.vue';
export default {
    name: 'ShopListCard',
    props: ["shopList", "idx"],
    components: {
      ChangeQuantityModal,
    },
    data() {
      return {
        currentProduct: null,
        arr: [],
        checked: false,
        modalMessage: '수량 변경',
        modalActive: false,
      }
    },
    async mounted() {

    },
    computed: {
      totalPrice() {
        return this.shopList.totalProductPrice.toLocaleString();
      },
    },
    methods: {
      deleteList() {
        //console.log(`delete button pushed`);
        this.$store.dispatch("deleteList", this.shopList.productId);
        this.$router.push({name: 'Home'});
      },
      clickFunc() {
        console.log(this.idx);
        console.log(this.shopList);
      },

      changeQuantity() {
        this.modalActive = !this.modalActive;
        //console.log(`modalActive : ` + this.modalActive);
      },
      closeModal() {
        this.modalActive = !this.modalActive
      }
    },
    watch : {
      modalActive() {

      }
    },
}
</script>

<style lang="scss" scoped>
*{
  //border: 1px solid #ccc; 
    font-family: 'Noto Sans KR', sans-serif;
  font-weight: 400;
}

input[type="checkbox"] {
  zoom: 1.25;
}
button {
  width: 45px;
  height: 30px;
  border-radius: 15px;
  background-color: #fff;
  border: 1px solid #ccc;
  cursor: pointer;
  transition: .3s all ease;
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
    .product{
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
    .wish{
      flex: 1;
      font-size: 12px;
    }
    .quantity-wrap{
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
        .btn-link{
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