/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author Roberto Carrazana Pernía
 * @since Jun 25 2022
 * @desc Clase Slot2D
 * @module slot-2d
 */

 'use strict';

import { Point2D } from './point2d.js';
import { Object2D } from './object2d.js';

/** @desc Clase Slot2D */
export class Slot2D extends Object2D {    
    _topLeftPoint;
    _bottomRightPoint;
    _objectContained;
    _hasObject;
  /**
   * @desc Constructor de la clase Slot2D.
   * 
   * @param {Number} coordinateX - coordenada X del centro de la casilla
   * @param {Number} coordinateY - coordenada Y del centro de la casilla
   * @param {Number} width - anchura la casilla
   * @param {Number} height - altura la casilla
   */
  constructor(coordinateX, coordinateY, width, height, color = "") {    
    super(coordinateX, coordinateY, height, width, color)
    this._topLeftPoint = new Point2D(coordinateX, coordinateY);
    this._bottomRightPoint = new Point2D(coordinateX + width, coordinateY + height);
    this._objectContained = null;
    this._hasObject = false;
  }

  /**
   * @desc Método para asignar una pieza de puzzle a la casilla. 
   * @param {Object2D} object2d - objeto nuevo a contener
   */
  setObject(object2d) { 
    this._objectContained = object2d;
    this._hasObject = true;
  }

  /**
   * @desc Método para eliminar la pieza contenida. 
   */
  deleteObject() {
    this._objectContained = null;
    this._hasObject = false;
  }

  /**
   * @desc Método para conocer si un punto se encuentra incluido en el área del rectángulo de la casilla (dentro de sus cuatro vértices)
   * @param {Point2D} point - punto a comprobar
   * @return {true | false} 'true' si está incluido
   */
  pointInsideSlotRectangle(point) {
    return( ((point.coordinateX >= this._topLeftPoint.coordinateX) && (point.coordinateY >= this._topLeftPoint.coordinateY)) &&
            ((point.coordinateX <= this._bottomRightPoint.coordinateX) && (point.coordinateY <= this._bottomRightPoint.coordinateY)) );
  }

  /**
   * @desc Método para obtener una cadena con la información de la casilla
   * @return {String} cadena en formato: {coordenada X del centro, coordenada Y del centro, tamaño de lado}
   */
  toString() {
    return(`X:${this._position.coordinateX}, Y:${this._position.coordinateY}`);
  }

  /**
   * @desc Método getter para saber si la casilla contiene una pieza de puzzle. 
   * @return {true |false} 'true' si contiene alguna pieza
   */
   get hasObject() {    
    return(this._hasObject);
  }

  /**
   * @desc Método getter para obtener la pieza asignada a la casilla. 
   * @return {Object2D} pieza contenida
   */
  get objectContained() {    
    return(this._objectContained);
  }

  /**
   * @desc Método getter para obtener el vértice superior izquierdo de la casilla.
   * @return {Point2D} vértice superior izquierdo
   */
  get topLeftPoint() {
    return (this._topLeftPoint);
  }

  /**
   * @desc Método getter para obtener el vértice inferior derecho de la casilla.
   * @return {Point2D} vértice inferior derecho
   */
  get bottomRightPoint() {
    return (this._bottomRightPoint);
  }
}