<template>
  <div class="container">
    <div class="info">
      <h2 class="shop-list">장바구니</h2>
      <h4 class="shop-list-quantity">2</h4>
    </div>
    
    <div class="category">
      <input type="checkbox" class="checkbox" name="" id="">
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

    <ShopListCard />

    <div class="overview">
      <div class="total-price">
        <h3>상품가격</h3>
        <h3 class="price">308,000원</h3>
      </div>
      <div class="deli-price">
        <h3>배송비</h3>
        <h3 class="price">무료</h3>
      </div>
    </div>

    <div class="overall">
      <div class="options">
        <button class="option">선택상품 삭제</button>
        <button class="option">위시리스트 담기</button>
      </div>
      <div class="total-fee">
        <h4>결제금액</h4>
        <h2>308,000원</h2>
      </div>
    </div>
    <div class="actions">
      <router-link class="final-order" :to="{name: 'ShopPayment'}"><span>주문하기</span></router-link>
      <router-link class="continue" :to="{name: 'Shop'}">계속 쇼핑하기</router-link>
    </div>
    
    <div class="wish-list-wrap">
      <div class="view-wishes">
        <h3 class="wish-list">위시 리스트</h3>
        <button class="more-info">더보기</button>
      </div>
    </div>

    <ProductCard class="product-card"/>

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
    }
}
</script>

<style lang="scss" scoped>
*{
  font-family: 'Noto Sans KR', sans-serif;
  font-weight: 400;
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
    .checkbox {
      cursor: pointer;
      
    }
    .item {
      margin-left: 30px;
      width: 40%;
      
    }
    .wish {
      padding: 0 30px; 
    }
    .quantity {
      padding: 0 30px;
    }
    .deli-method {
      padding: 0 30px;
    }
    .deli-price {
      padding: 0 30px;
    }
    .price {
      width: 12%;
      text-align: right;
    }
    .order-service {
      
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
      .price{
        padding: 0 64px;
      }
    }
    .deli-price {
      margin-top: 10px;
      display: flex;
      flex-direction: row;
      .price {
        margin-left: 120px;
      }
    } 
  }

  .overall {
    display: flex;
    flex-direction: row;
    width: 100%;
    .options{
      .option {
        background-color: #fff;
        border: 1px solid #aaa;
        padding: 5px 10px;
        border-radius: 15px;
        margin: 20px 5px;
        cursor: pointer;
        transition: .3s ease all;
        &:hover {
          border: 1px solid black;
        }
      }
    }
    .total-fee {
      display: flex;
      flex-direction: row;
      align-items: center;
      margin-left: 53%;
      
      h4 {
        font-size: 12px;
        margin-right: 30px;
      }
      h2 {
        font-size: 20px;
        font-weight: 700;
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
      border:none;
      color: #fff;
      transition: .3s ease all;
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
    .continue {
      margin-top: 20px;
      font-size: 15px;
      letter-spacing: 2px;
      color: #7ba3c5;
      text-decoration: underline;
      background-color: #fff;
      border: none;
      transition: .3s ease all;
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
        width: 60px;
        height: 30px;
        border-radius: 15px;
        background-color: #fff;
        border: 1px solid #aaa;
        cursor: pointer;
        transition: .3s ease all;
        font-weight: 700;
        font-size: 12px;
        &:hover {
          border: 1px solid black;
        }
      }
    }
  }
  .product-card {
    
  }
}

</style>