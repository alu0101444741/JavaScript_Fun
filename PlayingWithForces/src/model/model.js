/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 *
 * @author Roberto Carrazana Pernía
 * @since Aug 09 2022
 * @desc Clase Model
 * @module model
 */

 'use static';

 /** @desc Clase Model */
export class Model {
  #height;
  #width;
  /**
   * @desc Constructor de la clase Model.
   * @param {Number} height - altura máxima (eje x)
   * @param {Number} width - anchura máxima (eje y)
   */
  constructor(height, width) {
    this.#height = height;
    this.#width = width;
  }

  /**
   * @desc Método para actualizar la altura y anchura para tener las mismas que el canvas.
   * @param {Number} height - nueva altura del canvas
   * @param {Number} width - nueva anchura del canvas
   */
  updateDimensions(height, width) {
    this.#height = height;
    this.#width = width;
  }

  /**
   * @desc Método getter para obtener la altura del canvas
   * @return {Number} altura del canvas
   */
   get height() {
    return(this.#height)
  }

  /**
   * @desc Método getter para obtener la anchura del canvas
   * @return {Number} anchura del canvas
   */
   get width() {
    return(this.#width)
  }
}