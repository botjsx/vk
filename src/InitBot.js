const Bot = require('botjsx');
const PropTypes = require('prop-types');
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
  const resolve = Bot.useAsync();
  const setContext = Bot.createContext();
  const useReplyAction = createReplyActions();

  vkApi.setSettings({accessToken, account, serviceAccessToken, userAccessToken});

  const longPoll = new LongPoll({
    access_token: accessToken,
    group_id: account,
    logger
  });

  longPoll.init().then(() => {
    setContext({
      vkApi,
      longPoll,
      useReplyAction,
      logger
    });
    resolve(children);
  });
}

InitBot.propTypes = {
  accessToken: PropTypes.string.isRequired,
  account: PropTypes.string.isRequired
};

module.exports = InitBot;

