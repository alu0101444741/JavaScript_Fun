/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author Roberto Carrazana Pernía
 * @since Aug 08 2022
 * @desc Clase View
 * @module view
 */

 'use static';

import { CanvasView } from "../../../utilities/canvasView.js";
import { Point2D } from "../../../utilities/point2d.js";
import { DEFAULT_SPACE } from "../model/model.js";
  
const EMPTY_POINT = new Point2D(-1, -1);  
const POINT_SIZE = Math.floor(DEFAULT_SPACE / 3);

 /** @desc Clase View */
export class View extends CanvasView{
  #points;
  #primesIndex;

  #startTime;
  #time;
  #timeModfier;
  /**
   * @desc Constructor de la clase View
   * @param {Element} canvas - canvas sobre el que dibujar
   */
  constructor(canvas) {
    super(canvas);

    this.#points = [];
    this.#primesIndex = [];

    this.#startTime = Date.now();
    this.#timeModfier = 1;
  }  

  /** @desc Método para animar redibujar la escena */
  update() {
    //this._context.clearRect(0, 0, this.#width, this.#height);
    this._resizeCanvas();
    this.#time = (Date.now() - this.#startTime) / 10000;     
    this._drawBackground('beige');
    this._draw();
    window.requestAnimationFrame(() => this.update());
  }  

  /** @desc Método para dibujar la escena */
  _draw() {    
    this._drawLines();
    //this._drawBeautyLines();
    this._drawPoints();
    this._drawNumbers();
    this._context.fill();
    this._context.stroke();
  }

  /** @desc Método para escribir el número asociado a cada punto */
  _drawNumbers() {
    this._context.beginPath();
    this._context.fillStyle = 'white';
    this._context.font = '15px Georgia';   
    this._context.textAlign = "center";
    this._context.textBaseline = "middle";
    let pointsAmount = this.#points.length;
    for (let actualNumber = 0; actualNumber < pointsAmount; ++ actualNumber) {
      if (this.#primesIndex[actualNumber]) {
        this._context.fillText(this.#points[actualNumber].tag, this.#points[actualNumber].coordinateX, this.#points[actualNumber].coordinateY);
        this._context.fill();
      } 
    }
  }
  
  /** @desc Método para dibujar todos los puntos */
  _drawPoints() {
    let pointsAmount = this.#points.length;
    for (let actualNumber = 0; actualNumber < pointsAmount; ++ actualNumber) {
      if (this.#primesIndex[actualNumber]) {
        this._context.beginPath();
        this._context.fillStyle = 'black';
        this._context.ellipse(this.#points[actualNumber].coordinateX, this.#points[actualNumber].coordinateY, POINT_SIZE, POINT_SIZE, Math.PI / 4, 0, Math.PI * 2);
        this._context.fill();
        this._context.stroke();              
      }      
    }
  }

  /** @desc Método para dibujar líneas que unan los puntos */
  _drawLines() {
    this._context.beginPath();
    this._context.strokeStyle = 'black';
    this._context.lineWidth = 3;
    let pointsAmount = this.#points.length;
    for (let pointIndex = 1; pointIndex < pointsAmount; ++ pointIndex) {      
      this._context.moveTo(this.#points[pointIndex - 1].coordinateX, this.#points[pointIndex - 1].coordinateY);
      this._context.lineTo(this.#points[pointIndex].coordinateX, this.#points[pointIndex].coordinateY);
      this._context.stroke();
    }
  }

  /** @desc Método para dibujar líneas extravagantes que unan los puntos */
  _drawBeautyLines() {
    this._context.beginPath();
    this._context.strokeStyle = 'black';
    //this._context.strokeStyle = this.#colorByTime(this.#time * 100);
    this._context.lineWidth = 3;
    let pointsAmount = this.#points.length;

    let offset = 5;
    let curveSide = 1;
    let horizontalPosition = true;

    let actualNumber = 1;
    let directionIndex = 0;
    let steps = 1;
    let turnCounter = 0;

    for (let pointIndex = 1; pointIndex < pointsAmount; ++ pointIndex) {      
      this._context.moveTo(this.#points[pointIndex - 1].coordinateX, this.#points[pointIndex - 1].coordinateY);
      this._drawBezierCurve(pointIndex, horizontalPosition, offset/*  * Math.random()*/, curveSide);
      curveSide = -curveSide;

      if (actualNumber % steps === 0) {
        directionIndex = (directionIndex + 1) % 4;
        ++ turnCounter;
        horizontalPosition = !horizontalPosition;
        if (turnCounter % 2 === 0) {
          ++steps;          
        }
      }
      ++ actualNumber;
    }
  }

  /**
   * @desc Método privado para dibujar una curva de Bezier.
   * @param {Number} pointIndex - índice en el array de puntos almacenado
   * @param {Boolean} horizontalPosition - booleano para conocer si la línea es horizontal o vertical 
   * @param {Number} offset - valor arbitrario para dar peso a los puntos de control
   * @param {Number} curveSide - valor que podrá ser 1 o -1, cuya función es hacer la curva hacia un lado u otro.
   */  
  _drawBezierCurve(pointIndex, horizontalPosition, offset, curveSide) {
    let controlPointOneX, controlPointOneY, controlPointTwoX, controlPointTwoY, endPointX, endPointY;
    let distance, movement;
    let timeMovement = (this.#time % 0.1); //console.log(timeMovement)
    
    if (timeMovement >= 0.01) {
      //this.#startTime = Date.now();
      this.#timeModfier = -this.#timeModfier; //console.log(this.#timeModfier)
    }

    if (horizontalPosition) {
      controlPointOneX = this.#points[pointIndex - 1].coordinateX - (offset * curveSide);
      controlPointOneY = this.#points[pointIndex - 1].coordinateY + (offset * curveSide);
      controlPointTwoX = (controlPointOneX + this.#points[pointIndex].coordinateX) / 2;
      controlPointTwoY = controlPointOneY + (offset * curveSide);
      
      distance = (controlPointOneX + this.#points[pointIndex].coordinateX) / 2;
      movement = distance / 2 * timeMovement * curveSide * this.#timeModfier;
      controlPointOneX += movement;
      controlPointTwoX += movement;
    }
    else {
      controlPointOneX = this.#points[pointIndex - 1].coordinateX + (offset * curveSide);
      controlPointOneY = this.#points[pointIndex - 1].coordinateY - (offset * curveSide);
      controlPointTwoX = controlPointOneX + (offset * curveSide);
      controlPointTwoY = (controlPointOneY + this.#points[pointIndex].coordinateY) / 2;

      distance = (controlPointOneY + this.#points[pointIndex].coordinateY) / 2;
      movement = distance / 2 * timeMovement * curveSide * this.#timeModfier;
      controlPointOneY += movement;
      controlPointTwoY += movement;
    }
    endPointX = this.#points[pointIndex].coordinateX;
    endPointY = this.#points[pointIndex].coordinateY;
    this._context.bezierCurveTo(controlPointOneX, controlPointOneY, controlPointTwoX, controlPointTwoY, endPointX, endPointY);
    this._context.stroke();
  }

  /**
   * @desc Método para obtener un color según el instante de tiempo actual. La única variable cambiante
   * es el tiempo, que se calcula restando el instante actual al instante en el que se creó la instancia
   * actual
   * @param {Number} time - diferencia de tiempo
   * @return {String} cadena con formato 'rgb(R,G,B)'
  */
  #colorByTime(time) {
    let frequency = 0.3;
    let red = Math.ceil(Math.sin(frequency * time + 0) * 127 + 128);
    let green = Math.ceil(Math.sin(frequency * time + 2) * 127 + 128);
    let blue = Math.ceil(Math.sin(frequency * time + 4) * 127 + 128);
    return `rgb(${red},${green},${blue})`;
  }

  /**
   * @desc Método para crear los puntos
   * @param {Number} pointsAmount - cantidad de puntos a dibujar
   */
  createPoints(points, primesIndex) {
    this.#points = points;
    this.#primesIndex = primesIndex;
  }
}