/**
 * ============================================================================
 * GUIA DO INTEGRANTE 4 — REQUISITO 3 (PARTE A: 1ª PIPE PERSONALIZADA)
 * ARQUIVO: src/app/pipes/traduzir-categoria.pipe.ts
 * ============================================================================
 * • QUEM APRESENTA ESTE CÓDIGO: INTEGRANTE 4
 * • QUAL REQUISITO DO PDF ESTÁ AQUI:
 *   Requisito 3 — "O projeto deve ter, no mínimo, quatro pipes, DUAS personalizadas
 *   e DUAS pipe builtins - 0.25 ponto cada (total de 1 ponto)."
 *   (Este arquivo contém a 1ª Pipe Personalizada: `traduzirCategoria`).
 *
 * • ONDE PROCURAR NESTE ARQUIVO:
 *   - Linha 31: Decorator `@Pipe({ name: 'traduzirCategoria', standalone: true })`
 *   - Linha 41: Método `transform(categoria: string)` que converte `"men's clothing"`
 *     em `"Streetwear Masculino"` e `"women's clothing"` em `"Streetwear Feminino"`.
 *
 * • ONDE PROCURAR AS 2 PIPES BUILT-IN (NATIVAS DO ANGULAR) QUE O INTEGRANTE 4 TAMBÉM APRESENTA:
 *   - `CurrencyPipe` (`| currency:'BRL'`): usada nos templates `catalogo.page.html`,
 *     `detalhes.page.html` e `sacola.page.html` para formatar os preços em Reais (R$).
 *   - `UpperCasePipe` (`| uppercase`): usada nos templates junto com esta pipe
 *     (ex: `{{ roupa.category | traduzirCategoria | uppercase }}`) para deixar tudo em maiúsculas.
 *
 * • COMO RESPONDER ÀS 3 PERGUNTAS DO PROFESSOR NA APRESENTAÇÃO:
 *   1. O que o requisito faz no seu projeto?
 *      Recebe o nome original em inglês da categoria vindo da Fake Store API
 *      ("men's clothing" ou "women's clothing") e traduz automaticamente para o
 *      português ("Streetwear Masculino" / "Streetwear Feminino") na tela.
 *   2. Onde está no código?
 *      Neste arquivo (`src/app/pipes/traduzir-categoria.pipe.ts`) e aplicada nos
 *      templates `home.page.html`, `catalogo.page.html`, `detalhes.page.html` e `sacola.page.html`.
 *   3. Onde pode ser visto em tela?
 *      Acima do título de cada peça de roupa nos cards do Catálogo, nos chips de
 *      categoria da tela de Detalhes e nos itens listados na Sacola.
 * ============================================================================
 */

import type { PipeTransform } from '@angular/core';
import { Pipe } from '@angular/core';

@Pipe({
  name: 'traduzirCategoria',
  standalone: true, // Obrigatório usar Angular Standalone conforme o PDF
})
export class TraduzirCategoriaPipe implements PipeTransform {
  /**
   * Método obrigatório da interface PipeTransform.
   * @param categoria Nome original da categoria retornado pela API em inglês.
   * @returns Nome traduzido para português com identidade Streetwear.
   */
  transform(categoria: string | undefined | null): string {
    if (!categoria) {
      return 'Linha Urbana';
    }

    const chave = categoria.toLowerCase().trim();

    if (chave === "men's clothing") {
      return 'Streetwear Masculino';
    }

    if (chave === "women's clothing") {
      return 'Streetwear Feminino';
    }

    return categoria;
  }
}
