<template>
  <div>
    <InquiryModal
      v-if="modalActive"
      :post="inquiryPost"
      v-on:close-modal="closeModal"
    />

    <div class="inquiry">
      <div class="state" v-if="this.post.getResponse === true">
        {{ this.state }}
      </div>
      <div class="state-none" v-else>
        {{ this.state }}
      </div>
      <div class="title" @click="showContent">
        {{ this.post.inquiryTitle }}
      </div>
      <div class="profile-id">{{ this.post.inquiryName }}</div>
      <div class="date">
        {{
          new Date(this.post.inquiryDate).toLocaleString('ko-kr', this.options)
        }}
      </div>
    </div>
  </div>
</template>

<script>
import InquiryModal from './InquiryModal.vue';
export default {
  name: 'QuestionPost',
  props: ['post'],
  components: {
    InquiryModal,
  },
  data() {
    return {
      currentInquiry: [],
      options: {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: false,
      },
      modalActive: false,
      state: null,
    };
  },
  async mounted() {
    this.currentInquiry = this.post;
    if (this.post.getResponse === true) {
      this.state = '답변완료';
    } else {
      this.state = '답변 대기중';
    }
  },
  computed: {
    inquiryPost() {
      return this.post;
    },
  },
  methods: {
    showContent() {
      this.modalActive = !this.modalActive;
    },
    closeModal() {
      this.modalActive = !this.modalActive;
    },
  },
};
</script>

<style lang="scss" scoped>
* {
  font-family: 'Noto Sans KR', sans-serif;
  font-weight: 400;
}
.inquiry {
  width: 100%;
  border-bottom: 1px solid #ccc;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  height: 40px;
  .state {
    flex: 1;
    display: flex;
    justify-content: center;
    color: #7ba3c5;
  }
  .state-none {
    flex: 1;
    display: flex;
    justify-content: center;
    color: lightcoral;
  }
  .title {
    flex: 7;
    color: #666;
    margin-left: 30px;
    cursor: pointer;
    transition: 0.3s all ease;
    &:hover {
      color: #000;
    }
  }
  .profile-id {
    flex: 2;
    display: flex;
    justify-content: center;
    color: #666;
  }
  .date {
    flex: 2;
    display: flex;
    justify-content: center;
    color: #666;
  }
}
</style>
