const Bot = require('botjsx');
const Event = require('./Event');

function OnNewMessage({children}) {
  return Bot.createComponent(Event, {type: 'message_new', children});
}

module.exports = OnNewMessage;
