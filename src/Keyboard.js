const Bot = require('botjsx');

function Keyboard({oneTime, inline}) {
  return {
    one_time: oneTime,
    inline,
    buttons: []
  };
}

module.exports = Bot.createContext(Keyboard);
