<template>
  <div class="page">
      <h5 class="page-selected" v-if="isPage">{{this.page}}</h5>
      <h5 class="page-none" v-else @click="goToPage">{{this.page}}</h5>
  </div>
</template>

<script>

export default {
    name: 'Page',
    props: ["page", "value", "currentPage"],
    data() {
        return {
        }
    },
    async mounted() {
    },
    computed: {
        isPage() {
            if(this.$route.params.page === this.page){
                return true;
            }
            return false;
        },
    },
    methods: {
        goToPage() {
            this.$route.params.page = this.page;
            this.$router.push({name: 'Shop'});
        },
    }
}
</script>

<style lang="scss" scoped>
.page {
    .page-selected{
        color: #000;
        cursor: pointer;
    }
    .page-none{
        cursor: pointer;
        border: none;
        
        color: #aaa;
        text-decoration: none;
    }
}
</style>