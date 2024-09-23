/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author Roberto Carrazana Pernía
 * @since Sep 06 2022
 * @desc Clase View
 * @module view
 */

 'use static';

import { CanvasView } from '../../../utilities/canvasView.js';
import { MineSweeper } from '../model/minesweeper.js';
import { Point2D } from '../model/point2d.js';

const DEFAULT_BOARD_ROWS = 12;
const DEFAULT_BOARD_COLUMNS = 12;
const DEFAULT_BOMBS = 7;

const NUMBER_COLORS = ['gray','blue', 'green', 'red', 'yellow', 'pink'];

 /** @desc Clase View */
export class View extends CanvasView {
  #board;
  #boardRows;
  #boardColumns;
  #boardBombs;
  #gameEnd;
  #END_MESSAGE_SIZE;
  #NUMBERS_SIZE;
  #newRows;
  #newColumns;
  #newBombs;
  /**
   * @desc Constructor de la clase View
   * @param {Element} canvas - canvas sobre el que dibujar
   */
  constructor(canvas) {
    super(canvas);

    this.#boardRows = DEFAULT_BOARD_ROWS;
    this.#boardColumns = DEFAULT_BOARD_COLUMNS;
    this.#boardBombs = DEFAULT_BOMBS;
    this.#board = new MineSweeper(this._height, this._width, this.#boardRows, this.#boardColumns, this.#boardBombs);

    this.#gameEnd = false;
    this.#END_MESSAGE_SIZE = this._height / 3;
    this.#NUMBERS_SIZE = this._height / this.#boardRows;
  }

  /**
   * @desc Método para mover una pieza sobre la que se ha hecho click
   * @param {Number} coordinateX - coordenada x en el canvas
   * @param {Number} coordinateY - coordenada y en el canvas
   */
  clickOnSlot(coordinateX, coordinateY) {
    //if (((coordinateX > 0) && (coordinateX < this._width)) && ((coordinateY > 0) && (coordinateY < this._height))) {
      let objectFound = false;
      let point = new Point2D(coordinateX, coordinateY);
      for (let row = 0; (row < this.#boardRows) && !objectFound; ++row) {  
        for (let column = 0; (column < this.#boardColumns) && !objectFound; ++column) {
          if (this.#board.getSlot(row, column).hasObject && this.#board.getSlot(row, column).pointInsideSlotRectangle(point)){
            this.#board.revealSlot(row, column);
            objectFound = true;       
          }
        }
      }
    //}    
  }

  /** @desc Método para animar redibujar la escena */
  update() {
    //this.#resizeCanvas();
    //this.#resizeCanvasElements();

    this._drawBackground(this._createRadialGradient(
      this._width / 2, this._height / 2, this._height / 10,
      this._width / 2, this._height / 2, this._width / 2,
      [[0, 'lightgreen'], [0.1, 'lightgreen'], [0.9, 'green'], [1, 'darkgreen']]
    ));

    this._getResetInformation();
    this._draw();
    window.requestAnimationFrame(() => this.update());
  }  

  /** @desc Método para dibujar la escena / mesa de poker */
  _draw() {  
    this._context.clearRect(0, 0, this._width, this._height);
    this._drawSlots();
    this._drawRevealedSlots();

    if ((this.#board.victory) || (this.#board.defeat)) {
      this._drawEndMessage(this.#board.victory);
      this.#gameEnd = true;
    }
  }

  /** @desc Método para dibujar el contenido de las casillas */
  _drawRevealedSlots() {    
    this._context.strokeStyle = 'red';
    this._context.lineWidth = 8;   
    this._context.font = `${this.#NUMBERS_SIZE}px Georgia`;   
    this._context.textAlign = "center";
    this._context.textBaseline = "middle";
    
    for (let rows = 0; rows < this.#boardRows; ++ rows) {
      let columns = 0;
      for (const slot of this.#board.slots[rows]) {
        this._context.beginPath(); 
        if (this.#board.slotRevealed(rows, columns)) {
          if (slot.objectContained === 'bomb') {
            this._drawBomb(slot);          
          }   
          else {
            this._context.fillStyle = NUMBER_COLORS[Math.min(slot.objectContained, NUMBER_COLORS.length - 1)];
            this._context.fillText(slot.objectContained, slot.centerPoint.coordinateX, slot.centerPoint.coordinateY);
          } 
        }        
        this._context.fill();
        this._context.stroke();
        ++ columns;   
      }      
    }
  }

  /** @desc Método para dibujar una bomba en una casilla. La constituyen un círculo y tres líneas cruzadas. */
  _drawBomb(slot) {
    this._context.fillStyle = 'coral';
    const SPIKES_REDUCTION = 10;
    this._context.ellipse(slot.centerPoint.coordinateX, slot.centerPoint.coordinateY, slot.height / 4, slot.width / 4, Math.PI / 4, 0, Math.PI * 2);

    this._context.moveTo(slot.topLeftPoint.coordinateX + SPIKES_REDUCTION, slot.topLeftPoint.coordinateY + SPIKES_REDUCTION);
    this._context.lineTo(slot.bottomRightPoint.coordinateX - SPIKES_REDUCTION, slot.bottomRightPoint.coordinateY - SPIKES_REDUCTION);

    this._context.moveTo(slot.topLeftPoint.coordinateX + SPIKES_REDUCTION, slot.bottomRightPoint.coordinateY - SPIKES_REDUCTION);
    this._context.lineTo(slot.bottomRightPoint.coordinateX - SPIKES_REDUCTION, slot.topLeftPoint.coordinateY + SPIKES_REDUCTION);

    this._context.moveTo(slot.topLeftPoint.coordinateX + SPIKES_REDUCTION / 2, slot.centerPoint.coordinateY);
    this._context.lineTo(slot.bottomRightPoint.coordinateX - SPIKES_REDUCTION / 2, slot.centerPoint.coordinateY);

    this._context.moveTo(slot.centerPoint.coordinateX, slot.topLeftPoint.coordinateY + SPIKES_REDUCTION / 2);
    this._context.lineTo(slot.centerPoint.coordinateX, slot.bottomRightPoint.coordinateY - SPIKES_REDUCTION / 2);
  }

  /** @desc Método para dibujar las casillas */
  _drawSlots() {
    this._context.beginPath();
    this._context.strokeStyle = 'black';
    this._context.lineWidth = 1;   

    for (let rows = 0; rows < this.#boardRows; ++ rows) {
      for (const slot of this.#board.slots[rows]) {
        let slotGradient = this._context.createRadialGradient(
          slot.centerPoint.coordinateX,
          slot.centerPoint.coordinateY,
          Math.min(slot.height, slot.width) / 4,
          slot.centerPoint.coordinateX,
          slot.centerPoint.coordinateY,
          Math.min(slot.height, slot.width)
        );
        
        slotGradient.addColorStop(0, 'lightgray');
        slotGradient.addColorStop(0.9, 'gray');
        slotGradient.addColorStop(1, 'darkgray');
        this._context.fillStyle = slotGradient;  
            
        this._context.fillRect(slot.topLeftPoint.coordinateX, slot.topLeftPoint.coordinateY, slot.width, slot.height);
        this._context.strokeRect(slot.topLeftPoint.coordinateX, slot.topLeftPoint.coordinateY, slot.width, slot.height);       
      }      
    }
    this._context.fill();
    this._context.stroke();
  }

  /**
   * @desc Método para dibujar un mensaje que indica el fin de la partida.
   * En caso de victoria para el jugador se imprime WIN, y BUM! en caso contrario.
   * @param {Boolean} victory - 'true' si el juego finaliza y el jugador ha salido victorioso.
   */
  _drawEndMessage(victory) {
    this._context.strokeStyle = 'black';    
    this._context.textAlign = "center";
    this._context.textBaseline = "middle";    
    
    let endMessage = (victory) ? 'WIN' : 'BUM!';
    let coordinateX = this._width / 2;
    let coordinateY = this._height / 2;
    //this._context.fillRect(coordinateX, coordinateY, coordinateX + 100, coordinateY + 100);
    //this._context.strokeRect(coordinateX, coordinateY, coordinateX + 100, coordinateY + 100);    
    this._context.font = `${this.#END_MESSAGE_SIZE}px Georgia`; 
    this._context.fillStyle = 'black';   
    this._context.fillText(endMessage, coordinateX, coordinateY);

    this._context.font = `${this.#END_MESSAGE_SIZE - 20}px Georgia`;
    this._context.fillStyle = 'white';
    this._context.fillText(endMessage, coordinateX, coordinateY);
  }

  /** @desc Método para obtener la información de los campos. Estos valores se aplicarán tras reiniciar el juego */
  _getResetInformation() {
    this.#newRows = document.getElementById('rowsAmount').value;
    this.#newColumns = document.getElementById('columnsAmount').value;
    this.#newBombs = document.getElementById('bombsAmount').value;
  }

  /** @desc Método para reiniciar el juego */
  restart() {
    this.#board = new MineSweeper(this._height, this._width, this.#newRows, this.#newColumns, this.#newBombs);
    this.#boardRows = this.#newRows;
    this.#boardColumns = this.#newColumns;
    this.#boardBombs = this.#newBombs;
    this.#gameEnd = false;
    this.#NUMBERS_SIZE = this._height / this.#board.rows;    
  }

   /** @desc Método para ajustar el tamaño de los elementos dentro del canvas */
  #resizeCanvasElements() {
    this.#board.updateDimensions(this._height, this._width);
  }

  /**
   * @desc Método getter para obtener el estado del juego
   * @return {true | false} 'true' si el juego sigue en marcha
   */
  get gameEnd() {
    return(this.#gameEnd)
  }
}
