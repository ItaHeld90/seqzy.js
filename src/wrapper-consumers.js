const { curry } = require('ramda/src');
const { makeIterator } = require('./helper-utils');

const reduce = curry(
    (reducerFn, initialValue, iterableObj) => {
        let result = initialValue;
        let idx = 0;

        for (let item of iterableObj) {
            result = reducerFn(result, item, idx, iterableObj)
            idx++;
        }

        return result;
    }
);

const forEach = curry(
    (fn, iterableObj) => {
        for (let item of iterableObj) {
            fn(item);
        }
    }
);

const some = curry(
    (predicateFn, iterableObj) => {
        for (let item of iterableObj) {
            if (predicateFn(item)) {
                return true;
            }
        }

        return false;
    }
);

const every = curry(
    (predicateFn, iterableObj) => {
        for (let item of iterableObj) {
            if (!predicateFn(item)) {
                return false;
            }
        }

        return true;
    }
)

const find = curry(
    (predicateFn, iterableObj) => {
        for (let item of iterableObj) {
            if (predicateFn(item)) {
                return item;
            }
        }

        return undefined;
    }
);

module.exports = {
    reduce,
    forEach,
    some,
    every,
    find
};