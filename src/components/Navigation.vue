<template>
  <div>
    <header>
      <nav class="container">
        <div class="left-element">
          <router-link class="logo" :to="{ name: 'Home' }">
            <div class="link-top">DeDeDef</div>
            <div class="link-bottom">COMMERCE</div>
          </router-link>
          <div class="nav-links">
            <ul v-show="!mobile">
              <router-link
                class="link"
                :to="{ name: 'Shop', params: { page: 1 } }"
                >SHOP</router-link
              >
              <router-link class="link" :to="{ name: 'About' }"
                >ABOUT</router-link
              >
              <router-link class="link" :to="{ name: 'ArtWork' }"
                >ART WORK</router-link
              >
              <router-link class="link" :to="{ name: 'Contact' }"
                >CONTACT</router-link
              >
            </ul>
          </div>
        </div>

        <div class="right-element">
          <div class="auth" v-if="user">
            <router-link
              class="login"
              @click="clickProfileName"
              :to="{ name: 'MyPage', params: { page: 'order-Inquiry' } }"
              >{{ this.$store.state.profileName }}</router-link
            >
            <div @click="signout" class="register">Logout</div>
          </div>
          <div class="auth" v-if="!user">
            <router-link class="login" :to="{ name: 'Login' }"
              >Login</router-link
            >
            <router-link class="register" :to="{ name: 'SiteJoinAgreement' }"
              >Register</router-link
            >
          </div>
          <div class="menu">
            <router-link
              :to="{ name: 'ShopCart' }"
              class="shop-list"
              v-if="user"
            >
              <icon-base
                icon-name="shopping"
                iconColor="#7ba3c5"
                width="20"
                height="20"
                viewBox="0 0 25 25"
                ><shopping
              /></icon-base>
              <div class="list-quantity">
                <h5>{{ this.$store.state.profileShopList.length }}</h5>
              </div>
            </router-link>

            <router-link :to="{ name: 'Login' }" class="shop-list" v-if="!user">
              <icon-base
                icon-name="shopping"
                iconColor="#ccc"
                width="20"
                height="20"
                viewBox="0 0 25 25"
                ><shopping
              /></icon-base>
            </router-link>

            <div class="search">Find</div>
          </div>
        </div>
      </nav>
      <div class="mobile-links">
        <ul v-show="mobile">
          <router-link
            class="link"
            :to="{ name: 'Shop', params: { page: shopPage } }"
            >SHOP</router-link
          >
          <router-link class="link" :to="{ name: 'About' }">ABOUT</router-link>
          <router-link class="link" :to="{ name: 'Contact' }"
            >CONTACT</router-link
          >
        </ul>
      </div>
    </header>
    <div class="space"></div>
  </div>
</template>

<script>
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import IconBase from './IconBase.vue';
export default {
  components: { IconBase },
  name: 'Navigation',

  data() {
    return {
      mobile: null,
      username: null,
      shopPage: 1,
      shopCartQuantity: null,
    };
  },
  mounted() {},
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
  methods: {
    signout() {
      firebase.auth().signOut();

      this.$store.dispatch('getPost');
      this.$store.dispatch('getCurrentUser');
      this.$router.go(0);
      window.location.reload;
    },
    clickProfileName() {
      // router-link can't use methods or @click
      console.log(`you click profileName`);
    },
  },
};
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;700&display=swap');

* {
  font-family: 'Open Sans', sans-serif;
}
.space {
  width: 100%;
  height: 65px;
}
header {
  position: fixed;
  z-index: 99;
  padding: 5px 0;
  width: 100%;
  display: flex;
  border-bottom: 1px solid #aaa;
  background-color: #fff;
  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    .left-element {
      flex: 2;
      display: flex;
      flex-direction: row;
      .logo {
        font-size: 40px;
        font-weight: 900;
        display: flex;
        flex-direction: column;
        text-decoration: none;
        cursor: pointer;
        align-items: center;
        justify-content: center;
        .link-top {
          color: #000;
          transition: 0.5s ease all;
          font-size: 30px;
          letter-spacing: -4px;
          transition: 0.3s all ease;
          &:hover {
            color: #888;
          }
          //font-stretch: extra-expanded;
        }
        .link-bottom {
          color: #888;
          font-size: 14px;
          margin-top: -10px;
          letter-spacing: 3.5px;
          margin-left: 9px;
        }
        &:hover {
          color: #aaa;
        }
      }
      .nav-links {
        //padding-left: 30px;
        ul {
          padding: 15px 15px;
          padding-left: 40px;
          .link {
            padding: 0 20px;
            font-family: 'Open Sans', sans-serif;
            text-decoration: none;
            color: #000;
            font-size: 12px;
            font-weight: 700;
          }
        }
      }
    }
    .right-element {
      flex: 1;
      display: flex;
      flex-direction: row;
      justify-content: right;
      font-size: 12px;
      padding: 15px 0;
      font-weight: 400;

      .auth {
        display: flex;
        flex-direction: row;
        align-items: center;
        .user {
          text-decoration: none;
          color: #aaa;
          transition: 0.3s ease all;
          &:hover {
            color: #000;
          }
        }
        h5 {
          padding: 0 10px;
          font-size: 12px;
          font-weight: 400;
        }

        .login {
          padding-right: 20px;
          color: #000;
          text-decoration: none;
          font-weight: 700;
        }
        .register {
          border-right: 1px solid #666;
          padding-right: 20px;
          text-decoration: none;
          color: #000;
          cursor: pointer;
        }
      }
      .menu {
        display: flex;
        flex-direction: row;
        align-items: center;
        .shop-list {
          padding: 0 10px;
          padding-left: 20px;
          color: #000;
          text-decoration: none;
          //border: 1px solid black;
          display: flex;
          justify-content: center;
          align-items: center;
          icon-base {
            width: 50px;
          }
          .list-quantity {
            position: absolute;
            top: 30px;
            transform: translateX(5px);
            background-color: #666;
            border: 2px solid white;
            width: 18px;
            height: 18px;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            opacity: 40%;
            transition: 0.3s all ease;
            h5 {
              font-size: 11px;
              color: #fff;
            }
            &:hover {
              opacity: 100%;
            }
          }
        }
        .search {
          padding: 0 10px;
        }
      }
    }
    .mobile-links {
      .mob-link {
      }
    }
  }
}
</style>
