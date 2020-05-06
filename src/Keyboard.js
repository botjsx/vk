const Bot = require('botjsx');

function Keyboard({oneTime, inline, children}) {
  const run = Bot.useRun();
  let buttons = [];

  if (Array.isArray(children)) {
    buttons = children;
  } else {
    buttons.push(children);
  }

  if (buttons.length) buttons = run(buttons);

  return {
    one_time: oneTime,
    inline,
    buttons
  };
}

module.exports = Keyboard;
