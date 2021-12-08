<template>
  <div class="modal">
      <div class="modal-content">
          <p>{{ this.modalMessage }}</p>
          <div class="btn">
              <button @click="closeModal" class="btn-left">계속쇼핑</button>
            <button @click="shopList" class="btn-right">장바구니</button>
          </div>
      </div>
  </div>
</template>

<script>
export default {
    name: 'ProductModal',
    props: ["modalMessage"],
    methods: {
        closeModal() {
            this.$emit("close-modal");
        },
        shopList() {
            this.$router.push({name: 'ShopCart'});
        }
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

        p {
            text-align: center;
            font-size: 12px;
            padding: 40px 0;
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