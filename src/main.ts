import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';
import { permit } from '@/router/permit';
import '@/styles/index.scss';

const app = createApp(App);

app.use(createPinia());
app.use(router);
permit();

// app.mount('#app');
router.isReady().then(() => {
    app.mount("#app");
});