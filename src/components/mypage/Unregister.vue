<template>
  <div class="container-wrap">
    <ProductModal
      v-if="modalActive"
      :modalMessage="modalMessage"
      :unregister="unregister"
      v-on:close-modal="closeModal"
    />
  </div>
</template>

<script>
import ProductModal from '../ProductModal.vue';
export default {
  name: 'Unregister',
  components: {
    ProductModal,
  },
  data() {
    return {
      modalMessage:
        '가입된 회원정보가 모두 삭제됩니다. 회원 탈퇴를 진행하시겠습니까?',
      unregister: true,
      modalActive: true,
    };
  },
  async mounted() {},
  methods: {
    closeModal() {
      this.modalActive = !this.modalActive;
      this.$router.push({ name: 'MyPage' });
    },
  },
};
</script>

<style lang="scss" scoped>
.container-wrap {
  width: 100%;
}
</style>
