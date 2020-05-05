const assert = require('assert');
const sinon = require('sinon');
const Bot = require('botjsx');
const CheckText = require('../src/CheckText');

describe('CheckText', () => {
  afterEach(() => {
    // Restore the default sandbox here
    sinon.restore();
  });

  it('text is string', () => {
    const update = {
      object: {
        text: 'text'
      }
    };
    const Child = sinon.spy();
    Bot.run(Bot.createComponent(CheckText, {text: 'text', update},
      Bot.createComponent(Child, null))
    );
    assert.ok(Child.called);
  });

  it('text is array', () => {
    const update = {
      object: {
        text: 'text'
      }
    };
    const Child = sinon.spy();
    Bot.run(Bot.createComponent(CheckText, {text: ['text', 'hi'], update},
      Bot.createComponent(Child, null))
    );
    assert.ok(Child.called);
  });

  it('text is RegExp', () => {
    const update = {
      object: {
        text: 'text'
      }
    };
    const Child = sinon.spy();
    Bot.run(Bot.createComponent(CheckText, {text: /text/, update},
      Bot.createComponent(Child, null))
    );
    assert.ok(Child.called);
  });
});
