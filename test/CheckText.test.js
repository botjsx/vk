const assert = require('assert');
const sinon = require('sinon');
const Bot = require('botjsx');
const {useVkUpdate} = require('../src/hooks/useVkUpdate');
const CheckText = require('../src/CheckText');

describe('CheckText', () => {
  afterEach(() => {
    // Restore the default sandbox here
    sinon.restore();
  });

  it('should run children', () => {

  });
});
