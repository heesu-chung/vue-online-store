<template>
  <div class="container-wrap">
    <div class="infos" v-if="this.$store.state.orderPosts">
      <h4 class="title">주문 내역</h4>
      <div class="circle">
        <h5>{{ this.$store.state.orderPosts.length }}</h5>
      </div>
    </div>
    <OrderList :post="post" v-for="(post, idx) in orderLists" :key="idx" />
    <div class="no-list" v-if="!this.$store.state.orderPosts.length">
      주문 내역이 없습니다.
    </div>
  </div>
</template>

<script>
import OrderList from './OrderList.vue';
export default {
  name: 'OrderInquiry',
  components: {
    OrderList,
  },
  data() {
    return {
      arr: [],
      currentLists: [],
    };
  },
  async created() {},
  computed: {
    orderLists() {
      return this.$store.state.orderPosts;
    },
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.container-wrap {
  width: 100%;
  .infos {
    display: flex;
    flex-direction: row;
    align-items: center;

    .title {
      margin-bottom: 10px;
      margin-right: 10px;
    }
    .circle {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background-color: #7ba3c5;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      font-size: 12px;
      margin-top: -8px;
      h5 {
        margin-top: -2px;
      }
    }
  }

  .no-list {
    width: 100%;
    height: 300px;

    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    color: #aaa;
  }
}
</style>
