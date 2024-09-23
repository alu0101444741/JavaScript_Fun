/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 *
 * @author Roberto Carrazana Pernía
 * @since Aug 09 2022
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
  #windToRightButton;
  #windToLeftButton;
  /**
   * @desc Constructor de la clase
   * @param {View} view - representación visual
   * @param {Model} model - estructura interna
   */
  constructor(view, model) {
    this.#view = view;
    this.#model = model;

    //this.#createInitialBalls();

    //this.#startButton = document.getElementById('initialBalls');
    //this.#startButton.addEventListener('click', () => this.#createInitialBalls());
    window.addEventListener('mousemove', (event) => this.#updatePointer(event));
  }

 /**
   * @desc Método para mover el vector del puntero del ratón. 
   * @param {Evento} event - evento creado por el movimiento del puntero.
  */
  #updatePointer(event) {
    //this.#model.updateDimensions(this.#view.height, this.#view.width);
    let boundingClientRect = event.target.getBoundingClientRect();
    //this.#view.updateMousePointer(event.clientX - boundingClientRect.left, event.clientY - boundingClientRect.top);    
  }
}