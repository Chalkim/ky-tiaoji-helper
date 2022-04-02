import { createApp } from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import router from './router';
import store from './store';

import App from './App.vue';

const app = createApp(App);
app.config.productionTip = false;

app.use(store)
  .use(router)
  .use(VueAxios, axios)
  .use(Antd)
  .mount('#app');
