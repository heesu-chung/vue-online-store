import Vue from 'vue'
import Vuex from 'vuex'

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
  },
  actions: {
  },
  modules: {
  }
})
