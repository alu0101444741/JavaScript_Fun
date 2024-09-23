/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author Roberto Carrazana Pernía
 * @since Jul 25 2022
 * @desc Clase View
 * @module view
 */

 'use static';

import { CanvasView } from '../../../utilities/canvasView.js';
import { Point2D } from '../../../utilities/point2d.js';
import { Puzzle } from '../model/puzzle.js';

const PUZZLE_DIMENSION = 4;

 /** @desc Clase View */
export class View extends CanvasView {
  #puzzle;
  #image;
  /**
   * @desc Constructor de la clase View
   * @param {Element} canvas - canvas sobre el que dibujar
   */
  constructor(canvas) {
    super(canvas);

    this.#image = new Image();
    this.#image.src = '../img/Secuestro.png';
    this._height = this.#image.naturalHeight;
    this._width = this.#image.naturalWidth;
    this._canvas.setAttribute('height', this._height);
    this._canvas.setAttribute('width', this._width);

    this.#puzzle = new Puzzle(this.#image.src, PUZZLE_DIMENSION, PUZZLE_DIMENSION, this._height, this._width);
  }

  /**
   * @desc Método para mover una pieza sobre la que se ha hecho click
   * @param {Number} coordinateX - coordenada x en el canvas
   * @param {Number} coordinateY - coordenada y en el canvas
   */
   movePiece(coordinateX, coordinateY) {
    let pieceFound = false;
    let point = new Point2D(coordinateX, coordinateY);
    for (let row = 0; (row < PUZZLE_DIMENSION) && !pieceFound; ++row) {  
      for (let column = 0; (column < PUZZLE_DIMENSION) && !pieceFound; ++column) {
        if (this.#puzzle.getSlot(row, column).hasObject && this.#puzzle.getSlot(row, column).pointInsideSlotRectangle(point)){
          this.#puzzle.movePiece(row, column);
          pieceFound = true;          
        }
      }
    }
  }

  /** @desc Método para animar redibujar la escena */
  update() {
    //this.#resizeCanvas();
    //this.#resizeCanvasElements();
    //this._drawBackground();
    this._draw();
    window.requestAnimationFrame(() => this.update());
  }  

  /** @desc Método para dibujar la escena / mesa de poker */
  _draw() {  
    this._context.clearRect(0, 0, this._width, this._height);
    
    this._drawPuzzle();
    this._drawSlots();

    if (this.#puzzle.victory) this._drawVictoryMessage();
    //this._context.fill();
    //this._context.stroke();
  }

  /** @desc Método para dibujar el puzzle*/
  _drawPuzzle() {
    let height = this.#puzzle.pieceHeight;
    let width = this.#puzzle.pieceWidth;
    for (let rows = 0; rows < PUZZLE_DIMENSION; ++rows) {  
      for (let columns = 0; columns < PUZZLE_DIMENSION; ++columns) {
        let slot = this.#puzzle.getSlot(rows, columns);
        if (slot.hasObject){
          let startCoordinateX = slot.topLeftPoint.coordinateX;
          let startCoordinateY = slot.topLeftPoint.coordinateY;
          let imageCoordinateX = slot.objectContained.piecePoint.coordinateX;
          let imageCoordinateY = slot.objectContained.piecePoint.coordinateY;
          this._context.drawImage(this.#image, imageCoordinateX, imageCoordinateY, width, height, startCoordinateX, startCoordinateY, width, height);
        }
      }
    }
  }

  /** @desc Método para dibujar las casillas */
  _drawSlots() {
    this._context.beginPath();
    this._context.strokeStyle = 'black';
    this._context.lineWidth = 1;

    for (let rows = 0; rows < PUZZLE_DIMENSION; ++ rows) {      
      for (const slot of this.#puzzle.slots[rows]) {
        this._context.strokeRect(slot.topLeftPoint.coordinateX, slot.topLeftPoint.coordinateY, slot.width, slot.height);
      }
    }
    this._context.stroke();
  }

  _drawVictoryMessage() {
    this._context.strokeStyle = 'black';
    this._context.fillStyle = 'white';
    let coordinateX = this._width * 0.5;
    let coordinateY = this._height * 0.5;
    //this._context.fillRect(coordinateX, coordinateY, coordinateX + 100, coordinateY + 100);
    //this._context.strokeRect(coordinateX, coordinateY, coordinateX + 100, coordinateY + 100);
    this._context.fillStyle = 'black';
    this._context.font = '50px Georgia';
    this._context.fillText('WIN', coordinateX - 50, coordinateY);
  }

   /** @desc Método para ajustar el tamaño de los elementos dentro del canvas */
  _resizeCanvasElements() {
    this.#puzzle.updateDimensions(this._height, this._width);
  }
}
