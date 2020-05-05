const useVkUpdate = require('./hooks/useVkUpdate');

function CheckText({text, children, update}) {
  update = update || useVkUpdate();

  const inputText = update.object.text;

  const validate = text => inputText.toLowerCase() === text.toLowerCase();

  // text is array
  if (Array.isArray(text)) {
    for (let textItem of text) {
      if (validate(textItem)) return children;
    }
  }

  // text is regexp
  if (text instanceof RegExp) if (text.test(inputText)) return children;

  // text is string
  if (validate(text)) return children;
}

module.exports = CheckText;
