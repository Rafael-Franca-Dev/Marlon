# MENINO MAU // Loja de Roupas Streetwear (Ionic + Angular Standalone)

Projeto desenvolvido estritamente dentro dos requisitos da disciplina de **Desenvolvimento Mobile (Ionic com Angular Standalone)**.

- 📄 **Guia Completo em PDF (Simplificado e com Fala Pronta de cada um):** [`GUIA_DE_ESTUDO_E_APRESENTACAO_5_INTEGRANTES.pdf`](./GUIA_DE_ESTUDO_E_APRESENTACAO_5_INTEGRANTES.pdf)

---

## Como Rodar o Projeto

No terminal dentro da pasta do projeto:

```bash
npm install
ionic serve
```

---

## Sorteio Oficial dos 5 Integrantes e Onde Buscar no Código

Dentro de **todos os arquivos de código** existem comentários com o nome de cada integrante (`[MENINO MAL]`, `[THIAGO]`, `[RAFAEL]`, `[GAGO]`, `[NETO]`) indicando exatamente qual linha mostrar para o professor.

| Integrante Sorteado | Requisito que Apresenta | Arquivos Principais no VS Code | O que Mostrar na Tela do Site |
| :--- | :--- | :--- | :--- |
| **1. MENINO MAL** | **Requisito 1 (1,0 pt):**<br>As 4 Páginas, Rotas e Estilização Streetwear | `src/app/app.routes.ts`<br>`src/app/home/home.page.ts`<br>`src/global.scss` | Navegar pelas 4 páginas (Início, Catálogo, Detalhes e Sacola), mostrar os Destaques da Semana e o Carrossel sem preço na Home. |
| **2. THIAGO** | **Requisito 2 (0,5 pt) + Req. 4 Parte 1 (1,0 pt):**<br>API Pública com 3 Métodos GET + 1º Service (`HttpClient`) | `src/app/services/roupas.service.ts`<br>`src/main.ts` | No Catálogo, alternar entre "Roupas Masculinas" (GET 1) e "Roupas Femininas" (GET 2), e abrir uma peça em Detalhes (GET 3). |
| **3. RAFAEL** | **Requisito 4 Parte 2 (1,0 pt) + Req. 6 Extra (1,0 pt):**<br>2º Service (`SacolaService`) + Parâmetro por Rota (`:id`) | `src/app/services/sacola.service.ts`<br>`src/app/pages/detalhes/detalhes.page.ts` | Clicar em uma roupa mostrando a URL mudando para `/detalhes/2` (Ponto Extra) e adicionar/alterar itens na página Sacola (2º Service). |
| **4. GAGO** | **Requisito 3 (1,0 pt):**<br>As 4 Pipes (2 Personalizadas + 2 Built-in Nativas) | `src/app/pipes/traduzir-categoria.pipe.ts`<br>`src/app/pipes/desconto-pix.pipe.ts`<br>`src/app/pages/catalogo/catalogo.page.html` | Mostrar nos cards a categoria traduzida e em maiúsculas (`STREETWEAR MASCULINO`), o preço em `R$` e o valor com 10% OFF no PIX. |
| **5. NETO** | **Requisito 5 (1,5 pt):**<br>2 Diretivas Personalizadas + 2 Diretivas Estruturais (`@if` e `@for`) | `src/app/directives/destaque-card.directive.ts`<br>`src/app/directives/badge-promo.directive.ts`<br>`src/app/pages/catalogo/catalogo.page.html` | Passar o mouse nos cards (borda vermelha `appDestaqueCard`), mostrar a etiqueta verde limão `appBadgePromo`, a tela de espera (`@if`) e a lista de roupas (`@for`). |
