const { curry } = require('ramda/src');

const someReducer = curry(
    (predicateFn, aggregator) =>
        (result, item, idx, token) => {
            const isFound = predicateFn(item);

            if (isFound) {
                token.done();
            }

            return isFound;
        }
);

module.exports = {
    someReducer
};