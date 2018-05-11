const { curry } = require('ramda/src');

const mapReducer = curry(
    (aggregator, mapperFn) =>
        (result, item) =>
            aggregator(result, mapperFn(item))
);

const filterReducer = curry(
    (aggregator, predicateFn) =>
        (result, item) =>
            predicateFn(item)
                ? aggregator(result, item)
                : result
);

const isIterable = (obj) => {
    if (obj == null) {
        return false;
    }
    return typeof obj[Symbol.iterator] === 'function';
}

const makeIterator = (iterable) => {
    return iterable[Symbol.iterator]();
}

const combineList = curry(
    (list, item) => [...list, item]
);

const listHead = list => list[0];

module.exports = {
    mapReducer,
    filterReducer,
    isIterable,
    makeIterator,
    combineList,
    listHead
};