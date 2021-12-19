<template>
  <div class="box">
    <img :src="this.productPhoto" alt="" v-if="post" />
    <img src="" alt="" v-else />
    <div class="infos">
      <h5 class="product-name">상품명 : {{ this.getProductName() }}</h5>
      <h5 class="product-price">
        상품 가격 : {{ this.productOriginalPrice.toLocaleString() }}원
      </h5>
      <h5 class="product-quantity">주문 수량 : {{ this.productQuantity }}</h5>
      <h5 class="product-total-price">
        총 결제금액 : {{ this.totalProductPrice.toLocaleString() }}원
      </h5>
    </div>
    <div class="pay">
      <h5 class="payment-state">결제 상태 : {{ this.orderDone }}</h5>
      <h5 class="delivery-state" v-if="this.DeliveryDone">
        배송 현황 : {{ this.DeliveryDone }}
      </h5>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OrderList',
  props: ['post'],
  data() {
    return {
      productName: 11,
      productOriginalPrice: 0,
      productQuantity: 0,
      totalProductPrice: 0,
      orderDone: false,
      DeliveryDone: '',
      productPhoto: '',
    };
  },
  async mounted() {
    this.productOriginalPrice = this.post.productOriginalPrice.toLocaleString();
    this.productQuantity = this.post.productQuantity;
    this.totalProductPrice = this.post.totalProductPrice.toLocaleString();
    this.orderDone = this.post.orderDone = '주문 완료' || '주문 중';
    this.DeliveryDone = this.post.DeliveryDone = '배송 중' || '배송 완료';
    this.productPhoto = this.post.productPhoto;
  },
  methods: {
    getProductName() {
      return this.post.productName;
    },
  },
};
</script>

<style lang="scss" scoped>
* {
  font-family: 'Noto Sans KR', sans-serif;
  font-weight: 400;
}
.box {
  width: 100%;
  background-color: #fff;
  margin: 15px 0;
  border-radius: 10px;
  display: flex;
  flex-direction: row;
  transition: 0.3s all ease;
  cursor: pointer;
  &:hover {
    opacity: 70%;
  }

  img {
    width: 100px;
    height: 100px;
    margin: 10px 10px;
    margin-left: 7%;
  }

  align-items: center;
  .infos {
    margin-left: 8%;
    .product-name,
    .product-price,
    .product-quantity,
    .product-total-price {
      padding-bottom: 5px;
      font-size: 12px;
    }
  }
  .pay {
    height: 80px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 10%;
    padding-left: 10%;
    border-left: 1px solid #ccc;
    font-size: 20px;
    letter-spacing: 1px;
    .payment-state {
      margin-bottom: 8px;
    }
    .delivery-state {
      color: #aaa;
    }
  }
}
</style>
