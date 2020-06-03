const Bot = require('botjsx');
const VkBot = require('../VkBot');

function useReplyAction(key) {
  const vkBotContext = Bot.useContext(VkBot);
  if (!vkBotContext) return;
  return key ? vkBotContext.useReplyAction(key) : vkBotContext.useReplyAction;
}

module.exports = useReplyAction;
