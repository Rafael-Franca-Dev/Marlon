/**
 * ============================================================================
 * GUIA DO INTEGRANTE 1 (REQUISITO 1) E INTEGRANTE 3 (REQUISITO 6 - PONTO EXTRA)
 * ARQUIVO: src/app/app.routes.ts (Configuração das Rotas das 4 Páginas)
 * ============================================================================
 * • QUEM APRESENTA ESTE CÓDIGO:
 *   - INTEGRANTE 1: Explica o Requisito 1 ("no mínimo, 3 pages além do Home").
 *   - INTEGRANTE 3: Explica a linha 39 (`path: 'detalhes/:id'`) que atende ao
 *     Requisito 6 (Pontuação Extra: passar parâmetro por rota).
 *
 * • ONDE PROCURAR NESTE ARQUIVO:
 *   - Linhas 27 a 30: Rota `home` (Página 1 — Vitrine Streetwear e Equipe).
 *   - Linhas 33 a 37: Rota `catalogo` (Página 2 — Lista de Roupas da API).
 *   - Linhas 40 a 44: Rota `detalhes/:id` (Página 3 + Ponto Extra com parâmetro `:id`).
 *   - Linhas 47 a 51: Rota `sacola` (Página 4 — Sacola de Compras).
 *
 * • COMO O INTEGRANTE 1 RESPONDE ÀS 3 PERGUNTAS DO PROFESSOR:
 *   1. O que o requisito faz no seu projeto?
 *      Define as 4 páginas independentes do aplicativo mobile em Angular Standalone
 *      (`home`, `catalogo`, `detalhes/:id` e `sacola`), permitindo navegar sem
 *      recarregar o navegador.
 *   2. Onde está no código?
 *      Neste arquivo (`src/app/app.routes.ts`) e nas pastas `src/app/home/` e
 *      `src/app/pages/` (`catalogo`, `detalhes`, `sacola`).
 *   3. Onde pode ser visto em tela?
 *      Clicando nos botões do menu superior ("Início", "Catálogo", "Sacola") e
 *      nos cards de roupas que abrem a página de "Detalhes".
 * ============================================================================
 */

import type { Routes } from '@angular/router';

export const routes: Routes = [
  // PÁGINA 1 (Requisito 1 - Integrante 1): Home / Vitrine Streetwear
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },

  // PÁGINA 2 (Requisito 1 - Integrante 1): Catálogo de Roupas da API
  {
    path: 'catalogo',
    loadComponent: () =>
      import('./pages/catalogo/catalogo.page').then((m) => m.CatalogoPage),
  },

  // PÁGINA 3 (Requisito 1 - Integrante 1) + PONTO EXTRA (Requisito 6 - Integrante 3):
  // Recebe o parâmetro `:id` enviado pela página anterior (`/catalogo`)
  {
    path: 'detalhes/:id',
    loadComponent: () =>
      import('./pages/detalhes/detalhes.page').then((m) => m.DetalhesPage),
  },

  // PÁGINA 4 (Requisito 1 - Integrante 1): Sacola de Compras
  {
    path: 'sacola',
    loadComponent: () =>
      import('./pages/sacola/sacola.page').then((m) => m.SacolaPage),
  },

  // Redirecionamento inicial padrão para a página Home
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];
