const { mapReducer, filterReducer, isIterable, makeIterator } = require('../helper-utils');
const { curry, partialRight, pipe } = require('ramda/src');

// wrapper
const wrapIterable = curry((iterableObj, aggregate, createEmpty) => {
    // Temp: assert that the received object is iterable
    console.assert(isIterable(iterableObj), 'not an iterable');

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

        return wrapValue(iterableObj);
    }

    const head = () => makeIterator(iterableObj)
        .next()
        .value;

    const take = (times) => {
        let counter = times;
        let result = [];

        for (let item of iterableObj) {
            if (counter <= 0) {
                break;
            }

            result.push(item);
            counter--;
        }

        return wrapValue(result);
    }

    const value = () => iterableObj;

    return {
        value,
        map,
        filter,
        reduce,
        forEach,
        head,
        take
    };
});

module.exports = wrapIterable;