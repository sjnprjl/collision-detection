/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is not neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/utils.js":
/*!*************************!*\
  !*** ./src/js/utils.js ***!
  \*************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module */
/*! CommonJS bailout: module.exports is used directly at 6:0-14 */
/***/ ((module) => {

eval("const rand = (min, max) => {\n    min = Math.ceil(min);\n    max = Math.floor(max);\n    return Math.floor(Math.random() * (max - min + 1)) + min;\n};\nmodule.exports = {rand};\n\n\n//# sourceURL=webpack://canvas-boilerplate/./src/js/utils.js?");

/***/ }),

/***/ "./src/js/vector.js":
/*!**************************!*\
  !*** ./src/js/vector.js ***!
  \**************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module */
/*! CommonJS bailout: module.exports is used directly at 44:0-14 */
/***/ ((module) => {

eval("class Vector {\n  constructor(x, y) {\n    this.x = x;\n    this.y = y;\n  }\n\n  static add(vec1, vec2) {\n    return new Vector(vec1.x + vec2.x, vec1.y + vec2.y);\n  }\n\n  static sub(vec1, vec2) {\n    return new Vector(vec1.x - vec2.x, vec1.y - vec2.y);\n  }\n\n  static mult(vec, scaler) {\n    return new Vector(vec.x * scaler, vec.y * scaler);\n  }\n\n  static div(vec, scaler) {\n    return new Vector(vec.x / scaler, vec.y / scaler);\n  }\n\n  static dist(a, b) {\n    let dx = a.x - b.x;\n    let dy = a.y - b.y;\n    return Math.sqrt(dx * dx + dy * dy);\n  }\n\n  static rand(min, max) {\n    return Math.random() * (max - min) + min;\n  }\n  mag() {\n    return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));\n  }\n  getTan() {\n    return new Vector(-this.y, this.x);\n  }\n\n  dot(vec) {\n    return this.x * vec.x + this.y * vec.y;\n  }\n}\n\nmodule.exports = Vector\n\n\n//# sourceURL=webpack://canvas-boilerplate/./src/js/vector.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
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
(() => {
/*!**************************!*\
  !*** ./src/js/canvas.js ***!
  \**************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: __webpack_require__ */
eval("const { rand } = __webpack_require__(/*! ./utils */ \"./src/js/utils.js\")\nconst vector = __webpack_require__(/*! ./vector */ \"./src/js/vector.js\");\n\nconst canvas = document.querySelector('canvas'),\n    ctx = canvas.getContext('2d');\n\n\nlet particle_count , \n    particles;\n\nconst config = {\n    GRAVITY: 0.9, \n    FRICTION: 0.8, \n    AIR_RESITANCE: 0.01, \n    width: 500,\n    height: 500, \n}\n\n\n\nclass Particle {\n    constructor(pos , vel , acc , radius,  color) {\n        this.pos = pos;\n        this.vel = vel;\n        this.acc = acc;\n        this.radius = radius;\n        this.color = color;\n    }\n    draw() {\n        //draw circle\n        ctx.beginPath();\n        ctx.fillStyle = this.color;\n        ctx.arc(this.pos.x , this.pos.y , this.radius , 0 , Math.PI * 2 , false);\n        ctx.fill();\n        ctx.closePath();\n        // end ><\n    }\n\n    update() {\n        this.vel = vector.add(this.vel , this.acc);\n        this.pos = vector.add(this.pos , this.vel);\n\n        if(this.pos.y > canvas.height - this.radius) {\n            this.pos.y = canvas.height - this.radius;\n            this.vel.y = -this.vel.y;\n        } else if(this.pos.y < this.radius) {\n            this.pos.y = this.radius;\n            this.vel.y = -this.vel.y;\n        }\n\n\n        if(this.pos.x > canvas.width - this.radius) {\n            this.pos.x = canvas.width - this.radius;\n            this.vel.x = -this.vel.x;\n        } else if(this.pos.x < this.radius) {\n            this.pos.x = this.radius;\n            this.vel.x = -this.vel.x;\n        }\n\n        this.draw();\n    }\n\n}\n\nconst init = () => {\n\n    particle_count = 10;\n    particles = [];\n\n    canvas.width = config.width;\n    canvas.height = config.height;\n\n    for(let i = 0; i < particle_count; ++i) {\n        particles.push(new Particle(\n            new vector(rand(0 , canvas.width) , 0 + 50),\n            new vector(10,10),\n            new vector(0,1),\n            rand(5 , 10),\n            \"white\"\n        ))\n\n    }\n}\n\ninit();\nconst loop = () => {\n    ctx.rect(0,0, canvas.width , canvas.height);\n    ctx.fillStyle = \"black\";\n    ctx.fill();\n    for(let particle of particles) {\n        particle.update();\n    }\n    requestAnimationFrame(loop);\n\n}\nloop();\n\n\n//# sourceURL=webpack://canvas-boilerplate/./src/js/canvas.js?");
})();

/******/ })()
;