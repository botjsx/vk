const useVkUpdate = require('./hooks/useVkUpdate');

function CheckText({text, children}) {
  const update = useVkUpdate();
  const inputText = update.object.text;
  if (inputText.toLowerCase() === text.toLowerCase()) return children;
}

module.exports = CheckText;
