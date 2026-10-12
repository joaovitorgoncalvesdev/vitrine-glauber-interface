<script setup>
import { computed, onMounted, ref } from 'vue'
import { useQuasar } from 'quasar'
import { useCatalogStore } from '../stores/catalog'

const $q = useQuasar()
const catalog = useCatalogStore()
const publicSiteUrl = import.meta.env.VITE_PUBLIC_SITE_URL || 'http://127.0.0.1:4174/'
const createOpen = ref(false)
const createType = ref('Box')
const itemName = ref('')
const activeWorkflow = ref('Todos')
const workflow = [
  { type: 'Box', name: 'Barro da Serra', detail: 'Descrição e duas fotos atualizadas', time: 'há 18 min', status: 'Em revisão', tone: 'review', action: 'Revisar' },
  { type: 'Box', name: 'Casa de Dona Nena', detail: 'Falta informar WhatsApp e horário', time: 'hoje', status: 'Incompleto', tone: 'draft', action: 'Completar' },
  { type: 'Produto', name: 'Cesta de palha trançada', detail: 'Conteúdo revisado e pronto', time: 'há 2 h', status: 'Pronto', tone: 'ready', action: 'Publicar' },
  { type: 'Conteúdo', name: 'Horários de visitação', detail: 'Alteração institucional aguardando aprovação', time: 'ontem', status: 'Em revisão', tone: 'review', action: 'Revisar' },
]
const boxCount = computed(() => catalog.boxes.length)
const productCount = computed(() => catalog.products.length)
const workflowFilters = ['Todos', 'Rascunhos', 'Em revisão', 'Prontos']
const filteredWorkflow = computed(() => {
  if (activeWorkflow.value === 'Todos') return workflow
  if (activeWorkflow.value === 'Rascunhos') return workflow.filter((item) => item.tone === 'draft')
  if (activeWorkflow.value === 'Em revisão') return workflow.filter((item) => item.tone === 'review')
  return workflow.filter((item) => item.tone === 'ready')
})
function filterCount(label) {
  if (label === 'Todos') return workflow.length
  if (label === 'Rascunhos') return workflow.filter((item) => item.tone === 'draft').length
  if (label === 'Em revisão') return workflow.filter((item) => item.tone === 'review').length
  return workflow.filter((item) => item.tone === 'ready').length
}

onMounted(() => catalog.loadCatalog())

function openCreate(type) { createType.value = type; itemName.value = ''; createOpen.value = true }
function saveDraft() {
  createOpen.value = false
  $q.notify({ type: 'positive', message: `${createType.value} salvo como rascunho na demonstração.`, position: 'top' })
}
function perform(item) { $q.notify({ type: 'positive', message: `${item.name}: ação “${item.action}” demonstrada.`, position: 'top' }) }
</script>

<template>
  <q-page class="management-page">
    <header class="management-page-head management-dashboard-head">
      <div><span class="management-kicker">Central de gestão</span><h1>Bom dia, equipe.</h1><p>Prioridades e publicações da Vitrine Glauber em um só lugar.</p></div>
      <div class="management-head-aside"><div class="management-head-actions"><q-btn outline color="primary" no-caps icon="visibility" label="Ver vitrine" :href="publicSiteUrl" /><q-btn color="primary" unelevated no-caps icon="add" label="Novo cadastro" @click="openCreate('Box')" /></div></div>
    </header>

    <section class="management-metrics" aria-label="Resumo demonstrativo">
      <article><span>Boxes cadastrados</span><strong>{{ boxCount || '—' }}</strong><small>Conteúdo demonstrativo</small></article>
      <article><span>Produtos cadastrados</span><strong>{{ productCount || '—' }}</strong><small>Conteúdo demonstrativo</small></article>
      <article class="metric-attention"><span>Em revisão</span><strong>07</strong><small>Precisam da equipe</small></article>
      <article><span>Prontos para publicar</span><strong>04</strong><small>Revisados hoje</small></article>
    </section>

    <section class="management-work-grid">
      <div class="management-panel workflow-panel">
        <header class="management-panel-head"><div><span class="management-kicker">Fluxo editorial</span><h2>Prioridades de hoje</h2></div><q-btn flat no-caps color="primary" label="Ver todas" to="/gestao/revisoes" /></header>
        <div class="management-workflow-filters" aria-label="Filtros da fila"><button v-for="filter in workflowFilters" :key="filter" :class="{ active: activeWorkflow === filter }" :aria-pressed="activeWorkflow === filter" @click="activeWorkflow = filter">{{ filter }} <b>{{ filterCount(filter) }}</b></button></div>
        <TransitionGroup name="management-list" tag="div" class="management-task-list">
          <article v-for="(item, index) in filteredWorkflow" :key="item.name" class="management-task">
            <span class="management-task-index">{{ String(index + 1).padStart(2, '0') }}</span>
            <div class="management-task-copy"><small>{{ item.type }} · {{ item.time }}</small><h3>{{ item.name }}</h3><p>{{ item.detail }}</p></div>
            <span class="management-status" :class="`status-${item.tone}`"><i></i>{{ item.status }}</span>
            <q-btn flat no-caps color="primary" :label="item.action" @click="perform(item)" />
          </article>
        </TransitionGroup>
      </div>

      <aside class="management-side-column">
        <section class="management-panel management-quality"><header class="management-panel-head"><div><span class="management-kicker">Qualidade</span><h2>Catálogo completo</h2></div><strong>78%</strong></header><div class="quality-item"><span><b>Boxes completos</b><small>18 de 24</small></span><q-linear-progress :value=".75" color="primary" track-color="grey-3" rounded size="7px" /></div><div class="quality-item"><span><b>Produtos com foto</b><small>72 de 86</small></span><q-linear-progress :value=".84" color="secondary" track-color="grey-3" rounded size="7px" /></div><div class="quality-item"><span><b>Contatos revisados</b><small>16 de 24</small></span><q-linear-progress :value=".67" color="accent" track-color="grey-3" rounded size="7px" /></div></section>
        <section class="management-panel management-quick"><header class="management-panel-head"><div><span class="management-kicker">Atalhos</span><h2>Ações rápidas</h2></div></header><div><button @click="openCreate('Box')"><q-icon name="add_business" /><span><b>Novo box</b><small>Cadastrar expositor</small></span></button><button @click="openCreate('Produto')"><q-icon name="add_shopping_cart" /><span><b>Novo produto</b><small>Vincular a um box</small></span></button></div></section>
      </aside>
    </section>

    <q-dialog v-model="createOpen"><q-card class="management-create-dialog"><q-card-section class="management-dialog-head"><div><span class="management-kicker">Novo cadastro</span><h2>{{ createType }}</h2></div><q-btn flat round icon="close" aria-label="Fechar" v-close-popup /></q-card-section><q-card-section><q-banner rounded class="management-demo-banner"><q-icon name="info" /> Este formulário demonstra a experiência visual. O salvamento real será conectado ao back-end.</q-banner><q-option-group v-model="createType" :options="[{label:'Box',value:'Box'},{label:'Produto',value:'Produto'}]" inline color="primary" /><q-input v-model="itemName" outlined :label="`Nome do ${createType.toLowerCase()}`" class="q-mt-md" /><q-select outlined label="Status inicial" model-value="Rascunho" :options="['Rascunho']" class="q-mt-md" /></q-card-section><q-card-actions align="right"><q-btn flat no-caps label="Cancelar" v-close-popup /><q-btn color="primary" unelevated no-caps label="Salvar rascunho" :disable="!itemName" @click="saveDraft" /></q-card-actions></q-card></q-dialog>
  </q-page>
</template>
