import 'bootstrap/dist/css/bootstrap.min.css'
import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import App from './App.vue'
import TypesAnalysis from './components/analysis/TypesAnalysis.vue'
import DiscountTypeAnalysis from './components/analysis/DiscountTypeAnalysis.vue'
import RetailersAnalysis from './components/analysis/RetailersAnalysis.vue'
import RelevantKeywords from './components/RelevantKeywords.vue'

import './assets/main.css'

const Home = { template: '<div>Home</div>' }

const routes = [
  { path: '/', component: Home, name: 'Choose Analysis ⇧' },
  { path: '/types-analysis', component: TypesAnalysis, name: 'Types' },
  {
    path: '/discount-type-analysis',
    component: DiscountTypeAnalysis,
    name: 'Discount Types'
  },
  {
    path: '/retailers-analysis',
    component: RetailersAnalysis,
    name: 'Retailers'
  },
  {
    path: '/relevant-keywords',
    component: RelevantKeywords,
    name: 'Relevant Keywords'
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes // short for `routes: routes`
})

const app = createApp(App)
app.use(router)

app.mount('#app')
