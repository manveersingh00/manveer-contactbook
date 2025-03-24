import { createApp } from 'vue'
import './style.css'
import App from './App.vue';
import { createBootstrap } from 'bootstrap-vue-next';
import router from './router';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const app = createApp(App);
app.use(createBootstrap());
app.use(router);

app.mount('#app');
