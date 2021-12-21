<template>
  <div class="container">
    <div class="question-num">
      <h3>Q&A</h3>
      <div>{{ this.productInquiries.length }}</div>
    </div>
    <div class="btns">
      <router-link class="btn-router" :to="{ name: 'ProductInquiry' }"
        >상품문의</router-link
      >
      <router-link
        class="btn-router"
        :to="{ name: 'Qna' }"
        :productNameInquiry="this.$route.params.productName"
        >1 : 1 문의</router-link
      >
    </div>
    <div class="board-title">
      <h5 class="post-status">상태</h5>
      <h5 class="post-title">제목</h5>
      <h5 class="post-writer">작성자</h5>
      <h5 class="post-date">등록일</h5>
    </div>
    <div class="content">
      <QuestionPost
        :post="post"
        v-for="(post, idx) in productInquiries"
        :key="idx"
        :idx="idx"
      />
    </div>
  </div>
</template>

<script>
import QuestionPost from './QuestionPost.vue';
export default {
  name: 'Question',
  components: {
    QuestionPost,
  },
  async mounted() {},
  computed: {
    productInquiries() {
      return this.isThisProduct();
    },
  },
  methods: {
    isThisProduct() {
      let newProductInquiryList = [];
      if (this.$store.state.productInquiry) {
        newProductInquiryList = this.$store.state.productInquiry.filter(
          post => {
            return post.inquiryProductId === this.$route.params.productId;
          },
        );
      }
      return newProductInquiryList;
    },
  },
};
</script>

<style lang="scss" scoped>
* {
}
.container {
  .question-num {
    display: flex;
    flex-direction: row;
    align-items: center;
    div {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      margin-left: 10px;
      background-color: #7ba3c5;
      font-size: 12px;
      color: #fff;
      text-align: center;
      justify-content: center;
      align-items: center;
    }
    padding: 20px 0;
  }
  .btns {
    display: flex;
    flex-direction: row;
    .btn {
      border: 1px solid #aaa;
      background-color: #fff;
      width: 100px;
      height: 35px;
      font-size: 12px;
      text-decoration: none;
      font-family: 'Noto Sans KR', sans-serif;
      letter-spacing: 1px;
      margin-right: 5px;
      transition: 0.3s all ease;
      cursor: pointer;
      &:hover {
        background-color: #000;
        color: #fff;
      }
    }
    .btn-router {
      border: 1px solid #aaa;
      background-color: #fff;
      font-size: 12px;
      text-decoration: none;
      color: #000;
      transition: 0.3s all ease;
      width: 100px;
      height: 35px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      &:hover {
        background-color: #000;
        color: #fff;
      }
    }
  }
  .board-title {
    width: 100%;
    margin-top: 30px;
    display: flex;
    flex-direction: row;
    border-top: 1px solid black;
    border-bottom: 1px solid #ccc;
    padding: 7px 0;
    text-align: center;
    font-weight: 700;
    .post-status {
      flex: 1;
    }
    .post-title {
      flex: 7;
    }
    .post-writer {
      flex: 2;
    }
    .post-date {
      flex: 2;
    }
  }
  padding: 30px 0;
  //border-bottom: 1px solid #aaa;
  margin-bottom: 80px;
}
</style>
