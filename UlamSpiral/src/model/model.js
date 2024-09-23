/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author Roberto Carrazana Pernía
 * @since Aug 08 2022
 * @desc Clase Model
 * @module model
 */

 'use static';


  import { Point2D } from "../../../utilities/point2d.js";
  export const DEFAULT_SPACE = 50;
  const DIRECTIONS = [new Point2D(DEFAULT_SPACE, 0), new Point2D(0, -DEFAULT_SPACE),
    new Point2D(-DEFAULT_SPACE, 0), new Point2D(0, DEFAULT_SPACE)];

 /** @desc Clase Model */
export class Model {
  #height;
  #width;
  #points;
  #primesIndex;
  /**
   * @desc Constructor de la clase Model.
   * @param {Number} height - altura máxima (eje x)
   * @param {Number} width - anchura máxima (eje y)
   */
  constructor(height, width) {
    this.#height = height;
    this.#width = width;
    this.#points = [];
    this.#primesIndex = [];
  }

  /**
   * @desc Método para crear los puntos
   * @param {Number} pointsAmount - cantidad de puntos a dibujar
   */
   createPoints(pointsAmount) {
    let actualNumber = 1;
    let actualPoint = new Point2D(this.#width / 2, this.#height / 2);
    let directionIndex = 0;
    let steps = 1;
    let turnCounter = 0;
    for (let pointsCreated = 0; pointsCreated < pointsAmount; ++ pointsCreated) {      
      this.#points.push(new Point2D(actualPoint.coordinateX, actualPoint.coordinateY, `${actualNumber}`));
      this.#primesIndex.push(isPrime(actualNumber));     
      actualPoint.addPoint(DIRECTIONS[directionIndex]);      
      if (actualNumber % steps === 0) {
        directionIndex = (directionIndex + 1) % 4;
        ++ turnCounter;
        if (turnCounter % 2 === 0) ++steps; 
      }
      ++ actualNumber;
    }
  }

  /**
   * @desc Método para actualizar la altura y anchura para tener las mismas que el canvas.
   * @param {Number} height - nueva altura del canvas
   * @param {Number} width - nueva anchura del canvas
   */
  updateDimensions(height, width) {
    this.#height = height;
    this.#width = width;
  }

  /**
   * @desc Método getter para obtener el array de puntos
   * @return {Point2D[]} array de puntos
   */
   get points() {
    return(this.#points)
  }

  /**
   * @desc Método getter para obtener el array de índices de los números primos
   * @return {Boolean[]} array de booleanos
   */
   get primesIndex() {
    return(this.#primesIndex)
  }

  /**
   * @desc Método getter para obtener la altura del canvas
   * @return {Number} altura del canvas
   */
   get height() {
    return(this.#height)
  }

  /**
   * @desc Método getter para obtener la anchura del canvas
   * @return {Number} anchura del canvas
   */
   get width() {
    return(this.#width)
  }
}

/**
 * @desc Función para determinar si un número es primo.
 * @param {Number} number - número a comprobar
 * @returns {true | false} 'true' si es primo
 */
export function isPrime(number) {
  if (number <= 1) return(false);
  for (let actualNumber = 2; actualNumber < number; ++actualNumber) {
    if (number % actualNumber == 0) {
      return(false);
    }      
  }
  return(true);
}