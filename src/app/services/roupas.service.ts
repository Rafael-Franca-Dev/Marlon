/**
 * ============================================================================
 * 👤 PARTE EXCLUSIVA DO THIAGO — REQUISITO 2 (API) E REQUISITO 4 (1º SERVICE)
 * ARQUIVO: src/app/services/roupas.service.ts
 * ============================================================================
 * 🎯 O QUE O THIAGO DEVE EXPLICAR PARA O PROFESSOR:
 *
 * 1️⃣ PERGUNTA 1: O QUE O REQUISITO FAZ NO SEU PROJETO?
 *    "Professor, eu fiquei responsável pela API pública (Requisito 2) e pelo
 *    primeiro Service com HttpClient (Requisito 4). Este arquivo é o RoupasService:
 *    ele conecta nossa loja à Fake Store API e possui os 3 métodos GET obrigatórios:
 *    o primeiro busca as roupas masculinas, o segundo busca as roupas femininas
 *    e o terceiro busca uma roupa específica pelo ID."
 *
 * 2️⃣ PERGUNTA 2: ONDE ESTÁ NO CÓDIGO? (Abra este arquivo e mostre estas linhas):
 *    - Linha 53: `private readonly http = inject(HttpClient)` -> Injeta o cliente HTTP.
 *    - Linha 58: `private readonly apiUrl = 'https://fakestoreapi.com/products'` -> URL da API.
 *    - Linha 125: `getRoupasMasculinas()` -> É o 1º método GET (`this.http.get(...)`).
 *    - Linha 142: `getRoupasFemininas()`  -> É o 2º método GET (`this.http.get(...)`).
 *    - Linha 159: `getRoupaPorId(id)`     -> É o 3º método GET (`this.http.get(...)`).
 *
 * 3️⃣ PERGUNTA 3: ONDE PODE SER VISTO EM TELA?
 *    - Abra a página "Catálogo" no site e clique nos botões "Roupas Masculinas"
 *      (chama o GET 1) e "Roupas Femininas" (chama o GET 2).
 *    - Depois clique em "Ver Peça" em qualquer roupa para abrir a página de
 *      "Detalhes", que chama o 3º método GET (`getRoupaPorId`) para carregar aquela peça.
 * ============================================================================
 */

import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import type { Observable } from 'rxjs';
import { of } from 'rxjs';
import { map, catchError, timeout } from 'rxjs/operators';

/**
 * Formato dos dados que a Fake Store API devolve para cada roupa.
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
  // providedIn: 'root' permite usar este Service em qualquer página do projeto
  providedIn: 'root',
})
export class RoupasService {
  // [THIAGO - Requisito 4]: Injeta o HttpClient para fazer chamadas HTTP na internet
  private readonly http = inject(HttpClient);

  // [THIAGO - Requisito 2]: Endereço base da Fake Store API (API pública sem token/header)
  private readonly apiUrl = 'https://fakestoreapi.com/products';

  /**
   * Tradução dos nomes e descrições das peças vindas da API para o estilo
   * da nossa loja Streetwear "Menino Mau", mantendo as fotos e IDs da API.
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
   * ==========================================================================
   * [THIAGO - MÉTODO GET 1]: Busca apenas as roupas masculinas na API
   * Endpoint chamado: GET https://fakestoreapi.com/products/category/men's clothing
   * ==========================================================================
   */
  getRoupasMasculinas(): Observable<ProdutoRoupa[]> {
    return this.http.get<ProdutoRoupa[]>(`${this.apiUrl}/category/men%27s%20clothing`).pipe(
      timeout(6000),
      map((lista) => lista.map((item) => this.personalizarPeca(item))),
      catchError(() => of(this.obterFallbackMasculino())),
    );
  }

  /**
   * ==========================================================================
   * [THIAGO - MÉTODO GET 2]: Busca apenas as roupas femininas na API
   * Endpoint chamado: GET https://fakestoreapi.com/products/category/women's clothing
   * ==========================================================================
   */
  getRoupasFemininas(): Observable<ProdutoRoupa[]> {
    return this.http.get<ProdutoRoupa[]>(`${this.apiUrl}/category/women%27s%20clothing`).pipe(
      timeout(6000),
      map((lista) => lista.map((item) => this.personalizarPeca(item))),
      catchError(() => of(this.obterFallbackFeminino())),
    );
  }

  /**
   * ==========================================================================
   * [THIAGO - MÉTODO GET 3]: Busca os detalhes de 1 roupa específica pelo ID
   * Endpoint chamado: GET https://fakestoreapi.com/products/:id
   * ==========================================================================
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
