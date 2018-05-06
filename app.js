const { mapReducer, filterReducer, isIterable } = require('./help-utils');
const { curry } = require('ramda/src');

// wrapper
const wrap = curry((iterableObj, aggregate, empty) => {
    // Temp: assert that the received object is iterable
    console.assert(isIterable(iterableObj), 'not an iterable');

    const wrapValue = (val) => wrap(val, aggregate, empty);

    const map = (mapperFn) => {
        const result = reduce(
            mapReducer(mapperFn, aggregate),
            empty
        );

        return wrapValue(result);
    }

    const filter = (predicate) => {
        const result = reduce(
            filterReducer(predicate, aggregate),
            empty
        );

        return wrapValue(result);
    }

    const reduce = (reducer, initialValue) => {
        let result = initialValue;
        let idx = 0;

        for (let item of iterableObj) {
            result = reducer(result, item, idx)
            idx++;
        }

        return result;
    }

    const value = () => iterableObj;

    return {
        value,
        map,
        filter
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

module.exports = {
    wrap,
    wrapMap,
    wrapSet
};