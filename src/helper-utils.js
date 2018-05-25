const { curry } = require('ramda/src');

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
    (list, item) =>
        [...list, item]
);

const valuesToPair = curry(
    (value1, value2) => [value1, value2]
);

const iterableHead = iterableObj => {
    const iterator = makeIterator(iterableObj);
    return iterator.next().value;
};

const not = 
    predicateFn =>
        (...args) =>
            !predicateFn(...args);

const identity =
    value =>
        value;

module.exports = {
    isIterable,
    makeIterator,
    combineList,
    valuesToPair,
    iterableHead,
    not,
    identity,
};