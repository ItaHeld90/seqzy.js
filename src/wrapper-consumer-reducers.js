const { curry } = require('ramda/src');

const someReducer = curry(
    (predicateFn, aggregator) =>
        (result, item, idx, token) => {
            const isPass = predicateFn(item);

            if (isPass) {
                token.done();
            }

            return aggregator(result, isPass);
        }
);

const everyReducer = curry(
    (predicateFn, aggregator) =>
        (result, item, idx, token) => {
            const isPass = predicateFn(item);

            if (!isPass) {
                token.done();
            }

            return aggregator(result, isPass);
        }
);

const findReducer = curry(
    (predicateFn, aggregator) =>
        (result, item, idx, token) => {
            const isPass = predicateFn(item);

            if (isPass) {
                token.done();
            }

            const newResult = isPass
                ? item
                : null;

            return aggregator(result, newResult);
        }
)

module.exports = {
    someReducer,
    everyReducer,
    findReducer
};