const useReplyAction = require('./hooks/useReplyAction');
const useVkUpdate = require('./hooks/useVkUpdate');

function ReplyAction() {
  const update = useVkUpdate();
  return useReplyAction(update.object.from_id);
}

module.exports = ReplyAction;
