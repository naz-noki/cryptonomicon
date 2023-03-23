import { createRouter, createWebHashHistory } from "vue-router";

import homePage from './components/homePage.vue'

export default createRouter ({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            component: homePage
        },
    ]
})