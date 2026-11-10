# UrbanStyle — Loja de Roupas (Ionic + Angular Standalone)

Projeto desenvolvido estritamente de acordo com os requisitos da disciplina de **Desenvolvimento Mobile (Ionic com Angular Standalone)**.

---

## Como Rodar o Projeto no Laboratório

No terminal dentro da pasta do projeto (`C:\Users\rafae\Desktop\Marlon`):

```bash
# 1. Instalar as dependências (caso ainda não estejam instaladas no PC do laboratório)
npm install

# 2. Iniciar o servidor local de desenvolvimento
npm start
# (Ou: npx ionic serve)
```
O projeto abrirá automaticamente em `http://localhost:4200` (ou `http://localhost:8100`).

---

## Checklist dos Requisitos do Professor (5,0 Pontos + 1,0 Ponto Extra)

| # | Requisito Exigido no PDF | Pontuação | Implementação no Projeto |
| :-: | :--- | :-: | :--- |
| **1** | Mínimo de **3 pages além do Home** (Total: 4 páginas) | **1,0 pt** | 1. `home` (Vitrine + Equipe)<br>2. `catalogo` (Lista de Roupas)<br>3. `detalhes/:id` (Detalhes da Peça)<br>4. `sacola` (Sacola de Compras) |
| **2** | **1 API pública** (sem header) com no mínimo **3 métodos GET** | **0,5 pt** | **Fake Store API** em `RoupasService`:<br>• `getRoupasMasculinas()` (`GET /category/men's clothing`)<br>• `getRoupasFemininas()` (`GET /category/women's clothing`)<br>• `getRoupaPorId(id)` (`GET /products/:id`) |
| **3** | **4 Pipes**: **2 Personalizadas** + **2 Built-in** (0,25 pt cada) | **1,0 pt** | **Personalizadas:** `traduzirCategoria` e `descontoPix`<br>**Built-in (Nativas):** `currency:'BRL'` e `uppercase` |
| **4** | **2 Services**: 1 para `HttpClient` e 1 para outra funcionalidade (1,0 pt cada) | **2,0 pts** | **Service 1:** `RoupasService` (aloca o `HttpClient` da API)<br>**Service 2:** `SacolaService` (gerencia a sacola de compras e equipe) |
| **5** | **2 Diretivas Personalizadas** (0,5 pt) + **2 Diretivas Estruturais `@if` e `@for`** (0,5 pt cada bloco) | **1,5 pt** | **Personalizadas:** `appDestaqueCard` e `appBadgePromo`<br>**Estruturais:** `@if` / `@else` e `@for` (sem usar `ngIf` ou `ngFor`) |
| **6** | **Pontuação Extra:** Passar parâmetro por rota de uma página para outra | **+1,0 pt** | Clicar em um card em `/catalogo` envia o `id` pela rota `['/detalhes', roupa.id]` e `DetalhesPage` captura via `ActivatedRoute` |
| — | **TOTAL MÁXIMO** | **6,0 pts** | **100% dos requisitos concluídos** |

---

## Roteiro de Apresentação para os 5 Integrantes

> **Regra do Professor no PDF:** Cada integrante deve responder às **3 vertentes** sobre a sua parte:
> 1. *O que o requisito faz no seu projeto?*
> 2. *Onde está no código?*
> 3. *Onde pode ser visto em tela?*

---

### Integrante 1 — As 4 Páginas e Navegação (`Requisito 1` - 1,0 ponto)
1. **O que o requisito faz no seu projeto?**
   Organiza o aplicativo da Loja de Roupas em 4 páginas completas, funcionais e estilizadas com componentes do Ionic (`Home`, `Catálogo`, `Detalhes` e `Sacola`), utilizando Angular Standalone e carregamento sob demanda (`loadComponent`).
2. **Onde está no código?**
   - Arquivo de rotas: `src/app/app.routes.ts`
   - Página 1 (Home): `src/app/home/home.page.ts` e `home.page.html`
   - Página 2 (Catálogo): `src/app/pages/catalogo/catalogo.page.ts` e `catalogo.page.html`
   - Página 3 (Detalhes): `src/app/pages/detalhes/detalhes.page.ts` e `detalhes.page.html`
   - Página 4 (Sacola): `src/app/pages/sacola/sacola.page.ts` e `sacola.page.html`
3. **Onde pode ser visto em tela?**
   Na barra superior de todas as telas (botões **Início**, **Catálogo** e **Sacola**) e navegando entre a vitrine inicial, a listagem de roupas, a ficha técnica de uma roupa e o carrinho/sacola.

---

### Integrante 2 — API Pública com 3 Métodos GET e 1º Service (`Requisito 2` + `Requisito 4 Parte 1` - 1,5 ponto)
1. **O que o requisito faz no seu projeto?**
   O `RoupasService` aloca o uso do `HttpClient` do Angular para consumir a **Fake Store API** através de **3 métodos GET distintos**: um para buscar roupas masculinas, um para buscar roupas femininas e um terceiro para buscar os dados de uma roupa específica pelo `id`.
2. **Onde está no código?**
   - Habilitação do `provideHttpClient()`: `src/main.ts` (linha 47)
   - Implementação do Service e dos 3 métodos GET: `src/app/services/roupas.service.ts`:
     - Método GET 1: `getRoupasMasculinas()`
     - Método GET 2: `getRoupasFemininas()`
     - Método GET 3: `getRoupaPorId(id: number)`
3. **Onde pode ser visto em tela?**
   - Na página **Catálogo (`/catalogo`)**: ao clicar nas abas **"Moda Masculina (GET 1)"** e **"Moda Feminina (GET 2)"**, a lista de roupas é recarregada diretamente da API.
   - Na página **Detalhes (`/detalhes/:id`)**: ao abrir qualquer peça, o 3º método GET busca os detalhes completos daquela roupa.

---

### Integrante 3 — 2º Service (`SacolaService`) e Parâmetro por Rota (`Requisito 4 Parte 2` + `Requisito 6 Extra` - 2,0 pontos)
1. **O que o requisito faz no seu projeto?**
   - **2º Service (`SacolaService`):** Gerencia o estado da Sacola de Compras em memória (adicionar roupa, aumentar/diminuir quantidade, remover item, limpar sacola e somar valor total).
   - **Parâmetro por Rota (Ponto Extra):** Quando o usuário clica em uma roupa no Catálogo, o `id` da peça é enviado na URL (`/detalhes/:id`) e lido na página de Detalhes pelo `ActivatedRoute`.
2. **Onde está no código?**
   - 2º Service: `src/app/services/sacola.service.ts`
   - Definição da rota com parâmetro: `src/app/app.routes.ts` (`path: 'detalhes/:id'`)
   - Envio do parâmetro no clique: `src/app/pages/catalogo/catalogo.page.html` (`[routerLink]="['/detalhes', roupa.id]"`)
   - Captura do parâmetro: `src/app/pages/detalhes/detalhes.page.ts` (`this.route.snapshot.paramMap.get('id')` no `ngOnInit`)
3. **Onde pode ser visto em tela?**
   - Ao clicar em uma roupa no Catálogo, a URL muda para `/detalhes/1` (ou o ID correspondente) e mostra o badge `"Parâmetro Rota ID: #1"`.
   - Ao clicar em **"+ Sacola"** ou **"Adicionar à Sacola"**, o contador no topo aumenta e a página **Sacola (`/sacola`)** lista todos os itens e valores calculados.

---

### Integrante 4 — As 4 Pipes: 2 Personalizadas e 2 Built-in (`Requisito 3` - 1,0 ponto)
1. **O que o requisito faz no seu projeto?**
   Transforma e formata os dados exibidos nos templates HTML sem modificar os dados originais da API:
   - **Pipe Personalizada 1 (`traduzirCategoria`):** Traduz `"men's clothing"` para `"Moda Masculina"` e `"women's clothing"` para `"Moda Feminina"`.
   - **Pipe Personalizada 2 (`descontoPix`):** Calcula automaticamente o preço da peça com 10% de desconto no PIX.
   - **Pipe Built-in 1 (`currency:'BRL'`):** Formata os valores numéricos como moeda brasileira (`R$`).
   - **Pipe Built-in 2 (`uppercase`):** Transforma os textos de categorias e etiquetas promocionais em letras maiúsculas.
2. **Onde está no código?**
   - Pipe Personalizada 1: `src/app/pipes/traduzir-categoria.pipe.ts`
   - Pipe Personalizada 2: `src/app/pipes/desconto-pix.pipe.ts`
   - Aplicadas nos templates: `catalogo.page.html`, `detalhes.page.html`, `sacola.page.html` e `home.page.html` (ex: `{{ roupa.category | traduzirCategoria | uppercase }}` e `{{ roupa.price | descontoPix:10 | currency:'BRL' }}`).
3. **Onde pode ser visto em tela?**
   Em todos os cards de roupas no Catálogo, no quadro de preços da tela de Detalhes e no Resumo do Pedido na Sacola (valores formatados em `R$`, preço verde com 10% OFF no PIX e categorias traduzidas em letras maiúsculas).

---

### Integrante 5 — As 2 Diretivas Personalizadas e 2 Diretivas Estruturais `@if` e `@for` (`Requisito 5` - 1,5 ponto)
1. **O que o requisito faz no seu projeto?**
   - **Diretiva Personalizada 1 (`appDestaqueCard`):** Usa `@HostListener` (`mouseenter` / `mouseleave`) e `@HostBinding` para aplicar efeito de zoom suave, elevação e borda violeta quando o usuário interage com os cards.
   - **Diretiva Personalizada 2 (`appBadgePromo`):** Usa `@HostBinding` e `@HostListener` para estilizar automaticamente os selos verdes promocionais de `"10% OFF PIX"`.
   - **Diretiva Estrutural `@if` / `@else`:** Controla a renderização condicional do spinner de carregamento (`carregando`), do badge de quantidade na sacola e do aviso de `"Sua sacola está vazia"`.
   - **Diretiva Estrutural `@for`:** Faz a repetição dinâmica dos cards de roupas vindos da API, dos botões de tamanho (`P, M, G, GG`), dos itens na sacola e dos 5 integrantes da equipe (sem usar `*ngIf` nem `*ngFor`).
2. **Onde está no código?**
   - Diretiva Personalizada 1: `src/app/directives/destaque-card.directive.ts`
   - Diretiva Personalizada 2: `src/app/directives/badge-promo.directive.ts`
   - Blocos `@if` e `@for`: em `home.page.html`, `catalogo.page.html`, `detalhes.page.html` e `sacola.page.html`.
3. **Onde pode ser visto em tela?**
   - Passando o mouse sobre os cards de roupas e departamentos (`appDestaqueCard`).
   - Nas etiquetas verdes `"10% OFF PIX"` (`appBadgePromo`).
   - No spinner enquanto a API carrega e na tela de sacola vazia (`@if`), e na grade de produtos do Catálogo/Sacola (`@for`).
