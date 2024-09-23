/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author Roberto Carrazana Pernía
 * @since Jun 21 2022
 * @desc Clase ArrowPointer
 * @module arrow-pointer
 */

 'use static';

 import { Line2D } from "./line2d.js";
 import { Point2D } from "./point2d.js";

 import { BALLS_PER_ROW, GAP_BETWEEN_BALLS } from '../../view/view.js';

/** @desc Clase ArrowPointer */
export class ArrowPointer {
    #height;
    #width;
    #arrow;
    #defaultArrow;
    /**
   * @desc Constructor de la clase ArrowPointer.
   * @param {Number} height - altura máxima (eje x)
   * @param {Number} width - anchura máxima (eje y)
   */
  constructor(height, width) {
    this.#height = height;
    this.#width = width;

    let diameter = this.#width / (BALLS_PER_ROW + GAP_BETWEEN_BALLS) / 2;
    let coordinateX = this.#width / 2;
    let coordinateY = this.#height - diameter;
    let arrowLength = diameter * 5;
    let startPoint = new Point2D (coordinateX, coordinateY + diameter / 2);
    let endPoint = new Point2D (startPoint.coordinateX, startPoint.coordinateY - arrowLength);
    
    this.#defaultArrow = new Line2D(startPoint, endPoint);
    this.#arrow = this.#defaultArrow;
  } 

  /**
   * @desc Método para actualizar el vector de disparo según la posición del puntero del ratón.
   * @param {Number} coordinateX - coordenada x del puntero
   * @param {Number} coordinateY - coordenada y del puntero
   */
   update(coordinateX, coordinateY) {
    if (this.#pointerIsInCanvas(coordinateX, coordinateY)) {
      this.#arrow.setEndPoint(coordinateX, coordinateY);
    } else {
      this.#arrow = this.#defaultArrow;
    }
  }

  /**
   * @desc Método para cambiar el punto final de la flecha.
   * @param {Number} coordinateX - nueva coordenada x
   * @param {Number} coordinateY - nueva coordenada y
   */
  setEndPoint(coordinateX, coordinateY) {
    this.#arrow.setEndPoint(new Point2D(coordinateX, coordinateY));
  }

  /**
   * @desc Método para comprobar si el puntero está dentro del canvas
   * @param {Number} coordinateX - coordenada x del puntero
   * @param {Number} coordinateY - coordenada y del puntero
   * @return {true | false} 'true' si está dentro del canvas
   */
   #pointerIsInCanvas(coordinateX, coordinateY) { //console.log(coordinateX, this.#width);  console.log(coordinateY, this.#height);
    if ((coordinateX >= 0) && (coordinateX <= this.#width)) {
      if ((coordinateY >= 0) && (coordinateY <= this.#height)) {
        return(true);
      }
    }
    return(false);
  }

  /**
   * @desc Método getter para obtener el punto inicial de la flecha/puntero
   * @return {Point2D} punto inicial
   */
   get startPoint() {
    return(this.#arrow.startPoint);
  }

  /**
   * @desc Método getter para obtener el punto final de la flecha/puntero
   * @return {Point2D} punto final
   */
  get endPoint() {
    return(this.#arrow.endPoint);
  }
}