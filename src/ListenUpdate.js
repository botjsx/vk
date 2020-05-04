const Bot = require('botjsx');
const useLongPoll = require('./hooks/useLongPoll');

function ListenUpdate({children}) {
  const longPoll = useLongPoll();
  const resolve = Bot.useAsync();
  const setContext = Bot.createContext();

  longPoll.getUpdates(updates => {
    if (!updates) return;
    updates.forEach(update => {
      if (!update.type) return;
      setContext(update);
      resolve(children);
    });
  });
}

module.exports = ListenUpdate;

