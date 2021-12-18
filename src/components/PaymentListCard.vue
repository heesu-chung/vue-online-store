<template>
  <div class="container-wrap">
    <div class="list-card">
      <div class="product">
        <img :src="this.shopList.productPhoto" alt="" />
        <div class="info">
          <div class="product-name">{{ this.shopList.productName }}</div>
          <h5 class="quantity">{{ this.shopList.productQuantity }}개</h5>
          <h5 class="price">{{ totalPrice }}원</h5>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PaymentListCard',
  props: ['shopList', 'idx'],
  components: {},
  data() {
    return {
      currentProduct: null,
      arr: [],
      checked: false,
      modalMessage: '수량 변경',
      modalActive: false,
      index: null,
    };
  },
  async mounted() {},
  computed: {
    totalPrice() {
      return this.shopList.totalProductPrice.toLocaleString();
    },
  },
  methods: {
    async deleteList() {
      await this.$store.dispatch('deleteList', this.shopList.productId);
    },
    clickFunc() {
      this.checked = !this.checked;
      if (this.checked) {
        this.$store.state.checkLists.push(this.idx);
      } else {
        const arr = this.$store.state.checkLists.filter(post => {
          return post !== this.idx;
        });
        this.$store.state.checkLists = arr;
      }
      this.$store.dispatch('updateTotalPrice');
    },

    changeQuantity() {
      this.modalActive = !this.modalActive;
    },
    closeModal() {
      this.modalActive = !this.modalActive;
    },
  },
  watch: {
    arr() {
      //this.arr = this.$store.state.checkLists;
      //console.log(this.arr);
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
  zoom: 1;
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
  padding: 15px 0;
  font-size: 13px;
  background-color: #fff;
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
      width: 80px;
      height: 80px;
      object-fit: cover;
      margin-right: 10px;
    }
    .info {
      display: flex;
      flex-direction: column;
      width: 100%;
      //border: 1px solid black;
      justify-content: left;
      .product-name {
        text-decoration: none;
        font-weight: 400;
        font-size: 14px;
        color: #000;
        padding: 5px 0;
      }
      .quantity {
        padding: 5px 0;
        font-size: 12px;
        color: #aaa;
      }
      .price {
        padding: 5px 0;
        font-size: 14px;
        //border: 1px solid black;
        text-align: left;
        font-weight: 700;
      }
    }
  }
  .wish {
    flex: 1;
    font-size: 12px;
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
