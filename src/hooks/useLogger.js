const Bot = require('botjsx');
const InitBot = require('../InitBot');

function useLogger() {
  return Bot.useContext(InitBot).logger || {
    log: () => {},
    info: () => {},
    debug: () => {},
    error: () => {}
  };
}

module.exports = useLogger;
