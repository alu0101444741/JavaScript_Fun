/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author Roberto Carrazana Pernía
 * @since Jun 25 2022
 * @desc Clase SlotBoard2D
 * @module slot-board-2d
 */

 'use strict';

import { Slot2D } from './slot2d.js';
import { PUZZLE_DIMENSION } from '../SlidePuzzle/src/view/view.js';

export class SlotBoard2D {
  _height;
  _width;
  _slots;

  /**
   * @desc Constructor de la clase SlotBoard2D.
   * @param {Number} height - altura máxima (eje x)
   * @param {Number} width - anchura máxima (eje y)
   */
  constructor(height, width) {
    this._height = height;
    this._width = width;
    this._slots = [];

    let slotWidth = this._width / PUZZLE_DIMENSION;
    let slotHeight = this._height / PUZZLE_DIMENSION;
    for (let rows = 0; rows < PUZZLE_DIMENSION; ++ rows) {
      this._slots.push([]);
      for (let columns = 0; columns < PUZZLE_DIMENSION; ++ columns) {
        this._slots[rows].push(new Slot2D(rows * slotHeight, columns * slotWidth, slotWidth, slotHeight))
      }
    }
  }

  /**
   * @desc Método para asignar una pieza de puzzle a una casilla del tablero.
   * @param {Number} row - fila
   * @param {Number} column - columna
   * @param {PuzzlePiece} piece - pieza a asignar
   */
  setObject(row, column, piece) {
    this._slots[row][column].setObject(piece);
  }

  /**
   * @desc Método para eliminar una pieza de puzzle de una casilla del tablero.
   * @param {Number} row - fila
   * @param {Number} column - columna
   */
  deleteObject(row, column) {
    this._slots[row][column].deleteObject();
  }

  /**
   * @desc Método para intercambiar piezas.
   * @param {Slot2D} slotOne - 
   * @param {Slot2D} slotTwo - 
   */
  swapObjects(slotOne, slotTwo) {
    let swap = slotOne.objectContained;
    slotOne.setObject(slotTwo.objectContained);
    slotTwo.setObject(swap);
  }

  /** @desc Método para desordenar el tablero. */
  shuffle() {    
    let swap, currentObject;
    for (let rows = 1; rows < PUZZLE_DIMENSION; ++rows) {  
      let objectsRemaining = this._slots[rows].length;
      for (let columns = 3; (columns < PUZZLE_DIMENSION); ++ columns) {
        currentObject = Math.floor(Math.random() * objectsRemaining);
        --objectsRemaining;
        if (this._slots[rows][objectsRemaining].hasPiece) {
          swap = this._slots[rows][objectsRemaining].objectContained;
          this.setObject(rows, objectsRemaining, this._slots[rows][currentObject].objectContained);
          this.setObject(rows, currentObject, swap);
        }        
      }
    }
  }
  
  /**
   * @desc Método getter para obtener una de las casillas del tablero
   * @param {Number} row - fila
   * @param {Number} column - columna
   * @return {Slot2D} casilla solicitada
   */
  getSlot(row, column) {
    return(this._slots[row][column]);
  }

  /**
   * @desc Método getter para obtener la matriz de casillas
   * @return { Slot2D [][] } matriz de casillas
   */
  get slots() {
    return(this._slots);
  }

  /**
   * @desc Método para actualizar la altura y anchura para adecuarse a las del canvas.
   * @param {Number} height - nueva altura
   * @param {Number} width - nueva anchura
   */
  /* updateDimensions(height, width) {
    this._height = height;
    this._width = width;
    let slotWidth = this._width / PUZZLE_DIMENSION;
    let slotHeight = this._height / PUZZLE_DIMENSION;
    for (let rows = 0; rows < PUZZLE_DIMENSION; ++ rows) {
      for (let columns = 0; columns < PUZZLE_DIMENSION; ++ columns) {
        this._slots[rows][columns] = new Slot2D(rows * slotHeight, columns * slotWidth, slotWidth, slotHeight);
      }
    }
  }*/
}