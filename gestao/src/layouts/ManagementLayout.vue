<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useQuasar } from 'quasar'

const route = useRoute()
const router = useRouter()
const $q = useQuasar()
const drawerOpen = ref(false)
const publicSiteUrl = import.meta.env.VITE_PUBLIC_SITE_URL || 'http://127.0.0.1:4174/'
const isDark = computed(() => $q.dark.isActive)
const nav = [
  { label: 'Visão geral', icon: 'space_dashboard', to: '/gestao/painel' },
  { label: 'Boxes', icon: 'storefront', to: '/gestao/boxes' },
  { label: 'Produtos', icon: 'shopping_bag', to: '/gestao/produtos' },
  { label: 'Revisões', icon: 'fact_check', to: '/gestao/revisoes' },
]
const title = computed(() => nav.find((item) => route.path === item.to)?.label || 'Gestão')
onMounted(() => {
  const saved = localStorage.getItem('vg-management-theme')
  if (saved) $q.dark.set(saved === 'dark')
})
function toggleTheme() {
  $q.dark.toggle()
  localStorage.setItem('vg-management-theme', $q.dark.isActive ? 'dark' : 'light')
}
function closeDrawerOnMobile() {
  if ($q.screen.width < 768) drawerOpen.value = false
}
function logout() {
  sessionStorage.removeItem('vg-management-demo')
  router.push('/gestao/login')
}
</script>

<template>
  <q-layout view="hHh Lpr fFf" class="management-shell">
    <a href="#management-content" class="skip-link">Pular para o conteúdo</a>
    <q-header class="management-header">
      <q-toolbar class="management-toolbar">
        <q-btn class="lt-md" flat round icon="menu" aria-label="Abrir menu" @click="drawerOpen = true" />
        <div class="management-mobile-title"><span>Área de gestão</span><strong>{{ title }}</strong></div>
        <q-space />
        <q-btn flat round :icon="isDark ? 'light_mode' : 'dark_mode'" :aria-label="isDark ? 'Ativar tema claro' : 'Ativar tema escuro'" @click="toggleTheme" />
        <q-btn class="management-profile" flat no-caps>
          <q-avatar color="accent" text-color="secondary" size="38px">GM</q-avatar>
          <span class="gt-xs"><strong>Gestão Municipal</strong><small>Administrador</small></span>
          <q-menu><q-list style="min-width:210px"><q-item><q-item-section><q-item-label>Gestão Municipal</q-item-label><q-item-label caption>Acesso demonstrativo</q-item-label></q-item-section></q-item><q-separator /><q-item clickable @click="logout"><q-item-section avatar><q-icon name="logout" /></q-item-section><q-item-section>Sair da gestão</q-item-section></q-item></q-list></q-menu>
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="drawerOpen" show-if-above :breakpoint="768" :width="224" class="management-drawer">
      <div class="management-brand">
        <router-link to="/gestao/painel"><img src="/brand/logo-vitrine-glauber.svg" alt="Vitrine Glauber" /></router-link>
        <span>Gestão</span>
      </div>
      <q-list class="management-nav" aria-label="Navegação da gestão">
        <q-item v-for="item in nav" :key="item.to" clickable :to="item.to" exact active-class="management-nav-active" @click="closeDrawerOnMobile">
          <q-item-section avatar><q-icon :name="item.icon" /></q-item-section><q-item-section>{{ item.label }}</q-item-section>
        </q-item>
      </q-list>
      <div class="management-drawer-foot">
        <q-btn flat no-caps icon="open_in_new" label="Ver vitrine pública" :href="publicSiteUrl" />
        <small>Interface demonstrativa</small>
      </div>
    </q-drawer>

    <q-page-container id="management-content" tabindex="-1"><router-view v-slot="{ Component, route: viewRoute }"><transition name="management-route" mode="out-in"><component :is="Component" :key="viewRoute.fullPath" /></transition></router-view></q-page-container>

    <nav class="management-bottom-nav" aria-label="Navegação da gestão para celular">
      <router-link v-for="item in nav" :key="item.to" :to="item.to" :aria-current="route.path === item.to ? 'page' : undefined"><q-icon :name="item.icon" /><span>{{ item.label.replace('Visão geral', 'Início') }}</span></router-link>
    </nav>
  </q-layout>
</template>
