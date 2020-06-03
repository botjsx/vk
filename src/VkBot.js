const Bot = require('botjsx');
const PropTypes = require('prop-types');
const vkApi = require('./utils/vkApi');
const LongPoll = require('./utils/LongPoll');
const createReplyActions = require('./utils/createReplyActions');

async function VkBot({
  accessToken,
  groupId,
  serviceAccessToken,
  userAccessToken,
  logger
}) {
  if (!accessToken) throw new Error('accessToken is required');
  if (!groupId) throw new Error('groupId is required');
  const useReplyAction = createReplyActions();

  vkApi.setSettings({accessToken, groupId, serviceAccessToken, userAccessToken});

  const longPoll = new LongPoll({
    access_token: accessToken,
    group_id: groupId,
    logger
  });

  await longPoll.init();

  return {
    vkApi,
    longPoll,
    useReplyAction,
    logger
  };
}

VkBot.propTypes = {
  accessToken: PropTypes.string.isRequired,
  groupId: PropTypes.string.isRequired
};

module.exports = Bot.createContext(VkBot);

