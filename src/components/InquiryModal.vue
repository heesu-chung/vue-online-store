<template>
  <div>
    <div class="screen">
      <div class="modal">
        <div class="modal-info">
          <div class="modal-profile">
            <div class="img">
              <img src="" alt="" />
            </div>
            <div class="modal-profile-info">
              <h3 class="title">{{ this.post.inquiryTitle }}</h3>
              <div class="profile-row">
                <h5 class="name">{{ this.post.inquiryName }}</h5>
                <h5 class="date">
                  {{
                    new Date(this.post.inquiryDate).toLocaleString(
                      'en-us',
                      (option = { hour12: null }),
                    )
                  }}
                </h5>
              </div>
            </div>
          </div>
          <button class="btn" @click="closeModal">
            <div class="cross-x"></div>
            <div class="cross-y"></div>
          </button>
        </div>

        <div class="contents">
          <h5 class="content" v-html="this.post.inquiryHTML"></h5>
          <div class="messages-info">
            <icon-base icon-name="SpeechBubble" iconColor="#7ba3c5"
              ><speech-bubble
            /></icon-base>
            <h5 class="message-num">{{ this.post.inquiryMessage.length }}</h5>
          </div>
        </div>

        <div class="messages">
          <ul>
            <li class="message" v-for="(post, idx) in messages" :key="idx">
              <img class="ripple-img" src="" alt="" />
              <div class="ripple-infos">
                <div class="ripple-info">
                  <h5 class="name">{{ messages[idx].profileName }}</h5>
                  <h5 class="date">
                    {{
                      new Date(messages[idx].date).toLocaleString(
                        'ko-kr',
                        (options = {
                          year: 'numeric',
                          month: 'numeric',
                          day: 'numeric',
                          hour: 'numeric',
                          minute: 'numeric',
                          hour12: false,
                        }),
                      )
                    }}
                  </h5>
                </div>
                <h5 class="message-content">{{ messages[idx].message }}</h5>
              </div>
            </li>
          </ul>
        </div>

        <div class="add-message">
          <textarea
            name=""
            id=""
            cols="30"
            rows="10"
            class="editor"
            v-model="addInquiryMessage"
            placeholder="댓글"
            max-length="300"
            resize="none"
          ></textarea>
          <button class="btn" @click="uploadPost">작성</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import 'firebase/compat/storage';
import firebase from 'firebase/compat/app';
import db from '../firebase/firebaseInit';
export default {
  name: 'InquiryModal',
  props: ['post', 'idx'],
  data() {
    return {
      editorSettings: {
        modules: {
          imageResize: {},
        },
      },
      addInquiryMessage: '',
    };
  },
  async mounted() {},
  computed: {
    messages() {
      return this.post.inquiryMessage;
    },
  },
  methods: {
    closeModal() {
      this.$emit('close-modal');
    },
    async uploadPost() {
      const timestamp = Date.now();
      const inquiryId = this.post.inquiryId;
      const dataBase = db.collection('inquiry').doc(inquiryId);
      const userDB = db
        .collection('users')
        .doc(firebase.auth().currentUser.uid);
      let productDB;
      if (this.$route.params.productId) {
        productDB = db
          .collection('shopPosts')
          .doc(this.$route.params.productId);
      }
      console.log(timestamp, dataBase, userDB, productDB);

      let updateInquiry;
      let index;

      if (this.post.inquiryType === 'profile')
        updateInquiry = this.$store.state.profileInquiry;
      else updateInquiry = this.$store.state.productInquiry;

      updateInquiry.forEach((post, idx) => {
        if (post.inquiryId === inquiryId) {
          index = idx;
          return;
        }
      });

      updateInquiry[index].inquiryMessage.push({
        profileId: this.$store.state.profileId,
        profileName: this.$store.state.profileName,
        profileCoverPhoto: this.$store.state.profileCoverPhoto,
        date: timestamp,
        response: false,
        message: this.addInquiryMessage,
      });
      if (this.post.inquiryType === 'profile') {
        await userDB.update({
          profileInquiry: updateInquiry,
        });
      } else {
        await productDB.update({
          productInquiry: updateInquiry,
        });
      }
      await dataBase.update({
        inquiryMessage: updateInquiry[index].inquiryMessage,
      });

      this.$store.dispatch('getCurrentUser');
      this.$store.dispatch('getPost');
      this.$emit('close-modal');
    },
  },
};
</script>

<style lang="scss" scoped>
* {
}
.screen {
  z-index: 1000;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  position: fixed;
  left: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  .modal::-webkit-scrollbar {
    width: 5px;
    background-color: #ccc;
    opacity: 50%;
  }
  .modal::-webkit-scrollbar-thumb {
    width: 4px;
    background-color: #666;
  }
  .modal {
    border-radius: 5px;
    z-index: 1001;
    position: absolute;
    width: 50%;
    height: 600px;
    overflow-y: scroll;
    background-color: white;
    position: absolute;

    .modal-info {
      width: 100%;
      padding: 20px 20px;
      border-bottom: 1px solid #ccc;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      font-size: 12px;

      .modal-profile {
        display: flex;
        flex-direction: row;
        .img {
          width: 40px;
          height: 40px;
          border: 1px solid #ccc;
          border-radius: 50%;
          margin-right: 10px;
        }
        .modal-profile-info {
          display: flex;
          flex-direction: column;
          .title {
            font-size: 15px;
          }
          .profile-row {
            display: flex;
            flex-direction: row;
            font-size: 14px;
            color: #aaa;

            .name {
              margin-right: 10px;
              font-weight: 400;
            }
            .date {
              font-weight: 400;
            }
          }
        }
      }
      .btn {
        width: 30px;
        height: 30px;
        background-color: #fff;
        cursor: pointer;
        border: none;
        .cross-x {
          width: 30px;
          border-top: 1px solid black;
          transform: rotate(-45deg);
        }
        .cross-y {
          width: 30px;
          border-top: 1px solid black;
          transform: rotate(45deg);
        }
      }
    }

    .contents {
      padding: 20px 20px;
      .content {
        padding-bottom: 40px;
        font-weight: 400;
        font-size: 14px;
      }
      .messages-info {
        display: flex;
        flex-direction: row;
        .message-num {
          margin-left: 5px;
          font-size: 12px;
          font-weight: 400;
        }
      }
    }

    .messages {
      ul {
        .message {
          padding: 20px 20px;
          display: flex;
          flex-direction: row;
          font-size: 12px;
          border-top: 1px solid #ccc;
          align-items: center;
          .ripple-img {
            width: 35px;
            height: 35px;
            border-radius: 50%;
            border: 1px solid #ccc;
            margin-right: 15px;
          }
          .ripple-infos {
            display: flex;
            flex-direction: column;
            .ripple-info {
              display: flex;
              flex-direction: row;
              .name {
                font-weight: 400;
              }
              .date {
                margin-left: 10px;
                font-weight: 400;
                color: #aaa;
              }
              margin-bottom: 8px;
            }
            .message-content {
              font-size: 13px;
              font-weight: 400;
            }
          }
        }
      }
    }

    .add-message {
      display: flex;
      flex-direction: column;
      margin-bottom: 30px;
      .editor {
        width: 95%;
        margin: 0 auto;
        border: 1px solid #ccc;
        border-radius: 5px;
        padding: 10px 10px;
        font-weight: 700;

        &:focus {
          border: 1px solid #aaa;
          outline: none !important;
        }
        resize: none;
        overflow-y: hidden;
      }
      justify-content: center;
      align-items: center;
      .btn {
        //position: absolute;
        margin-top: 20px;
        display: flex;
        width: 10%;
        height: 30px;
        background-color: #fff;
        border: 1px solid #ccc;
        justify-content: center;
        align-items: center;
        font-weight: 700;
        letter-spacing: 1px;
        font-size: 12px;
        cursor: pointer;
        transition: 0.3s all ease;
        &:hover {
          background-color: #000;
          color: #fff;
        }
      }
    }
  }
}
</style>
