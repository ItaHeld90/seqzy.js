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

const head =
    iterableObj =>
        makeIterator(iterableObj)
            .next()
            .value;

module.exports = {
    reduce,
    forEach,
    head,
};