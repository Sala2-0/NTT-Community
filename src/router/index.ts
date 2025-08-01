import { createRouter, createWebHistory } from "vue-router";
import Home from "../components/pages/Home.vue";
import Members from "../components/pages/Members.vue";
import Tools from "../components/pages/Tools.vue";
import PopularShips from "../components/pages/PopularShips.vue";

const routes = [
    { path: '/', component: Home },
    { path: '/members', name: "Members", component: Members },
    { path: '/popular-ships', name: "Popular Ships", component: PopularShips },
    { path: "/tools", name: "Tools", component: Tools },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;