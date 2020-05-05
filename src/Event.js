const useVkUpdate = require('./hooks/useVkUpdate');

function Event({type, children, update}) {
  update = update || useVkUpdate();
  if (update.type === type) return children;
}

module.exports = Event;
