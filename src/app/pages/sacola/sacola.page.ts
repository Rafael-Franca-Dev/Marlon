/**
 * ============================================================================
 * GUIA DE ESTUDO DO CÓDIGO — PÁGINA 4: SacolaPage (Sacola de Compras)
 * ARQUIVO: src/app/pages/sacola/sacola.page.ts
 * ============================================================================
 * ONDE CADA INTEGRANTE DEVE PROCURAR SEU REQUISITO NESTE ARQUIVO:
 *
 * • INTEGRANTE 1 (Requisito 1 — 4 Páginas e UI/UX):
 *   - Linha 47: Decorator `@Component` da 4ª Página (`SacolaPage`, standalone: true).
 *
 * • INTEGRANTE 3 (Requisito 4 - Parte 2 — 2º Service `SacolaService`):
 *   - Linha 81: Injeção do 2º Service (`public readonly sacolaService = inject(SacolaService)`).
 *   - Linhas 91 a 122: Métodos `aumentarItem`, `diminuirItem`, `excluirItem`,
 *     `esvaziarSacola` e `finalizarCompra` que consomem o `SacolaService`.
 *
 * • INTEGRANTE 4 (Requisito 3 — 4 Pipes):
 *   - Linhas 53 a 57: Importação das 2 Pipes Built-in (`CurrencyPipe`, `UpperCasePipe`)
 *     e das 2 Pipes Personalizadas (`TraduzirCategoriaPipe`, `DescontoPixPipe`).
 *
 * • INTEGRANTE 5 (Requisito 5 — 2 Diretivas Personalizadas + `@if` e `@for`):
 *   - Linhas 59 e 60: Importação de `DestaqueCardDirective` e `BadgePromoDirective`.
 *   - Linha 86: Variável `pedidoConfirmado` controlada por `@if` no template HTML.
 * ============================================================================
 */

import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CurrencyPipe, UpperCasePipe } from '@angular/common';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonButton,
  IonIcon,
  IonBadge,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCardContent,
  IonGrid,
  IonRow,
  IonCol,
} from '@ionic/angular';

import { SacolaService } from '../../services/sacola.service';
import { ProdutoRoupa } from '../../services/roupas.service';
import { TraduzirCategoriaPipe } from '../../pipes/traduzir-categoria.pipe';
import { DescontoPixPipe } from '../../pipes/desconto-pix.pipe';
import { DestaqueCardDirective } from '../../directives/destaque-card.directive';
import { BadgePromoDirective } from '../../directives/badge-promo.directive';

@Component({
  selector: 'app-sacola',
  templateUrl: './sacola.page.html',
  styleUrls: ['./sacola.page.scss'],
  standalone: true,
  imports: [
    RouterLink,
    // 2 Pipes Built-in nativas do Angular (Integrante 4 - Requisito 3)
    CurrencyPipe,
    UpperCasePipe,
    // 2 Pipes Personalizadas (Integrante 4 - Requisito 3)
    TraduzirCategoriaPipe,
    DescontoPixPipe,
    // 2 Diretivas Personalizadas (Integrante 5 - Requisito 5)
    DestaqueCardDirective,
    BadgePromoDirective,
    // Componentes do Ionic (Integrante 1 - Requisito 1)
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButtons,
    IonButton,
    IonIcon,
    IonBadge,
    IonCard,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonCardContent,
    IonGrid,
    IonRow,
    IonCol,
  ],
})
export class SacolaPage {
  /**
   * Injeção do 2º Service do projeto (`SacolaService` - Integrante 3 / Requisito 4)
   */
  public readonly sacolaService = inject(SacolaService);

  /**
   * Controle booleano de confirmação de compra (usado com `@if` pelo Integrante 5).
   */
  public pedidoConfirmado: boolean = false;

  aumentarItem(produto: ProdutoRoupa): void {
    this.sacolaService.adicionarItem(produto);
  }

  diminuirItem(produtoId: number): void {
    this.sacolaService.diminuirQuantidade(produtoId);
  }

  excluirItem(produtoId: number): void {
    this.sacolaService.removerItem(produtoId);
  }

  esvaziarSacola(): void {
    this.sacolaService.limparSacola();
  }

  finalizarCompra(): void {
    this.sacolaService.limparSacola();
    this.pedidoConfirmado = true;
  }
}
