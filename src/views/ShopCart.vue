<template>
  <div class="container">
    <div class="info">
      <h2 class="shop-list">장바구니</h2>
      <h4 class="shop-list-quantity">2</h4>
    </div>
    
    <div class="category">
      <input type="checkbox" name="" id="">
      <div class="item">item</div>
      <div class="wish">위시</div>
      <div class="quantity">수량</div>
      <div class="deli-method">배송수단</div>
      <div class="deli-price">배송비</div>
      <div class="price">가격</div>
      <div class="order-service">
        <button class="order">주문</button>
        <button class="delete">삭제</button>
      </div>
    </div>

    <ShopListCard />

    <div class="overview">
      <div class="total-price">
        <h3>상품가격</h3>
        <h3>308,000원</h3>
      </div>
      <div class="deli-price">
        <h3>배송비</h3>
        <h3>무료</h3>
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

    <button class="final-order">주문하기</button>
    <button class="continue">계속 쇼핑하기</button>

    <div class="wish-list-wrap">
      <div class="view-wishes">
        <h3 class="wish-list">위시 리스트</h3>
        <button class="more">더 보기</button>
      </div>
    </div>

    <ProductCard />

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
</style>