<template>
  <div class="product-card">
      <router-link class="product" :to="{name: 'Product', params: {productId: this.post.productId }}">
         <img  class="product-img" :src="post.productPhoto" alt=""/> 
        <router-link :to="{name: 'Product', params: {productId: this.post.productId}}" class="product-name">{{post.productName}}</router-link>
      </router-link>
      <h5 class="product-price">{{price}}원</h5>
      <div class="soldout" v-show="!this.productNum">
          <h5>SOLDOUT</h5>
      </div>
  </div>
</template>

<script>
export default {
    name: 'ProductCard',
    props: ["post", "idx"],
    data() {
        return {
            productNum: null,
        }
    },
    async mounted() {
        await this.getProductNum();
    },
    computed: {
        price() {
            let finalPrice = this.post.productPrice.toLocaleString();
            //or 정규식 사용
            return finalPrice; 
        },
    },
    methods: {
        async getProductNum() {
            // console.log(`Product.vue getProductNum()`);

            await this.$store.state.shopPosts.forEach((post) => {
                if(post.productId === this.post.productId) {
                    this.productNum = post.productRemainQuantity;
                    // console.log(`this.productNum changed : ` + this.productNum);
                }
            });
            
            // console.log(`Product.vue getProductNum() Done!`);
        }
    },
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
        text-decoration: none;
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