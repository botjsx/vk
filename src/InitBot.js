const Bot = require('botjsx');
const vkApi = require('./utils/vkApi');
const LongPoll = require('./utils/LongPoll');
const createReplyActions = require('./utils/createReplyActions');

function InitBot({
  accessToken,
  account,
  serviceAccessToken,
  userAccessToken,
  children,
  logger
}) {
  if (!accessToken) throw new Error('accessToken is required');
  if (!account) throw new Error('account is required');
  const setContext = Bot.createContext();
  const useReplyAction = createReplyActions();

  vkApi.setSettings({accessToken, account, serviceAccessToken, userAccessToken});

  const longPoll = new LongPoll({
    access_token: accessToken,
    group_id: account
  });

  setContext({
    vkApi,
    longPoll,
    useReplyAction,
    logger
  });

  return children;
}

module.exports = InitBot;

