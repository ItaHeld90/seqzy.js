const { not, identity } = require('./helper-utils');
const { curry } = require('ramda/src');

const mapReducer = curry(
    (mapperFn, aggregator) =>
        (result, item, token) => {
            return aggregator(result, mapperFn(item), token);
        }
);

const filterReducer = curry(
    (predicateFn, aggregator) =>
        (result, item, token) => {
            return predicateFn(item)
                ? aggregator(result, item, token)
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

        return (result, item, token) => {
            const shouldProceed = counter > 0;

            const nextResult = shouldProceed
                ? aggregator(result, item, token)
                : result;

            if (shouldProceed) {
                counter--;
            }
            else {
                token.done();
            }

            return nextResult;
        }
    }
)

const takeWhileReducer = curry(
    (predicateFn, aggregator) =>
        (result, item, token) => {
            const shouldProceed = predicateFn(item);

            const nextResult = shouldProceed
                ? aggregator(result, item, token)
                : result;

            if (!shouldProceed) {
                token.done();
            }

            return nextResult;
        }
);

const dropReducer = curry(
    (times, aggregator) => {
        let counter = times;

        return (result, item, token) => {
            const shouldTake = counter <= 0;

            const nextResult = shouldTake
                ? aggregator(result, item, token)
                : result;

            if (!shouldTake) {
                counter--;
            }

            return nextResult;
        }
    }
);

const dropWhileReducer = curry(
    (predicateFn, aggregator) => {
        let shouldTake = false;

        return (result, item, token) => {
            shouldTake |= !predicateFn(item)

            return shouldTake
                ? aggregator(result, item, token)
                : result;
        }
    }
);

module.exports = {
    mapReducer,
    filterReducer,
    rejectReducer,
    compactReducer,
    takeReducer,
    takeWhileReducer,
    dropReducer,
    dropWhileReducer
};