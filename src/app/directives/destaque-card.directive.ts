/**
 * ============================================================================
 * GUIA DO INTEGRANTE 5 — REQUISITO 5 (PARTE A: 1ª DIRETIVA PERSONALIZADA)
 * ARQUIVO: src/app/directives/destaque-card.directive.ts
 * ============================================================================
 * • QUEM APRESENTA ESTE CÓDIGO: INTEGRANTE 5
 * • QUAL REQUISITO DO PDF ESTÁ AQUI:
 *   Requisito 5 — "O projeto deve ter, no mínimo, DUAS diretivas personalizadas
 *   e duas diretivas estruturais (@if e @for, NÃO será aceito ngIf e nem ngFor)."
 *
 * • ONDE PROCURAR NESTE ARQUIVO:
 *   - Linha 32: Decorator `@Directive({ selector: '[appDestaqueCard]', standalone: true })`
 *   - Linhas 40 a 50: Uso de `@HostBinding` para controlar as propriedades CSS
 *     (`transform`, `boxShadow`, `border` e `transition`) do elemento HTML.
 *   - Linhas 56 a 61: Uso de `@HostListener('mouseenter')` que aplica o destaque
 *     vibrante em Vermelho Saturado (#ff2a2a) quando o mouse entra no card.
 *   - Linhas 67 a 72: Uso de `@HostListener('mouseleave')` que restaura a borda
 *     original em Cinza Chumbo (#27272a) quando o mouse sai do card.
 *
 * • COMO RESPONDER ÀS 3 PERGUNTAS DO PROFESSOR NA APRESENTAÇÃO:
 *   1. O que o requisito faz no seu projeto?
 *      Cria um comportamento visual interativo nos cards de roupas da loja:
 *      quando o usuário passa o mouse sobre um card, a diretiva aplica zoom
 *      suave, elevação 3D e uma borda em vermelho saturado vibrante (#ff2a2a).
 *   2. Onde está no código?
 *      Neste arquivo (`src/app/directives/destaque-card.directive.ts`) e aplicado
 *      como atributo `appDestaqueCard` nas tags `<ion-card>` em `home.page.html`,
 *      `catalogo.page.html`, `detalhes.page.html` e `sacola.page.html`.
 *   3. Onde pode ser visto em tela?
 *      Basta passar o mouse sobre qualquer card de roupa no Catálogo, nos
 *      departamentos da Home ou nos itens da Sacola para ver a borda vermelha
 *      vibrante e o card subindo na tela.
 * ============================================================================
 */

import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appDestaqueCard]',
  standalone: true, // Obrigatório Angular Standalone conforme o PDF
})
export class DestaqueCardDirective {
  /**
   * @HostBinding conecta variáveis da classe diretamente ao estilo CSS do elemento.
   */
  @HostBinding('style.transition') transicao =
    'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.25s ease, border-color 0.25s ease';

  @HostBinding('style.transform') transformacao = 'translateY(0) scale(1)';

  @HostBinding('style.boxShadow') sombra = '0 10px 30px rgba(0, 0, 0, 0.55)';

  @HostBinding('style.border') borda = '1px solid #27272a';

  @HostBinding('style.cursor') cursor = 'pointer';

  /**
   * @HostListener detecta quando o cursor entra no card e ativa o destaque Vermelho Saturado.
   */
  @HostListener('mouseenter') aoEntrarComMouse(): void {
    this.transformacao = 'translateY(-6px) scale(1.015)';
    this.sombra = '0 16px 36px rgba(255, 42, 42, 0.28)';
    this.borda = '1px solid #ff2a2a';
  }

  /**
   * @HostListener detecta quando o cursor sai do card e retorna ao Cinza Chumbo padrão.
   */
  @HostListener('mouseleave') aoSairComMouse(): void {
    this.transformacao = 'translateY(0) scale(1)';
    this.sombra = '0 10px 30px rgba(0, 0, 0, 0.55)';
    this.borda = '1px solid #27272a';
  }
}
