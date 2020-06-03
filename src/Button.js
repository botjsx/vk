const Bot = require('botjsx');
const ButtonsRow = require('./ButtonsRow');

function Button({color, ...action}) {
  const buttonsRow = Bot.useContext(ButtonsRow);
  if (action.payload) action.payload = JSON.stringify(action.payload);
  buttonsRow.push({
    color,
    action
  });
}

module.exports = Button;
