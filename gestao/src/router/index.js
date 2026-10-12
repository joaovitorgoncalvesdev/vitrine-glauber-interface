import { createRouter, createWebHistory } from 'vue-router'
import ManagementLayout from '../layouts/ManagementLayout.vue'
import ManagementLoginPage from '../pages/ManagementLoginPage.vue'
import ManagementDashboardPage from '../pages/ManagementDashboardPage.vue'
import ManagementWorkspacePage from '../pages/ManagementWorkspacePage.vue'

export default createRouter({
  history: createWebHistory(),
  scrollBehavior() {
    return { top: 0 }
  },
  routes: [
    { path: '/', redirect: '/gestao/login' },
    { path: '/gestao', redirect: '/gestao/login' },
    { path: '/gestao/login', component: ManagementLoginPage },
    {
      path: '/gestao',
      component: ManagementLayout,
      children: [
        { path: 'painel', component: ManagementDashboardPage },
        { path: 'boxes', component: ManagementWorkspacePage, meta: { managementSection: 'boxes' } },
        { path: 'produtos', component: ManagementWorkspacePage, meta: { managementSection: 'produtos' } },
        { path: 'revisoes', component: ManagementWorkspacePage, meta: { managementSection: 'revisoes' } },
      ],
    },
    { path: '/:pathMatch(.*)*', redirect: '/gestao/login' },
  ],
})
