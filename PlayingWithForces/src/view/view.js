/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 *
 * @author Roberto Carrazana Pernía
 * @since Aug 09 2022
 * @desc Clase View
 * @module view
 */

 'use static';

import { CanvasView } from "../../../utilities/canvasView.js";
import { Body2D } from "../model/classes/body2d.js";
import { Vector2D } from "../model/classes/vector2d.js";
import { Point2D } from "../model/classes/point2d.js";

const DISTANCE = 5;
const BODY_SIZE = 20;
const COLORS = ['red'/*, 'yellow', 'green', 'blue', 'purple', 'orange'*/];
const GRAVITY = new Vector2D(0, 0.1);

 /** @desc Clase View */
export class View extends CanvasView {
  #canvasCenter;
  #angle;
  #mousePosition;
  #movingPoint;
  #movingObjectsCollection;
  /**
   * @desc Constructor de la clase View
   * @param {Element} canvas - canvas sobre el que dibujar
   */
  constructor(canvas) {
    super(canvas);

    this.#canvasCenter = new Point2D(this._width / 2, this._height / 2);

    this.#mousePosition = new Vector2D(this._width / 2, this._height / 2);
    this.#movingPoint = new Vector2D(this._width / 2, this._height / 4);

    this.#movingObjectsCollection = [];
    for (let i = 0; i < COLORS.length; ++i) {
      this.#movingObjectsCollection.push(
        new Body2D(
          (2 * BODY_SIZE) + i * this._width / COLORS.length,
          (2 * BODY_SIZE) + i * this._height / COLORS.length,
          BODY_SIZE,
          BODY_SIZE)
      );
    }
    this.#angle = 0.0;
  }
  
  /**
   * @desc Método para dibujar un objeto en movimiento
   * @param {Body2D} object - objeto móvil
   * @param {String} color - color asignado al objeto
   */
  #drawMovingObject(object, color) {
    this._context.beginPath();
    this._context.fillStyle = color;
    this._context.strokeStyle = 'black';
    this._context.lineWidth = 2;    
    
    //object.acceleration.setComponentX(this.#movingPoint.componentX - object.coordinateX);
    //object.acceleration.setComponentY(this.#movingPoint.componentY - object.coordinateY);
    //object.acceleration.setMagnitude(0.5);
    
    object.applyForce(GRAVITY);
   
    object.update();
    object.detectCollision(0, this._height, 0, this._width);

    this._context.ellipse(object.coordinateX, object.coordinateY, object.height, object.width, Math.PI / 4, 0, Math.PI * 2);
    this._context.fill();
    this._context.stroke();
  }

  /**
   * @desc Método para dibujar los vectores de los objetos en movimiento
   * @param {Body2D} object - objeto móvil
   * @param {String} color - color asignado al objeto
   */
   #drawVector(object, color) {
    this._context.beginPath();
    this._context.strokeStyle = color;
    this._context.lineWidth = 5;

    let movingVector = new Vector2D(object.coordinateX, object.coordinateY);
    let pointingVector = this.#movingPoint.createCopy();
    pointingVector.substractVector(movingVector); 
    
    pointingVector.normalize();
    pointingVector.multiplyByScalar(50);

    this._context.moveTo(object.coordinateX, object.coordinateY);
    this._context.lineTo(object.coordinateX + pointingVector.componentX, object.coordinateY + pointingVector.componentY);
    this._context.stroke();
  }

  /** @desc Método para dibujar el punto móvil que atrae a los objetos en movimientos */
  #drawOrbitCenter() {
    this._context.beginPath();
    this._context.fillStyle = 'red';
    this._context.strokeStyle = 'black';
    this._context.lineWidth = 1;

    this.#angle += 0.1;
    let newCoordinateX = this.#movingPoint.componentX + DISTANCE * Math.cos(this.#angle);
    let newCoordinateY = this.#movingPoint.componentY + DISTANCE * Math.sin(this.#angle);
    
    this.#movingPoint.setComponentX(newCoordinateX);
    this.#movingPoint.setComponentY(newCoordinateY);

    this._context.ellipse(this.#movingPoint.componentX, this.#movingPoint.componentY, 5, 5, Math.PI / 4, 0, Math.PI * 2);
    this._context.fill();
    this._context.stroke();
  }

  /** @desc Método para dibujar la escena */
  _draw() {    
    this.#drawOrbitCenter();
    for (let i = 0; i < COLORS.length; ++i) {
      this.#drawMovingObject(this.#movingObjectsCollection[i], COLORS[i]);
      this.#drawVector(this.#movingObjectsCollection[i], COLORS[i]);
    }   

    this._context.fill();
    this._context.stroke();
  }

  /** @desc Método para animar redibujar la escena */
  update() {
    //this.#resizeCanvas();    
    this._drawBackground('beige');
    this._draw();
    window.requestAnimationFrame(() => this.update());
  }

  /**
   * @desc Método para actualizar la posición del puntero del ratón.
   * @param {Number} coordinateX - coordenada x del puntero
   * @param {Number} coordinateY - coordenada y del puntero
   */
  updateMousePointer(coordinateX, coordinateY) {
    this.#mousePosition.setcomponentX(coordinateX);
    this.#mousePosition.setcomponentY(coordinateY);
  }

  /** @desc Método para ajustar el tamaño de los elementos dentro del canvas */
  #resizeCanvasElements() {
    
  }
}