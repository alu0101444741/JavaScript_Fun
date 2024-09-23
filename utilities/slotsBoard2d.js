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

export class SlotBoard2D {
  _height;
  _width;  
  _rows;
  _columns;
  _slots;

  /**
   * @desc Constructor de la clase SlotBoard2D.
   * @param {Number} height - altura máxima (eje x)
   * @param {Number} width - anchura máxima (eje y)
   * @param {Number} dimensionX - dimensión X del puzzle (X x Y)
   * @param {Number} dimensionY - dimensión Y del puzzle (X x Y)
   */
  constructor(height, width, dimensionX, dimensionY) {
    this._height = height;
    this._width = width;
    
    this._rows = dimensionX;
    this._columns = dimensionY;

    let slotWidth = this._width / this._columns;
    let slotHeight = this._height / this._rows;

    let slotCoordinateX = 0;
    let slotCoordinateY = 0;

    this._slots = [];
    for (let rows = 0; rows < this._rows; ++ rows) {
      this._slots.push([]);
      for (let columns = 0; columns < this._columns; ++ columns) {
        this._slots[rows].push(new Slot2D(slotCoordinateX, slotCoordinateY, slotWidth, slotHeight))
        slotCoordinateX += slotWidth;
      }
      slotCoordinateY += slotHeight;
      slotCoordinateX = 0;
    } 
  }

  /**
   * @desc Método para asignar una pieza de puzzle a una casilla del tablero.
   * @param {Number} row - fila
   * @param {Number} column - columna
   * @param {Object2D} object2d - pieza a asignar
   */
  setObject(row, column, object2d) {
    this._slots[row][column].setObject(object2d);
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
    for (let rows = 1; rows < this._columns; ++rows) {  
      let objectsRemaining = this._slots[rows].length;
      for (let columns = 3; (columns < this._rows); ++ columns) {
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

  get rows() {
    return this._rows;
  }

  get columns() {
    return this._columns;
  }

  /**
   * @desc Método para actualizar la altura y anchura para adecuarse a las del canvas.
   * @param {Number} height - nueva altura
   * @param {Number} width - nueva anchura
   */
  /* updateDimensions(height, width) {
    this._height = height;
    this._width = width;
    let slotWidth = this._width / this._dimension;
    let slotHeight = this._height / this._dimension;
    for (let rows = 0; rows < this._dimension; ++ rows) {
      for (let columns = 0; columns < this._dimension; ++ columns) {
        this._slots[rows][columns] = new Slot2D(rows * slotHeight, columns * slotWidth, slotWidth, slotHeight);
      }
    }
  }*/
}