const parseAtom = require("../parse-atom/parseAtom");

const parseExpression = (expression) => {
  const atoms = expression.split(" ");

  if (atoms.length !== 6) {
    throw new Error("Incorrect number of parameters provided");
  }

  //   if (atoms[2] !== "?" && atoms[4] !== "?") {
  //     console.warn(
  //       "Warning: Day of week parameter would be ignored due to day of month parameter being provided."
  //     );
  //   }

  let values = [];
  atoms.forEach((item, index) => {
    switch (index) {
      case 0:
        // Minutes
        values.push(parseAtom(item, 59));
        break;
      case 1:
        // Hours
        values.push(parseAtom(item, 59));
        break;
      case 2:
        // Day of Month
        values.push(parseAtom(item, 31, 1));
        break;
      case 3:
        // Month
        values.push(parseAtom(item, 12, 1));
        break;
      case 4:
        // Day of Week
        values.push(parseAtom(item, 7, 1));
        break;
      case 5:
        values.push([item]);
        break;
    }
  });

  return values;
};

module.exports = parseExpression;
