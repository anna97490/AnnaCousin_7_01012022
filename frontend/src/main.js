import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCoffee, faComment, faUser, faArrowAltCircleRight, faPaperPlane, faTrash, faTimesCircle, faEdit, faFileUpload, faCheckSquare} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import AOS from 'aos'
import 'aos/dist/aos.css'

// Icones FontAwesome
library.add(
faCoffee, 
faComment, 
faUser, 
faArrowAltCircleRight,
faPaperPlane, 
faTrash, 
faTimesCircle, 
faEdit, 
faFileUpload,
faCheckSquare)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false;

new Vue({
  created() {
    AOS.init();
  },
  router,
  render: (h) => h(App),
}).$mount('#app')
