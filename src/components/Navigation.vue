<template>
 <div>
  <header>
      <nav class="container">
          <div class="left-element">
            <div class="logo">
                <router-link class="link" :to="{name: 'Home'}">DeDeDef</router-link>
            </div>
            <div class="nav-links">
                <ul v-show="!mobile">
                    <router-link class="link" :to="{name: 'Shop'}">SHOP</router-link>
                    <router-link class="link" :to="{name: 'About'}">ABOUT</router-link>
                    <router-link class="link" :to="{name: 'Contact'}">ART WORK</router-link>
                    <router-link class="link" :to="{name: 'Contact'}">CONTACT</router-link>
                </ul>
            </div>
          </div>

            <div class="right-element">
                <div class="auth" v-if="user">
                    <router-link  class="login" @click="clickProfileName" :to="{name: 'MyPage'} " >{{ this.$store.state.profileName }}</router-link>
                    <div  @click="signout" class="register" >Logout</div>
                </div>
                <div class="auth" v-if="!user">
                    <router-link class="login" :to="{name: 'Login'}">Login</router-link>
                    <div class="register" >Register</div>
                </div>
                <div class="menu">
                    <router-link :to="{name: 'ShopCart'}" class="shop-list">Shop Cart</router-link>
                    <div class="search">Find</div>
                </div>
            </div>
          
      </nav>
      <div class="mobile-links">
              <ul v-show="mobile">
                    <router-link class="link" :to="{name: 'Shop'}">SHOP</router-link>
                  <router-link class="link" :to="{name: 'About'}">ABOUT</router-link>
                  <router-link class="link" :to="{name: 'Contact'}">CONTACT</router-link>
              </ul>
          </div>
  </header>
    <div class="space"></div>
  </div>
</template>

<script>
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
export default {
    name: 'Navigation',

    data() {
        return {
            mobile: null,
            username: null,
        }
    },
    computed: {
        user() {
            return this.$store.state.user;
        }
    },
    methods: {
        signout() {
            console.log("sign out");
            firebase.auth().signOut();
            //this.$store.state.user = false;
            window.location.reload;
        },
        clickProfileName() { // router-link can't use methods or @click
            console.log(`you click profileName`);
        }
    }
}
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;700&display=swap');

*{
  font-family: 'Open Sans', sans-serif;
}
.space{
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
        .left-element{
            flex:2;
            display: flex;
            flex-direction: row;
            .logo{
                
                font-size: 40px;
                font-weight: 900;
                letter-spacing: -5px;
                .link {
                    text-decoration: none;
                    color: #000;
                    transition: .5s ease all;
                    &:hover {
                        color: #aaa;
                    }
                }
            }
            .nav-links{
                //padding-left: 30px;
                ul {
                    padding: 15px 15px;
                    
                    .link{
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
            flex:1;
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
                    transition: .3s ease all;
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
                    color: #000;
                    text-decoration: none;
                }
                .search {
                    padding: 0 10px;
                }
            }
    }    
    .mobile-links{
            .mob-link{

            }
        }
}
}
</style>