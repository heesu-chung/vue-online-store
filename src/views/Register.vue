<template>
  <div class="container">
    <h5 class="title">Sign In</h5>
    <img src="" alt="">
    
    <div class="inputs">
      <input type="text" class="email" placeholder="이메일">
      <input type="text" class="pw" placeholder="비밀번호">
      <input type="text" class="pw-check" placeholder="비밀번호 확인">
    </div>

    <div class="names">
      <div class="essential">
        <h5>이름</h5>
        <div class="circle"></div>
      </div>
      <input type="text" class="name" placeholder="이름을(를) 입력하세요">
    </div>

    <button class="sign-in">가입하기</button>
  </div>
</template>

<script>
export default {
    name: 'Register',
}
</script>

<style lang="scss" scoped>
*{
  font-family: 'Noto Sans KR', sans-serif;
  font-weight: 400;  
}

.container {
  width: 380px;
  padding: 70px 0;
  padding-bottom: 100px;
  .title {
    font-size: 14px;
    font-weight: 400;
    text-align: center;
  }
  img {
    width: 80px;
    height: 80px;
    background-color: #aaa;
    display: flex;
    margin: 30px auto;
    border-radius: 40px;
  }
  .inputs {
    margin-bottom: 30px;
    .pw-check {
      border-bottom: 1px solid #ccc;
    }
  }
  .names {
    margin-bottom: 20px;
    .essential {
      display: flex;
      flex-direction: row;
      align-items: center;
      margin-bottom: 10px;
      h5 {
        font-size: 14px;
        margin-right: 5px;
      }
      .circle {
        width: 5px;
        height: 5px;
        background-color: orangered;
        border-radius: 50%;
      }
    }
    input {
      border-bottom: 1px solid #ccc;
    }
    
  }
  .sign-in {
    width: 100%;
    height: 45px;
    background-color: #7ba3c5;
    color: #fff;
    font-size: 12px;
    letter-spacing: 1px;
    border: none;
    cursor: pointer;
  }
}

input {
  width: 100%;
  height: 40px;
  border: 1px solid #ccc;
  border-bottom: none;
  padding: 0 10px;
  font-size: 12px;
}
</style>