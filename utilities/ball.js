/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author Roberto Carrazana Pernía
 * @since Jul 1 2022
 * @desc Clase Ball
 * @module ball
 */

 'use strict';

import { Object2D } from "./object2d.js";
import { COLLISION_SENSIVITY } from '../../view/view.js';

export class Ball extends Object2D {
  _diameter;  
  _topBorder;
  _bottomBorder;
  _leftBorder;  
  _rightBorder;
  /**
   * @desc Constructor de la clase Ball.
   * Además de los puntos de inicio y fin de la misma, esta almacenará el color y el diámetro con el que se
   * dibujaría en un canvas.
   * @param {Number} coordinateX - coordenada X del centro de la bola
   * @param {Number} coordinateY - coordenada Y del centro de la bola
   * @param {Number} diameter - diámetro
   * @param {String} color - color asignado
   */
  constructor(coordinateX, coordinateY, diameter, color) {
    super(coordinateX, coordinateY, diameter, diameter, color);
    this._diameter = diameter;
    this._updateBorders();
  }

  _updateBorders() {
    this._topBorder = this._position.coordinateY - this._diameter / 2;
    this._bottomBorder = this._position.coordinateY + this._diameter / 2;
    this._leftBorder = this._position.coordinateX - this._diameter / 2;
    this._rightBorder = this._position.coordinateX + this._diameter / 2;
  }

  collide(ball) {
    return (this._position.distanceToAnotherPoint(ball._position) <= (this._diameter * COLLISION_SENSIVITY));
  }

  /**
   * @desc Método para cambiar la coordenada X del centro de la bola.
   * @param {Number} newCoordinateX - nueva coordenada X
   */
  setCoordinateX(newCoordinateX) {
    this._updateBorders();
    this._position.setCoordinateX(newCoordinateX);
  }

  /**
   * @desc Método para cambiar la coordenada Y del centro de la bola.
   * @param {Number} newCoordinateY - nueva coordenada Y
   */
  setCoordinateY(newCoordinateY) {
    this._updateBorders();
    this._position.setCoordinateY(newCoordinateY);
  }

  /**
   * @desc Método para obtener una cadena con la información de la bola
   * @return {String} cadena en formato: {coordenada X, coordenada Y, diametro}
   */
  toString() {
    return(`X:${this._position.coordinateX}, Y:${this._position.coordinateY}\
            diameter:${this._diameter}, color:${this._color}`);
  } 

  /**
   * @desc Método getter para obtener el diámetro de la bola.
   * @return {Number} diámetro
   */
  get diameter() {
    return (this._height);
  }  

  /**
   * @desc Método getter para obtener la coordenada X más a la derecha de la bola.
   * @return {Number} coordenada X
   */
  get rightBorder() {
    return (this._rightBorder);
  }

  /**
   * @desc Método getter para obtener la coordenada X más a la izquierda de la bola.
   * @return {Number} coordenada X
   */
  get leftBorder() {
    return (this._leftBorder);
  }

  /**
   * @desc Método getter para obtener la coordenada Y más hacia arriba de la bola.
   * @return {Number} coordenada Y
   */
  get topBorder() {
    return (this._topBorder);
  }

  /**
   * @desc Método getter para obtener la coordenada Y más hacia abajo de la bola.
   * @return {Number} coordenada Y
   */
  get bottomBorder() {
    return (this._bottomBorder);
  }
}