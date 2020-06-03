require('dotenv-flow').config();
const assert = require('assert');
const Bot = require('botjsx');
const GetAllConversations = require('../src/GetAllConversations');
const vkApi = require('./vkApi');

describe('GetAllConversations', () => {
  it('should return values', async function() {
    this.timeout(5000);
    function test() {
      return new Promise((resolve) => {
        Bot.run(Bot.createComponent(GetAllConversations, {vkApi},
          function(data) {
            assert.ok(data.count > 0);
            resolve();
          }
        ));
      });
    }
    await test();
  });
});
