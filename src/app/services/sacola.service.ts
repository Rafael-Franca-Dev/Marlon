/**
 * ============================================================================
 * 👤 PARTE EXCLUSIVA DO RAFAEL — REQUISITO 4 (2º SERVICE) E REQUISITO 6 (ROTA :ID)
 * ARQUIVO: src/app/services/sacola.service.ts
 * ============================================================================
 * 🎯 O QUE O RAFAEL DEVE EXPLICAR PARA O PROFESSOR:
 *
 * 1️⃣ PERGUNTA 1: O QUE O REQUISITO FAZ NO SEU PROJETO?
 *    "Professor, eu fiquei com o segundo Service do projeto (Requisito 4) e com
 *    a passagem de parâmetro por rota (Requisito 6 - Ponto Extra).
 *    • Este arquivo é o SacolaService: ele guarda em memória as roupas que o
 *      cliente adiciona na sacola, permite aumentar ou diminuir a quantidade,
 *      remover peças e calcula o valor total da compra.
 *    • E no Requisito 6 (Ponto Extra), quando o cliente clica em uma roupa no
 *      Catálogo, nós enviamos o ID dessa roupa na URL (`/detalhes/:id`) para
 *      abrir a página de Detalhes daquela peça específica."
 *
 * 2️⃣ PERGUNTA 2: ONDE ESTÁ NO CÓDIGO?
 *    - Parte A (2º Service): Neste arquivo (`src/app/services/sacola.service.ts`):
 *      • Linha 51: `private itens: ItemSacola[] = []` (lista que guarda as roupas).
 *      • Linha 60: `adicionarItem()` (adiciona roupa ou soma +1 se já existir).
 *      • Linha 75: `diminuirQuantidade()` e `removerItem()`.
 *      • Linha 108: `calcularValorTotal()` (multiplica preço × quantidade).
 *    - Parte B (Parâmetro por Rota - Ponto Extra):
 *      • Em `src/app/app.routes.ts` (Linha 46): `path: 'detalhes/:id'`.
 *      • Em `src/app/pages/catalogo/catalogo.page.html` (Linha 118): `[routerLink]="['/detalhes', roupa.id]"`.
 *      • Em `src/app/pages/detalhes/detalhes.page.ts` (Linha 127): `params.get('id')` via `ActivatedRoute`.
 *
 * 3️⃣ PERGUNTA 3: ONDE PODE SER VISTO EM TELA?
 *    - No Catálogo, clique em uma roupa: mostre a URL lá em cima mudando para
 *      `/detalhes/2` (ou `/detalhes/4`) e abrindo a roupa certa (Ponto Extra).
 *    - Depois clique no botão "+ SACOLA", mostre o número subindo no topo da
 *      tela e abra a página "Sacola" para mostrar os botões `+`, `-` e o total.
 * ============================================================================
 */

import { Injectable } from '@angular/core';

import type { ProdutoRoupa } from './roupas.service';

/**
 * Representa cada linha da sacola de compras: qual é a roupa e quantas unidades.
 */
export interface ItemSacola {
  produto: ProdutoRoupa;
  quantidade: number;
}

@Injectable({
  // 'root' mantém os itens salvos na sacola mesmo quando o cliente troca de página
  providedIn: 'root',
})
export class SacolaService {
  // [RAFAEL - Requisito 4]: Lista em memória onde ficam guardadas as roupas da sacola
  private itens: ItemSacola[] = [];

  // [RAFAEL]: Devolve todas as roupas que estão na sacola no momento
  listarItens(): ItemSacola[] {
    return this.itens;
  }

  // [RAFAEL]: Adiciona uma roupa na sacola (se já tiver essa roupa, soma +1 na quantidade)
  adicionarItem(produto: ProdutoRoupa): void {
    const itemExistente = this.itens.find((item) => item.produto.id === produto.id);

    if (itemExistente) {
      itemExistente.quantidade += 1;
    } else {
      this.itens.push({ produto, quantidade: 1 });
    }
  }

  // [RAFAEL]: Diminui 1 unidade da roupa na sacola (se chegar a zero, remove da sacola)
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

  // [RAFAEL]: Remove uma peça completamente da sacola pelo ID
  removerItem(produtoId: number): void {
    this.itens = this.itens.filter((item) => item.produto.id !== produtoId);
  }

  // [RAFAEL]: Esvazia toda a sacola (usado no botão "Esvaziar" e ao finalizar a compra)
  limparSacola(): void {
    this.itens = [];
  }

  // [RAFAEL]: Conta quantas peças no total existem dentro da sacola (para o ícone do topo)
  obterQuantidadeTotal(): number {
    return this.itens.reduce((acumulador, item) => acumulador + item.quantidade, 0);
  }

  // [RAFAEL]: Calcula o valor total somando (preço da roupa × quantidade) de cada item
  calcularValorTotal(): number {
    return this.itens.reduce((acumulador, item) => acumulador + item.produto.price * item.quantidade, 0);
  }
}
