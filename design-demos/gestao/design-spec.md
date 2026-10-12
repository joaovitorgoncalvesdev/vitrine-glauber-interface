# Especificação visual — Gestão Vitrine Glauber

## Produto e propósito

A nova superfície é uma área administrativa separada da vitrine pública do Centro Cultural Glauber Rocha. Sua função é permitir que uma equipe central de gestão alimente e mantenha a vitrine: cadastrar e revisar boxes, produtos, categorias, contatos, horários e conteúdos institucionais; acompanhar pendências; publicar alterações; e identificar rapidamente cadastros incompletos. Não existe, nesta etapa, autonomia individual para cada expositor. A gestão é a responsável editorial pelo sistema e precisa trabalhar com segurança, consistência e pouca ambiguidade.

O back-end ainda será desenvolvido. Portanto, os protótipos devem demonstrar a experiência completa de login, navegação e manutenção de conteúdo sem prometer autenticação real, persistência de dados ou integração com banco. O login é visual e interativo apenas para validar fluxo e linguagem. A implementação definitiva deve deixar pontos de integração claros para a API futura, sem concentrar esforço nessa camada agora.

## Público e situações de uso

O público principal é a equipe administrativa do Centro Cultural, possivelmente com diferentes níveis de familiaridade digital. O uso ocorrerá em computadores de mesa, notebooks, tablets e celulares. Em desktop, a interface deve favorecer visão geral, comparação e edição eficiente. Em celular, deve permitir resolver tarefas rápidas — revisar uma pendência, localizar um box, alterar disponibilidade, salvar rascunho e publicar — sem simplesmente comprimir uma tabela de desktop. Alvos de toque devem ter no mínimo 44 px, navegação deve continuar evidente, formulários devem usar uma coluna e ações críticas precisam permanecer próximas do contexto.

## Conteúdo e módulos obrigatórios

- Login administrativo com e-mail, senha, exibição/ocultação da senha, recuperação de acesso e aviso claro de ambiente restrito.
- Visão geral com tarefas pendentes, rascunhos, itens publicados e alertas de conteúdo incompleto.
- Gestão de boxes: busca, filtros por categoria e status, criação, edição, visualização pública e ativação/desativação.
- Gestão de produtos: vínculo obrigatório a um box, categoria, descrição, fotos, disponibilidade e status editorial.
- Fluxo de publicação: rascunho, em revisão e publicado; datas e autoria das últimas alterações.
- Ações rápidas coerentes: adicionar produto, cadastrar box, continuar rascunho e revisar pendências.
- Estados de interface: carregamento, vazio, sucesso, erro, confirmação e aviso antes de ações destrutivas.
- Acesso rápido às funções de acessibilidade e saída segura da sessão.

## Identidade e tom

Todas as direções usam os ativos oficiais existentes, sem redesenhar a marca: logo horizontal colorida e branca, ícone e favicon localizados em `public/brand`. A paleta parte do azul `#2455C7`, amarelo `#FFD449`, rosa `#E84D93` e azul-marinho `#182643`, apoiada por neutros claros. A fonte local Liberation Sans mantém continuidade com a vitrine. O tom deve ser humano, público, confiável e eficiente. A área administrativa pode ser mais silenciosa que a vitrine, mas não deve parecer um painel SaaS genérico nem perder a energia cultural da marca.

## Formato e dimensões

Cada direção será entregue como um HTML navegável responsivo, comparável em viewport desktop de 1440 × 900 px e mobile de 390 × 844 px. Todas devem conter ao menos dois estados interativos no mesmo arquivo: painel principal e login. A prévia começa no painel para facilitar a comparação; o botão “Sair” abre a tela de login e o formulário retorna ao painel. O conteúdo é demonstrativo e deve ser claramente apresentado como tal.

## Restrições e acessibilidade

Não inventar números que pareçam métricas institucionais reais; quantidades são identificadas como dados demonstrativos. Não usar fotos novas nesta etapa. Não usar gradientes decorativos, ícones em emoji, excesso de cartões ou efeitos visuais sem função. Preservar contraste AA, foco visível, semântica, leitura por teclado, mensagens textuais além da cor e suporte a `prefers-reduced-motion`. A navegação mobile deve ser desenhada como experiência própria, não como sidebar espremida.

## Hipóteses de direção

O motivo visual comum é a geometria do ícone da Vitrine: blocos que organizam informação, conectando a diversidade de boxes a uma gestão central. A primeira direção interpreta isso como uma central de operações com navegação lateral e prioridades claras. A segunda transforma o trabalho em uma fila editorial, dando destaque ao movimento entre rascunho, revisão e publicação. A terceira organiza tudo por contexto — box primeiro, produtos e pendências ao redor — favorecendo equipes que pensam o catálogo por expositor. As três preservam a mesma marca e o mesmo escopo; o que muda é o modelo mental da operação.
