const { mapReducer, filterReducer, isIterable, makeIterator, extractIterator } = require('../helper-utils');
const { curry, partialRight, pipe } = require('ramda/src');

// wrapper
const wrapIterable = (iterableObj, aggregate, createEmpty) => {
    const wrapValue = (val) => wrapIterable(val, aggregate, createEmpty);

    const reduce = (reducerFn, initialValue) => {
        let result = initialValue;
        let idx = 0;

        for (let item of iterableObj) {
            result = reducerFn(result, item, idx, iterableObj)
            idx++;
        }

        return result;
    }

    const reduceWrap = pipe(
        partialRight(reduce, [createEmpty()]),
        wrapValue
    );

    const map = pipe(
        mapReducer(aggregate),
        reduceWrap
    );

    const filter = pipe(
        filterReducer(aggregate),
        reduceWrap
    );

    const forEach = (fn) => {
        for (let item of iterableObj) {
            fn(item);
        }
    }

    const head = () => makeIterator(iterableObj)
        .next()
        .value;

    const take = (times) => {
        let counter = times;
        let result = createEmpty();

        for (let item of iterableObj) {
            if (counter <= 0) {
                break;
            }

            result = aggregate(result, item);
            counter--;
        }

        return wrapValue(result);
    }

    const value = () => iterableObj;

    const result = {
        [Symbol.iterator]: extractIterator(iterableObj), // Making the wrapper iterable
        value,
        map,
        filter,
        reduce,
        forEach,
        head,
        take
    };

    return result;
};

module.exports = wrapIterable;