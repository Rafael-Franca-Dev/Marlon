/**
 * ============================================================================
 * GUIA DO INTEGRANTE 1 — REQUISITO 1 (PÁGINA 1: HOME / VITRINE STREETWEAR)
 * ARQUIVO: src/app/home/home.page.ts
 * ============================================================================
 * • QUEM APRESENTA ESTE CÓDIGO PRINCIPALMENTE: INTEGRANTE 1
 * • REQUISITOS PRESENTES NESTE ARQUIVO PARA OS DEMAIS INTEGRANTES SABEREM ONDE BUSCAR:
 *   - INTEGRANTE 1 (Requisito 1): Estrutura Standalone da Página 1 (`HomePage`),
 *     importando UI Components do Ionic e `RouterLink`.
 *   - INTEGRANTE 3 (Requisito 4 - Parte 2): Linha 78 — Injeção do `SacolaService`
 *     para mostrar o contador da sacola no topo e os dados dos 5 integrantes.
 *   - INTEGRANTE 4 (Requisito 3): Linha 46 e 48 — Importação da Pipe Built-in
 *     `UpperCasePipe` e da Pipe Personalizada `TraduzirCategoriaPipe`.
 *   - INTEGRANTE 5 (Requisito 5): Linha 50 e 51 — Importação das 2 Diretivas
 *     Personalizadas (`DestaqueCardDirective` e `BadgePromoDirective`).
 * ============================================================================
 */

import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UpperCasePipe } from '@angular/common';
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
  IonChip,
  IonLabel,
} from '@ionic/angular';

import { SacolaService, IntegranteEquipe } from '../services/sacola.service';
import { TraduzirCategoriaPipe } from '../pipes/traduzir-categoria.pipe';
import { DestaqueCardDirective } from '../directives/destaque-card.directive';
import { BadgePromoDirective } from '../directives/badge-promo.directive';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    RouterLink,
    // Pipe Built-in (Integrante 4 - Requisito 3)
    UpperCasePipe,
    // Pipe Personalizada (Integrante 4 - Requisito 3)
    TraduzirCategoriaPipe,
    // Diretivas Personalizadas (Integrante 5 - Requisito 5)
    DestaqueCardDirective,
    BadgePromoDirective,
    // Componentes de UI do Ionic (Integrante 1 - Requisito 1)
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
    IonChip,
    IonLabel,
  ],
})
export class HomePage {
  /**
   * Injeção do 2º Service (`SacolaService` - Integrante 3 / Requisito 4)
   */
  public readonly sacolaService = inject(SacolaService);

  /**
   * Departamentos da vitrine Streetwear "Menino Mau".
   * Os nomes em inglês são traduzidos no HTML pela Pipe `traduzirCategoria` (Integrante 4).
   */
  public readonly categoriasVitrine = [
    {
      chaveApi: "men's clothing",
      icone: 'man-outline',
      descricao:
        'Jaquetas bomber, camisetas oversized, peças em algodão pesado e acessórios com atitude urbana.',
      destaque: 'DROP MASCULINO // GET 1',
    },
    {
      chaveApi: "women's clothing",
      icone: 'woman-outline',
      descricao:
        'Jaquetas biker, corta-ventos impermeáveis, moletons estruturados e modelagem streetwear.',
      destaque: 'DROP FEMININO // GET 2',
    },
  ];

  /**
   * Lista dos 5 integrantes e o mapeamento exato de cada requisito.
   */
  public readonly equipe: IntegranteEquipe[] = this.sacolaService.listarEquipe();
}
