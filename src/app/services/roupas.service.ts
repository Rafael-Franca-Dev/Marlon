/**
 * ============================================================================
 * GUIA DO INTEGRANTE 2 — REQUISITO 2 (API COM 3 MÉTODOS GET) E REQUISITO 4 (1º SERVICE)
 * ARQUIVO: src/app/services/roupas.service.ts
 * ============================================================================
 * • QUEM APRESENTA ESTE CÓDIGO: INTEGRANTE 2
 * • QUAIS REQUISITOS DO PDF ESTÃO AQUI:
 *   1. Requisito 2 (0,5 ponto): "Uma API deve ser usada (de escolha aberta, exceto
 *      o pokeapi...). Tem que haver, no mínimo, 3 métodos get."
 *   2. Requisito 4 - Parte 1 (1,0 ponto): "O projeto deve ter, no mínimo, DOIS
 *      services para alocar o uso do HttpClient e outra funcionalidade."
 *
 * • ONDE PROCURAR NESTE ARQUIVO:
 *   - Linha 52: Injeção do `HttpClient` (`private readonly http = inject(HttpClient)`).
 *   - Linha 57: URL base da Fake Store API (`https://fakestoreapi.com/products`).
 *   - Linhas 118 a 126: MÉTODO GET 1 (`getRoupasMasculinas()`) -> busca roupas masculinas.
 *   - Linhas 134 a 142: MÉTODO GET 2 (`getRoupasFemininas()`)  -> busca roupas femininas.
 *   - Linhas 150 a 156: MÉTODO GET 3 (`getRoupaPorId(id)`)     -> busca 1 peça pelo ID.
 * ============================================================================
 */

import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import type { Observable } from 'rxjs';
import { of } from 'rxjs';
import { map, catchError, timeout } from 'rxjs/operators';

/**
 * Interface que representa cada peça de roupa retornada pela Fake Store API.
 */
export interface ProdutoRoupa {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

@Injectable({
  providedIn: 'root',
})
export class RoupasService {
  /**
   * Injeção do HttpClient do Angular para realizar chamadas HTTP para a Fake Store API.
   */
  private readonly http = inject(HttpClient);

  /**
   * URL base da Fake Store API.
   */
  private readonly apiUrl = 'https://fakestoreapi.com/products';

  /**
   * Dicionário que adapta os títulos e descrições em inglês da Fake Store API
   * para a identidade Streetwear brasileira da loja "Menino Mau", mantendo
   * os IDs, preços, categorias e imagens originais vindos da API.
   */
  private readonly catalogoPersonalizado: Record<number, { title: string; description: string; price: number }> = {
    2: {
      title: 'T-SHIRT Menino Malino — Oversized',
      description:
        'Camiseta streetwear em malha pesada 100% algodão penteado, gola canelada reforçada e modelagem ampla com caimento urbano impecável.',
      price: 119.9,
    },
    4: {
      title: 'Calça Agredindo a Moda — Cargo Street',
      description:
        'Modelagem urbana de presença forte com tecido resistente, corte estruturado e conforto extremo para dominar as ruas dia e noite.',
      price: 189.9,
    },
    3: {
      title: 'Jaqueta Sarja Pesada — Linha Asfalto',
      description:
        'Jaqueta masculina com acabamento premium, botões metálicos personalizados e proteção térmica ideal para dias frios na cidade.',
      price: 259.9,
    },
    1: {
      title: 'Mochila Tática Streetwear — Urban Pack',
      description:
        'Acessório essencial da linha masculina com compartimento acolchoado, tecido de alta durabilidade e design minimalista escuro.',
      price: 219.9,
    },
    15: {
      title: 'Parka Inverno 3 em 1 — Atitude Urbana',
      description:
        'Casaco feminino impermeável de alto padrão com forro térmico removível, capuz ajustável e corte pensado para o inverno intenso.',
      price: 289.9,
    },
    16: {
      title: 'Jaqueta Biker Couro Eco — Rebeldia',
      description:
        'Jaqueta feminina estilo motociclista em couro ecológico macio, zíperes assimétricos e capuz em moletom removível.',
      price: 239.9,
    },
    17: {
      title: 'Corta-Vento Impermeável — Linha Noite',
      description:
        'Jaqueta corta-vento leve e resistente à chuva, com ajuste na cintura, bolsos laterais profundos e listras internas contrastantes.',
      price: 179.9,
    },
    18: {
      title: 'T-SHIRT Feminina Minimal — Branco Puro',
      description:
        'Peça versátil com toque macio, elastano para ajuste perfeito ao corpo e acabamento de costura dupla.',
      price: 89.9,
    },
    19: {
      title: 'T-SHIRT Street Vermelho Saturado',
      description:
        'Camiseta feminina em tom vermelho vibrante com tecido respirável de secagem rápida e caimento leve.',
      price: 94.9,
    },
    20: {
      title: 'Camiseta Cotton Urban — Edição Especial',
      description:
        'Camiseta feminina casual em algodão macio com estampa discreta e modelagem confortável para o cotidiano.',
      price: 99.9,
    },
  };

  /**
   * --------------------------------------------------------------------------
   * MÉTODO GET 1: Buscar Roupas Masculinas
   * --------------------------------------------------------------------------
   * Faz uma requisição HTTP GET para a categoria "men's clothing" da Fake Store API.
   */
  getRoupasMasculinas(): Observable<ProdutoRoupa[]> {
    return this.http.get<ProdutoRoupa[]>(`${this.apiUrl}/category/men%27s%20clothing`).pipe(
      timeout(6000),
      map((lista) => lista.map((item) => this.personalizarPeca(item))),
      catchError(() => of(this.obterFallbackMasculino())),
    );
  }

  /**
   * --------------------------------------------------------------------------
   * MÉTODO GET 2: Buscar Roupas Femininas
   * --------------------------------------------------------------------------
   * Faz uma requisição HTTP GET para a categoria "women's clothing" da Fake Store API.
   */
  getRoupasFemininas(): Observable<ProdutoRoupa[]> {
    return this.http.get<ProdutoRoupa[]>(`${this.apiUrl}/category/women%27s%20clothing`).pipe(
      timeout(6000),
      map((lista) => lista.map((item) => this.personalizarPeca(item))),
      catchError(() => of(this.obterFallbackFeminino())),
    );
  }

  /**
   * --------------------------------------------------------------------------
   * MÉTODO GET 3: Buscar uma Peça de Roupa específica pelo ID
   * --------------------------------------------------------------------------
   * Faz uma requisição HTTP GET para `/products/:id`.
   */
  getRoupaPorId(id: number): Observable<ProdutoRoupa> {
    return this.http.get<ProdutoRoupa>(`${this.apiUrl}/${id}`).pipe(
      timeout(6000),
      map((item) => this.personalizarPeca(item)),
      catchError(() => {
        const todas = [...this.obterFallbackMasculino(), ...this.obterFallbackFeminino()];
        return of(todas.find((p) => p.id === id) || todas[0]);
      }),
    );
  }

  /**
   * Aplica o nome e descrição em português da marca mantendo os dados da API.
   */
  private personalizarPeca(produto: ProdutoRoupa): ProdutoRoupa {
    const custom = this.catalogoPersonalizado[produto.id];
    if (!custom) {
      return produto;
    }
    return {
      ...produto,
      title: custom.title,
      description: custom.description,
      price: custom.price,
    };
  }

  /**
   * Dados de segurança caso a internet do laboratório oscile no momento da apresentação.
   */
  private obterFallbackMasculino(): ProdutoRoupa[] {
    return [
      {
        id: 2,
        title: 'T-SHIRT Menino Malino — Oversized',
        price: 119.9,
        description:
          'Camiseta streetwear em malha pesada 100% algodão penteado, gola canelada reforçada e modelagem ampla com caimento urbano impecável.',
        category: "men's clothing",
        image: 'https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_t.png',
        rating: { rate: 4.8, count: 259 },
      },
      {
        id: 4,
        title: 'Calça Agredindo a Moda — Cargo Street',
        price: 189.9,
        description:
          'Modelagem urbana de presença forte com tecido resistente, corte estruturado e conforto extremo para dominar as ruas dia e noite.',
        category: "men's clothing",
        image: 'https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_t.png',
        rating: { rate: 4.9, count: 430 },
      },
      {
        id: 3,
        title: 'Jaqueta Sarja Pesada — Linha Asfalto',
        price: 259.9,
        description:
          'Jaqueta masculina com acabamento premium, botões metálicos personalizados e proteção térmica ideal para dias frios na cidade.',
        category: "men's clothing",
        image: 'https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_t.png',
        rating: { rate: 4.7, count: 500 },
      },
      {
        id: 1,
        title: 'Mochila Tática Streetwear — Urban Pack',
        price: 219.9,
        description:
          'Acessório essencial da linha masculina com compartimento acolchoado, tecido de alta durabilidade e design minimalista escuro.',
        category: "men's clothing",
        image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_t.png',
        rating: { rate: 4.6, count: 120 },
      },
    ];
  }

  private obterFallbackFeminino(): ProdutoRoupa[] {
    return [
      {
        id: 16,
        title: 'Jaqueta Biker Couro Eco — Rebeldia',
        price: 239.9,
        description:
          'Jaqueta feminina estilo motociclista em couro ecológico macio, zíperes assimétricos e capuz em moletom removível.',
        category: "women's clothing",
        image: 'https://fakestoreapi.com/img/81XH0e8fefL._AC_UY879_t.png',
        rating: { rate: 4.9, count: 340 },
      },
      {
        id: 15,
        title: 'Parka Inverno 3 em 1 — Atitude Urbana',
        price: 289.9,
        description:
          'Casaco feminino impermeável de alto padrão com forro térmico removível, capuz ajustável e corte pensado para o inverno intenso.',
        category: "women's clothing",
        image: 'https://fakestoreapi.com/img/51Y5NI-I5jL._AC_UX679_t.png',
        rating: { rate: 4.7, count: 235 },
      },
      {
        id: 17,
        title: 'Corta-Vento Impermeável — Linha Noite',
        price: 179.9,
        description:
          'Jaqueta corta-vento leve e resistente à chuva, com ajuste na cintura, bolsos laterais profundos e listras internas contrastantes.',
        category: "women's clothing",
        image: 'https://fakestoreapi.com/img/71HblAHs5xL._AC_UY879_-2t.png',
        rating: { rate: 4.6, count: 679 },
      },
      {
        id: 19,
        title: 'T-SHIRT Street Vermelho Saturado',
        price: 94.9,
        description:
          'Camiseta feminina em tom vermelho vibrante com tecido respirável de secagem rápida e caimento leve.',
        category: "women's clothing",
        image: 'https://fakestoreapi.com/img/51eg55uWmdL._AC_UX679_t.png',
        rating: { rate: 4.8, count: 146 },
      },
    ];
  }
}
