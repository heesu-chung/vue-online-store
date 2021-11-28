<template>
  <div class="container">
    <div class="intros">
      <div class="title">
        <h1>DeDeDef LAB</h1>
      </div>
      <div class="website">
        <h1>DeDeDef LAB</h1>
        <h4>Website</h4>
      </div>
      <div class="intro">
        <div class="intro-en">
          <h2>We are </h2>
          <h2>a creative design studio.</h2>
        </div>
        <div class="intro-ko">
          <h2>DeDeDef LAB은</h2>
          <h2>크리에이티브 디자인 스튜디오입니다.</h2>
        </div>
      </div>
      <div class="intro">
        <div class="intro-en">
          <h2>DeDeDef LAB, through the process of creative play, adds new value in the field of design, culture, and art while also providing direction. With the concept of happiness as our driving force, we are building and growing our business through joyful methods and practices as a lifestyle brand. We're currently collaborating with various company and at the same time working on our own contents with our own story.</h2>
        </div>
        <div class="intro-ko">
          <h2>데데뎁 랩은 창의적인 놀이를 통해 디자인, 문화, 예술의 새로운 가치를 만들어내고 더 나아가 방향을 제시합니다. 라이프스타일의 영역에서 즐거운 방법으로 이윤을 만드는 비지니스를 성장시키고 있습니다. 슈퍼픽션은 다양한 파트너와 프로젝트를 진행함과 동시에 슈퍼픽션만의 이야기가 담긴 자체 콘텐츠를 제작하고 있습니다.</h2>
        </div>
      </div>
    </div>

    <img src="" alt="">

  <div class="intros">
    
      <div class="title">
        <h1>KODE CAT</h1>
      </div>
      <div class="website">
        <h1>KODE CAT</h1>
      </div>
      <div class="intro">
        <div class="intro-en">
          <h2>KODE CAT is</h2>
          <h2>a filtered coffee+brand shop</h2>
          <h2>by DeDeDef LAB.</h2>
        </div>
        <div class="intro-ko">
          <h2>코드 캣은 데데뎁 랩이 준비한</h2>
          <h2>필터커피+브랜드 샵입니다.</h2>
        </div>
      </div>
      <div class="intro">
        <div class="intro-en">
          <h2>Feel and buy DeDeDef LAB products, collaborative products and KODE CAT goods at KODE CAT. Meet filtered coffee of KODE CAT and Sausalito as well. Check in at KODE CAT by DeDeDef LAB!</h2>
        </div>
        <div class="intro-ko">
          
          <h2>코드 캣에서는 데데뎁 랩이 제작한 제품과 협업 제품, 코드 캣 굿즈를 직접 만져보고 구입할 수 있습니다. 더불어 코드 캣, 소살리토 필터커피도 준비되어 있습니다. 데데뎁 랩의 코드 캣에서 체크인하세요.</h2>
        </div>
      </div>
    
    </div>

    <img src="" alt="">

    <div class="line"></div>
  </div>
</template>

<script>
export default {
    name: 'About',
}
</script>

<style lang="scss" scoped>

*{
  font-family: 'Noto Sans KR', sans-serif;
  font-weight: 400;

}
.container {
  width: 100%;
  
}
.intros {
    display: flex;
    flex-direction: column;
    width: 1200px;
    margin: 0 auto;
    
    .title {
      font-size: 24px;
      padding: 50px 0;
      //border-bottom: 1px solid black;
      h1{
        text-align: center;
      }
    }
    .website {
      display: flex;
      flex-direction: row;
      padding: 30px 0;
      border-top: 1px solid black;
      h1{
        flex: 1;
        font-size: 3rem;
        font-weight: 300;
      }
      h4{
        flex: 1;
        font-weight: 100;
      }
    }
    .intro {
      display: flex;
      flex-direction: row;
      padding: 30px 0;
      border-top: 1px solid black;
      .intro-en {
        flex: 1;
        h2{
          
        }
      }
      .intro-ko {
        flex: 1;
        h2{
          font-size: 16px;
        }
      }
    }
  }

img {
  width: 100%;
  height: 100vh;
  background-color: #aaa;
  margin-top: 30px 0;
}

.line {
  margin: 50px auto;
  width: 1200px;
  border-bottom: 1px solid black;
}
</style>