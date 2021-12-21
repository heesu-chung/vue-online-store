<template>
  <footer>
      <div class="container">
          <div class="content">
              <div class="texts">
                  <h5>DeDeDef</h5>
                <h5>상호명 (주)데데뎁랩 | 대표: 정희수</h5>
                <h5>사업자 등록번호: 000-00000-000</h5>
                <h5>대표번호: 000-00000-000</h5>
                <h5>통신판매업신고번호: 2021-SSSS-1128</h5>
                <h5>주소: 경기도 용인시</h5>
                <h5>Open 24/7</h5>
              </div>
              
              <div class="copyright">
                  Copyright ⓒ 2021 LAB | DeDeDef All rights reserved.
              </div>
          </div>
          <div class="nav-links">
              <ul class="links">
                <router-link class="link" :to="{name: 'Shop', params: { page: shopPage }}">SHOP</router-link>
                <router-link class="link" :to="{name: 'About'}">ABOUT</router-link>
                <router-link class="link" :to="{name: 'ArtWork'}">ART WORK</router-link>
                <router-link class="link" :to="{name: 'Contact'}">CONTACT</router-link>
              </ul>
          </div>
          <div class="terms">
              <router-link class="term" :to="{name: 'SiteJoinAgreement'}">이용약관</router-link>
              <router-link class="term" :to="{name: 'SiteJoinAgreement'}" >개인정보처리방침</router-link>
          </div>
          <div class="icons">
              <a class="icon" href=https://www.instagram.com/dededef_lab/>
              <icon-base iconName="Instagram" iconColor="#fff"><instagram /></icon-base>
              </a>
              
          </div>
      </div>
  </footer>
  
</template>

<script>
export default {
    name: 'Footer',
    components: {
    },
    data() {
        return {
            shopPage: 1,
            modalMessage: '',
            modalActive: false,
        }
    },
    methods: {
        
    }
}
</script>

<style lang="scss" scoped>
*{
    font-family: Helvetica;
}
footer{
    z-index: 99;
    position: relative;
    width: 100%;
    height: 250px;
    background-color: #000;
    color: #fff;
    font-size: 12px;
    font-family: Arial, Helvetica, sans-serif;
    font-weight: 200;
    .container{
        width: 1200px;
        margin: 0 auto;
        padding-top: 30px;
        display: flex;
        
        .content{
            
            flex: 3;
            .texts{
                h5{
                    font-family: Arial;
                    font-size: 12px;
                    font-weight: 100;
                    padding: 2px 0;
                }
                border-bottom: 1px solid #aaa;
                padding-bottom: 15px;
                margin-bottom: 15px;
            }
            
            .copyright {

            }
        }
        .nav-links{
            flex: 1;
            .links{
                
            display: flex;
            flex-direction: column;
                .link{
                    display: block;
                    margin-bottom: 10px;
                    text-decoration: none;
                    color: #fff;
                    cursor: pointer;
                    font-family: Helvetica;
                }
            }
        }
        .terms{
            flex: 1;
            display: flex;
            flex-direction: column;
            .term{
                margin-bottom: 10px;
                text-decoration: none;
                color: #fff;
                cursor: pointer;
            }
        }
        .icons{
            flex: 1;
            .icon{
                text-decoration: none;
                color: #fff;
            }
        }
    }
}
</style>