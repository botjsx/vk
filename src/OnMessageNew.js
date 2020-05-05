const Bot = require('botjsx');
const Event = require('./Event');

function OnMessageNew({children}) {
  return Bot.createComponent(Event, {type: 'message_new', children});
}

module.exports = OnMessageNew;
