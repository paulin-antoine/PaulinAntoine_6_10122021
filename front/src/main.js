import { createApp } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import App from './App.vue'

library.add(fas);

import router from './router';
createApp(App)
.component('fa', FontAwesomeIcon)
.use(router)
.mount('#app')
