const Bot = require('botjsx');

function Keyboard({oneTime, inline, children}) {
  let buttons = [];

  if (Array.isArray(children)) {
    buttons = children;
  } else {
    buttons.push(children);
  }

  if (buttons.length) buttons = Bot.run(buttons);

  return {
    one_time: oneTime,
    inline,
    buttons
  };
}

module.exports = Keyboard;
