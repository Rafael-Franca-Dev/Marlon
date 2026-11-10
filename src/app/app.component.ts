/**
 * ============================================================================
 * COMPONENTE RAIZ DA APLICAÇÃO (src/app/app.component.ts)
 * ============================================================================
 * O QUE FAZ NO PROJETO:
 * É o container principal (`<ion-app>`) onde o `<ion-router-outlet>` renderiza
 * as 4 páginas do projeto conforme a URL ativa. Também registra globalmente os
 * ícones da biblioteca Ionicons para uso nos botões, carrossel e cabeçalhos.
 * ============================================================================
 */

import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular';
import { addIcons } from 'ionicons';
import {
  shirtOutline,
  bagHandleOutline,
  homeOutline,
  gridOutline,
  arrowBackOutline,
  trashOutline,
  addOutline,
  removeOutline,
  star,
  peopleOutline,
  sparklesOutline,
  checkmarkCircleOutline,
  pricetagOutline,
  eyeOutline,
  cartOutline,
  womanOutline,
  manOutline,
  chevronBackOutline,
  chevronForwardOutline,
  flameOutline,
} from 'ionicons/icons';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {
  constructor() {
    addIcons({
      shirtOutline,
      bagHandleOutline,
      homeOutline,
      gridOutline,
      arrowBackOutline,
      trashOutline,
      addOutline,
      removeOutline,
      star,
      peopleOutline,
      sparklesOutline,
      checkmarkCircleOutline,
      pricetagOutline,
      eyeOutline,
      cartOutline,
      womanOutline,
      manOutline,
      chevronBackOutline,
      chevronForwardOutline,
      flameOutline,
    });
  }
}
