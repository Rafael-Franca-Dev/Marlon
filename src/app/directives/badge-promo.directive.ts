/**
 * ============================================================================
 * 👤 PARTE EXCLUSIVA DO NETO — REQUISITO 5 (2ª DIRETIVA PERSONALIZADA)
 * ARQUIVO: src/app/directives/badge-promo.directive.ts
 * ============================================================================
 * 🎯 O QUE O NETO DEVE EXPLICAR SOBRE ESTE ARQUIVO:
 *
 * 1️⃣ O QUE ESTA DIRETIVA FAZ?
 *    "Esta é a nossa 2ª Diretiva Personalizada (`appBadgePromo`). Sempre que
 *    colocamos `appBadgePromo` num `<span>`, ela aplica automaticamente o fundo
 *    Verde Limão Neon (`#a3e635`), letra preta em negrito e efeito de brilho
 *    quando passa o mouse."
 *
 * 2️⃣ ONDE ESTÁ NO CÓDIGO?
 *    - Criada aqui em `src/app/directives/badge-promo.directive.ts`.
 *    - Usada no HTML em `home.page.html`, `catalogo.page.html`, `detalhes.page.html`
 *      e `sacola.page.html`: `<span appBadgePromo>10% OFF PIX</span>`.
 *
 * 3️⃣ ONDE PODE SER VISTO EM TELA?
 *    - Em todas as etiquetas Verde Limão Neon ao lado dos preços com PIX.
 * ============================================================================
 */

import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appBadgePromo]', // Como usamos no HTML: <span appBadgePromo>
  standalone: true,
})
export class BadgePromoDirective {
  // [NETO - Requisito 5]: @HostBinding pinta a etiqueta de Verde Limão Neon (#a3e635)
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

  // [NETO - Requisito 5]: @HostListener aumenta o brilho neon ao passar o mouse
  @HostListener('mouseenter') aoDestacar(): void {
    this.corFundo = '#bef264';
    this.sombra = '0 0 20px rgba(163, 230, 53, 0.75)';
  }

  @HostListener('mouseleave') aoNormalizar(): void {
    this.corFundo = '#a3e635';
    this.sombra = '0 0 12px rgba(163, 230, 53, 0.35)';
  }
}
