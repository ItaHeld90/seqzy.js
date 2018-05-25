const { curry } = require('ramda/src');

const someReducer = curry(
    (predicateFn, aggregator) =>
        (result, item, token) => {
            const isPass = predicateFn(item);

            if (isPass) {
                token.done();
            }

            return aggregator(result, isPass);
        }
);

const everyReducer = curry(
    (predicateFn, aggregator) =>
        (result, item, token) => {
            const isPass = predicateFn(item);

            if (!isPass) {
                token.done();
            }

            return aggregator(result, isPass);
        }
);

const findReducer = curry(
    (predicateFn, aggregator) =>
        (result, item, token) => {
            const isPass = predicateFn(item);

            if (isPass) {
                token.done();
            }

            const newResult = isPass
                ? item
                : null;

            return aggregator(result, newResult);
        }
);

const findIndexReducer = curry(
    (predicateFn, aggregator) => {
        let currIdx = 0;

        return (result, item, token) => {
            const isPass = predicateFn(item);

            if (isPass) {
                token.done();
            }

            const newResult = isPass
                ? currIdx
                : -1;

            currIdx++;

            return newResult;
        }
    }
);

module.exports = {
    someReducer,
    everyReducer,
    findReducer,
    findIndexReducer
};