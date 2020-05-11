const Bot = require('botjsx');
const PropTypes = require('prop-types');
const vkApi = require('./utils/vkApi');
const LongPoll = require('./utils/LongPoll');
const createReplyActions = require('./utils/createReplyActions');

function InitBot({
  accessToken,
  groupId,
  serviceAccessToken,
  userAccessToken,
  children,
  logger
}) {
  if (!accessToken) throw new Error('accessToken is required');
  if (!groupId) throw new Error('groupId is required');
  const run = Bot.useRunner();
  const setContext = Bot.createContext();
  const useReplyAction = createReplyActions();

  vkApi.setSettings({accessToken, groupId, serviceAccessToken, userAccessToken});

  const longPoll = new LongPoll({
    access_token: accessToken,
    group_id: groupId,
    logger
  });

  longPoll.init().then(() => {
    setContext({
      vkApi,
      longPoll,
      useReplyAction,
      logger
    });
    run(children);
  });
}

InitBot.propTypes = {
  accessToken: PropTypes.string.isRequired,
  groupId: PropTypes.string.isRequired
};

module.exports = InitBot;

