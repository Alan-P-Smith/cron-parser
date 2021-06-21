#!/usr/bin/env node

const parseExpression = require("./parse-expression/parseExpression");
const formatOutput = require("./format-output/formatOutput");

console.log(formatOutput(parseExpression(process.argv[2])));
