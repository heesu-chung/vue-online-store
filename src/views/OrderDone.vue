<template>
  <div class="container">
    <div class="order-infos">
      <h3 class="order-info">주문자 정보</h3>
      <div class="recipient">
        <h5 class="title">수령자</h5>
        <h5 class="content">{{this.recipient}}</h5>
      </div>
      <div class="contact">
        <h5 class="title">연락처</h5>
        <h5 class="content">{{this.contact}}</h5>
      </div>
      <div class="address">
        <h5 class="title">주소</h5>
        <h5 class="content">{{this.fullAddress}}</h5>
      </div>
    </div>
    <div class="delivery-infos">
      <h3 class="delivery-info">배송 정보</h3>
      <div class="order-products">
        <h5 class="title">주문 상품</h5>
        <PaymentListCard class="shop-list" :shopList="shopList" v-for="(shopList, idx) in shopLists" :key="idx"/>
      </div>
      <div class="total-price">
        <h5 class="title">총 결제금액</h5>
        <h5 class="content">{{this.totalPrice}}원</h5>
      </div>    
      <div class="payment-method">
        <h5 class="title">결제 수단</h5>
        <h5 class="content">{{this.paymentMethod}}</h5>
      </div>
    </div>
    <h4>주문해주셔서 감사합니다!</h4>
    <div class="btns">
      <router-link class="btn" :to="{name: 'Home'}">확인</router-link>
    </div>
  </div>
</template>

<script>
import PaymentListCard from '../components/PaymentListCard.vue';

export default {
    name: 'OrderDone',
    data() {
      return {
        recipient: '',
        contact: '',
        address: '',
        addressDetail: '',
        fullAddress: '',
        memo: '',

        orderProducts: [],
        totalPrice: null,
        paymentMethod: null,
      };
    },
    components: {
      PaymentListCard,
    },
    async mounted() {
      this.orderProducts = this.$store.state.shopLists;
      this.recipient = this.$store.state.profileName;
      const profileInfo = this.$store.state.profileInfo;
      this.contact = profileInfo.profileContact;
      this.address = profileInfo.profileAddress;
      this.addressDetail = profileInfo.profileAddressDetail;
      this.fullAddress = this.address + ' ' + this.addressDetail;
      this.memo = '';
      this.totalPrice = this.$store.state.paymentTotalPrice.toLocaleString();
      this.paymentMethod = this.$store.state.paymentMethod;
      console.log(this.$store.state.shopLists);
      console.log(this.$store.state.checkLists);
    },
    computed: {
      shopLists() {
        const checkListsArr = this.$store.state.checkLists;
        const buyShopList = this.$store.state.profileShopList.filter((post, index) => {
          return checkListsArr.indexOf(index) !== -1;
        });
        return buyShopList;
      },
    },
    methods: {

    }
}
</script>

<style lang="scss" scoped>
*{
  
}
.title {
  width: 20%;
  border-right: 3px solid #ccc;
}
.content {
  margin-left: 15px;
  width: 50%;
}
.container{
  padding: 50px 0;
  width: 50%;
  .order-infos {
    margin-bottom: 50px;
    .order-info{
      margin-bottom: 30px;
      padding-bottom: 10px;
      border-bottom: 1px solid #ccc;
    }
    .recipient, .contact, .address {
      display:flex;
      flex-direction: row;
      margin-bottom: 15px;
    }
  }
  .delivery-infos {
    .delivery-info {
      margin-bottom: 30px;
      padding-bottom: 10px;
      border-bottom: 1px solid #ccc;
    }
    .order-products, .total-price, .payment-method {
      display:flex;
      flex-direction: row;
      margin-bottom: 15px;
    }
    .order-products {
      display: flex;
      flex-direction: column;
      
      .shop-list{
        width: 90%;
        display: flex;
        margin: 0 auto;
      }
    }
  }

  h4 {
    margin-top: 50px;
    
    text-align: center;
  }
  .btns {
    margin-top: 50px;
    display: flex;
    justify-content: center;
    .btn {    
      width: 30%;
      height: 35px;
      text-decoration: none;
      display: flex;
      justify-content: center;
      align-items: center;
      font-weight: 700;

      border: 1px solid #ccc;
      color: #000;
      background-color: #fff;
      cursor: pointer;
      transition: .3s all ease;

      &:hover {
        background-color: #000;
        color: #fff;

      }
    }
  }
}
</style>