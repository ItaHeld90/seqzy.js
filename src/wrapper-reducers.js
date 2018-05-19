const { not, identity } = require('./helper-utils');
const { curry } = require('ramda/src');

const mapReducer = curry(
    (mapperFn, aggregator) =>
        (result, item, idx, token) => {
            return aggregator(result, mapperFn(item), idx, token);
        }
);

const filterReducer = curry(
    (predicateFn, aggregator) =>
        (result, item, idx, token) => {
            return predicateFn(item)
                ? aggregator(result, item, idx, token)
                : result
        }
);

const rejectReducer = curry(
    (predicateFn, aggregator) =>
        filterReducer(not(predicateFn), aggregator)
);

const compactReducer = filterReducer(identity);

const takeReducer = curry(
    (times, aggregator) => {
        let counter = times;

        return (result, item, idx, token) => {
            const shouldProceed = counter > 0;

            const nextResult = shouldProceed
                ? aggregator(result, item, idx, token)
                : result;

            if (!shouldProceed) {
                token.done();
            }

            counter--;
            return nextResult;
        }
    }
)

const takeWhileReducer = curry(
    (predicateFn, aggregator) =>
        (result, item, idx, token) => {
            const shouldProceed = predicateFn(item);

            const nextResult = shouldProceed
                ? aggregator(result, item, idx, token)
                : result;

            if (!shouldProceed) {
                token.done();
            }

            return nextResult;
        }
);

module.exports = {
    mapReducer,
    filterReducer,
    rejectReducer,
    compactReducer,
    takeReducer,
    takeWhileReducer
};