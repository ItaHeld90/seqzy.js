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
    not,
    identity,
};