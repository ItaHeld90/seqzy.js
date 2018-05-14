const { not, identity } = require('./helper-utils');
const { curry } = require('ramda/src');

const mapReducer = curry(
    (mapperFn, aggregator) =>
        (result, item) =>
            aggregator(result, mapperFn(item))
);

const filterReducer = curry(
    (predicateFn, aggregator) =>
        (result, item) =>
            predicateFn(item)
                ? aggregator(result, item)
                : result
);

const rejectReducer = curry(
    (predicateFn, aggregator) =>
        filterReducer(not(predicateFn), aggregator)
);

const compactReducer = filterReducer(identity);

module.exports = {
    mapReducer,
    filterReducer,
    rejectReducer,
    compactReducer
};