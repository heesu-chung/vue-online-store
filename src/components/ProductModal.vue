<template>
  <div class="modal">
    <div class="modal-content">
      <p>{{ this.modalMessage }}</p>
      <div class="btn">
        <button @click="closeModal" class="btn-left" v-if="shopCart">
          계속쇼핑
        </button>
        <button @click="shopList" class="btn-right" v-if="shopCart">
          장바구니
        </button>

        <button @click="closeModal" class="btn-left" v-if="unregister">
          취소
        </button>
        <button @click="execUnregister" class="btn-right" v-if="unregister">
          탈퇴하기
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import db from '../firebase/firebaseInit';
export default {
  name: 'ProductModal',
  props: ['modalMessage', 'unregister', 'shopCart'],
  methods: {
    closeModal() {
      this.$emit('close-modal');
    },
    shopList() {
      this.$router.push({ name: 'ShopCart' });
    },
    async execUnregister() {
      this.$router.push({ name: 'Home' });
      const dataBase = db
        .collection('users')
        .doc(firebase.auth().currentUser.uid);
      await dataBase.update({
        profileEmail: null,
        profilePassword: null,
        profileState: {
          state: 'unregister',
          profileId: this.$store.state.profileId,
        },
      });
      alert('지금까지 이용해주셔서 감사합니다.');
      firebase.auth().signOut();

      this.$store.dispatch('getPost');
      this.$store.dispatch('getCurrentUser');
      this.$emit('close-modal');
    },
  },
};
</script>

<style lang="scss" scoped>
* {
  //border: 1px solid black;
}
.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 101;
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.3);

  .modal-content {
    display: flex;
    flex-direction: column;
    justify-items: center;
    border-radius: 8px;
    width: 300px;
    background-color: #fff;

    p {
      text-align: center;
      font-size: 12px;
      padding: 40px 20px;
      font-weight: 400;
    }
    .btn {
      width: 100%;
      display: flex;
      flex-direction: row;
      .btn-right {
        border-bottom-right-radius: 8px;
      }
      .btn-left {
        border-bottom-left-radius: 8px;
        border-right: 1px solid #ccc;
      }
      button {
        width: 50%;
        align-self: center;
        border: none;
        cursor: pointer;
        font-size: 12px;
        font-weight: 700;
        padding: 15px 0;
        background-color: #fff;
        transition: 0.3s all ease;
        overflow: hidden;
        border-top: 1px solid #ccc;

        &:hover {
          background-color: #000;
          color: #fff;
        }
      }
    }
  }
}
</style>
