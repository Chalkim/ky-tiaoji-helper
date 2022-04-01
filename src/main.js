import { createApp } from 'vue';
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import axios from 'axios';
import VueAxios from 'vue-axios';
import App from './App.vue';
import router from './router';
import store from './store';

const app = createApp(App);
app.config.productionTip = false;

app.use(store)
  .use(router)
  .use(VueAxios, axios)
  .use(Antd)
  .mount('#app');
