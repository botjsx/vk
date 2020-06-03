const Bot = require('botjsx');
const Keyboard = require('./Keyboard');

function ButtonsRow() {
  const keyboard = Bot.useContext(Keyboard);
  const buttonsRow = [];
  keyboard.buttons.push(buttonsRow);
  return buttonsRow;
}

module.exports = Bot.createContext(ButtonsRow);
