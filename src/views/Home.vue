<template>
  <div class="container-wrap">
    <router-link
      class="landing"
      :to="{ name: 'Shop', params: { page: shopPage } }"
    >
      <img src="" alt="" />
    </router-link>
    <router-link
      class="landing"
      :to="{ name: 'Shop', params: { page: shopPage } }"
    >
      <img src="" alt="" />
    </router-link>
    <router-link
      class="landing"
      :to="{ name: 'Shop', params: { page: shopPage } }"
    >
      <img src="" alt="" />
    </router-link>
    <router-link
      class="landing"
      :to="{ name: 'Shop', params: { page: shopPage } }"
    >
      <img src="" alt="" />
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      shopPage: 1,
    };
  },
  components: {},
  async created() {
    await this.$store.dispatch('getPost');
    await this.$store.dispatch('getCurrentUser');
  },
};
</script>

<style lang="scss" scoped>
* {
}
.container-wrap {
  position: relative;
  width: 100%;
  img {
    width: 100%;
    height: 100vh;
    margin-bottom: 30px;
    background-color: #aaa;
  }
}</style
>>
