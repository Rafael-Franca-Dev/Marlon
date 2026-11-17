/**
 * ============================================================================
 * 👤 PARTE PRINCIPAL DO MENINO MAL — PÁGINA 1: HOME (src/app/home/home.page.ts)
 * ============================================================================
 * 🎯 O QUE O MENINO MAL EXPLICA NESTE ARQUIVO:
 * - É a 1ª página do aplicativo (`HomePage`, configurada com `standalone: true`).
 * - Mostra os Produtos em Destaque da Semana (`destaquesDaSemana`: "T-SHIRT Menino Malino"
 *   e "Calça Agredindo a Moda").
 * - Mostra a seção "Escolha sua Linha" (`categoriasVitrine`: Masculino e Feminino).
 * - Controla o Carrossel de Roupas em Destaque (`roupasCarrossel`), que troca de
 *   roupa automaticamente a cada 3,8 segundos sem mostrar preço.
 *
 * 📍 ONDE OS OUTROS INTEGRANTES TAMBÉM APARECEM AQUI:
 * - RAFAEL (Linha 89): `sacolaService = inject(SacolaService)` (contador da sacola).
 * - GAGO (Linhas 57 e 59): `UpperCasePipe` e `TraduzirCategoriaPipe`.
 * - NETO (Linhas 61 e 62): `DestaqueCardDirective` e `BadgePromoDirective`.
 * ============================================================================
 */

import { UpperCasePipe } from '@angular/common';
import type { OnInit, OnDestroy } from '@angular/core';
import { Component, ChangeDetectorRef, inject } from '@angular/core';
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
  IonChip,
  IonLabel,
} from '@ionic/angular';

import { BadgePromoDirective } from '../directives/badge-promo.directive';
import { DestaqueCardDirective } from '../directives/destaque-card.directive';
import { TraduzirCategoriaPipe } from '../pipes/traduzir-categoria.pipe';
import { SacolaService } from '../services/sacola.service';

export interface RoupaDestaqueHome {
  id: number;
  nome: string;
  subtitulo: string;
  categoriaApi: string;
  descricaoCurta: string;
  imagem: string;
  selo: string;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    RouterLink,
    // [GAGO - Requisito 3]: Pipe Built-in nativa + Pipe Personalizada
    UpperCasePipe,
    TraduzirCategoriaPipe,
    // [NETO - Requisito 5]: 2 Diretivas Personalizadas
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
export class HomePage implements OnInit, OnDestroy {
  // [RAFAEL - Requisito 4]: 2º Service para mostrar quantos itens tem na sacola
  public readonly sacolaService = inject(SacolaService);

  private readonly cdr = inject(ChangeDetectorRef);

  // [MENINO MAL - Requisito 1]: Produtos em Destaque da Semana no topo da Home
  public readonly destaquesDaSemana: RoupaDestaqueHome[] = [
    {
      id: 2,
      nome: 'T-SHIRT Menino Malino',
      subtitulo: 'Malha Pesada Oversized // Edição Limitada',
      categoriaApi: "men's clothing",
      descricaoCurta:
        'A peça ícone da semana: corte urbano largo, gola estruturada e presença marcante para dominar o asfalto.',
      imagem: 'https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_t.png',
      selo: 'DESTAQUE DA SEMANA #01',
    },
    {
      id: 4,
      nome: 'Calça Agredindo a Moda',
      subtitulo: 'Modelagem Cargo Street // Alta Resistência',
      categoriaApi: "men's clothing",
      descricaoCurta:
        'Design ousado que quebra padrões com caimento perfeito, costuras reforçadas e estilo autêntico Menino Mau.',
      imagem: 'https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_t.png',
      selo: 'DESTAQUE DA SEMANA #02',
    },
  ];

  // [MENINO MAL - Requisito 1]: Opções "Escolha sua Linha" (Público Masculino e Feminino)
  public readonly categoriasVitrine = [
    {
      chaveApi: "men's clothing",
      filtro: 'masculino',
      icone: 'man-outline',
      descricao: 'T-shirts oversized, calças cargo, jaquetas pesadas e peças masculinas com corte urbano e atitude.',
      destaque: 'PÚBLICO MASCULINO',
    },
    {
      chaveApi: "women's clothing",
      icone: 'woman-outline',
      filtro: 'feminino',
      descricao: 'Jaquetas biker, parkas estruturadas, corta-ventos e peças femininas com personalidade forte.',
      destaque: 'PÚBLICO FEMININO',
    },
  ];

  // [MENINO MAL - Requisito 1]: Lista de roupas do Carrossel (muda a roupa sem mostrar preço)
  public readonly roupasCarrossel: RoupaDestaqueHome[] = [
    {
      id: 2,
      nome: 'T-SHIRT Menino Malino — Oversized',
      subtitulo: 'Coleção Oficial // Essência Urbana',
      categoriaApi: "men's clothing",
      descricaoCurta:
        'Confeccionada em algodão penteado de alta gramatura para quem exige conforto e identidade nas ruas.',
      imagem: 'https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_t.png',
      selo: 'LOOKBOOK 01 / 05',
    },
    {
      id: 4,
      nome: 'Calça Agredindo a Moda — Street Edition',
      subtitulo: 'Coleção Oficial // Corte Ousado',
      categoriaApi: "men's clothing",
      descricaoCurta: 'Modelagem exclusiva pensada para compor visuais urbanos de alto impacto em qualquer ocasião.',
      imagem: 'https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_t.png',
      selo: 'LOOKBOOK 02 / 05',
    },
    {
      id: 16,
      nome: 'Jaqueta Biker Couro Eco — Rebeldia',
      subtitulo: 'Coleção Oficial // Linha Noturna',
      categoriaApi: "women's clothing",
      descricaoCurta: 'Acabamento fosco em couro ecológico com capuz removível e zíperes metálicos de alto contraste.',
      imagem: 'https://fakestoreapi.com/img/81XH0e8fefL._AC_UY879_t.png',
      selo: 'LOOKBOOK 03 / 05',
    },
    {
      id: 3,
      nome: 'Jaqueta Sarja Pesada — Linha Asfalto',
      subtitulo: 'Coleção Oficial // Inverno Street',
      categoriaApi: "men's clothing",
      descricaoCurta: 'Estrutura robusta em sarja premium com gola alta e caimento impecável para noites frias.',
      imagem: 'https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_t.png',
      selo: 'LOOKBOOK 04 / 05',
    },
    {
      id: 17,
      nome: 'Corta-Vento Impermeável — Linha Noite',
      subtitulo: 'Coleção Oficial // Proteção & Estilo',
      categoriaApi: "women's clothing",
      descricaoCurta: 'Leveza e proteção contra vento e chuva com detalhes contrastantes e ajuste acinturado.',
      imagem: 'https://fakestoreapi.com/img/71HblAHs5xL._AC_UY879_-2t.png',
      selo: 'LOOKBOOK 05 / 05',
    },
  ];

  public indiceCarrossel: number = 0;

  private temporizadorCarrossel: ReturnType<typeof setInterval> | null = null;

  ngOnInit(): void {
    this.iniciarRotacaoCarrossel();
  }

  ngOnDestroy(): void {
    this.pararRotacaoCarrossel();
  }

  get roupaAtualCarrossel(): RoupaDestaqueHome {
    return this.roupasCarrossel[this.indiceCarrossel];
  }

  proximoSlide(): void {
    this.indiceCarrossel = (this.indiceCarrossel + 1) % this.roupasCarrossel.length;
    this.cdr.detectChanges();
  }

  slideAnterior(): void {
    this.indiceCarrossel = (this.indiceCarrossel - 1 + this.roupasCarrossel.length) % this.roupasCarrossel.length;
    this.cdr.detectChanges();
  }

  irParaSlide(indice: number): void {
    this.indiceCarrossel = indice;
    this.reiniciarTemporizador();
    this.cdr.detectChanges();
  }

  private iniciarRotacaoCarrossel(): void {
    this.temporizadorCarrossel = setInterval(() => {
      this.proximoSlide();
    }, 3800);
  }

  private pararRotacaoCarrossel(): void {
    if (this.temporizadorCarrossel) {
      clearInterval(this.temporizadorCarrossel);
      this.temporizadorCarrossel = null;
    }
  }

  private reiniciarTemporizador(): void {
    this.pararRotacaoCarrossel();
    this.iniciarRotacaoCarrossel();
  }
}
