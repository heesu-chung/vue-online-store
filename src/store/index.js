import Vue from 'vue'
import Vuex from 'vuex'

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import db from "../firebase/firebaseInit";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    sampleProducts: [
      {productName: 'DISTRESS Incense Chamber', productPrice: 20000, productRemainQuantity: 1 , productId: '1'},
      {productName: 'Jackson Arttoy', productPrice: 30000, productRemainQuantity: 1, productId: '2'},
      {productName: 'Scott Gold ver. Arttoy', productPrice: 40000, productRemainQuantity: 0, productId: '3'},
      {productName: 'DISTRESS Incense Chamber', productPrice: 50000, productRemainQuantity: 0, productId: '4'},
      {productName: 'DISTRESS Incense Chamber', productPrice: 60000, productRemainQuantity: 1, productId: '5'},
      {productName: 'DISTRESS Incense Chamber', productPrice: 20000, productRemainQuantity: 1 , productId: '6'},
      {productName: 'Jackson Arttoy', productPrice: 30000, productRemainQuantity: 1, productId: '7'},
      {productName: 'Scott Gold ver. Arttoy', productPrice: 40000, productRemainQuantity: 0, productId: '8'},
      {productName: 'DISTRESS Incense Chamber', productPrice: 50000, productRemainQuantity: 0, productId: '9'},
      {productName: 'DISTRESS Incense Chamber', productPrice: 60000, productRemainQuantity: 1, productId: '10'},
    ],

    // Shop Posts
    shopPosts: [],
    postLoaded: null,

    // Product Info
    user: null,
    
    productName: null,
    productId: null,
    productPrice: null,
    productRemainQuantity: null,
    productWishes: null,
    productDeliveryPrice: null,
    productPhoto: null,
    productPhotoName: null,
    productPhotoURL: null,

    productUpdateDate: null,
    productHTML: null,

    // User - auth
    profileEmail: null,
    profileName: null,
    profileUsername: null,
    profileId: null,
    profileInitials: null,
    profileShopList: [],
    profileWishList: [],
    profileCoverPhoto: null,
    profileGrade: null,
    isManager: null,
    profileMessage: [],
  },
  mutations: {
    updateUser(state,payload) {
      state.user = payload;
    },
    openPhotoPreview(state) {
      state.productPhotoPreview = !state.productPhotoPreview;
    },
    fileNameChange(state, payload) {
      state.productPhotoName = payload;
    },
    createFileURL(state, payload) {
      state.productPhotoFileURL = payload;
    },

    // ProductEditor mutations
    newProductPost(state, payload) {
      state.productHTML = payload;
    },
    updateRemainQuantity(state, payload) {
      state.productRemainQuantity = payload;
    },
    updateProductPrice(state, payload) {
      state.productPrice = payload;
    },
    updateProductName(state, payload) {
      state.productName = payload;
    },
  },
  actions: {
    async getCurrentUser({commit}) {
      const dataBase = await db.collection('users').doc(firebase.auth().currentUser.uid);
      const dbResults = await dataBase.get();
      commit("setProfileInfo", dbResults);
      commit("setProfileInitials");
      console.log(dbResults);
    },
    async getPost({ state }) {
      const dataBase = await db.collection('shopPosts').orderBy('productUpdateDate', 'desc');
      const dbResults = await dataBase.get();
      dbResults.forEach((doc) => {
        if (!state.shopPosts.some(post => post.productId === doc.id)) {
          const data = {
            productId: doc.data().productId,
            productName: doc.data().productName,
            productPrice: doc.data().productPrice,
            productRemainQuantity: doc.data().productRemainQuantity,
            productWishes: doc.data().productWishes,
            productDeliveryPrice: doc.data().productDeliveryPrice,
            productPhoto: doc.data().productPhoto,
            productPhotoName: doc.data().productPhotoName,
            productUpdateDate: doc.data().productUpdateDate,
            productHTML: doc.data().productHTML,
          };  
          state.shopPosts.push(data);
        }
      });
      state.postLoaded = true;
    },
  },
  modules: {
  },
})
