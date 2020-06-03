const Bot = require('botjsx');
const useVkApi = require('./hooks/useVkApi');

function GetAllConversations({vkApi, ...props}) {
  return new Promise(resolve => {
    const {groupId} = props;
    vkApi = vkApi || useVkApi();
    let offset = 0;
    let conversations = {
      count: 0,
      items: []
    };

    function gotConversations(data) {
      conversations.count = data.count;
      conversations.items.push(...data.items);
      offset += data.items.length;
    }

    function getConversations() {
      vkApi.callMethod('messages.getConversations', {
        count: 200,
        offset,
        groupId
      }).then(data => {
        if (data.items.length > 0) {
          gotConversations(data);
          getConversations();
        } else {
          resolve(conversations);
        }
      }).catch(err => {
        throw new Error('could not get conversations', err);
      });
    }

    getConversations();
  });
}

module.exports = Bot.createContext(GetAllConversations);
