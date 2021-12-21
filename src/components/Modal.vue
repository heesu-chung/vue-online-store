<template>
  <div class="modal">
    <div class="modal-content">
      <p>{{ this.modalMessage }}</p>
      <div class="btn">
        <button @click="closeModal" class="btn-center">확인</button>
      </div>
    </div>
  </div>
</template>

<script>
// import "firebase/compat/storage";
import firebase from 'firebase/compat/app';
import db from '../firebase/firebaseInit';
export default {
  name: 'Modal',
  props: ['modalMessage', 'modalResponse', 'deliveryMemo'],
  data() {
    return {
      quantity: 1,
      productId: null,
    };
  },
  async mounted() {},
  methods: {
    closeModal() {
      if (this.modalResponse) {
        this.$emit('close-modal');
        this.order();
        this.$router.push(this.modalResponse);
      }
      this.$emit('close-modal');
    },
    async order() {
      const dataBase = db.collection('orders').doc();
      const timestamp = await Date.now();
      const profileInfo = this.$store.state.profileInfo;
      const shopLists = this.$store.state.profileShopList.filter(
        (post, index) => {
          return this.$store.state.checkLists.indexOf(index) !== -1;
        },
      );

      const orderProfileInfo = {
        orderProfileId: this.$store.state.profileId,
        orderProfileName: this.$store.state.profileName,
        orderProfileContact: profileInfo.profileContact,
        orderProfileAddress: profileInfo.profileAddress,
        orderProfileAddressDetail: profileInfo.profileAddressDetail,
      };
      const orderProductInfo = {
        orderMemo: this.deliveryMemo,
        orderTotalPrice: this.$store.state.totalPrice,
        orderLists: shopLists,
      };

      await dataBase.set({
        orderProfileInfo: orderProfileInfo,
        orderProductInfo: orderProductInfo,
        deliveryDone: null,
        deliveryDate: null,
        orderDate: timestamp,
      });

      const userDataBase = db
        .collection('users')
        .doc(firebase.auth().currentUser.uid);
      const renewOrderList = this.$store.state.profileOrderList;
      const orderInfo = {
        orderProfileInfo,
        orderProductInfo,
      };
      renewOrderList.push(orderInfo);

      await userDataBase.update({
        profileOrderList: renewOrderList,
      });

      this.removeOrderProducts();
    },
    async removeOrderProducts() {
      const removedShopList = this.$store.state.profileShopList.filter(
        (post, index) => {
          return this.$store.state.checkLists.indexOf(index) === -1;
        },
      );
      this.$store.state.profileShopList = removedShopList;
      this.$store.dispatch('removeList');
    },
    async profileOrder() {},
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

    .quantity-change {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      padding-bottom: 20px;
      .btn {
        width: 30px;
        height: 20px;
        margin: 0 20px;
        font-size: 18px;
        background-color: #eee;
        border-radius: 8px;
        border: none;
        cursor: pointer;
        transition: 0.3s all ease;
        display: flex;
        justify-content: center;
        align-items: center;
        &:hover {
          background-color: #999;
        }
      }
    }

    p {
      text-align: center;
      font-size: 12px;
      padding: 20px 0;
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
      .btn-center {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        border-bottom-left-radius: 8px;
        border-bottom-right-radius: 8px;
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
