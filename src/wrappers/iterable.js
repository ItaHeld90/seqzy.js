const { mapReducer, filterReducer, isIterable } = require('../helper-utils');
const { curry, partialRight, pipe } = require('ramda/src');

// wrapper
const wrapIterable = curry((iterableObj, aggregate, empty) => {
    // Temp: assert that the received object is iterable
    console.assert(isIterable(iterableObj), 'not an iterable');

    const wrapValue = (val) => wrapIterable(val, aggregate, empty);

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
        partialRight(reduce, [empty]),
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

    const foreach = (fn) => {
        for (let item of iterableObj) {
            fn(item);
        }

        return wrapValue(iterableObj);
    }

    const value = () => iterableObj;

    return {
        value,
        map,
        filter,
        reduce,
        foreach
    };
});

module.exports = wrapIterable;