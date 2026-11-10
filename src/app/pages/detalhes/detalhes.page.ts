/**
 * ============================================================================
 * GUIA DE ESTUDO DO CÓDIGO — PÁGINA 3: DetalhesPage (Detalhes da Peça #ID)
 * ARQUIVO: src/app/pages/detalhes/detalhes.page.ts
 * ============================================================================
 * ONDE CADA INTEGRANTE DEVE PROCURAR SEU REQUISITO NESTE ARQUIVO:
 *
 * • INTEGRANTE 3 (Requisito 6 Extra — Parâmetro por Rota & Requisito 4 — SacolaService):
 *   - Linha 96: Injeção do `ActivatedRoute` (`private readonly route = inject(ActivatedRoute)`).
 *   - Linha 126: Captura do parâmetro `:id` enviado pela URL (`this.route.snapshot.paramMap.get('id')`).
 *   - Linha 155: Método `adicionarPecaNaSacola()` que usa o `SacolaService`.
 *
 * • INTEGRANTE 2 (Requisito 2 — 3º Método GET da API & Requisito 4 — RoupasService):
 *   - Linha 101: Injeção do `RoupasService`.
 *   - Linha 135: Método `carregarDetalhesDaRoupa(id)` que executa o 3º método GET
 *     da Fake Store API (`this.roupasService.getRoupaPorId(id)`).
 *
 * • INTEGRANTE 1 (Requisito 1 — 4 Páginas e UI/UX):
 *   - Linha 52: Decorator `@Component` da 3ª Página (`DetalhesPage`, standalone: true).
 *
 * • INTEGRANTE 4 (Requisito 3 — 4 Pipes):
 *   - Linhas 58 a 62: Importação das 2 Pipes Built-in (`CurrencyPipe`, `UpperCasePipe`)
 *     e das 2 Pipes Personalizadas (`TraduzirCategoriaPipe`, `DescontoPixPipe`).
 *
 * • INTEGRANTE 5 (Requisito 5 — Diretivas Personalizadas e `@if` / `@for`):
 *   - Linhas 64 e 65: Importação de `DestaqueCardDirective` e `BadgePromoDirective`.
 *   - Linha 116: Array `tamanhosDisponiveis = ['P', 'M', 'G', 'GG']` percorrido com `@for`.
 * ============================================================================
 */

import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
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
  IonCardTitle,
  IonCardContent,
  IonGrid,
  IonRow,
  IonCol,
  IonSpinner,
  IonChip,
  IonLabel,
} from '@ionic/angular';

import { RoupasService, ProdutoRoupa } from '../../services/roupas.service';
import { SacolaService } from '../../services/sacola.service';
import { TraduzirCategoriaPipe } from '../../pipes/traduzir-categoria.pipe';
import { DescontoPixPipe } from '../../pipes/desconto-pix.pipe';
import { DestaqueCardDirective } from '../../directives/destaque-card.directive';
import { BadgePromoDirective } from '../../directives/badge-promo.directive';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.page.html',
  styleUrls: ['./detalhes.page.scss'],
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
  /**
   * ActivatedRoute lê o parâmetro `:id` enviado pela rota (Integrante 3 - Requisito 6 Extra).
   */
  private readonly route = inject(ActivatedRoute);

  /**
   * Injeção dos 2 Services obrigatórios (Integrante 2 e Integrante 3 - Requisito 4).
   */
  private readonly roupasService = inject(RoupasService);
  public readonly sacolaService = inject(SacolaService);

  /**
   * Guarda a peça de roupa retornada pelo MÉTODO GET 3 da API.
   */
  public roupaSelecionada: ProdutoRoupa | null = null;

  /**
   * Guarda o ID recebido na URL para exibir em tela na apresentação.
   */
  public idRotaRecebido: number = 0;

  /**
   * Grade de tamanhos para demonstrar a diretiva `@for` (Integrante 5).
   */
  public readonly tamanhosDisponiveis: string[] = ['P', 'M', 'G', 'GG'];
  public tamanhoEscolhido: string = 'M';

  public carregando: boolean = true;
  public feedbackAdicionado: boolean = false;

  ngOnInit(): void {
    // PASSO 1 (Integrante 3 - Ponto Extra): Captura o parâmetro `:id` da URL (`/detalhes/:id`)
    const idParametro = Number(this.route.snapshot.paramMap.get('id'));
    this.idRotaRecebido = idParametro || 1;

    // PASSO 2 (Integrante 2 - Método GET 3): Busca os detalhes desta peça na Fake Store API
    this.carregarDetalhesDaRoupa(this.idRotaRecebido);
  }

  /**
   * Chama o 3º método GET do RoupasService (`GET /products/:id`).
   */
  carregarDetalhesDaRoupa(id: number): void {
    this.carregando = true;

    this.roupasService.getRoupaPorId(id).subscribe({
      next: (dadosRoupa) => {
        this.roupaSelecionada = dadosRoupa;
        this.carregando = false;
      },
      error: () => {
        this.carregando = false;
      },
    });
  }

  selecionarTamanho(tamanho: string): void {
    this.tamanhoEscolhido = tamanho;
  }

  /**
   * Adiciona a peça atual na Sacola de Compras usando o `SacolaService` (Integrante 3).
   */
  adicionarPecaNaSacola(): void {
    if (!this.roupaSelecionada) {
      return;
    }

    this.sacolaService.adicionarItem(this.roupaSelecionada);
    this.feedbackAdicionado = true;

    setTimeout(() => {
      this.feedbackAdicionado = false;
    }, 1800);
  }
}
