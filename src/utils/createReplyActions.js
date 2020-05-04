module.exports = function createReplyActions() {
  const actions = {};

  return function(key, action) {
    if (!action) {
      if (actions[key]) {
        const action = actions[key];
        delete actions[key];
        return action;
      }
    } else {
      actions[key] = action;
    }
  };
};
