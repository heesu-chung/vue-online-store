<template>
  <div class="container">
      <div class="question-num">
          <h3>Q&A</h3>
            <div>0</div>
      </div>
      <div class="btns">
          <button class="btn">상품문의</button>
          <button class="btn">1 : 1 문의</button>
      </div>
      <div class="content">

      </div>
  </div>
</template>

<script>
export default {
    name: 'Question',
}
</script>

<style lang="scss" scoped>
*{

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
        .btn {
        border: 1px solid #aaa;
        background-color: #fff;
        width: 100px;
        height: 40px;
        font-size: 12px;
        font-family: 'Noto Sans KR', sans-serif;
        letter-spacing: 1px;
        margin-right: 5px;
        transition: .3s all ease;
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