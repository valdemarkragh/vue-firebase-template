import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../pages/home/Home.vue";
import Login from "../pages/login/Login.vue";

import { useAuthStore } from "../stores/authStore";

const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        name: "Home",
        component: Home,
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: "/login",
        name: "Login",
        component: Login,
    },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

router.beforeEach((to, from, next) => {
    const authStore = useAuthStore();

    if (to.path === "/login" && authStore.user) {
        next("/");
    }

    if (
        to.matched.some((record) => record.meta.requiresAuth) &&
        !authStore.user
    ) {
        next("/login");
        return;
    }

    next();
});

export default router;
