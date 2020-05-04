const assert = require('assert');
const sinon = require('sinon');
const Bot = require('botjsx');
const CheckText = require('../src/CheckText');

describe('CheckText', () => {
  afterEach(() => {
    // Restore the default sandbox here
    sinon.restore();
  });

  it('createComponent should return valid object', () => {
    const SomeComponent = function() {};
    const component = Bot.createComponent(SomeComponent, {testProp: 'testProp'}, 'children');
    assert.deepEqual(component, {
      component: SomeComponent,
      props: {
        testProp: 'testProp',
        children: 'children'
      },
      context: component.context
    });
  });
});
