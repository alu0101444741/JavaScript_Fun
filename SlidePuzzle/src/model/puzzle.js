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

import { PUZZLE_DIMENSION } from '../view/view.js';
import { Point2D } from './point2d.js';
import { PuzzlePiece } from './puzzlepiece.js';
import { SlotBoard2D } from './slotsBoard2d.js';

 /** @desc Clase Puzzle */
export class Puzzle {
  #image;
  #height;
  #width;
  #imageHeight;
  #imageWidth;
  #pieces;
  #pieceHeight;
  #pieceWidth;
  #board;
  #winningBoard;
  #victory;
  #emptySpacePosition;
  
  /**
   * @desc Constructor de la clase Puzzle.
   * Se trata de un tablero N x N donde N es la dimensión del puzzle.
   * @param {String} image - ruta/path de la imagen atribuida
   * @param {Number} pieces - dimensión del puzzle.
   */
  constructor(image, pieces, height, width) {
    this.#image = new Image();
    this.#image.src = image;
    this.#pieces = pieces;

    this.#height = height;
    this.#width = width;

    this.#imageHeight = this.#image.naturalHeight;
    this.#imageWidth = this.#image.naturalWidth;
    this.#pieceHeight = this.#height / pieces;//this.#imageHeight / pieces;
    this.#pieceWidth = this.#width / pieces;//this.#imageWidth / pieces;

    this.#board = new SlotBoard2D(this.#height, this.#width);
    this.#winningBoard = new SlotBoard2D(this.#height, this.#width);
    this.#victory = false;
    
    for (let rows = 0; rows < this.#pieces; ++rows) {  
      for (let columns = 0; columns < this.#pieces; ++columns) {
        this.#board.setPiece(rows, columns, new PuzzlePiece(this.#image.src, this.#pieceHeight, this.#pieceWidth, rows * this.#pieceHeight, columns * this.#pieceWidth));
        this.#winningBoard.setPiece(rows, columns, new PuzzlePiece(this.#image.src, this.#pieceHeight, this.#pieceWidth, rows * this.#pieceHeight, columns * this.#pieceWidth));
      }
    }
    this.#board.deletePiece(pieces - 1, pieces - 1);
    this.#winningBoard.deletePiece(pieces - 1, pieces - 1);
    this.#emptySpacePosition = new Point2D(pieces - 1, pieces - 1);
    this.#shuffle();
  }

   /**
   * @desc Método para mover una pieza del puzzle
   * @param {Number} row - fila
   * @param {Number} column - columna
   */
    movePiece(row, column) {
      if (this.emptySpotNeighbour(row, column)) {
        this.#board.swapPieces(this.#board.getSlot(this.#emptySpacePosition.coordinateY, this.#emptySpacePosition.coordinateX), this.#board.getSlot(row, column));
        this.#board.deletePiece(row, column);
        this.#emptySpacePosition.setCoordinateX(column);
        this.#emptySpacePosition.setCoordinateY(row);
      }
      this.#victory = this.#checkBoard();
    }

    emptySpotNeighbour(row, column) {
      if ((row !== this.#emptySpacePosition.coordinateY) && (column !== this.#emptySpacePosition.coordinateX)) {
        return(false);
      }
      return ((Math.abs(row - this.#emptySpacePosition.coordinateY) === 1) || (Math.abs(column - this.#emptySpacePosition.coordinateX) === 1));
    }

    /**
     * @desc Método para comprobar si el tablero actual es idéntico al tablero ganador, es decir aquel que representa la imagen sin desordenar.
     * @return {true | false} 'true' si ambos tableros son iguales
     */
    #checkBoard() {
      for (let rows = 0; rows < this.#pieces; ++rows) {  
        for (let columns = 0; columns < this.#pieces; ++columns) {
          if ((this.#winningBoard.getSlot(rows, columns).hasPiece) && (this.#board.getSlot(rows, columns).hasPiece)) {
            let expectedCoordinateX = this.#winningBoard.getSlot(rows, columns).pieceContained.piecePoint.coordinateX;
            let expectedCoordinateY = this.#winningBoard.getSlot(rows, columns).pieceContained.piecePoint.coordinateY;        
            let coordinateX = this.#board.getSlot(rows, columns).pieceContained.piecePoint.coordinateX;
            let coordinateY = this.#board.getSlot(rows, columns).pieceContained.piecePoint.coordinateY;
            if ((expectedCoordinateX !== coordinateX) || (expectedCoordinateY !== coordinateY)) return(false);
          }
        }
      }
      return(true);
    }

    /** @desc Método para desordenar el puzzle mediante movimientos aleatorios. */
    #shuffle() {      
      for (let move = 0; move < 50; ++move) {
        let moveMade = false;
        for (let rows = 0; (rows < this.#pieces) && !moveMade; ++rows) {  
          for (let columns = 0; (columns < this.#pieces) && !moveMade; ++columns) {
            if (this.emptySpotNeighbour(rows, columns)) {
              this.#board.swapPieces(this.#board.getSlot(this.#emptySpacePosition.coordinateY, this.#emptySpacePosition.coordinateX), this.#board.getSlot(rows, columns));
              this.#board.deletePiece(rows, columns);
              this.#emptySpacePosition.setCoordinateX(columns);
              this.#emptySpacePosition.setCoordinateY(rows);
              moveMade = true;
            }
          }
        }
      }
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
   * @desc Método getter para obtener la altura de la casilla
   * @return {Number} altura de la casilla
   */
  get pieceHeight() {
    return(this.#pieceHeight);
  }

  /**
   * @desc Método getter para obtener la anchura de la casilla
   * @return {Number} anchura de la casilla
   */
   get pieceWidth() {
    return(this.#pieceWidth);
  }

  
  /**
   * @desc Método getter para saber obtener el estado del tablero
   * @return {true | false} 'true' si es victorioso
   */
  get victory() {
    return(this.#victory);
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