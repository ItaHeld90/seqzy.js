const { mapReducer, filterReducer, isIterable } = require('./help-utils');
const { curry, concat, partial, partialRight, pipe } = require('ramda/src');

// wrapper
const wrap = curry((iterableObj, aggregate, empty) => {
    // Temp: assert that the received object is iterable
    console.assert(isIterable(iterableObj), 'not an iterable');

    const wrapValue = (val) => wrap(val, aggregate, empty);

    const reduce = (reducer, initialValue) => {
        let result = initialValue;
        let idx = 0;

        for (let item of iterableObj) {
            result = reducer(result, item, idx)
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

    const value = () => iterableObj;

    return {
        value,
        map,
        filter,
        reduce
    };
});

const wrapMap = (map) =>
    wrap(
        map,
        (result, [key, val]) => result.set(key, val),
        new Map()
    );

const wrapSet = (set) =>
    wrap(
        set,
        (result, val) => set.add(value),
        new Set()
    );

const wrapString = (str) =>
    wrap(
        str,
        concat,
        ''
    );

const wrapList = (list) =>
    wrap(
        list,
        (result, val) => [...result, val],
        []
    );

module.exports = {
    wrap,
    wrapMap,
    wrapSet,
    wrapString,
    wrapList
};