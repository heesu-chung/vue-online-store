<template>
  <div class="product-card">
      <div class="product">
          <router-link :to="{name: 'Product'}" class="product-img" alt=""/>
        <router-link :to="{name: 'Product'}" class="product-name">Product Name</router-link>
      </div>
      <h5 class="product-price">Price원</h5>
      <div class="soldout">
          <h5>SOLDOUT</h5>
      </div>
  </div>
</template>

<script>
export default {
    name: 'ProductCard',
}
</script>

<style lang="scss" scoped>
*{
    font-family: 'Noto Sans KR', sans-serif;
    font-weight: 400;

    
}
.product-card {
    width: 280px;
    .product {
        display: flex;
        flex-direction: column;
        .product-img {
            width: 100%;
            height: 280px;
            object-fit: cover;
            background-color: #aaa;
            cursor: pointer;
        }
        .product-name {
            text-decoration: none;
            color: #000;
            text-align: center;
            font-size: 12px;
            font-weight: 700;
            cursor: pointer;
            margin-top: 12px;
            margin-bottom: 3px;
        }
    }
    .product-price {
        text-align: center;
        font-family: Helvetica;
        font-size: 12px;
        margin-bottom: 5px;
    }
    .soldout {
        background-color: #666;
        width: 70px;
        height: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0 auto;
        h5{
            color: #fff;
            font-family: Helvetica;
            font-size: 11px;
            margin: 0 auto;
        }
    }
}
</style>