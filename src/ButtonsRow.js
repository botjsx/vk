function ButtonsRow({children}) {
  return Array.isArray(children) ? children : [children];
}

module.exports = ButtonsRow;
