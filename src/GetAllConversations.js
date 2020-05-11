const Bot = require('botjsx');
const useVkApi = require('./hooks/useVkApi');

async function fetchGetConversations({vkApi, groupId, offset}) {
  return await vkApi.callMethod('messages.getConversations', {
    count: 200,
    offset,
    groupId
  });
}

function GetAllConversations({vkApi, children, ...props}) {
  const {groupId} = props;
  vkApi = vkApi || useVkApi();
  const run = Bot.useRunner();
  const setContext = Bot.createContext();
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
    fetchGetConversations({vkApi, offset, ...props}).then(data => {
      if (data.items.length > 0) {
        gotConversations(data);
        getConversations();
      } else {
        setContext(conversations);
        run(children);
      }
    }).catch(err => {
      throw new Error('could not get conversations', err);
    });
  }

  getConversations();
}

module.exports = GetAllConversations;
