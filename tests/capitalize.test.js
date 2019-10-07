
function capitilize(str) {
  var firstLetter = str[0].toUpperCase();
  var restOfStr = str.slice(1).toLowerCase();
  return firstLetter + restOfStr;
}

module.exports = capitilize;
