/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 *
 * @author Roberto Carrazana Pernía
 * @since Aug 13 2022
 * @desc Clase Body2D
 * @module body-2d
 */

 'use strict';

import { Object2D } from "./object2d.js";
import { Vector2D } from "./vector2d.js";
 
 /** @desc Clase Body2D */
export class Body2D extends Object2D {
  _velocity;
  _acceleration;
   /**
    * @desc Constructor de la clase Body2D.
    * @param {Number} coordinateX - componente x del vector de posición
    * @param {Number} coordinateY - componente y del vector de posición
    */
  constructor(coordinateX, coordinateY, height, width, color = "") {
    super(coordinateX, coordinateY, height, width, color = "");
    this._velocity = new Vector2D(0, 0);
    this._acceleration = new Vector2D(0, 0);
  }

  /**
   * @desc Método para aplicar una fuerza externa
   * @param {Vector2D} force - fuerzaen forma de vector
   */
  applyForce(force) {
    this._acceleration.addVector(force);
  }

  /**
   * @desc Método para detectar colisiones con los bordes del recipiente.
   * @param {Number} topEdge - borde superior
   * @param {Number} bottomEdge - borde inferior
   * @param {Number} leftEdge - borde izquierdo
   * @param {Number} rightEdge - borde derecho
   */
  detectCollision(topEdge, bottomEdge, leftEdge, rightEdge) {
    let halfWidth = this._width / 2;
    let halfHeight = this._height / 2;
    
    if ((this.coordinateX - halfWidth) <= leftEdge) {
      this._position.setComponentX(leftEdge + halfWidth);
      this._velocity.setComponentX(-this._velocity.componentX);
    }
    if ((this.coordinateX + halfWidth) >= rightEdge) {
      this._position.setComponentX(rightEdge - halfWidth);
      this._velocity.setComponentX(-this._velocity.componentX);
    }
    if ((this.coordinateY + halfHeight) >= bottomEdge) {
      this._position.setComponentY(bottomEdge - halfHeight);
      this._velocity.setComponentY(-this._velocity.componentY);
    }
    if ((this.coordinateY - halfHeight) <= topEdge) {
      this._position.setComponentY(topEdge + halfHeight);
      this._velocity.setComponentY(-this._velocity.componentY);
    }
    
    /*
    if (((this.coordinateX + halfWidth) >= rightEdge) || ((this.coordinateX - halfWidth) <= leftEdge)) {
      this._velocity.setComponentX(-this._velocity.componentX);
    }
    if (((this.coordinateY + halfHeight) >= bottomEdge) || ((this.coordinateX - halfHeight) <= topEdge)) {
      this._velocity.setComponentY(-this._velocity.componentY);
    }
    */
  }   

  /** @desc Método para actualizar la posición del objeto */
  update() {
    this._velocity.addVector(this._acceleration);
    this._velocity.limit(5);
    this._position.addVector(this._velocity);    
  }

  get acceleration() {
    return(this._acceleration);
  }

  get velocity() {
    return(this._velocity);
  }
}