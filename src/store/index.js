import Vue from 'vue'
import Vuex from 'vuex'

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import db from "../firebase/firebaseInit";

Vue.use(Vuex)

const state = {
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
  profilePassword: null,
  profileUsername: null,
  profileId: null,
  profileInitials: null,
  profileShopList: [],
  profileWishList: [],
  profileCoverPhoto: null,
  profileGrade: null,
  isManager: null,
  profileMessage: [],
};

const mutations = {
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

  updateUser(state, payload) {
    state.user = payload;
  },
  setProfileInfo(state, doc) {
    state.profileName = doc.data().profileName;
    state.profileEmail = doc.data().email;
    state.profileId = doc.data().profileId;
    state.profileShopList = doc.data().profileShopList;
    state.profileWishList = doc.data().profileWishList;
    state.profileGrade = doc.data().profileGrade;
    state.profileMessage = doc.data().profileMessage;
    state.isManager = doc.data().isManager;
    state.profileCoverPhoto = doc.data().profileCoverPhoto;
    state.profilePassword = doc.data().profilePassword;
  },
}

const actions = {
  async getCurrentUser({commit}) {
    const dataBase = await db.collection('users').doc(firebase.auth().currentUser.uid);
    const dbResults = await dataBase.get();
    commit("setProfileInfo", dbResults);
    //commit("setProfileInitials");
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
  async updateUserShopList() {
    
  },
}
export default new Vuex.Store({
  state,
  mutations,
  actions,
  modules: {
  },
})
