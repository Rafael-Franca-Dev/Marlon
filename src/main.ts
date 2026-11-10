/**
 * ============================================================================
 * ARQUIVO PRINCIPAL DE INICIALIZAÇÃO (main.ts)
 * ============================================================================
 * O QUE FAZ NO PROJETO:
 * Inicializa a aplicação Angular no modo Standalone (obrigatório pelos requisitos)
 * e registra os provedores globais de rotas, componentes do Ionic e o cliente HTTP.
 *
 * REQUISITOS ATENDIDOS AQUI:
 * - Uso obrigatório de Ionic com Angular Standalone (bootstrapApplication).
 * - Configuração do provideHttpClient() para permitir que o RoupasService (Requisito 4)
 *   consuma a Fake Store API (Requisito 2).
 * - Registro do idioma 'pt-BR' para que a Pipe Built-in CurrencyPipe (Requisito 3)
 *   exiba os valores corretamente no padrão brasileiro (R$ 00,00).
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

// Registra os dados de formatação regional do Brasil (pt-BR) para moedas e números
registerLocaleData(localePt, 'pt-BR');

bootstrapApplication(AppComponent, {
  providers: [
    // Estratégia de reutilização de rotas nativa do Ionic para transições suaves entre telas
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },

    // Define o idioma padrão como Português do Brasil para as Pipes Built-in (ex: currency:'BRL')
    { provide: LOCALE_ID, useValue: 'pt-BR' },

    // Inicializa os Web Components e estilos do Ionic Framework
    provideIonicAngular(),

    // Habilita o serviço HttpClient em toda a aplicação (necessário para o Requisito 2 e 4)
    provideHttpClient(),

    // Registra as 4 rotas de páginas da aplicação (Requisito 1 e Requisito 6 - Ponto Extra)
    provideRouter(routes, withPreloading(PreloadAllModules), withComponentInputBinding()),
  ],
});
