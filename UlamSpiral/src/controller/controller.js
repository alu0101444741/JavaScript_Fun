/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author Roberto Carrazana Pernía
 * @since Jun 21 2022
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
  #startButton;
  /**
   * @desc Constructor de la clase
   * @param {View} view - representación visual
   * @param {Model} model - estructura interna
   */
  constructor(view, model) {
    this.#view = view;
    this.#model = model;

    //this.#createInitialBalls();

    //this.#startButton = document.getElementById('');
    //this.#startButton.addEventListener('click', () => this.#createInitialBalls());
    
    this.#model.createPoints(169); 
    this.#view.createPoints(this.#model.points, this.#model.primesIndex);
  }

 
}