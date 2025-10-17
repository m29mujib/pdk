import { createApp } from 'vue';
import App from './App.vue';
import { router } from './router';
import vuetify from './plugins/vuetify';
import '@/scss/style.scss';
import PerfectScrollbar from 'vue3-perfect-scrollbar';
// import VueApexCharts from 'vue3-apexcharts';
import VueTablerIcons from 'vue-tabler-icons';
import '../src/assets/main.css'

import Antd from 'ant-design-vue'
import "ant-design-vue/dist/reset.css";
const app = createApp(App);
app.use(router);
app.use(PerfectScrollbar);
app.use(VueTablerIcons);
app.use(Antd);
// app.use(VueApexCharts);
app.use(vuetify).mount('#app');
