const Bot = require('botjsx');
const Event = require('./Event');

function OnMessageReply({children}) {
  return Bot.createComponent(Event, {type: 'message_reply', children});
}

module.exports = OnMessageReply;
