const Bot = require('botjsx');
const VkBot = require('../VkBot');

function useVkApi() {
  return Bot.useContext(VkBot).vkApi;
}

module.exports = useVkApi;
