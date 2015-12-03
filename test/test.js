import Mixin from '../src';

class HasHeight extends Mixin {
  get height() {
    return 72;
  }

  meters() {
    return this.height * 0.0254;
  }

  static maxHeight() {
    return 90;
  }

  static get heightUnits() {
    return 'inches';
  }
}

class HasWeight extends Mixin {
  get weight() {
    return 190;
  }

  static maxWeight() {
    return 600;
  }
}

class Person {
  constructor(name) {
    this.name = name;
  }

  id() {
    return '0001';
  }

  get description() {
    return 'person';
  }

  static tableName() {
    return 'people';
  }

  static get planet() {
    return 'earth';
  }
}

HasHeight.includeInto(Person);
HasWeight.includeInto(Person);

describe('mixmatch', () => {
  it('mixes in an instance getter', () => {
    new Person().height.should.eql(72);
  });

  it('mixes in an instance method', () => {
    new Person().meters().should.eql(1.8288);
  });

  it('mixes in a static getter', () => {
    Person.heightUnits.should.eql('inches');
  });

  it('mixes in a static method', () => {
    Person.maxWeight().should.eql(600);
  });

  it('mixes in a 2nd instance getter', () => {
    new Person().weight.should.eql(190);
  });

  it('mixes in a 2nd static method', () => {
    Person.maxHeight().should.eql(90);
  });

  it('still allows constructor arguments', () => {
    new Person('me').name.should.eql('me');
  });

  it('still allows instance getters on the class', () => {
    new Person().description.should.eql('person');
  });

  it('still allows instance methods on the class', () => {
    new Person().id().should.eql('0001');
  });

  it('still allows static methods on the class', () => {
    Person.tableName().should.eql('people');
  });

  it('still allows static getters on the class', () => {
    Person.planet.should.eql('earth');
  });
});
