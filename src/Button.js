function Button(props) {
  const {children, color, ...action} = props;
  if (action.payload) action.payload = JSON.stringify(action.payload);

  return {
    color,
    action
  };
}

module.exports = Button;
