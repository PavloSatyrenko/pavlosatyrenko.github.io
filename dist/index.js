/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./dist/classes/PuzzleSolver.js":
/*!**************************************!*\
  !*** ./dist/classes/PuzzleSolver.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   PuzzleSolver: () => (/* binding */ PuzzleSolver)\n/* harmony export */ });\nclass PuzzleSolver {\n    stateToString(state) {\n        let result = \"\";\n        console.log(state.board.sort((a, b) => {\n            if (a.row === b.row) {\n                return a.column - b.column;\n            }\n            return a.row - b.row;\n        }));\n        return state.board.flat().join('');\n    }\n}\n//# sourceMappingURL=PuzzleSolver.js.map\n\n//# sourceURL=webpack://term_paper/./dist/classes/PuzzleSolver.js?");

/***/ }),

/***/ "./dist/script.js":
/*!************************!*\
  !*** ./dist/script.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _classes_PuzzleSolver__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./classes/PuzzleSolver */ \"./dist/classes/PuzzleSolver.js\");\n\ndocument.addEventListener(\"DOMContentLoaded\", () => {\n    const boardInput = document.getElementById(\"boardInput\");\n    const generateButton = document.getElementById(\"generateButton\");\n    const methodSelect = document.getElementById(\"methodSelect\");\n    const solveButton = document.getElementById(\"solveButton\");\n    const state = {\n        board: [\n            {\n                value: 1,\n                row: 1,\n                column: 2,\n            },\n            {\n                value: 2,\n                row: 1,\n                column: 3,\n            },\n            {\n                value: 3,\n                row: 2,\n                column: 1,\n            },\n            {\n                value: 4,\n                row: 2,\n                column: 2,\n            },\n            {\n                value: 5,\n                row: 2,\n                column: 3,\n            },\n            {\n                value: 6,\n                row: 3,\n                column: 1,\n            },\n            {\n                value: 7,\n                row: 3,\n                column: 2,\n            },\n            {\n                value: 8,\n                row: 3,\n                column: 3,\n            },\n        ],\n        emptyTile: {\n            value: 0,\n            row: 1,\n            column: 1,\n        },\n        cost: 0,\n        heuristic: 0,\n        totalCost: 0,\n    };\n    const puzzleSolver = new _classes_PuzzleSolver__WEBPACK_IMPORTED_MODULE_0__.PuzzleSolver();\n    puzzleSolver.stateToString(state);\n});\n//# sourceMappingURL=script.js.map\n\n//# sourceURL=webpack://term_paper/./dist/script.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./dist/script.js");
/******/ 	
/******/ })()
;