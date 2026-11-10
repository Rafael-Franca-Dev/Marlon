/**
 * ============================================================================
 * GUIA DO INTEGRANTE 5 — REQUISITO 5 (PARTE B: 2ª DIRETIVA PERSONALIZADA)
 * ARQUIVO: src/app/directives/badge-promo.directive.ts
 * ============================================================================
 * • QUEM APRESENTA ESTE CÓDIGO: INTEGRANTE 5
 * • QUAL REQUISITO DO PDF ESTÁ AQUI:
 *   Requisito 5 — Segunda Diretiva Personalizada do projeto (`[appBadgePromo]`).
 *
 * • ONDE PROCURAR NESTE ARQUIVO:
 *   - Linha 31: Decorator `@Directive({ selector: '[appBadgePromo]', standalone: true })`
 *   - Linhas 39 a 58: Uso de `@HostBinding` para aplicar a estética Streetwear
 *     com fundo Verde Limão Neon (#a3e635) e texto Preto Profundo (#09090b).
 *   - Linhas 63 a 72: Uso de `@HostListener('mouseenter')` e `mouseleave` para
 *     intensificar o brilho neon quando o usuário interage com a etiqueta.
 *
 * • COMO RESPONDER ÀS 3 PERGUNTAS DO PROFESSOR NA APRESENTAÇÃO:
 *   1. O que o requisito faz no seu projeto?
 *      Padroniza e estiliza automaticamente todas as etiquetas promocionais de
 *      desconto PIX da loja ("10% OFF PIX") com o contraste Streetwear em
 *      Verde Limão Neon (#a3e635) sobre o fundo Preto Profundo (#09090b).
 *   2. Onde está no código?
 *      Neste arquivo (`src/app/directives/badge-promo.directive.ts`) e aplicado
 *      como atributo `<span appBadgePromo>` nos arquivos `home.page.html`,
 *      `catalogo.page.html`, `detalhes.page.html` e `sacola.page.html`.
 *   3. Onde pode ser visto em tela?
 *      Nos selos luminosos em Verde Limão ao lado dos preços com desconto PIX
 *      no banner da Home, nos cards do Catálogo, nos Detalhes e na Sacola.
 * ============================================================================
 */

import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appBadgePromo]',
  standalone: true, // Obrigatório Angular Standalone conforme o PDF
})
export class BadgePromoDirective {
  /**
   * @HostBinding injeta o visual Verde Limão Neon + Preto Profundo no elemento HTML.
   */
  @HostBinding('style.display') display = 'inline-block';

  @HostBinding('style.backgroundColor') corFundo = '#a3e635';

  @HostBinding('style.color') corTexto = '#09090b';

  @HostBinding('style.padding') espacamento = '4px 12px';

  @HostBinding('style.borderRadius') bordaArredondada = '6px';

  @HostBinding('style.fontSize') tamanhoFonte = '0.73rem';

  @HostBinding('style.fontWeight') pesoFonte = '800';

  @HostBinding('style.letterSpacing') espacamentoLetras = '0.8px';

  @HostBinding('style.textTransform') transformacaoTexto = 'uppercase';

  @HostBinding('style.transition') transicao = 'all 0.2s ease';

  @HostBinding('style.boxShadow') sombra = '0 0 12px rgba(163, 230, 53, 0.35)';

  /**
   * @HostListener aumenta o brilho neon quando o usuário passa o mouse sobre o selo.
   */
  @HostListener('mouseenter') aoDestacar(): void {
    this.corFundo = '#bef264';
    this.sombra = '0 0 20px rgba(163, 230, 53, 0.75)';
  }

  @HostListener('mouseleave') aoNormalizar(): void {
    this.corFundo = '#a3e635';
    this.sombra = '0 0 12px rgba(163, 230, 53, 0.35)';
  }
}
