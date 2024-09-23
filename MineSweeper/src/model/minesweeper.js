/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author Roberto Carrazana Pernía
 * @since Jul 25 2022
 * @desc Clase Puzzle
 * @module view
 */

 'use static';

import { SlotBoard2D } from './slotsBoard2d.js';

 /** @desc Clase MineSweeper */
export class MineSweeper {
  #height;
  #width;
  #rows;
  #columns;
  #board;
  #revealedSlots;
  #victory;
  #defeat;  
  /**
   * @desc Constructor de la clase MineSweeper.
   * Se trata de un tablero N x M casillas.
   * @param {Number} height - altura máxima (eje x)
   * @param {Number} width - anchura máxima (eje y)
   * @param {Number} rows - filas
   * @param {Number} columns - columnas
   * @param {Number} bombsToPlace - cantidad de bombas a colocar en el tablero
   */
  constructor(height, width, rows, columns, bombsToPlace) {
    this.#height = height;
    this.#width = width;
    this.#rows = rows;
    this.#columns = columns;
    this.#board = new SlotBoard2D(this.#height, this.#width, rows, columns);
    
    for (let bombs = 0; bombs < bombsToPlace; ++bombs) {
      let row = Math.floor(rows * Math.random());
      let column =  Math.floor(columns * Math.random());     
      this.#board.setObject(row, column, 'bomb');
    }
    for (let row = 0; row < this.#board.rows; ++row) {      
      for (let column = 0; column < this.#board.columns; ++column) {
        if (this.#board.slots[row][column].objectContained !== 'bomb') {
          this.#board.setObject(row, column, this.bombsAround(row, column));
        }        
      }
    }

    this.#revealedSlots = [];
    for (let row = 0; row < this.#board.rows; ++row) {
      this.#revealedSlots.push([]);
      for (let column = 0; column < this.#board.columns; ++column) {        
        this.#revealedSlots[row].push(false);
      }
    }
    this.#victory = false;
    this.#defeat = false;    
  }

  /**
   * @desc Método para revelar el contenido de una casilla
   * @param {Number} row - fila
   * @param {Number} column - columna
   */
  revealSlot(row, column) {
    this.#revealedSlots[row][column] = true;
    this.#victory = this.#checkBoard();
    if (this.#board.slots[row][column].objectContained === 'bomb') {
      this.#defeat = true;
    }
    else if (this.#board.slots[row][column].objectContained === 0) {
      let firstRow = (row === 0) ? true : false;
      let lastRow = (row === this.#rows - 1) ? true : false;
      let firstColumn = (column === 0) ? true : false;
      let lastColumn = (column === this.#columns - 1) ? true : false;

      if (!lastRow && !(this.#revealedSlots[row + 1][column])) {
        this.revealSlot(row + 1, column);
      }
      if (!firstRow && !(this.#revealedSlots[row - 1][column])) {
        this.revealSlot(row - 1, column);
      }
      if (!lastColumn && !(this.#revealedSlots[row][column + 1])) {
        this.revealSlot(row, column + 1);
      }
      if (!firstColumn && !(this.#revealedSlots[row][column - 1])) {
        this.revealSlot(row, column - 1);
      }
    }      
  }

  /**
   * @desc Método para comprobar si el tablero actual es idéntico al tablero ganador, es decir aquel que representa la imagen sin desordenar.
   * @return {true | false} 'true' si ambos tableros son iguales
   */
  #checkBoard() {
    for (let rows = 0; rows < this.#rows; ++rows) {  
      for (let columns = 0; columns < this.#columns; ++columns) {
        if ((this.#board.slots[rows][columns].objectContained !== 'bomb') && !(this.slotRevealed(rows, columns))) {
          return(false);
        }
      }
    }
    return(true);
  }

  /**
   * @desc Método para saber si una casilla está revelada.
   * @param {Number} row - fila
   * @param {Number} column - columna
   * @return {true | false} 'true' si está revelada
   */
  slotRevealed(row, column) {
    return(this.#revealedSlots[row][column]);
  }

  /**
   * @desc Método para saber cuantas bombas hay alrededor de una casilla.
   * @param {Number} row - fila
   * @param {Number} column - columna
   * @return {Number} cantidad de bombas
   */
  bombsAround(row, column) {
    let bombCounter = 0;
    if (!(this.#board.slots[row][column].hasObject) || (this.#board.slots[row][column].objectContained !== 'bomb')) {
      // Revisa casilla a la izquierda
      if (column > 0) {
        if ((this.#board.slots[row][column - 1].hasObject) && (this.#board.slots[row][column - 1].objectContained === 'bomb')) {
          ++ bombCounter;
        }
        // Revisa casilla superior izquierda
        if ((row > 0) && (this.#board.slots[row - 1][column - 1].hasObject) && (this.#board.slots[row - 1][column].objectContained === 'bomb')) {
          ++ bombCounter;
        }
      }
      // Revisa casilla superior
      if (row > 0) {
        if ((this.#board.slots[row - 1][column].hasObject) && (this.#board.slots[row - 1][column].objectContained === 'bomb')) {
          ++ bombCounter;
        }
        if ((column < this.#board.columns - 1) && (this.#board.slots[row - 1][column + 1].hasObject) && (this.#board.slots[row - 1][column + 1].objectContained === 'bomb')) {
            ++ bombCounter;
        }
      }
      // Revisa casilla a la derecha
      if (column < this.#board.columns - 1) {
        if ((this.#board.slots[row][column + 1].hasObject) && (this.#board.slots[row][column + 1].objectContained === 'bomb')) {
          ++ bombCounter;
        }
        // Revisa casilla inferior derecha
        if ((row < this.#board.rows - 1) && (this.#board.slots[row + 1][column + 1].hasObject) && (this.#board.slots[row + 1][column + 1].objectContained === 'bomb')) {
          ++ bombCounter;
        }
      }
      // Revisa casilla inferior          
      if (row < this.#board.rows - 1) {
        if ((this.#board.slots[row + 1][column].hasObject) && (this.#board.slots[row + 1][column].objectContained === 'bomb')) {
          ++ bombCounter;
        }
        // Revisa casilla inferior izquierda
        if ((column > 0) && (this.#board.slots[row + 1][column - 1].hasObject) && (this.#board.slots[row + 1][column - 1].objectContained === 'bomb')) {
          ++ bombCounter;
        }
      }
    }
    return(bombCounter);
  }

   /**
   * @desc Método getter para obtener una de las casillas del tablero
   * @param {Number} row - fila
   * @param {Number} column - columna
   * @return {Slot2D} casilla
   */
  getSlot(row, column) {
    return(this.#board.getSlot(row, column));
  }

  /**
   * @desc Método getter para obtener la matriz de casillas
   * @return { Slot2D [][] } matriz de casillas
   */
  get slots() {
    return(this.#board.slots);
  }

  /**
   * @desc Método getter para obtener el estado del tablero
   * @return {Number} cantidad de filas
   */
   get rows() {
    return(this.#rows);
  }
  
  /**
   * @desc Método getter para saber el estado del tablero
   * @return {true | false} 'true' si es victorioso
   */
  get victory() {
    return(this.#victory);
  }

  /**
   * @desc Método getter para saber el estado del tablero
   * @return {true | false} 'true' si es una derrota
   */
   get defeat() {
    return(this.#defeat);
  }

  /**@desc Método para obtener una cadena con la información del tablero
   * @return {String} cadena
   */
  toString() {
    let information = '';
    for (let row = 0; row < this.#board.rows; ++row) {      
      for (let column = 0; column < this.#board.columns; ++column) {
        information += (' ' + this.#board.slots[row][column]);       
      }
      information += '\n';
    }
  }

  /**
   * @desc Método para actualizar la altura y anchura para adecuarse a las del canvas.
   * @param {Number} height - nueva altura del canvas
   * @param {Number} width - nueva anchura del canvas
   */
  /*updateDimensions(height, width) {
    this.#height = height;
    this.#width = width;
    this.#pieceHeight = this.#height / PUZZLE_DIMENSION;
    this.#pieceWidth = this.#width / PUZZLE_DIMENSION;
    this.#board.updateDimensions(this.#height, this.#width);
    
    for (let rows = 0; rows < this.#pieces; ++rows) {  
      for (let columns = 0; columns < this.#pieces; ++columns) {
        this.#board.setPiece(rows, columns, new PuzzlePiece(this.#image.src, this.#pieceHeight, this.#pieceWidth, rows * this.#pieceHeight, columns * this.#pieceWidth));
      }
    }
    this.#board.deletePiece(this.#emptySpacePosition.coordinateY, this.#emptySpacePosition.coordinateX);
  }*/
}