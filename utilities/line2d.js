/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author Roberto Carrazana Pernía
 * @since Jun 25 2022
 * @desc Clase Line2D
 * @module line-2d
 */

 'use strict';

 import {Point2D} from './point2d.js';

 /** @desc Clase Line2D */
 export class Line2D {
  #startPoint;
  #endPoint;
  #middlePoint;
  #slope;
  #angle;
  #length;
  #coefficientA;
  #coefficientB;
  #coefficientC;
  /**
   * @desc Constructor de la clase Line2D.
   * Además de los puntos de inicio y fin de la misma, esta almacenará el color y el tamaño con el que se
   * dibujaría en un canvas.
   * Los coeficientes almacenados hacen referencia a la ecuación general de la recta:
   *  Ax + By + C = 0
   * @param {Point2D} startPoint - punto donde inicia la recta
   * @param {Point2D} endPoint - punto donde termina la recta
   * @param {String} color - color asignado
   */
  constructor(startPoint, endPoint, color) {
    this.#startPoint = startPoint;
    this.#endPoint = endPoint;
    //this.#middlePoint = this.#getMiddlePoint;
    this.color = color;

    this.#slope = this.#getSlope();
    this.#length = distanceBetweenTwoPoints(startPoint, endPoint);
    this.#angle = (Math.atan(this.#slope) * 180) / Math.PI;

    this.#coefficientA = this.#slope;
    this.#coefficientB = 1;    
    this.#coefficientC = startPoint.coordinateY - (startPoint.coordinateX * this.#slope);
    
    if (this.#coefficientA < 0) {
      this.#coefficientA *= -1;
      this.#coefficientB *= -1;
      this.#coefficientC *= -1;
    }
  }

  /**
   * @desc Método para obtener la arcotangente del cociente de la longitud de la recta.
   * @return {Number} arcotangente expresada en radianes
   */
  getAtan2() {
    return (Math.atan2(this.#endPoint.coordinateY - this.#startPoint.coordinateY, this.#endPoint.coordinateX - this.#startPoint.coordinateX));
  }

  /**
   * @desc Método para cambiar el punto final de la recta.
   * @param {Number} coordinateX - nueva coordenada x
   * @param {Number} coordinateY - nueva coordenada y
   */
  setEndPoint(coordinateX, coordinateY) {
    this.#endPoint = new Point2D(coordinateX, coordinateY);
  }

  /**
   * @desc Método para obtener el punto medio de la recta.
   * @return {Point2D} punto medio
   */
  #getMiddlePoint() {
    let newCoordinateX = (this.#startPoint.coordinateX + this.#endPoint.coordinateX) / 2;
    let newCoordinateY = (this.#startPoint.coordinateY + this.#endPoint.coordinateY) / 2;
    return(new Point2D(newCoordinateX, newCoordinateY, 'green', MIDDLE_POINT_SIZE));
  } 

  /**
   * @desc Método para comprobar si una recta se intersecta con una recta infinita y con pendiente = 0.
   * @param {Line2D} line - línea con la que comprobar la intersección
   * @return {true | false} true si se intersectan
   */
  intersects(line) {
    let height = line.startPoint.coordinateY;
    if (this.#startPoint.coordinateY < height) {
      if (this.#endPoint.coordinateY > height) {
        return(true);
      }
      else {
        return(false);
      }
    }
    else {
      if (this.#endPoint.coordinateY > height) {
        return(false);
      }
      else {
        return(true);
      }
    }
  }

  /**
   * @desc Método para obtener la pendiente de la recta
   * @return {Number} pendiente de la recta
   */
  #getSlope() {
    let numerator = Math.max(this.#startPoint.coordinateY, this.#endPoint.coordinateY) - Math.min(this.#startPoint.coordinateY, this.#endPoint.coordinateY);
    let denominator = Math.max(this.#startPoint.coordinateX, this.#endPoint.coordinateX) - Math.min(this.#startPoint.coordinateX, this.#endPoint.coordinateX);    
    return(numerator / denominator);
  }

  /**
   * @desc Método para obtener una cadena con la información de la recta
   * @return {String} cadena en formato: {puntoIncial, puntoFinal, pendiente}
   */
  toString() {
    return(`Start:${this.#startPoint.toString()},\n End:${this.#endPoint.toString()},\n Slope:${this.#slope}\n`);
  }

  /**
   * @desc Método getter para obtener el punto inicial de la recta
   * @return {Point2D} punto inicial
   */
  get startPoint() {
    return(this.#startPoint);
  }

  /**
   * @desc Método getter para obtener el punto final de la recta
   * @return {Point2D} punto final
   */
  get endPoint() {
    return(this.#endPoint);
  }

  /**
   * @desc Método getter para obtener el punto medio de la recta
   * @return {Point2D} punto medio
   */
  get middlePoint() {
    return(this.#middlePoint);
  }

  /**
   * @desc Método getter para obtener la longitud de la recta.
   * @return {Number} longitud de la recta
   */
  get length() {
    return(this.#length);
  }

  /**
   * @desc Método getter para obtener el ángulo formado por la recta con respecto al eje de abcisas.
   * @return {Number} angulo en grados
   */
  get angle() {
    return(this.#angle);
  }

  /**
   * @desc Método getter para obtener el coeficiente A de la ecuación general de la recta.
   * @return {Number} coeficiente A
   */
  get coefficientA() {
    return(this.#coefficientA);
  }
}

/**
 * @desc Función para obtener la distancia entre dos puntos
 * @param {Point2D} startPoint - punto inicial
 * @param {Point2D} endPoint - punto final
 * @return {Number} distancia
 */
export function distanceBetweenTwoPoints(startPoint, endPoint) {
  let distanceX = Math.abs(endPoint.coordinateX - startPoint.coordinateX);
  let distanceY = Math.abs(endPoint.coordinateY - startPoint.coordinateY);
  return(Math.sqrt(Math.pow(distanceX, 2) + Math.pow(distanceY, 2)));
}