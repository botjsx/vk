const Bot = require('botjsx');
const ListenUpdate = require('../ListenUpdate');

function useVkUpdate() {
  if (!Bot.useContext(ListenUpdate)) return;
  return Bot.useContext(ListenUpdate);
}

module.exports = useVkUpdate;
