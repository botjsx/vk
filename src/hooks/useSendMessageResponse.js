const Bot = require('botjsx');
const SendMessage = require('../SendMessage');

function useSendMessageResponse() {
  return Bot.useContext(SendMessage);
}

module.exports = useSendMessageResponse;
