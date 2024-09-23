/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 *
 * @author Roberto Carrazana Pernía
 * @since Aug 09 2022
 * @desc Clase View
 * @module canvas-view
 */

'use static';

 /** @desc Clase CanvasView */
export class CanvasView {
  _canvas;
  _context;  
  _height;
  _width;

  /**
   * @desc Constructor de la clase View
   * @param {Element} canvas - objeto canvas sobre el que dibujar
   */
  constructor(canvas) {
    this._height = Number(canvas.getAttribute('height'));
    this._width = Number(canvas.getAttribute('width'));
    this._canvas = canvas;
    this._context = canvas.getContext('2d');
  }

  /** @desc Método para animar redibujar la escena */
  update() {
    //this._resizeCanvas();    
    this._drawBackground();
    this._draw();
    window.requestAnimationFrame(() => this.update());
  }

  _draw() {}

  /** @desc Método para rellenar el fondo del_canvas */
  _drawBackground(color = "white") {    
    this._context.fillStyle = color;
    this._context.fillRect(0, 0, this._width, this._height);
  }
  
  /** @desc Método para ajustar el tamaño del_canvas al tamaño de la ventana */
  _resizeCanvas() {
    this._width = window.innerWidth * 0.75;
    this._height = window.innerHeight  * 0.7;
    //this._resizeCanvasElements();
    this._canvas.setAttribute('height', this._height);
    this._canvas.setAttribute('width', this._width);
  }  

  /** @desc Método para ajustar el tamaño de los elementos dentro del canvas */
  _resizeCanvasElements() {
    /*
    this._width = window.innerWidth * 3 / 4;
    this._height = window.innerHeight * 3 / 3;
    this._canvas.setAttribute('height', this._height);
    this._canvas.setAttribute('width', this._width);
    */
  }

  
  /**
   * @desc Método getter para obtener la altura del canvas
   * @param {Number} initialX - The x-axis coordinate of the start circle.
   * @param {Number} initialY - The y-axis coordinate of the start circle.
   * @param {Number} endX - The x-axis coordinate of the end circle.
   * @param {Number} endY - The y-axis coordinate of the end circle.
   * @param {Number} startRadius - The radius of the start circle. Must be non-negative and finite.
   * @param {Number} endRadius - The radius of the end circle. Must be non-negative and finite.
   * @param {Number[]} colorStops - Color stops to be added. 2-tuples as [Number, String]
   * @return {Number} result gradient
   */
  _createRadialGradient(initialX, initialY, endX, endY, startRadius, endRadius, colorStops) {
    let gradient = this._context.createRadialGradient(initialX, initialY, startRadius, endX, endY, endRadius);
    for(const colorStop of colorStops) {
      gradient.addColorStop(colorStop[0], colorStop[1]);
    }
    return gradient;
  }

  /**
   * @desc Método getter para obtener la altura del canvas
   * @return {Number} altura del_canvas
   */
  get height() {
    return(this._height)
  }

  /**
   * @desc Método getter para obtener la anchura del canvas
   * @return {Number} anchura del_canvas
   */
   get width() {
    return(this._width)
  }
}