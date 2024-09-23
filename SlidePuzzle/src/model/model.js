/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author Roberto Carrazana Pernía
 * @since Jun 21 2022
 * @desc Clase Model
 * @module model
 */

 'use static';

 /** @desc Clase Model */
export class Model {
  #height;
  #width;
  constructor(height, width) {
    this.#height = height;
    this.#width = width;
  }
}