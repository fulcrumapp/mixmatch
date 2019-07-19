"use strict";

exports.__esModule = true;
exports["default"] = void 0;

/* eslint no-invalid-this: 0*/
var ExcludedClassProperties = ['__super__'];
var ExcludedPrototypeProperties = ['constructor'];

function mix(from, to, exclude) {
  for (var _iterator = Object.getOwnPropertyNames(from), _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
    var _ref;

    if (_isArray) {
      if (_i >= _iterator.length) break;
      _ref = _iterator[_i++];
    } else {
      _i = _iterator.next();
      if (_i.done) break;
      _ref = _i.value;
    }

    var name = _ref;

    if (exclude.indexOf(name) === -1) {
      if (!to.hasOwnProperty(name)) {
        var descriptor = Object.getOwnPropertyDescriptor(from, name);
        Object.defineProperty(to, name, descriptor);
      }
    }
  }
}

var Mixin =
/*#__PURE__*/
function () {
  function Mixin() {}

  Mixin.includeInto = function includeInto(constructor) {
    // include static properties
    mix(this, constructor, ExcludedClassProperties); // include instance properties

    mix(this.prototype, constructor.prototype, ExcludedPrototypeProperties);

    if (this.included) {
      this.included(constructor);
    }
  };

  return Mixin;
}();

exports["default"] = Mixin;

for (var name in Mixin) {
  if (Mixin.hasOwnProperty(name)) {
    ExcludedClassProperties.push(name);
  }
}
//# sourceMappingURL=index.js.map