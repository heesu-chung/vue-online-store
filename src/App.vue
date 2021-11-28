<template>
  <div>
    <Navigation class="navigation"/>
    <router-view />
    <Footer />
  </div>
</template>

<script>
import Navigation from './components/Navigation.vue';
import Footer from './components/Footer.vue';

export default {
  name: "app",
  components: {
    Navigation,
    Footer
  },
  data() {
    return {};
  },
  created() {},
  mounted() {},
  methods: {},
  watch: {},
};
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;700&display=swap');
@import url("https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap");
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;700&display=swap');
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Quicksand", sans-serif;
}

.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
.navigation {
  z-index: 99;
}
.container {
}

.link {
}

.link-light {
  color: #fff;
}
</style>
