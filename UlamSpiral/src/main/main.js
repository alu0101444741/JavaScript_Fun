/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author Roberto Carrazana Pernía
 * @since Jun 21 2022
 * @desc Programa principal para probar el funcionamiento
*/

'use strict';

import { Controller } from '../controller/controller.js';
import { View } from '../view/view.js';
import { Model } from '../model/model.js';

const CANVAS = document.getElementById('mainCanvas');

/** @desc Función main*/
function main() {  
  let view = new View(CANVAS);
  let model = new Model(view.height, view.width);
  let controller = new Controller(view, model);
  view.update();
}
main();