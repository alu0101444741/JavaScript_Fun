/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author Roberto Carrazana Pernía
 * @since Jun 21 2022
 * @desc Clase ScoreBoard
 * @module scoreboard
 */

'use static'

export class ScoreBoard {
  #height;
  #width;
  #score;

  /**
   * @desc Constructor de la clase SlotBoard2D.
   * @param {Number} height - altura máxima (eje x)
   * @param {Number} width - anchura máxima (eje y)
   */
  constructor(height, width) {
    this.#height = height;
    this.#width = width;
    this.#score = 0;
  }

  /**
   * @desc Método para incrementar la puntuación
   * @param {Number} points - puntos a añadir
   */
  increaseScore(points) {
    this.#score += points;
  }

  /**
   * @desc Método getter para obtener la puntuación
   * @return {Number} puntos
   */
  get score() {
    return(this.#score);
  }
}