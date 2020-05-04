const Bot = require('botjsx');
const useLongPoll = require('./hooks/useLongPoll');
const useLogger = require('./hooks/useLogger');

function ListenUpdate({children}) {
  const longPoll = useLongPoll();
  const resolve = Bot.useAsync();
  const setContext = Bot.createContext();
  const logger = useLogger();

  longPoll.getUpdates(updates => {
    if (!updates) return;
    updates.forEach(update => {
      if (!update.type) return;
      logger.info(update);
      setContext(update);
      resolve(children);
    });
  });
}

module.exports = ListenUpdate;

