const ExcludedClassProperties = ['__super__'];
const ExcludedPrototypeProperties = ['constructor'];

function mix(from, to, exclude) {
  for (const name of Object.getOwnPropertyNames(from)) {
    if (exclude.indexOf(name) === -1) {
      if (!to.hasOwnProperty(name)) {
        const descriptor = Object.getOwnPropertyDescriptor(from, name);

        Object.defineProperty(to, name, descriptor);
      }
    }
  }
}

export default class Mixin {
  static includeInto(constructor) {
    // include static properties
    mix(this, constructor, ExcludedClassProperties);

    // include instance properties
    mix(this.prototype, constructor.prototype, ExcludedPrototypeProperties);

    if (this.included) {
      this.included(constructor);
    }
  }
}

for (const name in Mixin) {
  if (Mixin.hasOwnProperty(name)) {
    ExcludedClassProperties.push(name);
  }
}
