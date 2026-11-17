/**
 * ============================================================================
 * 👤 PÁGINA 4: SACOLA DE COMPRAS (src/app/pages/sacola/sacola.page.ts)
 * ============================================================================
 * 📍 ONDE CADA UM DOS 5 INTEGRANTES DEVE MOSTRAR SEU REQUISITO NESTE ARQUIVO:
 *
 * • RAFAEL (Requisito 4 - Parte 2 — 2º Service `SacolaService`):
 *   - Linha 74: `public readonly sacolaService = inject(SacolaService)`.
 *   - Linhas 80 a 101: Métodos `aumentarItem`, `diminuirItem`, `excluirItem`,
 *     `esvaziarSacola` e `finalizarCompra` que chamam o `SacolaService`.
 *
 * • MENINO MAL (Requisito 1 — As 4 Páginas):
 *   - Linha 44: `@Component` da 4ª Página (`SacolaPage`, standalone: true).
 *
 * • GAGO (Requisito 3 — As 4 Pipes):
 *   - Linhas 51 a 55: Importa `CurrencyPipe`, `UpperCasePipe`, `TraduzirCategoriaPipe`, `DescontoPixPipe`.
 *
 * • NETO (Requisito 5 — Diretivas Personalizadas + `@if` e `@for`):
 *   - Linhas 57 e 58: Importa `DestaqueCardDirective` e `BadgePromoDirective`.
 *   - Linha 78: Variável `pedidoConfirmado` controlada por `@if` no HTML.
 * ============================================================================
 */

import { CurrencyPipe, UpperCasePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
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

import { BadgePromoDirective } from '../../directives/badge-promo.directive';
import { DestaqueCardDirective } from '../../directives/destaque-card.directive';
import { DescontoPixPipe } from '../../pipes/desconto-pix.pipe';
import { TraduzirCategoriaPipe } from '../../pipes/traduzir-categoria.pipe';
import type { ProdutoRoupa } from '../../services/roupas.service';
import { SacolaService } from '../../services/sacola.service';

@Component({
  selector: 'app-sacola',
  templateUrl: './sacola.page.html',
  styleUrls: ['./sacola.page.scss'],
  standalone: true,
  imports: [
    RouterLink,
    // [GAGO - Requisito 3]: 2 Pipes Built-in nativas + 2 Pipes Personalizadas
    CurrencyPipe,
    UpperCasePipe,
    TraduzirCategoriaPipe,
    DescontoPixPipe,
    // [NETO - Requisito 5]: 2 Diretivas Personalizadas
    DestaqueCardDirective,
    BadgePromoDirective,
    // [MENINO MAL - Requisito 1]: Componentes do Ionic
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
  // [RAFAEL - Requisito 4]: Injeta o 2º Service do projeto (SacolaService)
  public readonly sacolaService = inject(SacolaService);

  // [NETO - Requisito 5]: Variável usada pelo bloco @if para mostrar a tela de sucesso
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
