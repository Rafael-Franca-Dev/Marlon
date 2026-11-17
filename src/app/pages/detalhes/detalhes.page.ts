/**
 * ============================================================================
 * 👤 PÁGINA 3: DETALHES DA PEÇA (src/app/pages/detalhes/detalhes.page.ts)
 * ============================================================================
 * 📍 ONDE CADA UM DOS 5 INTEGRANTES DEVE MOSTRAR SEU REQUISITO NESTE ARQUIVO:
 *
 * • RAFAEL (Requisito 6 Extra — Parâmetro por Rota & Requisito 4 — SacolaService):
 *   - Linha 86: `private readonly route = inject(ActivatedRoute)` (lê a URL).
 *   - Linha 110: `const idParametro = Number(params.get('id'))` -> Pega o ID que
 *     veio da página anterior (ex: `/detalhes/2`).
 *   - Linha 142: `adicionarPecaNaSacola()` -> Usa o `SacolaService` para salvar a peça.
 *
 * • THIAGO (Requisito 2 — 3º Método GET da API):
 *   - Linha 122: `this.roupasService.getRoupaPorId(id)` -> É o 3º método GET da
 *     API que busca os detalhes apenas daquela roupa escolhida.
 *
 * • MENINO MAL (Requisito 1 — As 4 Páginas):
 *   - Linha 47: `@Component` da 3ª Página (`DetalhesPage`).
 *
 * • GAGO (Requisito 3 — As 4 Pipes):
 *   - Linhas 54 a 59: Importa `CurrencyPipe`, `UpperCasePipe`, `TraduzirCategoriaPipe`, `DescontoPixPipe`.
 *
 * • NETO (Requisito 5 — Diretivas Personalizadas + `@if` e `@for`):
 *   - Linhas 61 e 62: Importa `DestaqueCardDirective` e `BadgePromoDirective`.
 *   - Linha 102: Lista `tamanhosDisponiveis = ['P', 'M', 'G', 'GG']` usada no `@for`.
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
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonGrid,
  IonRow,
  IonCol,
  IonSpinner,
  IonChip,
  IonLabel,
} from '@ionic/angular';

import { BadgePromoDirective } from '../../directives/badge-promo.directive';
import { DestaqueCardDirective } from '../../directives/destaque-card.directive';
import { DescontoPixPipe } from '../../pipes/desconto-pix.pipe';
import { TraduzirCategoriaPipe } from '../../pipes/traduzir-categoria.pipe';
import type { ProdutoRoupa } from '../../services/roupas.service';
import { RoupasService } from '../../services/roupas.service';
import { SacolaService } from '../../services/sacola.service';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.page.html',
  styleUrls: ['./detalhes.page.scss'],
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
    IonCardTitle,
    IonCardContent,
    IonGrid,
    IonRow,
    IonCol,
    IonSpinner,
    IonChip,
    IonLabel,
  ],
})
export class DetalhesPage implements OnInit {
  // [RAFAEL - Requisito 6 Extra]: ActivatedRoute captura o parâmetro :id da URL
  private readonly route = inject(ActivatedRoute);

  // [THIAGO - Requisito 4]: 1º Service (HttpClient)
  private readonly roupasService = inject(RoupasService);

  // [RAFAEL - Requisito 4]: 2º Service (Sacola de Compras)
  public readonly sacolaService = inject(SacolaService);

  private readonly cdr = inject(ChangeDetectorRef);

  public roupaSelecionada: ProdutoRoupa | null = null;

  public idRotaRecebido: number = 0;

  // [NETO - Requisito 5]: Array de tamanhos percorrido com @for no HTML
  public readonly tamanhosDisponiveis: string[] = ['P', 'M', 'G', 'GG'];
  public tamanhoEscolhido: string = 'M';

  // [NETO - Requisito 5]: Variável controlada pelo @if para mostrar "Estamos separando no estoque..."
  public carregando: boolean = true;
  public feedbackAdicionado: boolean = false;

  ngOnInit(): void {
    // [RAFAEL - Requisito 6 Extra]: Lê o parâmetro :id passado pela rota
    this.route.paramMap.subscribe((params) => {
      const idParametro = Number(params.get('id'));
      this.idRotaRecebido = idParametro || 2;

      // [THIAGO - Requisito 2]: Chama o 3º método GET da API usando esse ID
      this.carregarDetalhesDaRoupa(this.idRotaRecebido);
    });
  }

  /**
   * [THIAGO - MÉTODO GET 3]: Busca na Fake Store API apenas a roupa com este ID
   */
  carregarDetalhesDaRoupa(id: number): void {
    this.carregando = true;
    this.cdr.detectChanges();

    this.roupasService.getRoupaPorId(id).subscribe({
      next: (dadosRoupa) => {
        setTimeout(() => {
          this.roupaSelecionada = dadosRoupa;
          this.carregando = false;
          this.cdr.detectChanges();
        }, 450);
      },
      error: () => {
        this.carregando = false;
        this.cdr.detectChanges();
      },
    });
  }

  selecionarTamanho(tamanho: string): void {
    this.tamanhoEscolhido = tamanho;
    this.cdr.detectChanges();
  }

  /**
   * [RAFAEL - Requisito 4]: Adiciona a peça na Sacola de Compras (2º Service)
   */
  adicionarPecaNaSacola(): void {
    if (!this.roupaSelecionada) {
      return;
    }

    this.sacolaService.adicionarItem(this.roupaSelecionada);
    this.feedbackAdicionado = true;
    this.cdr.detectChanges();

    setTimeout(() => {
      this.feedbackAdicionado = false;
      this.cdr.detectChanges();
    }, 1800);
  }
}
