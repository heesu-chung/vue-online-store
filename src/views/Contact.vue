<template>
  <div class="container">
    <div class="intros">
    
      <div class="title">
        <h1>Contact Us</h1>
      </div>
      <div class="website">
        <h1>Showroom (KODE CAT)</h1>
      </div>
      <div class="intro">
        <div class="intro-en">
          <h2>1F, Gugal-ro,</h2>
          <h2>Yongin, Gyeonggi-do</h2>
          <h2>Mon-Thu am11:30-pm6:30 </h2>
          <h2>Fri am11:30-pm5:30 </h2>
          <h2>031.XXX.XXXX </h2>
        </div>
        <div class="intro-ko">
          <h2>경기도 용인시, 1층</h2>
          <h2>월-목 11:30-18:30, 금 11:30-17:30 </h2>
          <h2>주말·공휴일은 제외 </h2>
          <h2>031.XXX.XXXX </h2>
        </div>
      </div>
      <div class="website">
        <h1>Wholesale</h1>
      </div>
      <div class="intro">
        <div class="intro-en">
          <h2>Please email us for wholesale.</h2>
          <h2>chout1213@gmail.com</h2>
        </div>
        <div class="intro-ko">
          <h2>도매, 협찬 혹은 상품 관련하여 궁금하신 사항은 </h2>
          <h2>이메일을 통해 문의해 주세요.</h2>
          <h2>chout1213@gmail.com</h2>
        </div>
      </div>
    </div>

    <div class="map">

    </div>
    
    <div class="line"></div>
  </div>
</template>

<script>
export default {
    name: 'Contact',
}
</script>

<style lang="scss" scoped>
*{
    font-family: 'Noto Sans KR', sans-serif;
  font-weight: 400;
}
.map {
  width: 1200px;
  margin: 0 auto;
  height: 70vh;
  background-color: #aaa;
  margin-top: 30px 0;
}

.line {
  margin: 50px auto;
  width: 1200px;
  border-bottom: 1px solid black;
}
</style>