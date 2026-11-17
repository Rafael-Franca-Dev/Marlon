/**
 * ============================================================================
 * 👤 PARTE EXCLUSIVA DO NETO — REQUISITO 5 (DIRETIVAS PERSONALIZADAS + @if e @for)
 * ARQUIVO: src/app/directives/destaque-card.directive.ts (1ª Diretiva Personalizada)
 * ============================================================================
 * 🎯 O QUE O NETO DEVE EXPLICAR PARA O PROFESSOR:
 *
 * 1️⃣ PERGUNTA 1: O QUE O REQUISITO FAZ NO SEU PROJETO?
 *    "Professor, eu fiquei com o Requisito 5, que pede 2 Diretivas Personalizadas
 *    e as 2 Diretivas Estruturais modernas (`@if` e `@for`, sem usar `ngIf` nem `ngFor`).
 *    • Esta 1ª Diretiva Personalizada (`appDestaqueCard`) usa `@HostListener` para
 *      detectar quando o usuário passa o mouse em cima de um card de roupa e usa
 *      `@HostBinding` para levantar o card e colocar uma borda e sombra em Vermelho
 *      Saturado (`#ff2a2a`).
 *    • A 2ª Diretiva Personalizada (`appBadgePromo`, no outro arquivo) estiliza a
 *      etiqueta Verde Limão Neon de desconto PIX.
 *    • Já o `@if` mostra o carregamento ou o aviso de sacola vazia, e o `@for`
 *      repete os cards das roupas na tela."
 *
 * 2️⃣ PERGUNTA 2: ONDE ESTÁ NO CÓDIGO?
 *    - 1ª Diretiva Personalizada: Neste arquivo (`src/app/directives/destaque-card.directive.ts`).
 *      • Linhas 45 a 54: `@HostBinding` altera o estilo CSS do card (`transform`, `boxShadow`, `border`).
 *      • Linha 60: `@HostListener('mouseenter')` dispara quando o mouse entra no card.
 *      • Linha 69: `@HostListener('mouseleave')` volta o card ao normal quando o mouse sai.
 *    - 2ª Diretiva Personalizada: Em `src/app/directives/badge-promo.directive.ts`.
 *    - Diretivas `@if` e `@for`: Em `src/app/pages/catalogo/catalogo.page.html`
 *      (Linha 93 tem o `@if (carregando)` e Linha 111 tem o `@for (roupa of listaRoupas; track roupa.id)`).
 *
 * 3️⃣ PERGUNTA 3: ONDE PODE SER VISTO EM TELA?
 *    - Passe o mouse em cima de qualquer roupa no Catálogo ou na Home: o card sobe
 *      e ganha a borda vermelha (`appDestaqueCard`).
 *    - Aponte para o selo verde limão "10% OFF PIX" (`appBadgePromo`).
 *    - Mostre a lista de roupas gerada pelo `@for` e clique em uma roupa para ver
 *      a tela de espera controlada pelo `@if`.
 * ============================================================================
 */

import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appDestaqueCard]', // Como usamos no HTML: <ion-card appDestaqueCard>
  standalone: true,
})
export class DestaqueCardDirective {
  // [NETO - Requisito 5]: @HostBinding controla o CSS diretamente no elemento <ion-card>
  @HostBinding('style.transition') transicao =
    'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.25s ease, border-color 0.25s ease';

  @HostBinding('style.transform') transformacao = 'translateY(0) scale(1)';

  @HostBinding('style.boxShadow') sombra = '0 10px 30px rgba(0, 0, 0, 0.55)';

  @HostBinding('style.border') borda = '1px solid #27272a';

  @HostBinding('style.cursor') cursor = 'pointer';

  // [NETO - Requisito 5]: Quando o mouse ENTRA no card, sobe 6px e ativa a borda vermelha
  @HostListener('mouseenter') aoEntrarComMouse(): void {
    this.transformacao = 'translateY(-6px) scale(1.015)';
    this.sombra = '0 16px 36px rgba(255, 42, 42, 0.28)';
    this.borda = '1px solid #ff2a2a';
  }

  // [NETO - Requisito 5]: Quando o mouse SAI do card, volta para a borda cinza chumbo
  @HostListener('mouseleave') aoSairComMouse(): void {
    this.transformacao = 'translateY(0) scale(1)';
    this.sombra = '0 10px 30px rgba(0, 0, 0, 0.55)';
    this.borda = '1px solid #27272a';
  }
}
