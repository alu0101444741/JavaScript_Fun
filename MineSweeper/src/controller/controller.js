/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author Roberto Carrazana Pernía
 * @since Jul 25 2022
 * @desc Clase Controller
 * @module controller
 */

 'use static';

 import { View } from '../view/view.js';
 import { Model } from '../model/model.js';

 /** @desc Clase Controller */
export class Controller {
  #view;
  #model;
  #restartButton;
  /**
   * @desc Constructor de la clase
   * @param {View} view - representación visual
   * @param {Model} model - estructura interna
   */
  constructor(view, model) {
    this.#view = view;
    this.#model = model;

    
    this.#restartButton = document.getElementById('restart');
    this.#restartButton.addEventListener('click', () => this.#restart());
    window.addEventListener('click', () => this.#clickOnSlot(event));
  }

  /**
   * @desc Método para revelar una casilla a través de un click. 
   * @param {Evento} event - evento creado por el puntero.
  */
  #clickOnSlot(event) {
    //this.#model.updateDimensions(this.#view.height, this.#view.width);
    let boundingClientRect = event.target.getBoundingClientRect();
    if ((event.clientX - boundingClientRect.left > 0) && (event.clientY - boundingClientRect.top > 0)) { console.log(event.clientX - boundingClientRect.left, event.clientY - boundingClientRect.top);
      if (!this.#view.gameEnd) {
        //let boundingClientRect = event.target.getBoundingClientRect();
        this.#view.clickOnSlot(event.clientX - boundingClientRect.left, event.clientY - boundingClientRect.top); 
      }
    }      
  }

  /** @desc Método para reiniciar el juego */
  #restart() {
    this.#view.restart();
  }
}