/**
 * ============================================================================
 * 👤 PARTE DO THIAGO (Configuração do HttpClient) e MENINO MAL (Inicialização)
 * ARQUIVO: src/main.ts
 * ============================================================================
 * O QUE ESTE ARQUIVO FAZ DE FORMA SIMPLES:
 * É o arquivo que "liga" o aplicativo em modo Angular Standalone (sem módulos
 * antigos) e ativa o `provideHttpClient()` para que o Service do THIAGO consiga
 * buscar as roupas na internet (Fake Store API).
 *
 * 📍 ONDE CADA UM DEVE OLHAR AQUI:
 * - THIAGO (Linha 48): `provideHttpClient()` -> Sem essa linha, o Angular não
 *   consegue fazer requisições GET para a API no `roupas.service.ts`.
 * - GAGO (Linha 34 e 42): Configura o idioma `'pt-BR'` para que a Pipe `currency:'BRL'`
 *   mostre o símbolo `R$` certinho nos preços.
 * - MENINO MAL (Linha 51): `provideRouter(routes)` -> Conecta as 4 páginas do site.
 * ============================================================================
 */

import { registerLocaleData } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import localePt from '@angular/common/locales/pt';
import { LOCALE_ID } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import {
  RouteReuseStrategy,
  provideRouter,
  withComponentInputBinding,
  withPreloading,
  PreloadAllModules,
} from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular';

import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';

// [GAGO - Requisito 3]: Ativa a formatação brasileira (R$ e vírgula nos centavos)
registerLocaleData(localePt, 'pt-BR');

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },

    // [GAGO - Requisito 3]: Define Português do Brasil como padrão para as Pipes
    { provide: LOCALE_ID, useValue: 'pt-BR' },

    // [MENINO MAL - Requisito 1]: Ativa os componentes visuais do Ionic
    provideIonicAngular(),

    // [THIAGO - Requisito 2 e 4]: Habilita o HttpClient para consumir a Fake Store API
    provideHttpClient(),

    // [MENINO MAL - Requisito 1 / RAFAEL - Requisito 6]: Ativa as rotas das 4 páginas
    provideRouter(routes, withPreloading(PreloadAllModules), withComponentInputBinding()),
  ],
});
