const Bot = requrire('botjsx');
const Event = require('./Event');

return function OnNewMessage({children}) {
  return Bot.createComponent(Event, {type: 'message_new'}, children);
};
