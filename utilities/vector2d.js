/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 *
 * @author Roberto Carrazana Pernía
 * @since Aug 13 2022
 * @desc Clase Vector2D
 * @module vector-2d
 */

 'use strict';
 
 /** @desc Clase Vector2D */
  export class Vector2D {
   #componentX;
   #componentY;
   #magnitude;
   /**
    * @desc Constructor de la clase Vector2D.
    * @param {Number} componentX - componente x del vector
    * @param {Number} componentY - componente y del vector
    */
  constructor(componentX, componentY) {
    this.#componentX = componentX;
    this.#componentY = componentY;
    this.#module();
  }

  /**
   * @desc Método para sumar las componentes de un vector 2D al actual.
   * @param {Vector2D} vector - vector cuyas componentes serán sumadas al actual
   */
  addVector(vector) {
    this.#componentX += vector.#componentX;
    this.#componentY += vector.#componentY;
    this.#module();
  }

  /**
   * @desc Método para restar las componentes de un vector 2D al actual.
   * @param {Vector2D} vector - vector cuyas componentes serán restadas al actual
   */
   substractVector(vector) {
    this.#componentX -= vector.#componentX;
    this.#componentY -= vector.#componentY;
    this.#module();
  }

  /**
  * @desc Método para multiplicar las componentes del vector por un número real.
  * @param {Number} number - número real
  */
  multiplyByScalar(number) {
    this.#componentX *= number;
    this.#componentY *= number;
    this.#module();
  }

  /**
  * @desc Método para calcular el producto escalar de dos vectores.
  * @param {Vector2D} otherVector - instancia de la clase Vector2D.
  */
  multiplyByVector(otherVector) {
    this.#componentX *= otherVector.#componentX;
    this.#componentY *= otherVector.#componentY;
    this.#module();
  }

  /**
  * @desc Método para obtener el producto punto de dos vectores.
  * @param {Vector2D} otherVector - instancia de la clase Vector2D.
  * @return {Number} número real
  */
  dotProduct(otherVector) {
    return(this.#componentX * otherVector.#componentX + this.#componentY * otherVector.#componentY);
  }

  /** @desc Método para normalizar el vector. Esto es hacer que su longitud sea igual a 1. */
  normalize() {
    this.#componentX /= this.#magnitude;
    this.#componentY /= this.#magnitude;
    this.#magnitude = 1;
  }

  /**
   * @desc Método para normalizar el vector a una determinada longitud.
   * @param {Number} magnitude - nueva magnitud
   */
  setMagnitude(magnitude) {
    this.normalize();
    this.multiplyByScalar(magnitude);
  }

  /**
   * @desc Método para establecer la magnitud maxima en el valor especificado.
   * @param {Number} magnitude - magnitud máxima
   */
  limit(magnitude) {
    if (this.#magnitude > magnitude) this.#magnitude = magnitude;
  }

  /**
  * @desc Método para calcular el módulo del vector.
  * @return {Number} multiplicación resultante.
  */
  #module() {
    this.#magnitude = Math.sqrt(this.#componentX * this.#componentX + this.#componentY * this.#componentY);
  }

  /**
   * @desc Método para crear una copia del vector.
   * @return {Vector2D} vector copia
   */
  createCopy() {
    return(new Vector2D(this.#componentX, this.#componentY));
  }

  /**
    * @desc Método para obtener una cadena con la información del vector
    * @return {String} cadena en formato: {componenteX, componenteY}
    */
   toString() {
    return(`x:${this.#componentX}, y:${this.#componentY}`);
  }

  /**
  * @desc Método para cambiar la componente X del vector.
  * @param {Number} newComponentX - nueva componente X
  */
 setComponentX(newComponentX) {
   this.#componentX = newComponentX;
   this.#module();
 }

 /**
  * @desc Método para cambiar la componente Y del vector.
  * @param {Number} newComponentY - nueva componente Y
  */
 setComponentY(newComponentY) {
   this.#componentY = newComponentY;
   this.#module();
 }

  /**
   * @desc Método para obtener la componente x del vector
   * @return {Number} componente x
   */
  get componentX() {
    return(this.#componentX);
  }

  /**
   * @desc Método para obtener la componente y del vector
   * @return {Number} componente y
   */
  get componentY() {
    return(this.#componentY);
  }

  /**
   * @desc Método para obtener la magnitud (longitud) del vector
   * @return {Number} longitud
   */
   get magnitude() {
    return(this.#magnitude);
  }
}