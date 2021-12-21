<template>
  <div class="container-all">
    <div class="product-infos">
      <h5 class="product-name">1:1 문의</h5>
    </div>
    <div class="product-info">
      <input
        type="text"
        class="title"
        placeholder="제목"
        v-model="inquiryTitle"
      />
    </div>

    <div class="editor">
      <vue-editor
        :editorOptions="editorSettings"
        v-model="inquiryHTML"
        useCustomImageHandler
        @image-added="imageHandler"
        placeholder="내용을 입력해주세요."
      />
    </div>
    <div class="post-uploads">
      <button class="btn" @click="uploadPost">
        등록하기
      </button>
      <!-- <button class="btn-none" v-else>등록하기</button> -->
      <router-link class="btn" :to="{ name: 'Shop', params: { page: 1 } }"
        >취소하기</router-link
      >
    </div>
  </div>
</template>

<script>
import Quill from 'quill';
import 'firebase/compat/storage';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import db from '../firebase/firebaseInit';

window.Quill = Quill;
const ImageResize = require('quill-image-resize-module').default;
Quill.register('modules/imageResize', ImageResize);

export default {
  name: 'ProductOneOnOneInquiry',
  props: ['productNameInquiry'],
  data() {
    return {
      inquiryTitle: null,
      inquiryHTML: null,
      inquiryDate: null,
      inquiryId: null,
      inquiryName: null,
      error: null,
      errorMsg: null,
      loading: null,
      editorSettings: {
        modules: {
          imageResize: {},
        },
      },
    };
  },
  async mounted() {
    this.inquiryId = this.$store.state.profileId;
    this.inquiryName = this.$store.state.profileName;
  },
  components: {},
  methods: {
    imageHandler(file, Editor, cursorLocation, resetUploader) {
      const storageRef = firebase.storage().ref();
      const docRef = storageRef.child(
        `documents/productPostPhotos/${file.name}`,
      );
      docRef.put(file).on(
        'state_changed',
        snapshot => {
          console.log(snapshot);
        },
        err => {
          console.log(err);
        },
        async () => {
          const downloadURL = await docRef.getDownloadURL();
          Editor.insertEmbed(cursorLocation, 'image', downloadURL);
          resetUploader();
        },
      );
    },
    async uploadPost() {
      if (this.inquiryTitle.length !== 0) {
        const timestamp = await Date.now();
        const dataBase = await db.collection('inquiry').doc();

        const userDB = await db
          .collection('users')
          .doc(firebase.auth().currentUser.uid);

        const InquiryDataSet = {
          inquiryTitle: this.inquiryTitle,
          inquiryProfileId: this.inquiryId,
          inquiryDate: timestamp,
          inquiryHTML: this.inquiryHTML,
          inquiryType: 'profile',
          getResponse: false,
          inquiryName: this.inquiryName,
          inquiryMessage: [],
          inquiryId: dataBase.id,
        };

        let newInquiry = [];
        newInquiry = this.$store.state.productInquiry;
        newInquiry.push(InquiryDataSet);

        await userDB.update({
          profileInquiry: newInquiry,
        });

        await dataBase.set({
          inquiryTitle: this.inquiryTitle,
          inquiryProfileId: this.inquiryId,
          inquiryDate: timestamp,
          inquiryHTML: this.inquiryHTML,
          inquiryType: 'profile',
          getResponse: false,
          inquiryName: this.inquiryName,
          inquiryMessage: [],
          inquiryId: dataBase.id,
        });
        if (this.$store.state.user) {
          await this.$store.dispatch('getCurrentUser');
        }
        this.$router.push({ name: 'Qna' });
        return;
      }
      alert('오류 발생');
      setTimeout(() => {
        this.error = false;
      }, 5000);
      return;
    },
  },
};
</script>

<style lang="scss" scoped>
* {
  font-family: 'Noto Sans KR', sans-serif;
  font-weight: 400;
}

input {
  width: 100%;
  height: 40px;
  padding-left: 10px;
  margin: 5px 0;
  border: 1px solid #ccc;
}

.container-all {
  width: 1000px;
  margin: 50px auto;

  .editor-title {
    width: 100%;
    text-align: center;
    margin-bottom: 30px;
    font-size: 24px;
    font-weight: 400;
  }
  .product-info {
    input {
      border: none;
      border-bottom: 1px solid #aaa;
    }
  }
  .product-infos {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    .title {
      border: none;
      border-bottom: 1px solid #aaa;
    }
    img {
      margin-left: 10px;
      width: 30px;
      height: 30px;
    }
    .upload-product-photo {
      display: flex;
      flex-direction: row;
      align-items: center;
      button {
        justify-content: right;
        width: 100px;
        background-color: #fff;
        font-size: 14px;
        letter-spacing: 1px;
        border: 1px solid #ccc;
        cursor: pointer;
        transition: 0.3s all ease;
        &:hover {
          background: #000;
          color: #fff;
        }
        &:focus {
          border: 1px solid #ccc;
        }
      }
    }
  }

  .editor {
    margin-top: 5px;
  }
  .post-uploads {
    width: 100%;
    display: flex;
    margin: 50px 0;
    justify-content: center;
    .btn {
      margin: 0 3px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 14px;
      color: #000;
      width: 200px;
      height: 40px;
      background-color: #fff;
      text-decoration: none;
      border: 1px solid #aaa;
      cursor: pointer;
      transition: 0.3s all ease;
      &:hover {
        background-color: #000;
        color: #fff;
      }
      &:active {
        border: none;
      }
    }
    .btn-none {
      margin: 0 3px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 14px;
      color: #ccc;
      width: 200px;
      height: 40px;
      background-color: #aaa;
      text-decoration: none;
      border: 1px solid #aaa;
      transition: 0.3s all ease;

      &:active {
        border: none;
      }
    }
  }
}
</style>
