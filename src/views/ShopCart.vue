<template>
  <div class="container">
    <div class="info">
      <h2 class="shop-list">장바구니</h2>
      <h4 class="shop-list-quantity">
        {{ this.$store.state.profileShopList.length }}
      </h4>
    </div>
    <div class="category">
      <input
        type="checkbox"
        class="checkbox"
        name="shopListCard"
        value="all"
        v-model="arr"
        @change="check"
      />
      <div class="item">item</div>
      <div class="wish">위시</div>
      <div class="quantity">수량</div>
      <div class="deli-method">배송수단</div>
      <div class="deli-price">배송비</div>
      <div class="price">가격</div>
      <div class="order-service"></div>
      <!--div class="order-service">
        <button class="order">주문</button>
        <button class="delete">삭제</button>
      </div-->
    </div>
    <ShopListCard
      :shopList="shopList"
      v-for="(shopList, index) in shopLists"
      :key="index"
      :idx="index"
    />
    <div class="overview">
      <div class="total-price">
        <h3>상품가격</h3>
        <div class="price">{{ getProductPrice }}원</div>
      </div>
      <div class="deli-price">
        <h3>배송비</h3>
        <div class="price">{{ getDeliPrice }}</div>
      </div>
    </div>

    <div class="overall">
      <div class="options">
        <button class="option" @click="deleteProduct" v-if="false">
          선택상품 삭제
        </button>
        <button class="option" @click="getWishList" v-if="false">
          위시리스트 담기
        </button>
      </div>
      <div class="total-fee">
        <h4>결제금액</h4>
        <h2>{{ getTotalPrice }}원</h2>
      </div>
    </div>
    <div class="actions">
      <router-link
        class="final-order"
        :to="{ name: 'ShopPayment' }"
        v-if="this.$store.state.checkLists.length !== 0"
        ><span>주문하기</span></router-link
      >
      <div class="final-order-none" v-else>상품을 선택해주세요</div>
      <router-link
        class="continue"
        :to="{ name: 'Shop', params: { page: shopPage } }"
        >계속 쇼핑하기</router-link
      >
    </div>

    <div class="wish-list-wrap">
      <div class="view-wishes">
        <h3 class="wish-list">위시 리스트</h3>
        <router-link
          class="more-info"
          :to="{ name: 'Shop', params: { page: shopPage } }"
          >더보기</router-link
        >
      </div>
    </div>
    <div class="product-cards">
      <ProductCard
        class="product-card"
        :post="post"
        v-for="(post, idx) in wishLists"
        :key="idx"
      />
    </div>
  </div>
</template>

<script>
import ShopListCard from '../components/ShopListCard.vue';
import ProductCard from '../components/ProductCard';

export default {
  name: 'ShopCart',
  components: {
    ShopListCard,
    ProductCard,
  },
  data() {
    return {
      currentProduct: [{}],
      productPrice: 0,
      deliPrice: 0,
      isChecked: 0,
      arr: [],

      shopPage: 1,
    };
  },
  async created() {},
  async mounted() {
    await this.$store.dispatch('getPost');
    await this.$store.dispatch('getCurrentUser');
    this.arr.push('all');
    this.check();
  },
  computed: {
    getTotalPrice() {
      return (this.productPrice + this.$store.state.deliPrice).toLocaleString();
    },
    getProductPrice() {
      this.computeProductPrice();
      return this.$store.state.totalPrice.toLocaleString();
    },
    getDeliPrice() {
      if (this.$store.state.deliPrice === 0) {
        return '무료';
      }
      return this.$store.state.deliPrice.toLocaleString() + `원`;
    },

    shopLists() {
      return this.$store.state.profileShopList;
    },
    wishLists() {
      return this.$store.state.profileWishList;
    },
  },
  methods: {
    computeProductPrice() {
      this.$store.dispatch('updateTotalPrice');
      this.productPrice = this.$store.state.totalPrice;
    },
    getWishList() {},
    deleteProduct() {},
    check() {
      this.$store.state.checkLists = [];
      if (this.arr.length) {
        this.shopLists.forEach((post, index) => {
          this.$store.state.checkLists.push(index);
        });
      }
    },
  },
  watch: {},
};
</script>

<style lang="scss" scoped>
* {
  font-family: 'Noto Sans KR', sans-serif;
  font-weight: 400;
  //border: 1px solid black;
}

.container {
  margin-bottom: 50px;
  .info {
    display: flex;
    flex-direction: row;
    padding: 30px 0;
    .shop-list {
      font-size: 24px;
      padding-right: 10px;
    }
    .shop-list-quantity {
      margin-top: 7px;
      background-color: #7ba3c5;
      color: #fff;
      width: 25px;
      height: 25px;
      border-radius: 50%;
      text-align: center;
    }
  }

  .category {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 12px;
    font-weight: 200;
    padding: 20px 0;
    border-bottom: 1px solid #aaa;
    color: #000;
    font-family: helvetica;
    font-weight: 400;
    text-align: center;
    // 1 : 8 : 1 : 2 : 2 : 2 : 2 : 3
    .checkbox {
      cursor: pointer;
      flex: 1;
    }
    .item {
      width: 40%;
      text-align: left;
      flex: 8;
    }
    .wish {
      flex: 1;
    }
    .quantity {
      flex: 2;
    }
    .deli-method {
      flex: 2;
    }
    .deli-price {
      flex: 2;
      //border: 1px solid black;
    }
    .price {
      flex: 2;
      text-align: right;
    }
    .order-service {
      flex: 3;
    }
  }

  .overview {
    padding-top: 20px;
    padding-bottom: 40px;
    border-bottom: 1px solid #aaa;
    padding-left: 70%;
    font-size: 13px;
    .total-price {
      display: flex;
      flex-direction: row;
      width: 53%;
      justify-content: space-between;

      .price {
        font-size: 14px;
      }
    }
    .deli-price {
      margin-top: 10px;
      display: flex;
      flex-direction: row;
      width: 53%;
      justify-content: space-between;

      .price {
        font-size: 14px;
      }
    }
  }

  .overall {
    display: flex;
    flex-direction: row;

    .options {
      .option {
        background-color: #fff;
        border: 1px solid #aaa;
        padding: 5px 10px;
        border-radius: 15px;
        margin: 20px 5px;
        cursor: pointer;
        transition: 0.3s ease all;
        &:hover {
          border: 1px solid black;
        }
      }
    }
    .total-fee {
      margin-left: 69%;
      margin-top: 15px;
      margin-bottom: 15px;
      width: 17%;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: right;

      h4 {
        flex: 1;
        font-size: 12px;
        margin-left: 8px;
        text-align: left;
      }
      h2 {
        flex: 2;
        font-size: 20px;
        font-weight: 700;
        text-align: right;
        color: #7ba3c5;
      }
    }
  }

  .actions {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-bottom: 50px;
    .final-order {
      width: 230px;
      height: 50px;
      font-size: 15px;
      font-weight: 700;
      line-height: 24px;
      letter-spacing: 2px;
      background-color: #7ba3c5;
      border: none;
      color: #fff;
      transition: 0.3s ease all;
      cursor: pointer;
      text-decoration: none;

      span {
        display: flex;

        justify-content: center;
        margin-top: 11px;
      }
      &:hover {
        background-color: #4a82b3;
      }
    }
    .final-order-none {
      width: 230px;
      height: 50px;
      font-size: 15px;
      letter-spacing: 2px;
      background-color: #aec6db;
      color: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .continue {
      margin-top: 20px;
      font-size: 15px;
      letter-spacing: 2px;
      color: #7ba3c5;
      text-decoration: underline;
      background-color: #fff;
      border: none;
      transition: 0.3s ease all;
      cursor: pointer;

      &:hover {
        color: #4a82b3;
      }
    }
  }

  .wish-list-wrap {
    margin-bottom: 20px;

    .view-wishes {
      display: flex;
      flex-direction: row;
      align-items: center;
      .wish-list {
        font-size: 15px;
        margin-right: 20px;
      }
      .more-info {
        display: flex;
        text-decoration: none;
        color: #000;
        cursor: pointer;
        align-items: center;
        justify-content: center;
        width: 60px;
        height: 30px;
        border-radius: 15px;
        background-color: #fff;
        border: 1px solid #aaa;
        cursor: pointer;
        transition: 0.3s ease all;
        font-weight: 700;
        font-size: 12px;
        &:hover {
          border: 1px solid black;
        }
      }
    }
  }
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
</style>
