const Bot = require('botjsx');
const InitBot = require('../InitBot');

function useLongPoll() {
  return Bot.useContext(InitBot).longPoll;
}

module.exports = useLongPoll;
