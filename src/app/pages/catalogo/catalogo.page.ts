/**
 * ============================================================================
 * GUIA DE ESTUDO DO CÓDIGO — PÁGINA 2: CatalogoPage (Lista de Roupas da API)
 * ARQUIVO: src/app/pages/catalogo/catalogo.page.ts
 * ============================================================================
 * ONDE CADA INTEGRANTE DEVE PROCURAR SEU REQUISITO NESTE ARQUIVO:
 *
 * • INTEGRANTE 1 (Requisito 1 — 4 Páginas e UI/UX):
 *   - Linha 54: Decorator `@Component` da 2ª Página (`CatalogoPage`, standalone: true).
 *
 * • INTEGRANTE 2 (Requisito 2 — API com 3 GETs & Requisito 4 — 1º Service):
 *   - Linha 94: Injeção do 1º Service (`private readonly roupasService = inject(RoupasService)`).
 *   - Linhas 137 a 158: Método `carregarRoupasPorDepartamento()` que alterna entre:
 *     • MÉTODO GET 1: `this.roupasService.getRoupasMasculinas()`
 *     • MÉTODO GET 2: `this.roupasService.getRoupasFemininas()`
 *
 * • INTEGRANTE 3 (Requisito 4 — 2º Service & Requisito 6 — Parâmetro por Rota):
 *   - Linha 95: Injeção do 2º Service (`public readonly sacolaService = inject(SacolaService)`).
 *   - Linhas 164 a 174: Método `adicionarNaSacola()` que salva a roupa no `SacolaService`.
 *   - (No HTML desta página está o `[routerLink]="['/detalhes', roupa.id]"` do Ponto Extra).
 *
 * • INTEGRANTE 4 (Requisito 3 — 4 Pipes: 2 Personalizadas + 2 Built-in):
 *   - Linhas 60 e 61: Importação das 2 Pipes Built-in (`CurrencyPipe`, `UpperCasePipe`).
 *   - Linhas 63 e 64: Importação das 2 Pipes Personalizadas (`TraduzirCategoriaPipe`, `DescontoPixPipe`).
 *
 * • INTEGRANTE 5 (Requisito 5 — 2 Diretivas Personalizadas + `@if` e `@for`):
 *   - Linhas 66 e 67: Importação das 2 Diretivas Personalizadas (`DestaqueCardDirective`, `BadgePromoDirective`).
 *   - Linha 110: Variável `carregando` controlada pela diretiva estrutural `@if` no HTML.
 *   - Linha 100: Array `listaRoupas` percorrido pela diretiva estrutural `@for` no HTML.
 * ============================================================================
 */

import { Component, OnInit, inject } from '@angular/core';
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

import { RoupasService, ProdutoRoupa } from '../../services/roupas.service';
import { SacolaService } from '../../services/sacola.service';
import { TraduzirCategoriaPipe } from '../../pipes/traduzir-categoria.pipe';
import { DescontoPixPipe } from '../../pipes/desconto-pix.pipe';
import { DestaqueCardDirective } from '../../directives/destaque-card.directive';
import { BadgePromoDirective } from '../../directives/badge-promo.directive';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.page.html',
  styleUrls: ['./catalogo.page.scss'],
  standalone: true,
  imports: [
    RouterLink,
    // 2 Pipes Built-in nativas do Angular (Integrante 4 - Requisito 3)
    CurrencyPipe,
    UpperCasePipe,
    // 2 Pipes Personalizadas criadas para o projeto (Integrante 4 - Requisito 3)
    TraduzirCategoriaPipe,
    DescontoPixPipe,
    // 2 Diretivas Personalizadas criadas para o projeto (Integrante 5 - Requisito 5)
    DestaqueCardDirective,
    BadgePromoDirective,
    // Componentes visuais do Ionic (Integrante 1 - Requisito 1)
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
  /**
   * INJEÇÃO DOS 2 SERVICES OBRIGATÓRIOS (Requisito 4):
   * - roupasService (Integrante 2): Consome a Fake Store API via HttpClient.
   * - sacolaService (Integrante 3): Gerencia os itens adicionados à sacola.
   */
  private readonly roupasService = inject(RoupasService);
  public readonly sacolaService = inject(SacolaService);

  /**
   * Array de roupas retornado pela API (renderizado com @for pelo Integrante 5).
   */
  public listaRoupas: ProdutoRoupa[] = [];

  /**
   * Departamento selecionado ('masculino' -> GET 1 | 'feminino' -> GET 2).
   */
  public departamentoAtivo: 'masculino' | 'feminino' = 'masculino';

  /**
   * Controle booleano de carregamento (usado com @if pelo Integrante 5).
   */
  public carregando: boolean = true;

  public erroCarregamento: string = '';

  public ultimoAdicionadoId: number | null = null;

  ngOnInit(): void {
    // Carrega o 1º método GET ao iniciar a tela
    this.carregarRoupasPorDepartamento('masculino');
  }

  trocarDepartamento(evento: CustomEvent): void {
    const valorSelecionado = evento.detail.value as 'masculino' | 'feminino';
    if (valorSelecionado) {
      this.carregarRoupasPorDepartamento(valorSelecionado);
    }
  }

  /**
   * Executa o MÉTODO GET 1 ou o MÉTODO GET 2 do RoupasService (Integrante 2 - Requisito 2).
   */
  carregarRoupasPorDepartamento(departamento: 'masculino' | 'feminino'): void {
    this.departamentoAtivo = departamento;
    this.carregando = true;
    this.erroCarregamento = '';

    const requisicao$ =
      departamento === 'masculino'
        ? this.roupasService.getRoupasMasculinas()
        : this.roupasService.getRoupasFemininas();

    requisicao$.subscribe({
      next: (dados) => {
        this.listaRoupas = dados;
        this.carregando = false;
      },
      error: () => {
        this.erroCarregamento =
          'Falha ao consultar a Fake Store API. Verifique a conexão com a internet.';
        this.carregando = false;
      },
    });
  }

  /**
   * Aciona o 2º Service (SacolaService - Integrante 3 / Requisito 4).
   */
  adicionarNaSacola(evento: Event, roupa: ProdutoRoupa): void {
    evento.stopPropagation();
    this.sacolaService.adicionarItem(roupa);
    this.ultimoAdicionadoId = roupa.id;

    setTimeout(() => {
      if (this.ultimoAdicionadoId === roupa.id) {
        this.ultimoAdicionadoId = null;
      }
    }, 1200);
  }
}
