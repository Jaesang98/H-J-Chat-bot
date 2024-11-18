import { createApp } from 'vue'
import App from './App.vue'
import router from './router/routerIndex';

// loading overlay 
import { LoadingPlugin } from 'vue-loading-overlay';

createApp(App).use(router).use(LoadingPlugin).mount('#app')