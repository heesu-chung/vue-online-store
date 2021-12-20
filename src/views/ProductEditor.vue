<template>
  <div class="container">
    <h2 class="editor-title">제품 포스팅</h2>
    <div class="product-infos">
      <input type="text" placeholder="제품명(string)" v-model="productName" />
      <div class="upload-product-photo">
        <label for="product-photo" class="product-photo">제품 사진 : </label>
        <input
          type="file"
          ref="productPhoto"
          id="product-photo"
          @change="fileChange"
          name=""
          accept=".jpg, .png, .jpeg, .gif"
        />
        <button
          @click="openPreview"
          class="preview-photo"
          :class="{ 'button-inactive': !this.$store.state.productPhotoURL }"
        >
          미리보기
        </button>
      </div>
      <span class="file-name"
        >File-Chosen : {{ this.$store.state.productPhotoName }}</span
      >
      <div class="product-info">
        <input
          type="text"
          class="product-price"
          placeholder="제품 가격(number)"
          v-model="productPrice"
        />
        <input
          type="text"
          class="product-remain"
          placeholder="제품 수량(number)"
          v-model="productRemainQuantity"
        />
      </div>
    </div>

    <div class="editor">
      <vue-editor
        :editorOptions="editorSettings"
        v-model="productHTML"
        useCustomImageHandler
        @image-added="imageHandler"
      />
    </div>
    <div class="error-msg">
      <span>Error : {{ errorMsg }}</span>
    </div>
    <div class="post-uploads">
      <button @click="uploadProduct">등록하기</button>
      <button @click="preview">미리보기</button>
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
  name: 'ProductEditor',
  data() {
    return {
      file: null,
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
  components: {},
  methods: {
    openPreview() {
      this.$store.commit('openPhotoPreview');
    },
    fileChange() {
      this.file = this.$refs.productPhoto.files[0];
      const fileName = this.file.name;
      console.log('fileChange exec : ' + this.file.name);

      console.log(this.$store.state.productPhotoName);
      this.$store.commit('fileNameChange', fileName);
      this.$store.commit('createFileURL', URL.createObjectURL(this.file));
    },
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

    uploadProduct() {
      if (this.productName.length !== 0) {
        if (this.file) {
          const storageRef = firebase.storage().ref();
          const docRef = storageRef.child(
            `documents/ProductPhotos/${this.$store.state.productPhotoName}`,
          );
          docRef.put(this.file).on(
            'state_changed',
            snapshot => {
              console.log(snapshot);
            },
            err => {
              console.log(err);
            },
            async () => {
              const downloadURL = await docRef.getDownloadURL();
              const timestamp = await Date.now();
              const dataBase = await db.collection('shopPosts').doc();
              await dataBase.set({
                productId: dataBase.id,
                productName: this.productName,
                productPrice: parseInt(this.productPrice),
                productRemainQuantity: parseInt(this.productRemainQuantity),
                productWishes: 0,
                productDeliveryPrice: 0,
                productPhoto: downloadURL,
                productPhotoName: this.productPhotoName,
                productUpdateDate: timestamp,
                productHTML: this.productHTML,
                productInquiry: [],
              });
              console.log('this.productPhotoName : ' + this.productPhotoName);
              await this.$store.dispatch('getPost');
              this.$router.push({ name: 'Home' });
            },
          );
          return;
        }
        this.error = true;
        this.errorMsg = 'Please ensure you uploaded a cover photo!';
        setTimeout(() => {
          this.error = false;
        }, 5000);
        return;
      }
      this.error = true;
      this.errorMsg = 'Please ensure Blog Title & Blog Post has been filled!';
      setTimeout(() => {
        this.error = false;
      }, 5000);
      return;
    },
    preview() {},
  },
  computed: {
    productPhotoName() {
      return this.$store.state.productPhotoName;
    },
    productName: {
      get() {
        return this.$store.state.productName;
      },
      set(payload) {
        this.$store.commit('updateProductName', payload);
      },
    },
    productPrice: {
      get() {
        return this.$store.state.productPrice;
      },
      set(payload) {
        this.$store.commit('updateProductPrice', payload);
      },
    },
    productRemainQuantity: {
      get() {
        return this.$store.state.productRemainQuantity;
      },
      set(payload) {
        this.$store.commit('updateRemainQuantity', payload);
      },
    },
    productHTML: {
      get() {
        return this.$store.state.productHTML;
      },
      set(payload) {
        this.$store.commit('newProductPost', payload);
      },
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

.container {
  padding: 50px 0;
  .editor-title {
    width: 100%;
    text-align: center;
    margin-bottom: 30px;
    font-size: 24px;
    font-weight: 700;
  }
  .product-infos {
    .upload-product-photo {
      display: flex;
      flex-direction: row;
      align-items: center;

      label {
        width: 8%;
      }
      input {
        border: none;
        display: flex;
        align-items: center;
        padding-top: 8px;
      }
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
    button {
      margin: 0 3px;
      width: 200px;
      height: 40px;
      background-color: #fff;
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
  }
}
</style>
