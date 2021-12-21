<template>
  <div>
    <Navigation class="navigation" />
    <router-view class="router-view" />
    <Footer />
  </div>
</template>

<script>
import Navigation from './components/Navigation.vue';
import Footer from './components/Footer.vue';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
export default {
  name: 'app',
  components: {
    Navigation,
    Footer,
  },
  data() {
    return {};
  },
  async created() {
    // console.log(`App created start`);
    firebase.auth().onAuthStateChanged(user => {
      this.$store.commit('updateUser', user);
      if (user) {
        this.$store.dispatch('getCurrentUser');
      }
    });
    // console.log(`App -> getPost`);
    this.$store.dispatch('getPost');
    // console.log(`App created done`);
  },
  async mounted() {
    // console.log(`App mounted`);
  },
  methods: {},
  watch: {},
};
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;700&display=swap');
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.container-wrap {
  width: 100%;
}
.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
.navigation {
  z-index: 99;
}
.router-view {
  width: 1200px;
  margin: 0 auto;
}
.intros {
  display: flex;
  flex-direction: column;
  width: 1200px;
  margin: 0 auto;

  .title {
    font-size: 24px;
    padding: 50px 0;
    //border-bottom: 1px solid black;
    h1 {
      text-align: center;
    }
  }
  .website {
    display: flex;
    flex-direction: row;
    padding: 30px 0;
    border-top: 1px solid black;
    h1 {
      flex: 1;
      font-size: 3rem;
      font-weight: 300;
    }
    h4 {
      flex: 1;
      font-weight: 100;
    }
  }
  .intro {
    display: flex;
    flex-direction: row;
    padding: 30px 0;
    border-top: 1px solid black;
    .intro-en {
      flex: 1;
      h2 {
      }
    }
    .intro-ko {
      flex: 1;
      h2 {
        font-size: 16px;
      }
    }
  }
}
.link-light {
  color: #fff;
}
input[type='checkbox'] {
  zoom: 1.25;
}
</style>
