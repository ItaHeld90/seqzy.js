const { wrap } = require("./app");
const sentGen = require('./test-utils');

const fiddle1 = wrap(
    sentGen
)
    .filter(sent => sent.includes('sus'))
    .take(20)
    .map(sent => sent.toUpperCase())
    .forEach(console.log);