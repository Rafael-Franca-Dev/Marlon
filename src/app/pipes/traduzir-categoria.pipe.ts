/**
 * ============================================================================
 * 👤 PARTE EXCLUSIVA DO GAGO — REQUISITO 3 (AS 4 PIPES: 1ª PIPE PERSONALIZADA)
 * ARQUIVO: src/app/pipes/traduzir-categoria.pipe.ts
 * ============================================================================
 * 🎯 O QUE O GAGO DEVE EXPLICAR PARA O PROFESSOR:
 *
 * 1️⃣ PERGUNTA 1: O QUE O REQUISITO FAZ NO SEU PROJETO?
 *    "Professor, eu fiquei responsável pelo Requisito 3, que exige 4 Pipes
 *    (2 personalizadas feitas por nós e 2 nativas do Angular).
 *    • Esta primeira Pipe Personalizada (`traduzirCategoria`) pega o nome da
 *      categoria que vem em inglês lá da API (`men's clothing` ou `women's clothing`)
 *      e traduz automaticamente para português (`Streetwear Masculino` ou
 *      `Streetwear Feminino`).
 *    • A segunda Pipe Personalizada é a `descontoPix` (no outro arquivo da pasta pipes).
 *    • E as duas Pipes Built-in (nativas do Angular) que nós usamos são a
 *      `currency:'BRL'` (que formata os números em Reais R$) e a `uppercase`
 *      (que deixa o texto todo em letras maiúsculas)."
 *
 * 2️⃣ PERGUNTA 2: ONDE ESTÁ NO CÓDIGO?
 *    - 1ª Pipe Personalizada: Neste arquivo (`src/app/pipes/traduzir-categoria.pipe.ts`, linha 35).
 *    - 2ª Pipe Personalizada: No arquivo `src/app/pipes/desconto-pix.pipe.ts` (linha 28).
 *    - Onde as 4 Pipes são usadas no HTML: Em `src/app/pages/catalogo/catalogo.page.html`
 *      nas linhas 130 a 160 (mostre o símbolo `|` chamado de Pipe no HTML).
 *
 * 3️⃣ PERGUNTA 3: ONDE PODE SER VISTO EM TELA?
 *    - Abra a página "Catálogo": em cima do nome de cada roupa aparece escrito
 *      "STREETWEAR MASCULINO" ou "STREETWEAR FEMININO" (traduzido pela `traduzirCategoria`
 *      e em maiúsculas pela `uppercase`).
 *    - Embaixo da foto aparece o preço em Reais (`R$`) formatado pela `currency:'BRL'`
 *      e o preço verde limão com 10% de desconto calculado pela `descontoPix`.
 * ============================================================================
 */

import { Pipe } from '@angular/core';
import type { PipeTransform } from '@angular/core';

@Pipe({
  name: 'traduzirCategoria', // Nome usado no HTML depois da barrinha: | traduzirCategoria
  standalone: true, // Obrigatório usar Angular Standalone
})
export class TraduzirCategoriaPipe implements PipeTransform {
  /**
   * [GAGO - Requisito 3]: Recebe o texto em inglês da API e devolve traduzido.
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
