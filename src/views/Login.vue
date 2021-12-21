<template>
  <div class="container">
    <h4 class="title">Login</h4>
    <input type="text" class="email" v-model="email" placeholder="이메일" />
    <input
      type="text"
      class="password"
      v-model="password"
      placeholder="비밀번호"
    />
    <div class="remain">
      <input type="checkbox" name="sustain" id="sustain" class="sustain" />
      <h5>로그인 상태유지</h5>
    </div>
    <button class="login" @click.prevent="login">
      로그인
    </button>
    <div class="register-forgot">
      <router-link class="register" :to="{ name: 'Register' }"
        >회원가입</router-link
      >
      <router-link class="forgot-password" :to="{ name: 'Register' }"
        >아이디 / 패스워드 찾기</router-link
      >
    </div>
    <div class="or">
      <span></span>
      <h3>또는</h3>
      <span></span>
    </div>

    <button class="naver-auth">
      네이버로 시작하기
    </button>
    <button class="kakao-auth">
      카카오로 시작하기
    </button>

    <div class="or">
      <span></span>
      <h3>또는</h3>
      <span></span>
    </div>

    <button class="none-auth">
      비회원 주문배송 조회
    </button>
  </div>
</template>

<script>
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
export default {
  name: 'Login',
  data() {
    return {
      email: null,
      password: null,
      error: null,
      errorMsg: null,
    };
  },
  methods: {
    login() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(() => {
          this.$router.push({ name: 'Home' });
          //this.$store.state.user = true;
          this.error = false;
          this.errorMsg = '';
          //console.log(firebase.auth().currentUser.uid);
        })
        .catch(err => {
          this.err = true;
          this.errorMsg = err.message;
          console.log(this.errorMsg);
          alert('아이디와 비밀번호를 확인해주세요.');
        });
    },
  },
  watch: {
    password() {},
  },
};
</script>

<style lang="scss" scoped>
* {
  font-family: 'Noto Sans KR', sans-serif;
  font-weight: 400;
}

.container {
  padding-top: 80px;
  width: 380px;
  padding-bottom: 80px;

  .title {
    font-size: 14px;
    font-weight: 200;
    text-align: center;
    margin-bottom: 30px;
  }
  .email,
  .password {
    width: 100%;
    height: 40px;
    border: 1px solid #ccc;
    padding-left: 15px;
  }
  .email {
    border-bottom: none;
  }
  .password {
    margin-bottom: 20px;
  }

  .remain {
    display: flex;
    flex-direction: row;
    margin-bottom: 20px;

    input {
      width: 15px;
      margin-right: 10px;
    }
    h5 {
      font-size: 12px;
      margin-top: -3px;
    }
  }

  .login {
    width: 100%;
    height: 45px;
    font-size: 14px;
    letter-spacing: 2px;
    background-color: white;
    border: 1px solid #777;
    margin-bottom: 10px;
    transition: 0.3s all ease;
    cursor: pointer;
    &:hover {
      background-color: black;
      color: #fff;
    }
  }

  .register-forgot {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    font-size: 12px;

    .register,
    .forgot-password {
      text-decoration: none;
      color: #000;
      font-weight: 400;
    }
  }

  .or {
    display: flex;
    flex-direction: row;
    margin: 20px 0;
    align-items: center;
    span {
      flex: 3;
      border-bottom: 1px solid #aaa;
    }
    h3 {
      flex: 1;
      font-size: 12px;
      color: #777;
      text-align: center;
    }
  }

  .naver-auth,
  .kakao-auth,
  .none-auth {
    width: 100%;
    height: 40px;
    text-align: center;
    margin: 5px 0;
    letter-spacing: 1px;
  }
}
</style>
