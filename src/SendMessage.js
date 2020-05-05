const Bot = require('botjsx');
const useVkApi = require('./hooks/useVkApi');
const useVkUpdate = require('./hooks/useVkUpdate');
const useReplyAction = require('./hooks/useReplyAction');

function SendMessage({
  onSent,
  onFail,
  onReply,
  onSuccess,
  toUser,
  toUsers,
  children,
  keyboard,
  payload,
  replyTo,
  forwardMessages,
  attachment
}) {
  const resolve = Bot.useAsync();
  const setContext = Bot.createContext();
  const vkApi = useVkApi();
  const update = useVkUpdate();
  const createReplyAction = useReplyAction();
  let message = Array.isArray(children) ? children.join('') : children;

  if (!toUser) toUser = !toUsers && update ? update.object.from_id : undefined;

  if (keyboard) keyboard = JSON.stringify(Bot.run(keyboard));

  if (payload) payload = JSON.stringify(payload);

  if (toUser || toUsers) {
    return vkApi.sendGroupMessage({
      message: message.toString(),
      user_id: toUser,
      user_ids: toUsers,
      reply_to: replyTo,
      forward_messages: forwardMessages,
      keyboard,
      payload,
      attachment
    }).then(res => {
      setContext(res);
      if (res.response) {
        if (onReply) createReplyAction(toUser, onReply);
        onSuccess && resolve(onSuccess);
      } else {
        onFail && resolve(onFail);
      }
      onSent && resolve(onSent);
    });
  }
}


module.exports = SendMessage;