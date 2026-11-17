/**
 * ============================================================================
 * 👤 PÁGINA 2: CATÁLOGO DE ROUPAS (src/app/pages/catalogo/catalogo.page.ts)
 * ============================================================================
 * 📍 ONDE CADA UM DOS 5 INTEGRANTES DEVE MOSTRAR SEU REQUISITO NESTE ARQUIVO:
 *
 * • MENINO MAL (Requisito 1 — As 4 Páginas):
 *   - Linha 52: `@Component` da 2ª Página (`CatalogoPage`, standalone: true).
 *
 * • THIAGO (Requisito 2 — API com 3 GETs & Requisito 4 — 1º Service):
 *   - Linha 89: `private readonly roupasService = inject(RoupasService)` (Injeta o 1º Service).
 *   - Linhas 136 a 161: Método `carregarRoupasPorDepartamento()` que chama:
 *     • MÉTODO GET 1: `this.roupasService.getRoupasMasculinas()`
 *     • MÉTODO GET 2: `this.roupasService.getRoupasFemininas()`
 *
 * • RAFAEL (Requisito 4 — 2º Service & Requisito 6 — Parâmetro por Rota):
 *   - Linha 90: `public readonly sacolaService = inject(SacolaService)` (Injeta o 2º Service).
 *   - Linha 167: Método `adicionarNaSacola()` que guarda a peça no `SacolaService`.
 *
 * • GAGO (Requisito 3 — As 4 Pipes):
 *   - Linhas 58 a 63: Importa as 2 Pipes Built-in (`CurrencyPipe`, `UpperCasePipe`)
 *     e as 2 Pipes Personalizadas (`TraduzirCategoriaPipe`, `DescontoPixPipe`).
 *
 * • NETO (Requisito 5 — 2 Diretivas Personalizadas + `@if` e `@for`):
 *   - Linhas 65 e 66: Importa as 2 Diretivas Personalizadas (`DestaqueCardDirective`
 *     e `BadgePromoDirective`).
 *   - Linha 100: Lista `listaRoupas` que o `@for` repete no HTML.
 *   - Linha 106: Variável `carregando` que o `@if` usa para mostrar o loading.
 * ============================================================================
 */

import { CurrencyPipe, UpperCasePipe } from '@angular/common';
import type { OnInit } from '@angular/core';
import { Component, ChangeDetectorRef, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonButton,
  IonIcon,
  IonBadge,
  IonSegment,
  IonSegmentButton,
  IonLabel,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCardContent,
  IonSpinner,
  IonChip,
} from '@ionic/angular';

import { BadgePromoDirective } from '../../directives/badge-promo.directive';
import { DestaqueCardDirective } from '../../directives/destaque-card.directive';
import { DescontoPixPipe } from '../../pipes/desconto-pix.pipe';
import { TraduzirCategoriaPipe } from '../../pipes/traduzir-categoria.pipe';
import type { ProdutoRoupa } from '../../services/roupas.service';
import { RoupasService } from '../../services/roupas.service';
import { SacolaService } from '../../services/sacola.service';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.page.html',
  styleUrls: ['./catalogo.page.scss'],
  standalone: true,
  imports: [
    RouterLink,
    // [GAGO - Requisito 3]: 2 Pipes Built-in nativas do Angular
    CurrencyPipe,
    UpperCasePipe,
    // [GAGO - Requisito 3]: 2 Pipes Personalizadas criadas por nós
    TraduzirCategoriaPipe,
    DescontoPixPipe,
    // [NETO - Requisito 5]: 2 Diretivas Personalizadas criadas por nós
    DestaqueCardDirective,
    BadgePromoDirective,
    // [MENINO MAL - Requisito 1]: Componentes visuais do Ionic
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButtons,
    IonButton,
    IonIcon,
    IonBadge,
    IonSegment,
    IonSegmentButton,
    IonLabel,
    IonGrid,
    IonRow,
    IonCol,
    IonCard,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonCardContent,
    IonSpinner,
    IonChip,
  ],
})
export class CatalogoPage implements OnInit {
  // [THIAGO - Requisito 2 e 4]: 1º Service que busca as roupas na Fake Store API
  private readonly roupasService = inject(RoupasService);

  // [RAFAEL - Requisito 4]: 2º Service que gerencia a Sacola de Compras
  public readonly sacolaService = inject(SacolaService);

  private readonly route = inject(ActivatedRoute);
  private readonly cdr = inject(ChangeDetectorRef);

  // [NETO - Requisito 5]: Lista de roupas que o bloco @for percorre no HTML
  public listaRoupas: ProdutoRoupa[] = [];

  public departamentoAtivo: 'masculino' | 'feminino' = 'masculino';

  // [NETO - Requisito 5]: Variável que o bloco @if verifica para mostrar o spinner
  public carregando: boolean = true;

  public erroCarregamento: string = '';

  public ultimoAdicionadoId: number | null = null;

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      const linha = params.get('linha');
      if (linha === 'feminino') {
        this.carregarRoupasPorDepartamento('feminino');
      } else {
        this.carregarRoupasPorDepartamento('masculino');
      }
    });
  }

  trocarDepartamento(evento: CustomEvent): void {
    const valorSelecionado = evento.detail.value as 'masculino' | 'feminino';
    if (valorSelecionado) {
      this.carregarRoupasPorDepartamento(valorSelecionado);
    }
  }

  /**
   * [THIAGO - Requisito 2]: Chama o MÉTODO GET 1 (Masculino) ou o MÉTODO GET 2 (Feminino)
   */
  carregarRoupasPorDepartamento(departamento: 'masculino' | 'feminino'): void {
    this.departamentoAtivo = departamento;
    this.carregando = true;
    this.erroCarregamento = '';
    this.cdr.detectChanges();

    const requisicao$ =
      departamento === 'masculino' ? this.roupasService.getRoupasMasculinas() : this.roupasService.getRoupasFemininas();

    requisicao$.subscribe({
      next: (dados) => {
        this.listaRoupas = dados;
        this.carregando = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.erroCarregamento = 'Não foi possível carregar o catálogo no momento. Tente novamente.';
        this.carregando = false;
        this.cdr.detectChanges();
      },
    });
  }

  /**
   * [RAFAEL - Requisito 4]: Usa o 2º Service (SacolaService) para adicionar a peça
   */
  adicionarNaSacola(evento: Event, roupa: ProdutoRoupa): void {
    evento.stopPropagation();
    this.sacolaService.adicionarItem(roupa);
    this.ultimoAdicionadoId = roupa.id;
    this.cdr.detectChanges();

    setTimeout(() => {
      if (this.ultimoAdicionadoId === roupa.id) {
        this.ultimoAdicionadoId = null;
        this.cdr.detectChanges();
      }
    }, 1200);
  }
}
