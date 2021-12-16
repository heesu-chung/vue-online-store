<template>
  <div class="container-wrap">
    <Modal v-if="modalActive" :modalMessage="modalMessage" v-on:close-modal="closeModal" :modalResponse="modalResponse"/>
    <div class="container">
    <h2 class="page">결제하기</h2>
    
    <div class="contents">

    <div class="product-info-wrap">
      <div class="product-infos">
        <h3 class="title">주문 상품 정보</h3>
        <PaymentListCard class="shop-list" :shopList="shopList" v-for="(shopList, idx) in shopLists" :key="idx"/>
      </div>
        <div class="orderer-infos">
          <h3 class="title">주문자 정보</h3>
          <div class="name-tel">
            <input type="text" class="name" placeholder="Name" v-model="getProfileName">
            <input type="text" class="contact" placeholder="Contact" v-model="getProfileContact">
          </div>
          <input type="text" class="email" placeholder="Email" v-model="getProfileEmail">
        </div>

        <div class="order-infos">
          <h3 class="title">배송 정보</h3>
          <div class="auto">
            <input type="checkbox" class="checkbox" :value="1" v-model="duplicate" @change="duplicateClick">
            <h4 class="identical">주문자 정보와 동일</h4>
          </div>
          <div class="detail-infos">
            <input type="text" class="recipient" placeholder="수령인" v-model="recipient">
            <input type="text" class="contact" placeholder="연락처" v-model="contact">
          </div>
          <div class="address-num">
            <input type="text" class="zip-code" placeholder="우편번호" v-model="zipCode">
            <button class="find-zip-code">주소 찾기</button>
          </div>
          <input type="text" class="address" placeholder="주소" v-model="address">
          <input type="text" class="address-detail" placeholder="상세주소" v-model="addressDetail">
          <!-- <div class="auto">
            <input type="checkbox" class="checkbox">
            <h4 class="identical">배송지 목록에 추가</h4>
          </div> -->
          <div class="memos">
            <h4 class="memo">배송메모</h4>
            <select name="" id="" class="message" v-model="memoSelection" placeholder="배송 메모를 선택해 주세요.">
              <option :value="1">배송 메모를 선택해 주세요.</option>
              <option :value="2">배송 전에 미리 연락 바랍니다.</option>
              <option :value="3">부재시 경비실에 맡겨주세요.</option>
              <option :value="4">부재시 전화나 문자를 남겨주세요.</option>
              <option :value="5">직접 입력</option>
            </select>
            <input type="text" class="typing" placeholder="배송 메모를 입력해 주세요." v-if="memoSelection === 5" v-model="deliveryMemo">
          </div>
        </div>
    
    </div>

    <div class="payment-info-wrap">
        <div class="payment-price">
          <h3 class="title">최종 결제금액</h3>
          <div class="contents-price">
            <div class="content-price">
              <h4 class="product-price-title">상품 가격</h4>
              <h4 class="delivery-price-title">배송비</h4>
            </div>
            <div class="prices">
              <h4 class="product-price">{{getProductPrice}}원</h4>
              <h4 class="delivery-price">{{getDeliPrice}}</h4>
            </div>
          </div>
          <div class="total">
            <h4 class="total-price-title">총 결제금액(1개)</h4>
            <h4 class="total-price">{{getTotalPrice}}원</h4>
          </div>
        </div>

        <div class="payment-method">
          <h3 class="title">결제수단</h3>
          <div class="select">
            <div class="select-item">
              <input type="radio" name="method" id="credit-card" value="credit" v-model="paymentMethod"><label for="credit-card" >신용카드</label>
            </div>
            <div class="select-item">
              <input type="radio" name="method" id="real-time" value="realtime" v-model="paymentMethod"><label for="real-time">실시간 계좌이체</label>
            </div>
            <div class="select-item">
              <input type="radio" name="method" id="virtual" value="virtual" v-model="paymentMethod"><label for="virtual">가상계좌</label>
            </div>
            <div class="select-item">
              <input type="radio" name="method" id="none" value="no-bankbook" v-model="paymentMethod"><label for="none">무통장입금</label>
            </div>
          </div>
        </div>

        <div class="agreement">
          <div class="agree-all">
            <input type="checkbox" name="all" id="" :value="1" v-model="agreeCheck" @change="checkAgree">
            <h4 class="agree-all-text">전체 동의</h4>
          </div>
          <div class="agree">
            <h4>ㄴ</h4>
            <input type="checkbox" name="" id="" :value="2" v-model="agreeCheck" >
            <h4 class="agree-text">구매조건 확인 및 결제진행에 동의</h4>
          </div>
        </div>
        <div class="payment-check" v-if="agreeCheck.length !== 2">
            결제하기
        </div>
        <button class="payment-check-allowed" v-if="agreeCheck.length === 2" @click="paymentPrecedure">
            결제하기
        </button>
    </div>
    </div>
    
  </div>
  </div>
</template>

<script>
import PaymentListCard from '../components/PaymentListCard.vue';
import Modal from '../components/Modal.vue';


export default {
    name: 'ShopPayment',
    data() {
      return {
        productPrice: null,
        deliPrice: null,
        duplicate: [],
        recipient: '',
        contact: '',
        contactAnother: '',
        zipCode: '',
        address: '',
        addressDetail: '',
        memoSelection: 1,
        deliveryMemo: '',
        agreeCheck: [],
        paymentMethod: '',

        modalActive: false,
        modalMessage: '',
        modalResponse: null,
      }
    },
    components: {
      PaymentListCard, Modal
    },
    async mounted() {
      await this.$store.dispatch('getCurrentUser');
    },
    computed: {
      shopLists() {
        const checkListsArr = this.$store.state.checkLists;
        const buyShopList = this.$store.state.profileShopList.filter((post, index) => {
          return checkListsArr.indexOf(index) !== -1;
        });
        return buyShopList;
      },
      getProfileName() {
        return this.$store.state.profileName;
      },
      getProfileEmail() {
        return this.$store.state.profileEmail;
      },
      getProfileContact() {
        return this.$store.state.profileInfo.profileContact;
      },
      getTotalPrice() {
        return (this.productPrice + this.$store.state.deliPrice).toLocaleString();
      },
      getProductPrice() {
        this.computeProductPrice();
        return this.$store.state.totalPrice.toLocaleString();
      },
      getDeliPrice() {
        if(this.$store.state.deliPrice === 0) {
          return '무료';
        }
        return this.$store.state.deliPrice.toLocaleString() + `원`;
      },
      
    },
    methods: {
      computeProductPrice() {
        this.$store.dispatch("updateTotalPrice");
        this.productPrice = this.$store.state.totalPrice;
      },
      duplicateClick() {
        if(this.duplicate.length){
          this.recipient = this.$store.state.profileName;
          this.contactAnother = this.contact;
          this.address = this.$store.state.profileInfo.profileAddress;
          this.addressDetail = this.$store.state.profileInfo.profileAddressDetail;
          this.contact = this.$store.state.profileInfo.profileContact;
          this.zipCode = this.$store.state.profileInfo.profileZipCode;
        } else {
          this.recipient = '';
          this.contactAnother = '';
          this.address = '';
          this.addressDetail = '';
          this.contact = '';
          this.zipCode = '';
        }
      },
      checkAgree() {
        if(this.agreeCheck.indexOf(1) !== -1)
          this.agreeCheck = [1, 2];
      },
      paymentPrecedure() {
        if(!this.recipient ||
          !this.contact ||
          !this.address ||
          !this.addressDetail ||
          this.agreeCheck.length !== 2 ||
          !this.paymentMethod) {
            this.modalActive = true;
            this.modalMessage = '빈칸을 채워주세요!';

          } else {
            this.modalActive = true;
            this.modalMessage = '이대로 진행하시겠습니까?'
            this.modalResponse = {name:'OrderDone'};
          }
      },
      closeModal() {
        this.modalActive = !this.modalActive;
      }
    }

}
</script>

<style lang="scss" scoped>
*{
  font-family: 'Noto Sans KR', sans-serif;
  font-weight: 400;
}
.title {
            font-size: 15px;
            font-weight: 700;
            padding-bottom: 10px;  
}

input {
  height: 35px;
  padding: 5px 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
}

.container-wrap {
  background-color: #f3f3f3;
  width: 100%;
  
  .container {
    width: 1200px;
    margin: 0 auto;
    .page {
      width: 100%;
      padding: 50px 0;
      text-align: center;
      font-size: 28px;
    }
    .contents {
      display: flex;
      flex-direction: row;
      justify-content: center;
      padding-bottom: 50px;
      .product-info-wrap{
        width: 45%;
        margin-right: 20px;
        .product-infos {
          margin-bottom: 20px;
          background-color: #fff;
          padding: 20px 20px;
          
          .content {
            display: flex;
            flex-direction: row;
            text-decoration: none;
            color: #000;
            img {
              width: 80px;
              height: 80px;
              margin-right: 15px;  
            }
            .product-info {
              
              .product-name {
                text-decoration: none;
                font-size: 14px;
                padding: 5px 0;
              }
              .product-quantity {
                font-size: 12px;
                color: #aaa;
                padding-bottom: 5px;
              }
              .product-price {
                font-size: 14px;
                font-weight: 700;
              }
            }
          }
        }

        .orderer-infos {
          
          margin-bottom: 20px;
          background-color: #fff;
          padding: 20px 20px;
          .name-tel {
            display: flex;
            flex-direction: row;
            
            justify-content: space-between;
            .name {
              width: 49%;
            }
            .contact {
              width: 49%;  
            }
          }
          .email {
            width: 100%;
          }
        }


        .order-infos {
          margin-bottom: 20px;
          background-color: #fff;
          padding: 20px 20px;
          
          .auto {
            display: flex;
            flex-direction: row;
            
            .checkbox {
              width: 15px;
              
            }
            .identical {
              font-size: 13px;
              padding-left: 10px;
              margin-top: 10px;

            }
          }
          .detail-infos {
            display: flex;
            justify-content: space-between;
            .recipient, .contact {
              width: 49%;
            }
          }
          .address-num {
            
            .zip-code {
              width: 20%;
              margin-right: 10px;
            }
            .find-zip-code {
              width: 20%;
              height: 35px;
              border: 1px solid #ccc;
              cursor: pointer;
            }
          }
          .address, .address-detail {
            width: 100%;
          }
          .memos {
            margin-top: 10px;
            .memo { 
              font-size: 14px;
              padding-bottom: 15px;
            }
            .message {
              width: 100%;
              height: 35px;
              margin-bottom: 10px;
            }
            .typing {
              width: 100%;
            }
          }
        }
      }


      .payment-info-wrap {
        padding-bottom: 50px;
        .payment-price {
          margin-bottom: 20px;
          background-color: #fff;
          padding: 20px 20px;
  

          .contents-price {
            display: flex;
            flex-direction: row;
            border-bottom: 1px solid #ccc;
            margin-bottom: 20px;
            .content-price, .prices {
              width: 50%;
              font-size: 14px;
              margin-bottom: 20px;
            }
            .content-price {
              color: #999;
              .product-price-title {
                margin-bottom: 5px;
              }
            }
            .prices {
              text-align: right;
              .product-price {
                margin-bottom: 5px;
              }
            }
          }

          .total {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            width: 100%;
            .total-price-title {
              font-size: 14px;  
            }
            .total-price {
              color: #7ba3c5;
              font-weight: 700;
            }
          }
        }
        
        .payment-method {
           margin-bottom: 20px;
          background-color: #fff;
          padding: 20px 20px;
          font-size: 14px;
          
          .select{
            display: grid;
            grid-template-columns: 1fr;
            @media(min-width: 1200px) {
              grid-template-columns: repeat(2, 1fr);
            }
            .select-item {
              
              display: flex;
              
              input {
                width: 15px;
                margin-right: 10px;
              }
              label {
                padding-top: 6px;
              }
            }
            
          }
        }

        .agreement {
          background-color: #fff;
          padding: 0px 20px;
          
          font-size: 14px;
          .agree-all, .agree {
            display: flex;
            flex-direction: row;
          }
          input {
            margin-right: 10px;
            width: 15px;
            color: #111;
          }
          h4 {
            padding-top: 10px;
          }
          .agree {
            
          }
        }

        .payment-check-allowed, .payment-check {
          width: 100%;
          height: 50px;
          font-size: 16px;
          font-weight: 700;
          letter-spacing: 2px;
          
          color: #fff;
          
          border: none;
          
        }
        .payment-check-allowed {
          background-color: #7ba3c5;
          cursor: pointer;
          transition: .3s all ease;
          &:hover {
            background-color: #4a82b3;
          }
        }
        .payment-check {
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: #bdd1e2;
        }
      }
    }

  }
}
</style>