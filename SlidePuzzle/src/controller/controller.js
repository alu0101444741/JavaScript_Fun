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
  /**
   * @desc Constructor de la clase
   * @param {View} view - representación visual
   * @param {Model} model - estructura interna
   */
  constructor(view, model) {
    this.#view = view;
    this.#model = model;

    window.addEventListener('click', () => this.#movePiece(event));
  }

  /**
   * @desc Método para mover una pieza del puzzle a través de un click. 
   * @param {Evento} event - evento creado por el puntero.
  */
   #movePiece(event) {
    //this.#model.updateDimensions(this.#view.height, this.#view.width);
    let boundingClientRect = event.target.getBoundingClientRect();
    this.#view.movePiece(event.clientX - boundingClientRect.left, event.clientY - boundingClientRect.top);    
  }
}