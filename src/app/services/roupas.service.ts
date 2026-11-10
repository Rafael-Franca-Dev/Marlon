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
 *   - Linha 50: Injeção do `HttpClient` (`private readonly http = inject(HttpClient)`).
 *   - Linha 55: URL base da Fake Store API (`https://fakestoreapi.com/products`).
 *   - Linhas 64 a 69: MÉTODO GET 1 (`getRoupasMasculinas()`) -> busca roupas masculinas.
 *   - Linhas 77 a 82: MÉTODO GET 2 (`getRoupasFemininas()`)  -> busca roupas femininas.
 *   - Linhas 91 a 93: MÉTODO GET 3 (`getRoupaPorId(id)`)     -> busca 1 peça pelo ID.
 *   - Complemento em `src/main.ts` (Linha 47): `provideHttpClient()` que habilita o HTTP.
 *
 * • COMO RESPONDER ÀS 3 PERGUNTAS DO PROFESSOR NA APRESENTAÇÃO:
 *   1. O que o requisito faz no seu projeto?
 *      Este primeiro Service (`RoupasService`) aloca o uso do `HttpClient` do Angular
 *      para conectar nossa loja de roupas à Fake Store API através de 3 métodos GET
 *      distintos: roupas masculinas, roupas femininas e detalhes de uma peça por ID.
 *   2. Onde está no código?
 *      Neste arquivo (`src/app/services/roupas.service.ts`), habilitado pelo
 *      `provideHttpClient()` no `src/main.ts` e consumido em `catalogo.page.ts` e `detalhes.page.ts`.
 *   3. Onde pode ser visto em tela?
 *      - Na tela Catálogo (`/catalogo`), ao alternar entre os botões "Masculino (GET 1)"
 *        e "Feminino (GET 2)".
 *      - Na tela Detalhes (`/detalhes/:id`), que executa o 3º método GET (`getRoupaPorId`)
 *        para exibir a foto grande, nota e descrição da peça clicada.
 * ============================================================================
 */

import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

/**
 * Interface que tipa o formato exato de cada roupa retornada pela Fake Store API.
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
  // 'root' permite que o Angular injete uma única instância deste service em qualquer página
  providedIn: 'root',
})
export class RoupasService {
  /**
   * Injeção do HttpClient do Angular (habilitado via provideHttpClient no main.ts)
   * para realizar chamadas HTTP para a API externa.
   */
  private readonly http = inject(HttpClient);

  /**
   * URL base da Fake Store API (API pública gratuita sugerida no PDF do projeto).
   */
  private readonly apiUrl = 'https://fakestoreapi.com/products';

  /**
   * --------------------------------------------------------------------------
   * MÉTODO GET 1: Buscar Roupas Masculinas
   * --------------------------------------------------------------------------
   * Faz uma requisição HTTP GET para o endpoint da categoria "men's clothing".
   */
  getRoupasMasculinas(): Observable<ProdutoRoupa[]> {
    const categoriaCodificada = encodeURIComponent("men's clothing");
    return this.http.get<ProdutoRoupa[]>(
      `${this.apiUrl}/category/${categoriaCodificada}`
    );
  }

  /**
   * --------------------------------------------------------------------------
   * MÉTODO GET 2: Buscar Roupas Femininas
   * --------------------------------------------------------------------------
   * Faz uma requisição HTTP GET para o endpoint da categoria "women's clothing".
   */
  getRoupasFemininas(): Observable<ProdutoRoupa[]> {
    const categoriaCodificada = encodeURIComponent("women's clothing");
    return this.http.get<ProdutoRoupa[]>(
      `${this.apiUrl}/category/${categoriaCodificada}`
    );
  }

  /**
   * --------------------------------------------------------------------------
   * MÉTODO GET 3: Buscar uma Peça de Roupa específica pelo ID
   * --------------------------------------------------------------------------
   * Faz uma requisição HTTP GET para `/products/:id`.
   * Utilizado na página de Detalhes quando o ID é passado por rota (Ponto Extra).
   */
  getRoupaPorId(id: number): Observable<ProdutoRoupa> {
    return this.http.get<ProdutoRoupa>(`${this.apiUrl}/${id}`);
  }
}
