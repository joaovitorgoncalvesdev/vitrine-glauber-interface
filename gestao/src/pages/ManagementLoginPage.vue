<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const publicSiteUrl = import.meta.env.VITE_PUBLIC_SITE_URL || 'http://127.0.0.1:4174/'
const email = ref('')
const password = ref('')
const showPassword = ref(false)
const keepAccess = ref(false)
const loading = ref(false)

function login() {
  loading.value = true
  window.setTimeout(() => {
    sessionStorage.setItem('vg-management-demo', 'active')
    router.push('/gestao/painel')
  }, 450)
}
</script>

<template>
  <q-layout view="hhh lpr fff"><q-page-container><q-page class="management-login-page">
    <a href="#management-login" class="skip-link">Pular para o formulário</a>
    <div class="management-login-frame">
      <section class="management-login-panel">
        <form id="management-login" class="management-login-form" @submit.prevent="login">
          <a :href="publicSiteUrl" class="management-login-wordmark"><img src="/brand/logo-vitrine-glauber.svg" alt="Vitrine Glauber" /></a>
          <span class="management-environment"><i></i> Acesso administrativo</span>
          <h1 id="login-message">Entre na gestão</h1>
          <p>Use suas credenciais administrativas.</p>
          <q-input v-model="email" outlined type="email" label="E-mail" autocomplete="username" lazy-rules hide-bottom-space :rules="[(value) => Boolean(value) || 'Informe o e-mail']" />
          <q-input v-model="password" outlined :type="showPassword ? 'text' : 'password'" label="Senha" autocomplete="current-password" lazy-rules hide-bottom-space :rules="[(value) => Boolean(value) || 'Informe a senha']"><template #append><q-btn flat round :icon="showPassword ? 'visibility_off' : 'visibility'" :aria-label="showPassword ? 'Ocultar senha' : 'Mostrar senha'" @click="showPassword = !showPassword" /></template></q-input>
          <div class="management-login-options"><q-checkbox v-model="keepAccess" label="Manter conectado" /><q-btn flat no-caps color="primary" label="Esqueci minha senha" type="button" /></div>
          <q-btn class="management-login-submit" color="primary" unelevated no-caps type="submit" label="Entrar na gestão" :loading="loading" />
          <p class="management-demo-note"><q-icon name="info" /> Acesso demonstrativo. A autenticação segura será conectada ao futuro back-end.</p>
          <a :href="publicSiteUrl" class="management-public-link"><q-icon name="arrow_back" /> Voltar para a vitrine pública</a>
        </form>
      </section>
      <section class="management-login-art" aria-label="Identidade visual animada da Vitrine Glauber">
        <div class="management-art-grid" aria-hidden="true"></div>
        <div class="management-art-dots dots-blue" aria-hidden="true"></div>
        <div class="management-art-dots dots-pink" aria-hidden="true"></div>
        <div class="management-art-dots dots-yellow" aria-hidden="true"></div>
        <div class="management-art-orbit orbit-one" aria-hidden="true"></div>
        <div class="management-art-orbit orbit-two" aria-hidden="true"></div>
        <img class="management-art-mark" src="/brand/icone-vitrine.svg" alt="" aria-hidden="true" />
        <div class="management-art-copy"><span>Gestão Vitrine Glauber</span><h2>A cultura local em movimento.</h2><p>Uma gestão central para manter cada história visível.</p></div>
        <small>Centro Cultural Glauber Rocha · Vitória da Conquista</small>
      </section>
    </div>
  </q-page></q-page-container></q-layout>
</template>
