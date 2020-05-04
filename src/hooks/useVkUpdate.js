const Bot = require('botjsx');
const ListenUpdate = require('../ListenUpdate');

function useVkUpdate() {
  return Bot.useContext(ListenUpdate);
}

module.exports = useVkUpdate;
