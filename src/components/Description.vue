<template>
  <div class="container">
    <div class="content">
      <div
        class="post-content"
        v-if="currentPost[0]"
        v-html="this.currentPost[0].productHTML"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Description',
  data() {
    return {
      currentPost: [{}],
    };
  },
  async mounted() {
    this.currentPost = this.$store.state.shopPosts.filter(post => {
      return post.productId === this.$route.params.productId;
    });
    //console.log(this.$store.state.shopLists);
  },
};
</script>

<style lang="scss" scoped>
* {
}
.container {
  margin-top: 30px;
  width: 100%;
  border-top: 1px solid #ccc;
  padding-top: 80px;
}
</style>
