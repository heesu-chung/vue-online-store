<template>
  <div class="container-all">
    <div class="container">
      <div class="lists">
        <router-link
          class="category"
          :to="{ name: 'OrderInquiry' }"
          @click="router"
          >주문조회</router-link
        >
        <router-link class="category" :to="{ name: 'WishList' }" @click="router"
          >위시 리스트</router-link
        >
        <router-link class="category" :to="{ name: 'Qna' }" @click="router"
          >1:1 문의</router-link
        >
        <router-link
          class="category"
          :to="{ name: 'ProfileRevision' }"
          @click="router"
          >정보 수정</router-link
        >
        <router-link
          class="category"
          :to="{ name: 'Unregister' }"
          @click="router"
          >회원 탈퇴</router-link
        >
      </div>

      <div class="profile-infos">
        <div class="profile-wrap">
          <div class="profile-info">
            <div class="image"></div>
            <div class="intro">
              <h3 class="hi">
                {{ this.$store.state.profileName }} 님 안녕하세요.
              </h3>
              <div class="accu">
                <h5 class="accumulate">
                  누적 구매금액 :
                </h5>
                <h5 class="accumulate-price">
                  {{ this.totalBuyPrice.toLocaleString() }}원
                </h5>
              </div>
            </div>
          </div>
          <div class="coupon">
            <h5 class="title">쿠폰</h5>
            <h2 class="coupon-num">0</h2>
          </div>
        </div>

        <div class="components">
          <router-view class="router-view" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MyPage',
  data() {
    return {
      page: '',
      totalBuyPrice: 0,
    };
  },
  async mounted() {
    this.page = this.$route.params.page;
    await this.$store.dispatch('getPost');
    await this.$store.dispatch('getCurrentUser');
    this.$store.state.orderPosts = [];
    this.$store.state.profileOrderList.forEach(posts => {
      posts.orderProductInfo.orderLists.forEach(post => {
        this.$store.state.orderPosts.push(post);
      });
    });

    this.$store.state.orderPosts.forEach(post => {
      this.totalBuyPrice += post.totalProductPrice;
    });
  },
  methods: {
    router() {
      console.log(this.$route.params.page);
      console.log(`ss`);
    },
  },
};
</script>

<style lang="scss" scoped>
* {
  font-family: 'Noto Sans KR', sans-serif;
  font-weight: 400;
}
.container-all {
  width: 100%;
  background-color: #f6f6f6;
  .container {
    width: 1200px;
    margin: 0 auto;
    padding: 80px 20px;
    display: flex;
    flex-direction: row;
    .lists {
      width: 20%;
      display: flex;
      flex-direction: column;
      .category {
        width: 50%;

        font-size: 12px;

        margin: 10px 0;
        cursor: pointer;
        text-decoration: none;
        color: #555;
        font-weight: 700;
        transition: 0.5s all ease-out;
        &:hover {
          border-right: 5px solid #7ba3c5;
        }
      }
      ul {
        li {
          font-size: 13px;
          list-style: none;
          margin: 15px 0;
          cursor: pointer;
        }
      }
    }
    .profile-infos {
      width: 100%;

      .profile-wrap {
        display: flex;
        flex-direction: row;
        align-items: center;
        background-color: #fff;
        height: 180px;
        .profile-info {
          height: 60%;
          width: 75%;
          border-right: 1px solid #ccc;
          display: flex;
          //justify-content: center;
          align-items: center;
          .image {
            border: 1px solid #ccc;
            width: 80px;
            height: 80px;
            border-radius: 50%;
            margin-left: 50px;
            margin-right: 20px;
          }
          .intro {
            .hi {
              font-size: 1.25rem;
              margin-bottom: 8px;
            }
            .accu {
              display: flex;
              flex-direction: row;
              align-items: center;
              .accumulate {
                font-size: 15px;
                margin-right: 10px;
                color: #666;
              }
              .accumulate-price {
                font-size: 17px;
              }
            }
          }
        }
        .coupon {
          width: 25%;
          display: flex;
          flex-direction: column;
          text-align: center;
          .title {
            letter-spacing: 1px;
            margin-bottom: 15px;
          }
          .coupon-num {
            font-family: helvetica;
            font-size: 35px;
            font-weight: 700;
          }
        }
        margin-bottom: 50px;
      }

      .components {
      }
    }
  }
}
</style>
