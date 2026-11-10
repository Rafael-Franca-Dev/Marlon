/**
 * ============================================================================
 * GUIA DO INTEGRANTE 4 — REQUISITO 3 (PARTE B: 2ª PIPE PERSONALIZADA)
 * ARQUIVO: src/app/pipes/desconto-pix.pipe.ts
 * ============================================================================
 * • QUEM APRESENTA ESTE CÓDIGO: INTEGRANTE 4
 * • QUAL REQUISITO DO PDF ESTÁ AQUI:
 *   Requisito 3 — Segunda Pipe Personalizada do projeto (`descontoPix`).
 *
 * • ONDE PROCURAR NESTE ARQUIVO:
 *   - Linha 29: Decorator `@Pipe({ name: 'descontoPix', standalone: true })`
 *   - Linha 39: Método `transform(precoOriginal, percentualDesconto = 10)` que
 *     aplica 10% de desconto para pagamento à vista via PIX.
 *
 * • COMO RESPONDER ÀS 3 PERGUNTAS DO PROFESSOR NA APRESENTAÇÃO:
 *   1. O que o requisito faz no seu projeto?
 *      Calcula em tempo real o preço promocional da roupa aplicando 10% de desconto
 *      para pagamentos no PIX, sendo encadeada diretamente com a Pipe Built-in
 *      `currency:'BRL'` para já exibir o valor formatado em Reais.
 *   2. Onde está no código?
 *      Neste arquivo (`src/app/pipes/desconto-pix.pipe.ts`) e aplicada nos
 *      templates `catalogo.page.html`, `detalhes.page.html` e `sacola.page.html`
 *      na expressão `{{ roupa.price | descontoPix:10 | currency:'BRL' }}`.
 *   3. Onde pode ser visto em tela?
 *      No preço em destaque (em Verde Limão Neon) em cada card do Catálogo, no
 *      box de preço da página de Detalhes e no valor final com PIX da Sacola.
 * ============================================================================
 */

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'descontoPix',
  standalone: true, // Obrigatório usar Angular Standalone conforme o PDF
})
export class DescontoPixPipe implements PipeTransform {
  /**
   * Calcula o preço final após aplicar o percentual de desconto no PIX.
   * @param precoOriginal Preço bruto do produto retornado pela API.
   * @param percentualDesconto Porcentagem de desconto aplicada (padrão: 10%).
   * @returns Valor numérico com desconto aplicado.
   */
  transform(precoOriginal: number | undefined | null, percentualDesconto: number = 10): number {
    if (precoOriginal == null || isNaN(precoOriginal)) {
      return 0;
    }

    const fatorDesconto = (100 - percentualDesconto) / 100;
    return Number((precoOriginal * fatorDesconto).toFixed(2));
  }
}
