/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author Roberto Carrazana Pernía
 * @since Jul 25 2022
 * @desc Clase PuzzlePiece
 * @module puzzle-piece
 */

 'use static';

import { Object2D } from "../../../utilities/object2d.js";
import { Point2D } from "../../../utilities/point2d.js";

 /** @desc Clase PuzzlePiece */
export class PuzzlePiece extends Object2D {
  #image;
  #startPoint;
  /**
   * @desc Constructor de la clase PuzzlePiece
   * @param {String} image - ruta/path de la imagen atribuida
   * @param {Number} height - altura de la pieza
   * @param {Number} width - anchura de la pieza
   * @param {Number} coordinateX - coordenada x del punto
   * @param {Number} coordinateY - coordenada y del punto
   */
  constructor(image, height, width, coordinateX, coordinateY) {
    super(coordinateX, coordinateY, height, width);
    this.#image = image;
    this.#startPoint = new Point2D(coordinateX, coordinateY);
  }

  /**
   * @desc Método getter para obtener el vértice superior izquierdo del subrectangulo de la imagen asignado a la pieza
   * @return {Point2D} punto
   */
  get piecePoint() {
    return(this.#startPoint)
  }
}