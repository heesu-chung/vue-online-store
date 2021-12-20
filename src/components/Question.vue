<template>
  <div class="container">
    <div class="question-num">
      <h3>Q&A</h3>
      <div>0</div>
    </div>
    <div class="btns">
      <router-link class="btn-router" :to="{ name: 'ProductInquiry' }"
        >상품문의</router-link
      >
      <router-link
        class="btn-router"
        :to="{ name: 'Qna' }"
        :productName="this.$route.params.productName"
        >1 : 1 문의</router-link
      >
    </div>
    <div class="content"></div>
  </div>
</template>

<script>
export default {
  name: 'Question',
};
</script>

<style lang="scss" scoped>
* {
}
.container {
  .question-num {
    display: flex;
    flex-direction: row;
    div {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background-color: #7ba3c5;
      font-size: 14px;
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
  padding: 30px 0;
  border-bottom: 1px solid #aaa;
}
</style>
