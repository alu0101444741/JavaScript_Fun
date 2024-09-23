/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author Roberto Carrazana Pernía
 * @since Jun 25 2022
 * @desc Clase Point2D
 * @module point-2d
 */

 'use strict';

 import { Line2D } from './line2d.js';
 
 export const POINT_SIZE = 5;
 export const MIDDLE_POINT_SIZE = 10;
 
 /** @desc Clase Point2D */
  export class Point2D {
   #coordinateX;
   #coordinateY;
   /**
    * @desc Constructor de la clase Point2D.
    * Además de las coordenadas del mismo, este almacenará una etiqueta y el tamaño con el que se
    * dibujaría en un canvas.
    * @param {Number} coordinateX - coordenada x del punto
    * @param {Number} coordinateY - coordenada y del punto
    * @param {String} tag - etiqueta asignada
    * @param {Number} size - tamaño asignado
    */
  constructor(coordinateX, coordinateY, tag, size) {
    this.#coordinateX = coordinateX;
    this.#coordinateY = coordinateY;
    this.tag = tag;
    this.size = size;
  }
  
  /**
    * @desc Método para obtener la distancia a la que se encuentra de otro punto.
    * @param {Point2D} point - punto con el calcular la distancia
    * @return {Number} distancia
    */
  distanceToAnotherPoint(point) {
    let distanceAxisX = Math.abs(this.#coordinateX - point.coordinateX);
    let distanceAxisY = Math.abs(this.#coordinateY - point.coordinateY);
    return(Math.sqrt(Math.pow(distanceAxisX, 2) + Math.pow(distanceAxisY, 2)));
  }
 
   /**
    * @desc Método para obtener la distancia a la que se encuentra el punto de una recta dada.
    * @param {Line2D} line - recta a comprobar
    * @return {Number} distancia
    */
   distanceFromLine(line) {
     let numerator = line.coefficientA * this.#coordinateX + line.coefficientB * this.#coordinateY + line.coefficientC;
     let denominator = Math.sqrt(Math.pow(line.coefficientA, 2) + Math.pow(line.coefficientB, 2));
     return(Math.abs(numerator / denominator));
   }
 
   /**
    * @desc Método para obtener todos los puntos que se encuentran a una determinada distancia del actual.
    * Los puntos con coordenadas que exceden el marco del canvas serán descartados.
    * @param {Number} distance - distancia a la cual deben estar los puntos requeridos
    * @param {Number} height - coordenada Y de la cual no se puede exceder
    * @param {Number} width - coordenada X de la cual no se puede exceder
    * @return {Point2D[]} array de puntos desordenados
    */
   getPointsFromDistance(distance, height, width) {
     let points = [];
     for (let angle = 0.0000; angle < 2 * Math.PI; angle+= 0.0001) {
       let newCoordinateX = this.#coordinateX + distance * Math.cos(angle);
       let newCoordinateY = this.#coordinateY + distance * Math.sin(angle);
       if ((newCoordinateX > width) || (newCoordinateX < 0) || (newCoordinateY > height) || (newCoordinateY < 0)) continue;
       points.push(new Point2D(newCoordinateX, newCoordinateY, 'blue', POINT_SIZE));
     } 
     return(this.#shuffle(points));
   }
 
   /**
    * @desc Método para desordenar el array de puntos.
    * @param {Array} objects - array a desordenar
    * @return {Array} array desordenado
    */
   #shuffle(objects) {
     let objectsRemaining = objects.length;
     let swap, actualObject;
     for (const object of objects) {      
       actualObject = Math.floor(Math.random() * objectsRemaining);
       --objectsRemaining;
       swap = objects[objectsRemaining];
       objects[objectsRemaining] = objects[actualObject];
       objects[actualObject] = swap;
     }
     return(objects);
   }
 
   /**
    * @desc Método para obtener una cadena con la información del punto
    * @return {String} cadena en formato: {coordenadaX, coordenadaY}
    */
   toString() {
     return(`x:${this.#coordinateX}, y:${this.#coordinateY}, color:${this.color}`);
   }

   /**
   * @desc Método para cambiar la coordenada X del punto.
   * @param {Number} newCoordinateX - nueva coordenada X
   */
  setCoordinateX(newCoordinateX) {
    this.#coordinateX = newCoordinateX;
  }

  /**
   * @desc Método para cambiar la coordenada Y del punto.
   * @param {Number} newCoordinateY - nueva coordenada Y
   */
  setCoordinateY(newCoordinateY) {
    this.#coordinateY = newCoordinateY;
  }

  /**
   * @desc Método para sumar un punto al actual. Suma sus coordenadas.
   * @param {Point2D} point - punto a sumar
   */
  addPoint(point) {
    this.#coordinateX += point.#coordinateX;
    this.#coordinateY += point.#coordinateY;
  }

  /**
   * @desc Método para sumar un punto al actual. Suma sus coordenadas.
   * @param {Vector2D} vector - punto a sumar
   */
  addVector(vector) {
    this.#coordinateX += vector.componentX;
    this.#coordinateY += vector.componentY;
  }
 
   /**
    * @desc Método para obtener la coordenada x del punto
    * @return {Number} coordenada x
    */
   get coordinateX() {
     return(this.#coordinateX);
   }
 
   /**
    * @desc Método para obtener la coordenada y del punto
    * @return {Number} coordenada y
    */
   get coordinateY() {
     return(this.#coordinateY);
   }
 }