<template>
  <div class="container-wrap">
    <div class="img-revision">
      <div class="img">
        <img :src="this.$store.state.profileCoverPhoto" alt="" />
      </div>
      <button class="change-img">이미지 변경</button>
    </div>
    <div class="password-revision">
      <div class="id-info">
        <h3 class="id">{{ this.$store.state.profileId }}</h3>
      </div>
      <div class="pw-info">
        <h3 class="title">비밀번호</h3>
        <input type="text" class="pw" v-model="pw" />
      </div>
      <div class="pw-info">
        <h3 class="title">비밀번호 확인</h3>
        <input type="text" v-model="changePW" />
      </div>
    </div>
    <div class="name-revision">
      <div class="name-info">
        <h3 class="title">이름</h3>
        <input type="text" class="name" v-model="name" />
      </div>
    </div>
    <div class="contact-revision">
      <div class="contact-info">
        <h3 class="title">연락처</h3>

        <input type="text" class="contact" v-model="contact" />
      </div>
    </div>
    <div class="address-revision">
      <h3 class="title">주소</h3>
      <input type="text" class="address" v-model="address" />
      <h3 class="title">주소 상세</h3>
      <input type="text" class="address" v-model="addressDetail" />
    </div>

    <div class="btns">
      <button class="cancel" @click="cancel">취소</button>
      <button class="apply" @click="apply">적용</button>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase/compat/app';
import db from '../../firebase/firebaseInit';
export default {
  name: 'ProfileRevision',
  data() {
    return {
      changePW: '',
      profileInfo: [],
    };
  },
  async mounted() {
    this.$store.dispatch('getCurrentUser');
    this.profileInfo = this.$store.state.profileInfo;
  },
  computed: {
    pw: {
      get() {
        return this.$store.state.profilePassword;
      },
      set(payload) {
        this.$store.commit('changePW', payload);
      },
    },
    name: {
      get() {
        return this.$store.state.profileName;
      },
      set(payload) {
        this.$store.commit('changeName', payload);
      },
    },
    contact: {
      get() {
        return this.$store.state.profileInfo.profileContact;
      },
      set(payload) {
        this.$store.commit('changeContact', payload);
      },
    },
    address: {
      get() {
        return this.$store.state.profileInfo.profileAddress;
      },
      set(payload) {
        this.$store.commit('changeAddress', payload);
      },
    },
    addressDetail: {
      get() {
        return this.$store.state.profileInfo.profileAddressDetail;
      },
      set(payload) {
        this.$store.commit('changeAddressDetail', payload);
      },
    },
  },
  methods: {
    cancel() {
      this.$router.push({ name: 'MyPage' });
    },
    async apply() {
      if (this.$store.state.profilePassword === this.changePW) {
        const userDB = db
          .collection('users')
          .doc(firebase.auth().currentUser.uid);

        const newProfileInfo = this.$store.state.profileInfo;
        await userDB.update({
          profilePassword: this.$store.state.profilePassword,
          profileName: this.$store.state.profileName,
          profileInfo: newProfileInfo,
        });
        alert(`회원님의 정보가 변경되었습니다.`);
      } else {
        alert(`비밀번호를 확인해주세요.`);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
input {
  height: 25px;
  width: 30%;
  font-weight: 400;
  margin-bottom: 15px;
  border: 1px solid #aaa;
  color: #aaa;
  &:focus {
    outline: 1px solid lightcoral;
    color: #000;
  }
}
h3 {
  font-weight: 400;
  margin-bottom: 5px;
}
.container-wrap {
  font-size: 12px;
  font-weight: 400;
  width: 70%;
  margin: 0 auto;
  .img-revision {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .img {
      width: 80px;
      height: 80px;
      border: 1px solid #ccc;
      border-radius: 50%;
      margin-bottom: 20px;
    }
    .change-img {
      width: 100px;
      height: 25px;
      background-color: #fff;
      transition: 0.3s all ease;
      border: 1px solid #ccc;
      cursor: pointer;
      &:hover {
        background-color: #000;
        color: #fff;
      }
    }
    margin-bottom: 30px;
  }
  .password-revision {
    .id {
      font-size: 13px;
      margin-bottom: 10px;
    }
    input {
      width: 30%;
      margin-right: 20px;
    }
  }

  .btns {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .cancel {
      margin-right: 5px;
    }
    .cancel,
    .apply {
      width: 80px;
      height: 30px;
      letter-spacing: 1px;
      background-color: #fff;
      border: 1px solid #ccc;
      transition: 0.3s all ease;
      cursor: pointer;
      &:hover {
        background-color: #000;
        color: #fff;
      }
    }
  }
}
</style>
