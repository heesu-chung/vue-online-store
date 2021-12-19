import Vue from 'vue';
import Vuex from 'vuex';

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import db from '../firebase/firebaseInit';

Vue.use(Vuex);

const state = {
  // Shop Posts
  shopPosts: [],
  postLoaded: null,
  totalPrice: null,
  deliPrice: null,
  shopLists: [],
  checkLists: [],
  orderPosts: [],
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
  uid: null,
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
  registerDate: null,
  profileInfo: null,

  profileOrderList: [],

  paymentMethod: null,
  paymentTotalPrice: null,

  // Order
  orderProfileInfo: null,
  orderProfileId: null,
  orderProfileName: null,
  orderProfileContact: null,
  orderProfileAddress: null,
  orderProfileAddressDetail: null,
  orderMemo: null,
  orderLists: [],
  orderTotalPrice: null,
  orderMethod: null,
  orderDate: null,
  deliveryDone: null,
  deliveryDate: null,
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
    state.profileEmail = doc.data().profileEmail;
    state.profileId = doc.data().profileId;
    state.profileShopList = doc.data().profileShopList;
    state.profileWishList = doc.data().profileWishList;
    state.profileGrade = doc.data().profileGrade;
    state.profileMessage = doc.data().profileMessage;
    state.isManager = doc.data().isManager;
    state.profileCoverPhoto = doc.data().profileCoverPhoto;
    state.profilePassword = doc.data().profilePassword;
    state.registerDate = doc.data().registerDate;
    state.profileInfo = doc.data().profileInfo;
    state.profileOrderList = doc.data().profileOrderList;
  },
  filterShopList(state, payload) {
    state.shopPosts = state.shopPosts.filter(
      post => post.productId !== payload,
    );
  },
};

const actions = {
  async getCurrentUser({ commit }) {
    const dataBase = await db
      .collection('users')
      .doc(firebase.auth().currentUser.uid);
    const dbResults = await dataBase.get();
    commit('setProfileInfo', dbResults);
  },
  async getOrders({ state }) {
    const dataBase = await db.collection('orders').orderBy('orderDate', 'desc');
    const dbResults = await dataBase.get();
    dbResults.forEach(doc => {
      if (!state.orderPosts.some(post => post.productId === doc.id)) {
        const data = {
          deliveryDate: doc.data().deliveryDate,
          deliveryDone: doc.data().deliveryDone,
          orderDate: doc.data().orderDate,
          orderProfileInfo: doc.data().orderProfileInfo,
          orderProductInfo: doc.data().orderProductInfo,
        };
        state.orderPosts.push(data);
      }
    });
    state.postLoaded = true;
  },
  async getPost({ state }) {
    const dataBase = await db
      .collection('shopPosts')
      .orderBy('productUpdateDate', 'desc');
    const dbResults = await dataBase.get();
    dbResults.forEach(doc => {
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
  async updateUserShopList() {},
  async updateTotalPrice({ state }) {
    let finalPrice = 0;
    state.profileShopList.forEach((post, index) => {
      if (state.checkLists.indexOf(index) != -1) {
        finalPrice += post.totalProductPrice;
      }
    });
    if (finalPrice < 50000) state.deliPrice = 3000;
    else state.deliPrice = 0;
    state.totalPrice = finalPrice;
  },
  async deleteList({ state, commit }, payload) {
    const dataBase = db
      .collection('users')
      .doc(firebase.auth().currentUser.uid);
    const result = await dataBase.get();

    const updateShopList = state.profileShopList.filter(post => {
      return post.productId !== payload;
    });
    await dataBase.update({
      profileShopList: updateShopList,
    });
    commit(`setProfileInfo`, result);
  },
  async deleteWishList({ state, commit }, payload) {
    const dataBase = db
      .collection('users')
      .doc(firebase.auth().currentUser.uid);
    const result = await dataBase.get();
    const updateWishList = state.profileWishList.filter(post => {
      return post.productId !== payload;
    });
    await dataBase.update({
      profileWishList: updateWishList,
    });
    state.profileWishList = updateWishList;
    commit(`setProfileInfo`, result);
  },
  async removeList({ state, commit }) {
    const dataBase = db
      .collection('users')
      .doc(firebase.auth().currentUser.uid);
    const result = await dataBase.get();
    await dataBase.update({
      profileShopList: state.profileShopList,
    });
    commit(`setProfileInfo`, result);
  },

  async likes({ state, commit, dispatch }, payload) {
    const dataBase = db
      .collection('users')
      .doc(firebase.auth().currentUser.uid);

    let newWishList = state.profileWishList;

    if (payload.userWish) {
      newWishList.push(payload);
    } else if (!payload.userWish) {
      newWishList = state.profileWishList.filter(post => {
        return post.productId !== payload.productId;
      });
    } else {
      return;
    }
    state.profileWishList = newWishList;

    await dataBase.update({
      profileWishList: state.profileWishList,
    });
    const result = await dataBase.get();
    commit(`setProfileInfo`, result);
    dispatch(`getPost`);
  },
};
export default new Vuex.Store({
  state,
  mutations,
  actions,
  modules: {},
});
