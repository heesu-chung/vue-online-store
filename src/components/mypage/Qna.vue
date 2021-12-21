<template>
  <div class="container-all">
    <div class="infos">
      <h4 class="title">1:1 문의게시판</h4>
      <div class="circle">
        <h5>{{ this.categoryNum }}</h5>
      </div>
    </div>
    <div class="titles">
      <div class="state">상태</div>
      <div class="title">제목</div>
      <div class="profile-id">작성자</div>
      <div class="date">등록일</div>
    </div>
    <div class="contents">
      <QuestionPost
        :post="post"
        v-for="(post, idx) in profileInquiries"
        :key="idx"
        :idx="idx"
      />
    </div>

    <div class="btn-wrap">
      <router-link class="btn" :to="{ name: 'ProductOneOnOneInquiry' }"
        >문의 작성</router-link
      >
    </div>
  </div>
</template>

<script>
import QuestionPost from '../QuestionPost.vue';
export default {
  name: 'Qna',
  components: {
    QuestionPost,
  },
  data() {
    return {
      categoryNum: null,
    };
  },
  async mounted() {},
  computed: {
    profileInquiries() {
      return this.isThisInquiries();
    },
  },
  methods: {
    isThisInquiries() {
      let newProfileInquiryList = [];
      if (this.$store.state.profileInquiry) {
        newProfileInquiryList = this.$store.state.profileInquiry.filter(
          post => {
            return post.inquiryProfileId === this.$store.state.profileId;
          },
        );
      }
      this.categoryNum = newProfileInquiryList.length;
      return newProfileInquiryList;
    },
  },
};
</script>

<style lang="scss" scoped>
.container-all {
  width: 100%;
  display: flex;
  flex-direction: column;
  .infos {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding-bottom: 10px;
    border-bottom: 1px solid #ccc;

    .title {
      margin-bottom: 10px;
      margin-right: 10px;
    }
    .circle {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background-color: #7ba3c5;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      font-size: 12px;
      margin-top: -8px;
      h5 {
        margin-top: -2px;
      }
    }
  }

  .titles {
    display: flex;
    flex-direction: row;
    width: 100%;
    border-bottom: 1px solid #ccc;
    align-items: center;
    justify-content: center;
    font-size: 13px;
    height: 40px;
    text-align: center;
    .state {
      flex: 1;
    }
    .title {
      flex: 7;
    }
    .profile-id {
      flex: 2;
      padding-left: 25px;
    }
    .date {
      flex: 2;
    }
  }
  .contents {
    //margin: 20px auto;
  }
  .btn-wrap {
    margin-top: 20px;
    display: flex;
    justify-content: right;
    .btn {
      width: 100px;
      height: 35px;
      display: flex;
      justify-content: center;
      align-items: center;
      text-decoration: none;
      font-size: 12px;
      background-color: #fff;
      color: #666;
      border: 1px solid #ccc;
      cursor: pointer;
      transition: 0.3s all ease;

      &:hover {
        background-color: #000;
        color: #fff;
      }
    }
  }
}
</style>
