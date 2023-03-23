import { createApp } from 'vue';

import App from './App.vue';

import './assets/style.scss';

import router from './router';

import {store} from './index';

const app = createApp(App);

app.use(router);
app.use(store);

app.mount('#app');
