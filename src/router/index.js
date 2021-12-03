import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Shop from '../views/Shop.vue';
import About from '../views/About.vue';
import Contact from '../views/Contact.vue';
import Product from '../views/Product.vue';
import ShopCart from '../views/ShopCart.vue';
import ShopPayment from '../views/ShopPayment.vue';
import MyPage from '../views/MyPage.vue';
Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
    },
    {
        path: "/shop",
        name: "Shop",
        component: Shop,
    },
    {
        path: "/about",
        name: "About",
        component: About,
    },
    {
        path: "/contact",
        name: "Contact",
        component: Contact,
    },
    {
        path: "/product",
        name: "Product",
        component: Product,
    },
    {
        path: "/shop-cart",
        name: "ShopCart",
        component: ShopCart,
    },
    {
        path: "/shop-payment",
        name: "ShopPayment",
        component: ShopPayment,
    },
    {
        path: "/shop-mypage",
        name: "My Page",
        component: MyPage,
    },
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});

export default router;