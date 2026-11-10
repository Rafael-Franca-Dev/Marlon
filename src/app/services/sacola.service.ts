/**
 * ============================================================================
 * GUIA DO INTEGRANTE 3 — REQUISITO 4 (PARTE 2: 2º SERVICE) E REQUISITO 6 (PONTO EXTRA)
 * ARQUIVO: src/app/services/sacola.service.ts
 * ============================================================================
 * • QUEM APRESENTA ESTE CÓDIGO: INTEGRANTE 3
 * • QUAIS REQUISITOS DO PDF ESTÃO AQUI:
 *   1. Requisito 4 - Parte 2 (1,0 ponto): Segundo Service do projeto com outra
 *      funcionalidade distinta do HttpClient (gerenciamento completo da Sacola
 *      de Compras da loja e dados dos 5 integrantes da equipe).
 *   2. Requisito 6 - Ponto Extra (+1,0 ponto): Passar um parâmetro por rota de
 *      uma página anterior (`/catalogo`) para outra página (`/detalhes/:id`).
 *
 * • ONDE PROCURAR NESTE ARQUIVO:
 *   - Linha 57: Array `private itens: ItemSacola[] = []` que guarda as roupas na sacola.
 *   - Linha 108: `adicionarItem(produto)` -> adiciona roupa ou soma +1 na quantidade.
 *   - Linha 122: `diminuirQuantidade(produtoId)` -> reduz quantidade ou remove item.
 *   - Linha 139: `removerItem(produtoId)` e `limparSacola()`.
 *   - Linha 153 e 160: `obterQuantidadeTotal()` e `calcularValorTotal()`.
 *
 * • ONDE PROCURAR O REQUISITO 6 (PARÂMETRO POR ROTA) QUE O INTEGRANTE 3 TAMBÉM APRESENTA:
 *   - `src/app/app.routes.ts` (Linha 35): Rota configurada como `path: 'detalhes/:id'`.
 *   - `src/app/pages/catalogo/catalogo.page.html` (Linha 121): Clique no card usando
 *     `[routerLink]="['/detalhes', roupa.id]"`.
 *   - `src/app/pages/detalhes/detalhes.page.ts` (Linha 129): Captura do ID na URL usando
 *     `this.route.snapshot.paramMap.get('id')`.
 *
 * • COMO RESPONDER ÀS 3 PERGUNTAS DO PROFESSOR NA APRESENTAÇÃO:
 *   1. O que o requisito faz no seu projeto?
 *      O `SacolaService` mantém os itens adicionados pelo cliente disponíveis em todas
 *      as 4 páginas, calculando quantidades e subtotais; além disso, a rota parametrizada
 *      envia o `id` da roupa clicada no Catálogo até a tela de Detalhes.
 *   2. Onde está no código?
 *      Neste arquivo (`src/app/services/sacola.service.ts`) e na captura de rota com
 *      `ActivatedRoute` em `src/app/pages/detalhes/detalhes.page.ts`.
 *   3. Onde pode ser visto em tela?
 *      Clicando no botão "+ Sacola" em qualquer roupa, vendo o contador subir no topo
 *      e abrindo a página Sacola (`/sacola`), ou clicando em uma roupa para abrir `/detalhes/1`.
 * ============================================================================
 */

import { Injectable } from '@angular/core';

import type { ProdutoRoupa } from './roupas.service';

/**
 * Interface que representa um item dentro da sacola de compras.
 */
export interface ItemSacola {
  produto: ProdutoRoupa;
  quantidade: number;
}

/**
 * Interface que estrutura a divisão dos 5 integrantes do grupo para
 * consulta rápida na tela Home e durante a apresentação ao professor.
 */
export interface IntegranteEquipe {
  numero: number;
  nome: string;
  requisitoTitulo: string;
  responsabilidade: string;
  arquivosCodigo: string;
  ondeVerNaTela: string;
}

@Injectable({
  providedIn: 'root',
})
export class SacolaService {
  /**
   * Array privado em memória que guarda os itens adicionados à sacola.
   */
  private itens: ItemSacola[] = [];

  /**
   * Divisão oficial dos 5 integrantes do grupo (1 requisito claro por integrante).
   */
  private readonly equipe: IntegranteEquipe[] = [
    {
      numero: 1,
      nome: 'Integrante 1',
      requisitoTitulo: 'Requisito 1 — 4 Páginas, Rotas e UI/UX Streetwear (1,0 pt)',
      responsabilidade:
        'Estrutura das 4 páginas (Home, Catálogo, Detalhes, Sacola), navegação com RouterLink e estilização Streetwear (Preto Profundo, Cinza Chumbo, Vermelho e Verde Limão).',
      arquivosCodigo: 'src/app/app.routes.ts, src/global.scss e pastas src/app/home e src/app/pages/*',
      ondeVerNaTela: 'Navegação completa entre as 4 telas estilizadas e barra superior fixa.',
    },
    {
      numero: 2,
      nome: 'Integrante 2',
      requisitoTitulo: 'Requisito 2 e 4 (Parte 1) — API com 3 GETs + RoupasService (1,5 pt)',
      responsabilidade:
        'Configuração do provideHttpClient() e criação do 1º Service (RoupasService) consumindo a Fake Store API com 3 métodos GET distintos.',
      arquivosCodigo: 'src/app/services/roupas.service.ts e src/main.ts',
      ondeVerNaTela:
        'Abas Masculino (GET 1) e Feminino (GET 2) no Catálogo, e carregamento por ID (GET 3) em Detalhes.',
    },
    {
      numero: 3,
      nome: 'Integrante 3',
      requisitoTitulo: 'Requisito 4 (Parte 2) e Requisito 6 (Extra) — SacolaService + Rota :id (2,0 pts)',
      responsabilidade:
        'Criação do 2º Service (SacolaService) para gerenciar a sacola de compras e passagem de parâmetro :id por rota do Catálogo para Detalhes.',
      arquivosCodigo: 'src/app/services/sacola.service.ts e src/app/pages/detalhes/detalhes.page.ts',
      ondeVerNaTela: 'Clique em uma roupa abrindo /detalhes/:id e adição/remoção/cálculo de itens na página Sacola.',
    },
    {
      numero: 4,
      nome: 'Integrante 4',
      requisitoTitulo: 'Requisito 3 — 4 Pipes: 2 Personalizadas + 2 Built-in (1,0 pt)',
      responsabilidade:
        'Criação das 2 Pipes Personalizadas (traduzirCategoria e descontoPix) e aplicação das 2 Pipes Built-in nativas (currency:BRL e uppercase).',
      arquivosCodigo: 'src/app/pipes/traduzir-categoria.pipe.ts e src/app/pipes/desconto-pix.pipe.ts',
      ondeVerNaTela: 'Preços em R$, cálculo de 10% OFF no PIX e categorias traduzidas em maiúsculas nos cards.',
    },
    {
      numero: 5,
      nome: 'Integrante 5',
      requisitoTitulo: 'Requisito 5 — 2 Diretivas Personalizadas + @if e @for (1,5 pt)',
      responsabilidade:
        'Criação das 2 Diretivas Personalizadas (appDestaqueCard e appBadgePromo) com @HostBinding/@HostListener e uso dos blocos estruturais @if e @for.',
      arquivosCodigo: 'src/app/directives/destaque-card.directive.ts, badge-promo.directive.ts e templates .html',
      ondeVerNaTela:
        'Efeito neon vermelho ao passar nos cards, etiqueta verde limão PIX, loading @if e listagens @for.',
    },
  ];

  listarItens(): ItemSacola[] {
    return this.itens;
  }

  listarEquipe(): IntegranteEquipe[] {
    return this.equipe;
  }

  adicionarItem(produto: ProdutoRoupa): void {
    const itemExistente = this.itens.find((item) => item.produto.id === produto.id);

    if (itemExistente) {
      itemExistente.quantidade += 1;
    } else {
      this.itens.push({ produto, quantidade: 1 });
    }
  }

  diminuirQuantidade(produtoId: number): void {
    const itemExistente = this.itens.find((item) => item.produto.id === produtoId);

    if (!itemExistente) {
      return;
    }

    if (itemExistente.quantidade > 1) {
      itemExistente.quantidade -= 1;
    } else {
      this.removerItem(produtoId);
    }
  }

  removerItem(produtoId: number): void {
    this.itens = this.itens.filter((item) => item.produto.id !== produtoId);
  }

  limparSacola(): void {
    this.itens = [];
  }

  obterQuantidadeTotal(): number {
    return this.itens.reduce((acumulador, item) => acumulador + item.quantidade, 0);
  }

  calcularValorTotal(): number {
    return this.itens.reduce((acumulador, item) => acumulador + item.produto.price * item.quantidade, 0);
  }
}
