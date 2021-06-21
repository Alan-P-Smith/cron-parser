const generateRange = (start, end) => {
  return Array(end - start + 1)
    .fill()
    .map((_, index) => start + index);
};

const handleAllValues = (upperLimit, lowerLimit) => {
  return generateRange(lowerLimit, upperLimit);
};

const handleRange = (expression, upperLimit, lowerLimit) => {
  const [start, end] = expression.split("-");
  const parsedStart = parseInt(start, 10);
  const parsedEnd = parseInt(end, 10);

  if (start < lowerLimit || end > upperLimit) {
    throw new Error("Range exceeded bounds");
  }

  return generateRange(parsedStart, parsedEnd);
};

const handleExplicitValues = (expression, upperLimit, lowerLimit) => {
  let explicitValues = expression.split(",");
  explicitValues = explicitValues.map((value) => {
    if (value < lowerLimit || value > upperLimit) {
      throw new Error("Explicit value exceeded bounds");
    }
    return parseInt(value, 10);
  });

  return explicitValues;
};

const handleIncrements = (expression, upperLimit, lowerLimit) => {
  let [start, increment] = expression.split("/");

  if (start === "*") {
    start = lowerLimit;
  }

  const parsedStart = parseInt(start, 10);
  const parsedIncrement = parseInt(increment, 10);

  if (parsedStart < lowerLimit || parsedStart > upperLimit) {
    throw new Error("Starting increment exceeded bounds");
  }

  let running = true;
  values = [parsedStart];
  do {
    const newIncrement = values[values.length - 1] + parsedIncrement;
    if (newIncrement <= upperLimit) {
      values.push(newIncrement);
    } else {
      running = false;
    }
  } while (running);

  return values;
};

const handleSingleValue = (expression, upperLimit, lowerLimit) => {
  const value = parseInt(expression, 10);
  if (value < lowerLimit || value > upperLimit) {
    throw new Error("Single value exceeded bounds");
  }
  return [value];
};

const handleNoValue = () => {
  return ["?"];
};

const parseAtom = (expression, upperLimit, lowerLimit = 0) => {
  let values = [];

  if (expression === "*") {
    values = handleAllValues(upperLimit, lowerLimit);
  } else if (expression.includes("-")) {
    values = handleRange(expression, upperLimit, lowerLimit);
  } else if (expression.includes(",")) {
    values = handleExplicitValues(expression, upperLimit, lowerLimit);
  } else if (expression.includes("/")) {
    values = handleIncrements(expression, upperLimit, lowerLimit);
  } else if (expression === "?") {
    values = handleNoValue();
  } else {
    values = handleSingleValue(expression, upperLimit, lowerLimit);
  }

  return values;
};

module.exports = parseAtom;
