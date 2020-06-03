const Bot = require('botjsx');
const VkBot = require('../VkBot');

function useLogger() {
  return Bot.useContext(VkBot).logger || {
    log: () => {},
    info: () => {},
    debug: () => {},
    error: () => {}
  };
}

module.exports = useLogger;
