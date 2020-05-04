const Bot = require('botjsx');
const InitBot = require('../InitBot');

function useReplyAction(key) {
  const vkBotContext = Bot.useContext(InitBot);
  if (!vkBotContext) return;
  return key ? vkBotContext.useReplyAction(key) : vkBotContext.useReplyAction;
}

module.exports = useReplyAction;
