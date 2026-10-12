<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useQuasar } from 'quasar'
import { useCatalogStore } from '../stores/catalog'

const route = useRoute()
const $q = useQuasar()
const catalog = useCatalogStore()
const query = ref('')
const section = computed(() => route.meta.managementSection)
const title = computed(() => ({ boxes: 'Boxes', produtos: 'Produtos', revisoes: 'Revisões' })[section.value])
const description = computed(() => ({ boxes: 'Cadastre e mantenha as informações dos expositores.', produtos: 'Gerencie os itens apresentados na vitrine pública.', revisoes: 'Acompanhe rascunhos, pendências e publicações.' })[section.value])
const items = computed(() => {
  if (section.value === 'boxes') return catalog.boxes.map((item, i) => ({ id: item.id, title: item.name, subtitle: `${item.number} · ${item.categoryLabel}`, image: item.image, status: i === 1 ? 'Incompleto' : 'Publicado' }))
  if (section.value === 'produtos') return catalog.products.map((item, i) => ({ id: item.id, title: item.name, subtitle: catalog.boxes.find((box) => box.id === item.boxId)?.name || 'Box', image: item.image, status: i % 4 === 1 ? 'Em revisão' : 'Publicado' }))
  return [
    { id: 1, title: 'Barro da Serra', subtitle: 'Box · atualização de descrição', status: 'Em revisão' },
    { id: 2, title: 'Casa de Dona Nena', subtitle: 'Box · contato incompleto', status: 'Incompleto' },
    { id: 3, title: 'Cesta de palha trançada', subtitle: 'Produto · pronto para publicar', status: 'Pronto' },
  ]
})
const visibleItems = computed(() => items.value.filter((item) => `${item.title} ${item.subtitle}`.toLowerCase().includes(query.value.toLowerCase())))
onMounted(() => catalog.loadCatalog())
function demo(action, item) { $q.notify({ type: 'positive', message: `${action}: ${item.title} (demonstração).`, position: 'top' }) }
</script>

<template>
  <q-page class="management-page management-workspace-page">
    <header class="management-page-head management-workspace-head"><div><span class="management-kicker">Catálogo da vitrine</span><h1>{{ title }}</h1><p>{{ description }}</p></div><div class="management-workspace-actions"><q-btn color="primary" unelevated no-caps icon="add" :label="`Novo ${section === 'produtos' ? 'produto' : section === 'boxes' ? 'box' : 'item'}`" @click="demo('Novo cadastro', { title })" /></div></header>
    <section class="management-panel management-list-panel"><div class="management-list-toolbar"><q-input v-model="query" outlined dense clearable :placeholder="`Buscar em ${title.toLowerCase()}`"><template #prepend><q-icon name="search" /></template></q-input><q-btn outline no-caps icon="filter_list" label="Filtros" /></div><TransitionGroup v-if="visibleItems.length" name="management-list" tag="div" class="management-catalog-list"><article v-for="item in visibleItems" :key="item.id" class="management-catalog-row"><img v-if="item.image" :src="item.image" alt="" /><span v-else class="management-row-icon"><q-icon name="fact_check" /></span><div><h2>{{ item.title }}</h2><p>{{ item.subtitle }}</p></div><span class="management-status" :class="item.status === 'Publicado' || item.status === 'Pronto' ? 'status-ready' : item.status === 'Em revisão' ? 'status-review' : 'status-draft'"><i></i>{{ item.status }}</span><q-btn outline no-caps color="primary" :label="section === 'revisoes' ? 'Revisar' : 'Editar'" @click="demo(section === 'revisoes' ? 'Revisar' : 'Editar', item)" /></article></TransitionGroup><div v-else class="management-empty"><q-icon name="search_off" /><h2>Nenhum resultado</h2><p>Tente buscar por outro nome.</p></div></section>
  </q-page>
</template>
