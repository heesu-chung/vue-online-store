<template>
  <div class="container">
      <h4 class="nav">Home > SHOP > Product</h4>
      <div class="infos">
        <img src="" alt="">
        <div class="info">
          <div class="product-details">
                <h2 class="product-name">Lumio x SUPERFICTION Lito mini / Blue</h2>
                <div class="product-specific">
                  <h3 class="price">250,000원</h3>
                  <div class="icon">
                    <!-- Share -->
                  </div>
                </div>
                <div class="deli-price-desc">
                  <h5 class="deli-pay">배송비</h5>
                  <h5 class="deli-pay-desc">무료 (50,000원 이상 무료배송)</h5>
                </div>
            </div>
            <div class="product-quantity">
              <h5 class="quantity">수량</h5>
              <div class="quantity-price">
                <div class="manipulate">
                  <div class="quantity-manipulate">
                    <button class="minus">-</button>
                    <h4 class="quantity-num">1</h4>
                    <button class="plus">+</button>
                  </div>
                  <h5 class="price">250,000원</h5>
                </div>
              </div>
            </div>
            <div class="total">
              <h4 class="total-price-desc">총 상품금액(1개)</h4>
              <h3 class="total-price">250,000원</h3>
            </div>
            <div class="btns">
              <router-link class="buy-btn" :to="{name: 'ShopPayment'}">구매하기</router-link>
              <router-link class="btn" :to="{name: 'ShopCart'}">장바구니</router-link>
              <button class="btn">하트</button>
            </div>
        </div>
      </div>

      <div class="board">
        <h4 class="detail">상세정보</h4>
        <h4>/</h4>
        <h4 class="qna">Q & A</h4>
      </div>

      <Description />

      <div class="service-desc">
        <h4 class="service-title">배송</h4>
        <h4 class="service-content">
          상품배송은 주문/결제 완료일로부터 2~5일 소요됩니다. (주말/공휴일 제외)<br>
          단, 입고지연 및 품절로 인해 배송이 지연되는 경우에는 개별 연락을 드립니다.<br> 
          제작기간이 별도로 소요되는 상품의 경우에는 상품설명에 있는 제작기간과 배송시기를 숙지해 주시기 바랍니다. <br>
          도서/산간지역 및 오지 일부지역은 배송비가 추가될 수 있습니다. 
        </h4>

        <h4 class="service-title">반품, 교환</h4>
        <h4 class="service-content">
          상품 수령일로부터 7일 이내 반품/환불 가능합니다. <br>
          변심 반품의 경우 왕복배송비를 차감한 금액이 환불되며, 제품 및 포장 상태가 재판매 가능하여야 합니다. <br>
          상품 불량인 경우는 배송비를 포함한 전액이 환불됩니다.  
        </h4>

        <h4 class="service-title">반품, 교환 불가사유</h4>
        <h4 class="service-content">
          반품/교환 가능 기간이 경과된 경우.<br>
          고객 주문 확인 후 상품 제작에 들어가는 주문제작 상품인 경우.<br>
          시간의 경과에 의하여 재판매가 곤란할 정도로 상품의 가치가 현저히 감소한 경우.<br>
          포장을 개봉하였거나 포장이 훼손되어 상품가치가 현저히 감소한 경우.<br>
          소비자 책임의 사유로 상품 등이 멸실 또는 훼손된 경우.  
        </h4>
        
        <h4 class="service-title">HELP DESK</h4>
        <h4 class="service-content">
          이메일: chout1213@gmail.com<br>
          전화: 02.XXXX.XXXX<br>
          문의 사항은 전화 상담보다는 고객센터 이메일을 사용해 주시면 빠른 처리가 가능합니다.<br>
          성함과 연락처, 불편 사항 및 사진 등을 첨부하여 이메일에 발송해 주시기 바랍니다.
        </h4>
      </div>

      <Question />

  </div>
</template>

<script>
import Description from '../components/Description.vue';
import Question from '../components/Question.vue';
export default {
  name: 'Product',
  components: {
    Description,
    Question,
  },
}
</script>

<style lang="scss" scoped>
*{
    font-family: helvetica;
  font-weight: 400;
}
.container {
  .nav {
    font-size: 12px;
    padding: 15px 0;
  }
  .infos {
      display: flex;
      flex-direction: row;
      
    img {
      width: 600px;
      height: 600px;
      background-color: #aaa;
      margin-right: 100px;
    }
    .info {
      width: 100%;
      .product-details {
        display: flex;
        flex-direction: column;
        .product-name {
          font-size: 20px;
          margin-bottom: 5px;
        }
        .product-specific {
          border-bottom: 1px solid #aaa;
          padding-bottom: 20px;
          .price {
            color: #7ba3c5;
            font-size: 20px;
          }
          .icon{

          }
        }
        .deli-price-desc {
          display: flex;
          flex-direction: row;
          padding-top: 20px;
          .deli-pay {
           
           font-size: 12px;
           font-weight: 700;
           padding-right: 10px; 
          }
          .deli-pay-desc{
            font-size: 12px;
            font-weight: 400;
          }
        }
        
      }

      .product-quantity{
        margin-top: 20px;
        background-color: #eee;
        .quantity {
          width: 95%;
          padding: 15px 0;
          margin: 0 auto;
          font-size: 11px; 
          font-weight: 700;
          border-bottom: 1px dashed #ccc;
        }
        .manipulate {
          display: flex;
          flex-direction: row;
          margin: 0px auto;
          width: 95%;
          padding: 15px 0;
          .quantity-manipulate {
            display: flex;
            flex-direction: row;
            background-color: #fff;
            border: 1px solid black;
            width: 100px;
            height: 30px;
            .minus {
              flex: 1;
              border: none;
              border-right: 1px solid #aaa;
              background-color: #fff;
              cursor: pointer;
            }
            .quantity-num {
              flex: 2;
              padding-top: 5px;
              display: flex;
              justify-content: center;
            }
            .plus {
              flex: 1;
              border: none;
              border-left: 1px solid #aaa;
              background-color: #fff;
              cursor: pointer;
            }
          }
          .price {
            font-size: 12px;
            width: 100%;
            font-weight: 400;
            text-align: right;
            padding-top: 5px;
          }
        }
        
      }

      .total {
        display: flex;
        flex-direction: row;
        margin: 40px 0;
        .total-price-desc {
          flex:1;
          font-size: 12px;
          font-family: helvetica;
          margin-right: 50px;
          padding-top: 5px;
        }
        .total-price {
          flex:1;
          
          font-size: 20px;
          text-align: right;
        }
      }
      .btns {
        width: 100%;
        height: 50px;
        display: grid;
        grid-template-columns: 1fr;
        gap: 10px;

        .buy-btn {
          font-size: 14px;
          font-family: 'Noto Sans KR', sans-serif;
          background-color: #7ba3c5;
          color: white;
          font-weight: 500;
          border: 1px solid #aaa;
          text-decoration: none;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: .3s ease all;
          &:hover {
            background-color: #4a82b3;;
          }
        }
        .btn {
          font-family: 'Noto Sans KR', sans-serif;
          background-color: #fff;  
          font-size: 14px;
          font-weight: 500;
          border: 1px solid #aaa;
          text-decoration: none;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: .3s all ease;
          &:hover {
            border: 1px solid black;
          }
        }
        @media (min-width: 1200px) {
        grid-template-columns: repeat(3, 1fr);
      }
      }
    }
  }

  .service-desc {
    border-top: 1px solid #aaa;
    border-bottom: 1px solid #aaa;
    padding-bottom: 40px;
    margin-top: 50px;
    margin-bottom: 50px;
    .service-title {
      font-family: Helvetica;
      font-weight: 700;
      margin-top: 40px;
      margin-bottom: 15px;
      font-size: 12px;
    }
    .service-content {
      font-family: Helvetica;
      font-weight: 400;
      font-size: 12px;
      line-height: 19px;
    }
  }

  .board {
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: center;
    cursor: pointer;
    margin-top: 50px;
    h4 {
      font-family: 'Noto Sans KR', sans-serif;
      font-size: 13px;
      padding: 0 20px;
    }
    
  }
}
</style>