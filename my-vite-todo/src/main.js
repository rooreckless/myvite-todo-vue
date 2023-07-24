import { createApp } from 'vue'
// import './style.css'
import './assets/css/destyle.css'
import App from './App.vue'

// createApp(App).mount('#app')
//↓の2行に変更します。
import router from "./router"; 
createApp(App).use(router).mount("#app"); 
