/**
 * ============================================================================
 * 👤 PARTE EXCLUSIVA DO GAGO — REQUISITO 3 (AS 4 PIPES: 2ª PIPE PERSONALIZADA)
 * ARQUIVO: src/app/pipes/desconto-pix.pipe.ts
 * ============================================================================
 * 🎯 O QUE O GAGO DEVE EXPLICAR SOBRE ESTE ARQUIVO:
 *
 * 1️⃣ O QUE ESTA PIPE FAZ?
 *    "Esta é a nossa segunda Pipe Personalizada (`descontoPix`). Ela recebe o
 *    preço normal da roupa (por exemplo, 119,90) e aplica 10% de desconto para
 *    pagamento via PIX (multiplicando por 0,90), devolvendo o valor com desconto
 *    sem alterar o preço original do produto."
 *
 * 2️⃣ ONDE ESTÁ NO CÓDIGO?
 *    - Criada aqui em `src/app/pipes/desconto-pix.pipe.ts` (no método `transform` abaixo).
 *    - Usada no HTML de `catalogo.page.html`, `detalhes.page.html` e `sacola.page.html`
 *      junto com a Pipe nativa `currency:'BRL'`:
 *      `{{ roupa.price | descontoPix:10 | currency:'BRL' }}`
 *
 * 3️⃣ ONDE PODE SER VISTO EM TELA?
 *    - No preço em Verde Limão Neon nos cards do Catálogo, na página de Detalhes
 *      da roupa e no Total com PIX dentro da Sacola.
 * ============================================================================
 */

import { Pipe } from '@angular/core';
import type { PipeTransform } from '@angular/core';

@Pipe({
  name: 'descontoPix', // Nome usado no HTML: | descontoPix:10
  standalone: true,
})
export class DescontoPixPipe implements PipeTransform {
  /**
   * [GAGO - Requisito 3]: Calcula o preço com desconto (padrão de 10% OFF).
   */
  transform(precoOriginal: number | undefined | null, percentualDesconto: number = 10): number {
    if (precoOriginal == null || isNaN(precoOriginal)) {
      return 0;
    }

    // Exemplo: se o desconto é 10%, (100 - 10) / 100 = 0.90 (90% do valor original)
    const fatorDesconto = (100 - percentualDesconto) / 100;
    return Number((precoOriginal * fatorDesconto).toFixed(2));
  }
}
