import { createApp } from 'vue';
import './style.css';
import App from './App.vue'; // 引入根组件 App
import router from './router'; // 引入路由配置

// 引入 Element Plus 组件库和样式
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import zhCn from 'element-plus/es/locale/lang/zh-cn';
import * as ElementPlusIconsVue from '@element-plus/icons-vue'; // 引入icons图标

// 引入Pinia
import pinia from './store';

const app = createApp(App); // 创建 Vue 应用实例，导入根组件 App
app.use(router); // 引入的路由实例，通常在 src/router/index.js 文件中创建并导出
app.use(ElementPlus, {
  locale: zhCn, // 配置 Element Plus 组件库的语言为中文
});
app.use(pinia); // 使用Pinia状态管理

// 引入 Element Plus 全局图标组件
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

app.mount('#app'); // 挂载应用到 DOM 元素，即index.html的id中
