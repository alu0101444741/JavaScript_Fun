/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 *
 * @author Roberto Carrazana Pernía
 * @since Sep 23 2024
 * @desc Clase Object2D
 * @module object-2d
 */

'use strict';

/** @desc Clase Object2D */
export class Object2D {
  _height;
  _width;
  _position;
  _color;
    /**
    * @desc Constructor de la clase Body2D.
    * @param {Number} coordinateX - componente x del vector de posición
    * @param {Number} coordinateY - componente y del vector de posición
    */
  constructor(coordinateX, coordinateY, height, width, color = "") {
    this._position = new Point2D(coordinateX, coordinateY);
    this._height = height;
    this._width = width;
    this._color = color;
  }

  get position() {
    return(this._position);
  }

  /**
   * @desc Método getter para obtener la coordenada x de la posicion
   * @return {Number} componente x
   */
  get coordinateX() {
    return(this._position.coordinateX);
  }

  /**
   * @desc Método getter para obtener la coordenada x de la posicion
   * @return {Number} componente y
   */
  get coordinateY() {
    return(this._position.coordinateY);
  }

  /**
   * @desc Método getter para obtener la altura del cuerpo
   * @return {Number} altura
   */
  get height() {
    return(this._height);
  }

  /**
   * @desc Método getter para obtener la anchura del cuerpo
   * @return {Number} anchura
   */
  get width() {
    return(this._width);
  }

  /**
   * @desc Método getter para obtener el color de la bola.
   * @return {String} diámetro
   */
  get color() {
    return (this._color);
  }
}