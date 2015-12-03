## mixmatch [![Build Status](https://secure.travis-ci.org/fulcrumapp/mixmatch.svg)](http://travis-ci.org/fulcrumapp/mixmatch)

Yet another mixin.

## Installation

```sh
npm install mixmatch
```

## Example

```js
import Mixin from 'mixmatch';

class HasHeight extends Mixin {
  get height() {
    return 72;
  }

  heightAsMeters() {
    return this.height * 0.0254;
  }
}

class Person {
  constructor(name) {
    this.name = name;
  }
}

HasHeight.includeInto(Person);

const me = new Person('me');

console.log(me.height);
```
