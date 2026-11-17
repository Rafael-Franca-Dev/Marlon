/**
 * ============================================================================
 * 👤 PARTE DO MENINO MAL (REQUISITO 1) E DO RAFAEL (REQUISITO 6 - PONTO EXTRA)
 * ARQUIVO: src/app/app.routes.ts (Rotas das 4 Páginas do Aplicativo)
 * ============================================================================
 * 🎯 O QUE O MENINO MAL DEVE EXPLICAR PARA O PROFESSOR:
 *
 * 1️⃣ PERGUNTA 1: O QUE O REQUISITO FAZ NO SEU PROJETO?
 *    "Professor, eu fiquei com o Requisito 1, que pede no mínimo 3 páginas além
 *    da Home (totalizando 4 páginas) e toda a estilização visual da loja.
 *    Nossa loja tem 4 páginas completas em Angular Standalone:
 *    1. `home` (Vitrine com Destaques da Semana, Escolha sua Linha e Carrossel)
 *    2. `catalogo` (Lista de roupas masculinas e femininas)
 *    3. `detalhes/:id` (Visualização detalhada da roupa escolhida)
 *    4. `sacola` (Sacola de compras para fechar o pedido)"
 *
 * 2️⃣ PERGUNTA 2: ONDE ESTÁ NO CÓDIGO?
 *    - Aqui em `src/app/app.routes.ts` (linhas 33 a 62), onde cada rota carrega
 *      sua página com `loadComponent`.
 *    - E nas pastas das 4 páginas: `src/app/home/` e `src/app/pages/` (`catalogo`,
 *      `detalhes`, `sacola`), estilizadas em `src/global.scss` e `src/theme/variables.scss`.
 *
 * 3️⃣ PERGUNTA 3: ONDE PODE SER VISTO EM TELA?
 *    - Clicando nos botões do menu superior ("Início", "Catálogo", "Sacola") e
 *      clicando em uma roupa para abrir a 4ª tela ("Detalhes da Peça").
 * ============================================================================
 */

import type { Routes } from '@angular/router';

export const routes: Routes = [
  // [MENINO MAL - PÁGINA 1]: Home (Vitrine Streetwear, Destaques e Carrossel)
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },

  // [MENINO MAL - PÁGINA 2]: Catálogo de Roupas (Masculinas e Femininas)
  {
    path: 'catalogo',
    loadComponent: () => import('./pages/catalogo/catalogo.page').then((m) => m.CatalogoPage),
  },

  // [MENINO MAL - PÁGINA 3] + [RAFAEL - REQUISITO 6 PONTO EXTRA]:
  // Rota `detalhes/:id` que recebe o ID da roupa clicada na página anterior
  {
    path: 'detalhes/:id',
    loadComponent: () => import('./pages/detalhes/detalhes.page').then((m) => m.DetalhesPage),
  },

  // [MENINO MAL - PÁGINA 4]: Sacola de Compras
  {
    path: 'sacola',
    loadComponent: () => import('./pages/sacola/sacola.page').then((m) => m.SacolaPage),
  },

  // Quando abre o site, vai direto para a página Home
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];
