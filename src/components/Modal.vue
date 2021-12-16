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
// import firebase from "firebase/compat/app";
// import db from "../firebase/firebaseInit";
export default {
    name: 'Modal',
    props: ["modalMessage", "modalResponse"],
    data() {
        return {
            quantity: 1,
            productId: null,
        };
    },
    async mounted() {
    },
    methods: {
        closeModal() {
            if(this.modalResponse) {
                this.$emit("close-modal");
                this.$store.state.shopLists.filter((post, index) => {
                    return this.$store.state.checkLists.indexOf(index) === -1;
                });
                
                this.$router.push(this.modalResponse);
            }
            this.$emit("close-modal");
        },
    },
}
</script>

<style lang="scss" scoped>
*{
    //border: 1px solid black;
}
.modal {
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 101;
    position: absolute;
    width: 100%;
    height: 100%;
    top:0;
    left: 0;
    background-color: rgba(0,0,0,0.7);

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
                transition: .3s all ease;
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
        .btn{
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
            .btn-center{
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
                transition: .3s all ease;
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