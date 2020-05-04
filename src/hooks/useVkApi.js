const Bot = require('botjsx');
const InitBot = require('../InitBot');

function useVkApi() {
  return Bot.useContext(InitBot).vkApi;
}

module.exports = useVkApi;
