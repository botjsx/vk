const Bot = require('botjsx');
const VkBot = require('../VkBot');

function useLongPoll() {
  return Bot.useContext(VkBot).longPoll;
}

module.exports = useLongPoll;
