<template>
  <div class="container">
    <h5 class="title">Sign In</h5>
    <img src="" alt="">
    
    <div class="inputs">
      <input type="text" class="email" v-model="email" placeholder="이메일">
      <input type="text" class="pw" v-model="password" placeholder="비밀번호">
      <input type="text" class="pw-check" v-model="passwordCheck" placeholder="비밀번호 확인">
    </div>

    <div class="names">
      <div class="essential">
        <h5>상세정보</h5>
        <div class="circle"></div>
      </div>
      <input type="text" class="name" v-model="name" placeholder="이름을(를) 입력하세요">
      <input type="text" class="contact" v-model="contact" placeholder="전화번호를 입력하세요">
      <div class="find-zip-code">
        <button class="zipcode" @click ="findAddress">{{this.zipCode}}</button>
        <button class="btn" @click="findAddress">주소 찾기</button>
      </div>
      <input type="text" class="address" v-model="address" placeholder="주소">
      <input type="text" class="address-detail" v-model="addressDetail" placeholder="상세주소">
    </div>

    <button class="sign-in" @click.prevent="register">가입하기</button>
  </div>
</template>

<script>
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import db from "../firebase/firebaseInit";

export default {
    name: 'Register',
    data() {
      return {
        email: "",
        password: "",
        passwordCheck: "",
        name: "",
        contact: '',
        zipCode: '1111',
        address: '',
        addressDetail: '', 
        error: null,
        errorMsg: "",
      }
    },
    methods: {
      findAddress() {

      },
      async register() {
        if(this.email !== "" && 
        this.password !== "" &&
        this.passwordCheck !== "" &&
        this.name !== "" &&
        this.password === this.passwordCheck) {
          this.error = false;
          this.errorMsg = "";

          const firebaseAuth = await firebase.auth();
          const createUser = await firebaseAuth.createUserWithEmailAndPassword(this.email, this.password);
          const result = await createUser;
          const timestamp = await Date.now();
          const dataBase = db.collection("users").doc(result.user.uid);
          await dataBase.set({
            profileName: this.name,
            profileEmail: this.email,
            profilePassword: this.password,
            profileId: this.email,
            profileShopList: [],
            profileWishList: [],
            profileCoverPhoto: null,
            profileGrade: 1,
            profileInfo: {
              profileContact: this.contact,
              profileZipCode: this.zipCode,
              profileAddress: this.address,
              profileAddressDetail: this.addressDetail,
            },
            isManager: false,
            profileMessage: [],
            registerDate: timestamp,
            profileOrderList: [],
          });
          this.$router.push({name: 'Home'});
          return;
        }
        if(this.password !== this.passwordCheck) {
          this.error = true;
          this.errorMsg = "Wrong Password";
        }
        this.error = true;
        this.errorMsg = "Please fill out all the fields!";
        return;
      },
    }

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
      .contact, .address-detail {
        border-top: none;
      }
      .find-zip-code {
        margin-top: 10px;
        display: flex;
        flex-direction: row;
        align-items: center;
        .zipcode {
          width: 30%;
          border: 1px solid #ccc;
          border-bottom: none;
          background-color: #fff;
          color: #aaa;
          height: 35px;
          cursor: pointer;
        }
        .btn {
          margin-left: 10px;
          width: 70px;
          height: 26px;
          border-radius: 13px;
          font-size: 12px;
          font-weight: 400;
          background-color: #fff;
          border: 1px solid #aaa;
          cursor: pointer;
          transition: .3s all ease;
          &:hover {
            background-color: #000;
            color: #fff;
          }
        }
      }
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