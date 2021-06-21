const addWhiteSpaceToLabels = (labels, requiredLength) => {
  return labels.map((label) => {
    const extraLength = requiredLength - label.length;
    return `${label}${new Array(extraLength).join(` `)}`;
  });
};

const stringifyOutput = (values) => {
  let output = ``;

  values.forEach((item) => {
    output = `${output} ${item}`;
  });
  return output;
};

const formatOutput = (atoms) => {
  let output = ``;
  let labels = [
    `minute`,
    `hour`,
    `day of month`,
    `month`,
    `day of week`,
    `command`,
  ];
  const formattedLabels = addWhiteSpaceToLabels(labels, 14);

  atoms.forEach((atom, index) => {
    const label = formattedLabels[index];
    const isLastAtom = index === atoms.length - 1;
    const formattedAtom = stringifyOutput(atom);
    output = `${output}${label}${formattedAtom}${isLastAtom ? `` : `\n`}`;
  });
  return output;
};

module.exports = formatOutput;
