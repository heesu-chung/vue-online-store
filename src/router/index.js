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
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import SiteJoinAgreement from '../views/SiteJoinAgreement.vue';
import OrderDone from '../views/OrderDone.vue';
import ProductEditor from '../views/ProductEditor.vue'; 

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
    },
    {
        path: "/shop/:page",
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
        path: "/product/:productId",
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
        name: "MyPage",
        component: MyPage,
    },
    {
        path: "/login",
        name: "Login",
        component: Login,
    },
    {
        path: "/register",
        name: "Register",
        component: Register,
    },
    {
        path: "/site_join_agreement",
        name: "SiteJoinAgreement",
        component: SiteJoinAgreement,
    },
    {
        path: "/order-done",
        name: "OrderDone",
        component: OrderDone,
    },
    {
        path: "/product-editor",
        name: "ProductEditor",
        component: ProductEditor,
    },
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
    scrollBehavior() {
        //document.getElementById('app').scrollIntoView();
        window.scrollTo(0,0);
    },
});


export default router;